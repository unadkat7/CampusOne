const { Queue } = require("bullmq");
const IORedis = require("ioredis");

// Default to localhost Redis if REDIS_URL is not set
const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

const submissionQueue = new Queue("code-submissions", {
  connection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
    removeOnComplete: true,
    removeOnFail: 100, // Keep last 100 failed jobs for debugging
  },
});

submissionQueue.on("error", (err) => {
  console.error("Submission Queue Error:", err.message);
});

module.exports = submissionQueue;
