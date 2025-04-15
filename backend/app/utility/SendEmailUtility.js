import nodemailer from "nodemailer";

const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: "",
    secure: true,
    auth: {
      user: "azizulhakim6817@gmail.com",
      pass: "oayg jcgr okqr cqqa",
    },
    tls: { rejectUnauthorized: false },
  });

  let mailOption = {
    from: "Inventory website <azizulhakim6817@gmail.com>",
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };
  return await transporter.sendMail(mailOption);
};

export default SendEmailUtility;
