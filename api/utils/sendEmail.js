import * as dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";

export const emailToOwner = (receiver, data) => {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mail_configs = {
      from: data.from,
      to: receiver,
      subject: `Someone applied to your job offer`,
      html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
        <meta charset="UTF-8">
        <title>Application confirmation</title>     
      </head>
      <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Job test Portal</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>You have a new applicant: ${receiver}</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Your offer ${data.title} from ${data.company} received a new applicant. Get back to him asap</h2>
          <p style="font-size:0.9em;">Regards,<br />Job Portal</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Job Portal</p>
            <p>Poland, 31-923</p>
            <p>Kraków</p>
          </div>
        </div>
      </div>
      <!-- partial -->
        
      </body>
      </html>`,
      attachments: [
        {
          filename: `${Date.now()}_${data.file}`,
          content: data.file,
          encoding: "base64",
          contentType: "application/pdf",
        },
      ],
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return rej({ message: "An error has occured" });
      }

      return res({ message: "Email sent successfully" });
    });
  });
};

export function confirmationEmail(receiver, data) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mail_configs = {
      from: process.env.EMAIL_USER,
      to: receiver,
      subject: `You application to ${data.company} has been sent`,
      html: `<!DOCTYPE html>
      <html lang="en" >
      <head>
        <meta charset="UTF-8">
        <title>Application confirmation</title>     
      </head>
      <body>
      <!-- partial:index.partial.html -->
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Job test Portal</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>You applied to ${data.title}</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Your application has been sent to ${data.company}</h2>
          <p style="font-size:0.9em;">Regards,<br />Job Portal</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Job Portal</p>
            <p>Poland, 31-923</p>
            <p>Kraków</p>
          </div>
        </div>
      </div>
      <!-- partial -->
        
      </body>
      </html>`,
      attachments: [
        {
          filename: `${Date.now()}_${data.file}`,
          content: data.file,
          encoding: "base64",
          contentType: "application/pdf",
        },
      ],
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return rej({ message: "An error has occured" });
      }

      return res({ message: "Email sent successfully" });
    });
  });
}

export function sendEmail({ receiver, OTP }) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mail_configs = {
      from: process.env.EMAIL_USER,
      to: receiver,
      subject: "Password reset",
      html: `<!DOCTYPE html>
        <html lang="en" >
        <head>
          <meta charset="UTF-8">
          <title>OTP Email</title>
          
        
        </head>
        <body>
        <!-- partial:index.partial.html -->
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Job test Portal</a>
            </div>
            <p style="font-size:1.1em">Hi,</p>
            <p>This is your code to access password change procedure. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
            <p style="font-size:0.9em;">Regards,<br />Job Portal</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>Job Portal</p>
              <p>Poland, 31-923</p>
              <p>Kraków</p>
            </div>
          </div>
        </div>
        <!-- partial -->
          
        </body>
        </html>`,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return rej({ message: "An error has occured" });
      }
      return res({ message: "Email sent successfully" });
    });
  });
}
