export {};
// import nodemailer from "nodemailer";
// import handlebars from "handlebars";
// import fs from "node:fs";
// import { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } from "../../config";

// const transporter = nodemailer.createTransport({
//   host: MAIL_HOST,
//   port: MAIL_PORT,
//   secure: true,
//   auth: {
//     user: MAIL_USER,
//     pass: MAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// const readHTMLFile = function (path, callback) {
//   fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
//     if (err) {
//       console.log(err);
//       callback(err);
//     } else {
//       callback(null, html);
//     }
//   });
// };

// const send_email = (template, replacements, from, subject, email) => {
//   readHTMLFile(
//     `./public/email-templates/${template}.html`,
//     function (err, html) {
//       let template = handlebars.compile(html);
//       //   let replacements = {
//       //     username: "ghous ahmed",
//       //     locationDescription: "test",
//       //   };
//       let htmlToSend = template(replacements);

//       const mailOptions = {
//         from: `${from} <info@stopthevirus.health>`,
//         to: email,
//         subject: subject, //"Awaiting Admin Approval",
//         html: htmlToSend,
//       };
//       transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           return console.log("Error===>", error);
//         }
//         console.log(`Email sent: ${info.response}`);
//       });
//     },
//   );
// };

// module.exports = {
//   send_email,
// };
