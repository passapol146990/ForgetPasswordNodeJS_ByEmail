const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'moneycs66np@gmail.com',
      pass: 'fpns hvnr lbgl xcrm'
  }
})

function sendResetPasswordEmail(to, token) {
  const mailOptions = {
    from: 'test@example.com',
    to,
    subject: 'รีเซ็ตรหัสผ่าน',
    html: `<a href="http://localhost:3500/resetpassword/${token}">Click Here</a> to reset password`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = { sendResetPasswordEmail }