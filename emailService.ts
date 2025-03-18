// const nodemailer = require('nodemailer');

// // Create transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // or use SMTP settings
//   auth: {
//     user: 'your-email@gmail.com', // Change this
//     pass: 'your-email-password', // Change this
//   },
// });

// // Function to send email
// const sendEmail = async (to, subject, text) => {
//   try {
//     await transporter.sendMail({
//       from: 'your-email@gmail.com',
//       to,
//       subject,
//       text,
//     });
//     console.log('✅ Email sent successfully!');
//   } catch (error) {
//     console.error('❌ Error sending email:', error);
//   }
// };

// module.exports = sendEmail;
