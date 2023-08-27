import nodemailer from "nodemailer";

let transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "5bd6e342ec9c4a", 
      pass: "b02ffd40c6a8a9"
    }
  });

  export default transport;