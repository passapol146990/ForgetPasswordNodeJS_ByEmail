const express = require("express")
const resetPasswordController = require("./controllers/resetPasswordController")

const app = express()
const PORT = 3500


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", resetPasswordController)

app.listen(PORT, () => {
  console.log("PORT", PORT)
})