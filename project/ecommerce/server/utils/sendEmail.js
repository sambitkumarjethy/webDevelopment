import nodeMailer from "nodeMailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    service: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_MAIL,
      password: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject,
    html: message,
  };

  await transporter.sendEmail(mailOptions);
};
