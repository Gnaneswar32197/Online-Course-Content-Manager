import nodemailer from "nodemailer";

export const sendEmail = async (to: string, password: string) => {
  try {
    console.log("📧 Sending email...");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,           
      secure: false,        
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

   const info = await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to,
  subject: "Welcome to CourseFlow - Admin Access Granted",
  html: `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    
    <div style="max-width:600px; margin:auto; background:white; padding:25px; border-radius:10px;">

      <h2 style="color:#4f46e5; text-align:center;">
        Welcome to CourseFlow 🚀
      </h2>

      <p style="font-size:16px;">
        Hello,
      </p>

      <p style="font-size:15px; line-height:1.6;">
        You have been successfully added as an <b>Administrator</b> on 
        <b>CourseFlow</b> — a platform designed to manage and organize course content efficiently.
      </p>

      <hr style="margin:20px 0;" />

      <h3 style="color:#111827;">🔐 Your Login Credentials</h3>

      <p><b>Email:</b> ${to}</p>
      <p><b>Password:</b> ${password}</p>

      <p style="color:#dc2626; font-size:14px;">
        ⚠️ For security reasons, please log in and reset your password immediately.
      </p>

      <hr style="margin:20px 0;" />

      <h3 style="color:#111827;">📚 What You Can Do</h3>

      <ul style="line-height:1.8;">
        <li>✔ Manage course content</li>
        <li>✔ Create and update courses</li>
        <li>✔ Monitor course details</li>
        <li>✔ Maintain learning resources</li>
      </ul>

      <hr style="margin:20px 0;" />

      <p style="font-size:14px; color:#6b7280;">
        If you have any questions, feel free to contact the system administrator.
      </p>

      <p style="margin-top:20px;">
        Best regards,<br/>
        <b>CourseFlow Team</b>
      </p>

    </div>

  </div>
  `,
});

    console.log("✅ Email sent:", info.response);

  } catch (err) {
    console.error("❌ Email error:", err);
  }
};