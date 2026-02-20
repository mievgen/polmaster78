const express = require("express")
const cors = require("cors")
const fetch = require("node-fetch")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())

// тест
app.get("/", (req, res) => {
  res.send("Backend работает 🚀")
})

// отправка формы
app.post("/send-form", async (req, res) => {
  try {
    const { name, phone, message, honeypot } = req.body

    // 🛑 антиспам
    if (honeypot) {
      return res.status(400).json({ ok: false })
    }

    const text = `
📩 Новая заявка с сайта

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${message || "-"}
`

    const url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: process.env.CHAT_ID,
        text,
      }),
    })

    res.json({ ok: true })
  } catch (err) {
    console.error("Telegram error:", err)
    res.status(500).json({ ok: false })
  }
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log("Server started on", PORT)
})
