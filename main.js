function showContact(btn) {
  const contacts = {
    phone: [
      "Kzc=", // +7
      "OTEx", // 911
      "MDE3", // 017
      "NTA2OQ==", // 5069
    ],
    telegram: [
      "aHR0cHM6Ly90Lm1lL2xpbm9tYXN0ZXI3OA==", // https://t.me/linomaster78
    ],
  }

  const type = btn.dataset.type
  const link = document.createElement("a")

  // 📞 ТЕЛЕФОН
  if (type === "phone") {
    let phone = ""

    contacts.phone.forEach((part) => {
      phone += atob(part)
    })

    link.href = "tel:" + phone
    link.className = "phone-number"
    link.textContent = phone
  }

  // 💬 TELEGRAM
  if (type === "telegram") {
    const tgLink = atob(contacts.telegram[0]).trim()

    link.href = tgLink
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    link.className = "tg-button"
    link.innerHTML = `
      <img 
        src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/telegram.svg"
        width="40"
        height="40"
        alt="Telegram"
      />
    `
  }

  // лёгкая защита от копирования
  link.oncopy = (e) => e.preventDefault()
  link.oncontextmenu = (e) => e.preventDefault()

  // анти-бот задержка
  setTimeout(() => {
    btn.replaceWith(link)
  }, 600)
}

document
  .getElementById("tg-form")
  ?.addEventListener("submit", async function (e) {
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
