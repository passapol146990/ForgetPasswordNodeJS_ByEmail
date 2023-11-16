const express = require("express")
const jwt = require("jsonwebtoken")
const { JsonDB, Config } = require("node-json-db")
const { sendResetPasswordEmail } = require("../transpoter/transporter")

const db = new JsonDB(new Config("token", true, true, "/"))
const route = express.Router()

// POST ส่งอีเมลเพื่อให้กดยืนยันการลืมรหัสผ่าน
route.post("/resetpass", async (req, res) => {
  try {
    const userEmail = req.body.email
    const userDBEmail = await db.getData(`/account/${userEmail}`)

    if (userEmail === userDBEmail.email) {
      const token = jwt.sign({ email: userEmail }, "SECRET_KEY", { expiresIn: "5m" })
      const status = sendResetPasswordEmail(userEmail, token)
      console.log(status)
      await db.push(`/account/${userEmail}`, {
        token
      }, false)

      res.send("Check your email")
    }
  } catch(err) {
    res.send("Email not found")
  }
})

// GET ให้กรอกรหัสผ่านใหม่
route.get("/resetpassword/:resetToken", async (req, res) => {
  try {
    const token = req.params.resetToken
    jwt.verify(token, "SECRET_KEY")

  } catch {
    res.send("You can't reset password without token")
  }
})

// POST ส่งรหัสใหม่ไปยังเซิฟเวอร์
route.post("/resetpassword/:resetToken", async (req, res) => {
  try {
    const userNewPassword = req.body.newpassword
    const token = req.params.resetToken

    const decode = jwt.verify(token, "SECRET_KEY")

    const verifyToken = (await db.getData(`/account/${decode.email}`)).token
    
    if (token === verifyToken) {
      await db.push(`/account/${decode.email}`, {
        password: userNewPassword,
        token: ""
      }, false)
  
      res.send("Reset password successfully")
    } else {
      res.send("Token ถูกใช้ไปแล้ว")
    }
    

  } catch {
    res.send("You can't reset password without token")
  }
})

module.exports = route