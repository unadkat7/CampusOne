const { Worker } = require("bullmq");
const IORedis = require("ioredis");
const CodeSubmission = require("../models/CodeSubmission");
const { evaluateSubmission } = require("../services/evaluationService");

const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

const worker = new Worker(
  "code-submissions",
  async (job) => {
    try {
      const { submissionId } = job.data;
      console.log(`[Worker] Processing submission ${submissionId}`);

      const submission = await CodeSubmission.findById(submissionId);
      if (!submission) {
        throw new Error(`Submission ${submissionId} not found`);
      }

      // Delegate to existing evaluation service
      const result = await evaluateSubmission(submission);

      // Update submission with results
      submission.status = result.status;
      submission.executionTime = result.executionTime;
      submission.memoryUsed = result.memoryUsed;
      submission.failedTestCase = result.failedTestCase || null;
      submission.output = result.message || result.output || null;
      
      await submission.save();
      console.log(`[Worker] Finished submission ${submissionId} with status ${result.status}`);

      return result;
    } catch (error) {
      console.error(`[Worker] Job ${job.id} failed:`, error.message);
      
      // Attempt to mark submission as Error if possible
      if (job.data && job.data.submissionId) {
        try {
          await CodeSubmission.findByIdAndUpdate(job.data.submissionId, {
            status: "Error",
            output: "Internal Server Error during async execution.",
          });
        } catch (dbErr) {
          console.error("Failed to update submission status on worker error:", dbErr);
        }
      }
      throw error;
    }
  },
  { connection }
);

worker.on("ready", () => {
  console.log("👷 Submission Worker is ready and listening to 'code-submissions' queue");
});

worker.on("failed", (job, err) => {
  console.error(`[Worker] Job ${job ? job.id : 'unknown'} failed completely with error: ${err.message}`);
});

module.exports = worker;
