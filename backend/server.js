require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

/* ===============================
   БАЗОВЫЕ НАСТРОЙКИ
================================ */
app.use(
  cors({
    origin: [
      "https://ukladka-linoleuma-spb.ru",
      "https://www.ukladka-linoleuma-spb.ru",
    ],
    methods: ["POST", "GET"],
  }),
)
app.use(express.json())

/* ===============================
   ТЕСТ РОУТ
================================ */
app.get("/", (req, res) => {
  res.status(200).send("🚀 POLMASTER78 backend работает")
})

/* ===============================
   ОТПРАВКА ФОРМЫ
================================ */
app.post("/send-form", async (req, res) => {
  try {
    const { name, phone, message, honeypot } = req.body

    // 🛑 Honeypot антиспам
    if (honeypot) {
      return res.status(400).json({ ok: false })
    }

    // 🛑 Валидация
    if (!name || !phone) {
      return res.status(400).json({
        ok: false,
        error: "Имя и телефон обязательны",
      })
    }

    // 🛑 Минимальная защита длины
    if (name.length > 100 || phone.length > 30 || message?.length > 1000) {
      return res.status(400).json({ ok: false })
    }

    const text = `
📩 Новая заявка с сайта POLMASTER78

👤 Имя: ${name}
📞 Телефон: ${phone}
💬 Комментарий: ${message || "-"}

🌐 Сайт: ukladka-linoleuma-spb.ru
🕒 ${new Date().toLocaleString("ru-RU")}
`

    const response = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text,
        }),
      },
    )

    if (!response.ok) {
      console.error("Telegram API error")
      return res.status(500).json({ ok: false })
    }

    res.status(200).json({ ok: true })
  } catch (err) {
    console.error("Server error:", err)
    res.status(500).json({ ok: false })
  }
})

/* ===============================
   404
================================ */
app.use((req, res) => {
  res.status(404).json({ error: "Not found" })
})

/* ===============================
   СТАРТ СЕРВЕРА
================================ */
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Server started on port ${PORT}`)
})
