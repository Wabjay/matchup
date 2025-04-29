import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `https://localhost/reset-password?token=${token}`;

  // Setup mail transport (replace with real credentials)
  const transporter = nodemailer.createTransport({
    service: "Gmail", // Or use SMTP settings for your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  const mailOptions = {
    from: "Your App <noreply@yourapp.com>",
    to: email,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto;">
        <h2>Password Reset Request</h2>
        <p>You requested a password reset. Click the button below to reset your password:</p>
        <a href="${resetLink}" 
           style="display: inline-block; padding: 12px 20px; background-color: #007bff; 
                  color: white; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Password
        </a>
        <p>If you didn’t request this, please ignore this email.</p>
        <p>The link expires in <strong>1 hour</strong>.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
