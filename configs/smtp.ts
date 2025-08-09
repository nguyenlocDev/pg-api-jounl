import nodemailer from "nodemailer";

async function sendMail(to: string, subject: string, htmlContent: string) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"JOUNL" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: htmlContent,
    });

    return true;
  } catch (err) {
    return false;
  }
}

// Ví dụ dùng:

function otpEmailTemplate(otpCode: string) {
  return `
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 500px; margin: auto; background: white; padding: 20px; border-radius: 8px; text-align: center; border: 1px solid #ddd;">
      <h2 style="color: #333;">Xác thực tài khoản</h2>
      <p style="font-size: 16px; color: #555;">
        Mã OTP của bạn là:
      </p>
      <h1 style="letter-spacing: 5px; color: #007BFF;">${otpCode}</h1>
      <p style="font-size: 14px; color: #777; margin-top: 20px;">
        Mã OTP có hiệu lực trong <b>5 phút</b>. Vui lòng không chia sẻ mã này với bất kỳ ai.
      </p>
      <p style="font-size: 12px; color: #aaa; margin-top: 30px;">
        Đây là email tự động, vui lòng không trả lời.
      </p>
    </div>
  </div>
  `;
}

export { sendMail, otpEmailTemplate };
