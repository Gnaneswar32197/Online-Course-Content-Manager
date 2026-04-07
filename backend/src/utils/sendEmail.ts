// import nodemailer from "nodemailer";

// export const sendEmail = async (to: string, password: string) => {
//   try {
//     console.log("📧 Sending email...");

//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,           
//       secure: false,        
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//    const info = await transporter.sendMail({
//   from: process.env.EMAIL_USER,
//   to,
//   subject: "Welcome to CourseFlow - Admin Access Granted",
//   html: `
//   <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    
//     <div style="max-width:600px; margin:auto; background:white; padding:25px; border-radius:10px;">

//       <h2 style="color:#4f46e5; text-align:center;">
//         Welcome to CourseFlow 🚀
//       </h2>

//       <p style="font-size:16px;">
//         Hello,
//       </p>

//       <p style="font-size:15px; line-height:1.6;">
//         You have been successfully added as an <b>Administrator</b> on 
//         <b>CourseFlow</b> — a platform designed to manage and organize course content efficiently.
//       </p>

//       <hr style="margin:20px 0;" />

//       <h3 style="color:#111827;">🔐 Your Login Credentials</h3>

//       <p><b>Email:</b> ${to}</p>
//       <p><b>Password:</b> ${password}</p>

//       <p style="color:#dc2626; font-size:14px;">
//         ⚠️ For security reasons, please log in and reset your password immediately.
//       </p>

//       <hr style="margin:20px 0;" />

//       <h3 style="color:#111827;">📚 What You Can Do</h3>

//       <ul style="line-height:1.8;">
//         <li>✔ Manage course content</li>
//         <li>✔ Create and update courses</li>
//         <li>✔ Monitor course details</li>
//         <li>✔ Maintain learning resources</li>
//       </ul>

//       <hr style="margin:20px 0;" />

//       <p style="font-size:14px; color:#6b7280;">
//         If you have any questions, feel free to contact the system administrator.
//       </p>

//       <p style="margin-top:20px;">
//         Best regards,<br/>
//         <b>CourseFlow Team</b>
//       </p>

//     </div>

//   </div>
//   `,
// });

//     console.log("✅ Email sent:", info.response);

//   } catch (err) {
//     console.error("❌ Email error:", err);
//   }
// };

import nodemailer from "nodemailer";

export const sendEmail = async (to: string, content: string, type: "otp" | "welcome") => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let html = "";

  if (type === "otp") {
  html = `
  <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
    <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:10px;">

      <h2 style="color:#4f46e5;text-align:center;">
        CourseFlow 🔐 Password Reset
      </h2>

      <p>Hello,</p>

      <p>
        We received a request to reset your password for your <b>CourseFlow</b> account.
      </p>

      <p>Your One-Time Password (OTP) is:</p>

      <h1 style="text-align:center;color:#111827;letter-spacing:3px;">
        ${content}
      </h1>

      <p style="color:#dc2626;">
        ⚠️ This OTP is valid for 5 minutes. Do not share it with anyone.
      </p>

      <div style="text-align:center;margin:20px 0;">
        <a href="http://localhost:3000/login"
           style="background:#4f46e5;color:white;padding:10px 20px;
           text-decoration:none;border-radius:5px;">
          Go to CourseFlow
        </a>
      </div>

      <hr/>

      <p style="font-size:13px;color:#6b7280;">
        If you didn’t request this, please ignore this email.
      </p>

      <p>
        Regards,<br/>
        <b>CourseFlow Team</b>
      </p>

    </div>
  </div>
  `;
}
else {
  html = `
  <div style="font-family:Arial,sans-serif;background:#f4f6f8;padding:20px;">
    <div style="max-width:600px;margin:auto;background:white;padding:25px;border-radius:10px;">

      <h2 style="color:#4f46e5;text-align:center;">
        Welcome to CourseFlow 🚀
      </h2>

      <p>Hello,</p>

      <p>
        You have been successfully added as an <b>Administrator</b> on 
        <b>CourseFlow</b>, a platform designed to manage and organize course content efficiently.
      </p>

      <hr/>

      <h3 style="color:#111827;">🔐 Your Login Credentials</h3>

      <p><b>Email:</b> ${to}</p>
      <p><b>Password:</b> ${content}</p>

      <p style="color:#dc2626;">
        ⚠️ Please log in and reset your password immediately for security purposes.
      </p>

      <div style="text-align:center;margin:20px 0;">
        <a href="http://localhost:3000/login"
           style="background:#4f46e5;color:white;padding:10px 20px;
           text-decoration:none;border-radius:5px;">
          Login to CourseFlow
        </a>
      </div>

      <hr/>

      <h3 style="color:#111827;">📚 What You Can Do</h3>

      <ul style="line-height:1.8;">
        <li>✔ Create and manage courses</li>
        <li>✔ Update course content</li>
        <li>✔ Organize learning resources</li>
        <li>✔ Maintain course information</li>
      </ul>

      <hr/>

      <p style="font-size:13px;color:#6b7280;">
        If you have any questions, please contact your system administrator.
      </p>

      <p>
        Best regards,<br/>
        <b>CourseFlow Team</b>
      </p>

    </div>
  </div>
  `;
}

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "CourseFlow Notification",
    html,
  });
};