function showContact(btn) {
  const contacts = {
    // --- Телефон (Base64 по частям) ---
    phone: [
      "Kzc=", // +7
      "OTEx", // 911
      "MDE3", // 017
      "NTA2OQ==", // 5069
    ],

    // --- Telegram ---
    telegram: ["bGlub3Byb21uYXN0aWxfc3Bi"],
  }

  const type = btn.dataset.type
  let link = document.createElement("a")

  // 📞 ТЕЛЕФОН

  if (type === "phone") {
    let phone = ""
    contacts.phone.forEach((part) => {
      phone += atob(part)
    })

    link.href = "tel:" + phone
    link.className = "phone-number"
    link.innerHTML = "📞 +7 (911) 017-50-69"
  }

  // ✈ TELEGRAM

  if (type === "telegram") {
    const tgUser = atob(contacts.telegram[0])

    link.href = "https://t.me/" + tgUser
    link.target = "_blank"
    link.className = "tg-button"
    link.innerHTML = "✈"
  }

  link.oncopy = (e) => e.preventDefault()
  link.oncut = (e) => e.preventDefault()
  link.oncontextmenu = (e) => e.preventDefault()
  link.onmousedown = (e) => e.preventDefault()

  // анти-бот задержка
  setTimeout(() => {
    btn.replaceWith(link)
  }, 700)
}

document
  .getElementById("tg-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault()

    const form = this

    const data = {
      name: form.name.value,
      phone: form.phone.value,
      message: form.message.value,
      honeypot: form.honeypot.value,
    }

    try {
      const res = await fetch("https://polmaster78.onrender.com/send-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error()

      alert("✅ Заявка отправлена!")
      form.reset()
    } catch (err) {
      alert("❌ Ошибка отправки. Попробуйте позже.")
      console.error(err)
    }
  })
