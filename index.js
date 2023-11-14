const express = require('express')
const app = express();
const nodemailer = require('nodemailer')
// npm start

/*
    Email money Cs 2566 access
*/
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'moneycs66np@gmail.com',
        pass: 'fpns hvnr lbgl xcrm'
    }
})
/*
    port localhost
*/
app.listen(3000, () => {
    console.log('Node app is running on port 3000 !')
})
/*
    POST request send email and toKen
*/
app.post('/repass', (req, res) => {
    const status = sendResetPasswordEmail('pholdata552@gmail.com', 'resetToken123');
    res.json(status)
})
/* 
    function send reset password to email
*/
const sendResetPasswordEmail = (to, token) => {
    const mailOptions = {
      from: 'test@example.com',
      to,
      subject: 'รีเซ็ตรหัสผ่าน',
      html: `<p>คลิก <a class="btn" href="http://localhost:3000/resetpassword/${token}">ที่นี่</a> เพื่อรีเซ็ตรหัสผ่าน</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
};
module.exports = app;