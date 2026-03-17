document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     ПОКАЗ КОНТАКТОВ
  ========================= */

  window.showContact = function (btn) {
    const contacts = {
      phone: ["Kzc=", "OTEx", "MDE3", "NTA2OQ=="],
      telegram: ["aHR0cHM6Ly90Lm1lL3BvbG1hc3Rlcjc4"],
    }

    const type = btn.dataset.type
    const link = document.createElement("a")

    /* --- телефон --- */

    if (type === "phone") {
      let phone = ""
      contacts.phone.forEach((part) => (phone += atob(part)))

      link.href = "tel:" + phone
      link.className = "phone-number"
      link.textContent = phone
    }

    /* --- telegram --- */

    if (type === "telegram") {
      const tgLink = atob(contacts.telegram[0])

      link.href = tgLink
      link.target = "_blank"
      link.rel = "noopener noreferrer"
      link.className = "tg-button"

      link.innerHTML = `
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg"
        alt="Telegram">`
    }

    btn.replaceWith(link)
  }

  /* =========================
     ОТПРАВКА ФОРМЫ
  ========================= */

  const form = document.getElementById("tg-form")

  if (form) {
    const submitBtn = form.querySelector("button[type='submit']")

    form.addEventListener("submit", async (e) => {
      e.preventDefault()

      const data = {
        name: form.name.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim(),
        honeypot: form.honeypot.value,
      }

      /* анти-бот */

      if (data.honeypot !== "") {
        console.log("spam blocked")
        return
      }

      if (!data.name || !data.phone) {
        alert("Пожалуйста заполните имя и телефон")
        return
      }

      if (submitBtn) submitBtn.disabled = true

      try {
        const res = await fetch("https://polmaster78.onrender.com/send-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (!res.ok) throw new Error()

        alert("✅ Заявка отправлена")
        form.reset()
      } catch (err) {
        console.error(err)
        alert("❌ Ошибка отправки")
      } finally {
        if (submitBtn) submitBtn.disabled = false
      }
    })
  }

  /* =========================
     МАСКА ТЕЛЕФОНА
  ========================= */

  const phoneInput = document.getElementById("phone")

  if (phoneInput) {
    phoneInput.addEventListener("input", () => {
      let digits = phoneInput.value.replace(/\D/g, "")

      if (digits.startsWith("8")) {
        digits = "7" + digits.slice(1)
      }

      if (!digits.startsWith("7")) {
        digits = "7" + digits
      }

      const part1 = digits.substring(1, 4)
      const part2 = digits.substring(4, 7)
      const part3 = digits.substring(7, 9)
      const part4 = digits.substring(9, 11)

      let formatted = "+7"

      if (part1) formatted += " (" + part1
      if (part2) formatted += ") " + part2
      if (part3) formatted += "-" + part3
      if (part4) formatted += "-" + part4

      phoneInput.value = formatted
    })
  }
})
