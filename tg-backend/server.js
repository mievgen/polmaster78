require("dotenv").config()

const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// ==========================
// 📩 Отправка заявки
// ==========================
app.post("/send-form", async (req, res) => {
  try {
    const { name, phone, message, honeypot } = req.body

    // 🛡 Honeypot защита
    if (honeypot) {
      return res.status(400).json({
        ok: false,
        text: "Spam detected",
      })
    }

    const text = `
<b>Новая заявка с сайта</b>
<b>Имя:</b> ${name}
<b>Телефон:</b> ${phone}
<b>Комментарий:</b> ${message}
`

    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`

    await axios.post(url, {
      chat_id: process.env.CHAT_ID,
      parse_mode: "html",
      text,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ ok: false })
  }
})

// ==========================
// 🚀 Запуск сервера
// ==========================
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
