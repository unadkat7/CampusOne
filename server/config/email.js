const nodemailer = require("nodemailer");

/**
 * Nodemailer transporter configuration stub.
 * This is a placeholder for future email functionality.
 * Replace the host, port, and auth credentials with your actual SMTP values.
 */
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: process.env.EMAIL_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASS || "password",
  },
});

/**
 * Send an email (not implemented yet — placeholder for future use).
 * @param {Object} options - { to, subject, text, html }
 */
const sendEmail = async (options) => {
  // TODO: Implement email sending in a future day
  console.log("📧 Email sending is not yet implemented.");
};

module.exports = { transporter, sendEmail };
