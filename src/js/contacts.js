(function () {
var PARTS = ["Kzc=", "OTY1", "MDM4", "NTI=", "NDM="];
function rawPhone() {
return PARTS.map(function (p) { return atob(p); }).join("");
}
function pretty(raw) {
var d = raw.replace(/\D/g, "");
return "+" + d.charAt(0) + " " + d.slice(1, 4) + " " + d.slice(4, 7) + "-" + d.slice(7, 9) + "-" + d.slice(9, 11);
}
function reveal(btn, raw, text) {
var link = document.createElement("a");
link.href = "tel:" + raw;
link.className = btn.className + " is-revealed";
link.innerHTML = btn.innerHTML;
link.setAttribute("aria-label", "Позвонить: " + text);
var slot = link.querySelector("[data-slot]");
if (slot) slot.textContent = text;
btn.replaceWith(link);
return link;
}
document.addEventListener("click", function (e) {
var clicked = e.target.closest ? e.target.closest("[data-reveal='phone']") : null;
if (!clicked) return;
var raw = rawPhone();
var text = pretty(raw);
var focusTarget = null;
Array.prototype.slice.call(document.querySelectorAll("[data-reveal='phone']")).forEach(function (btn) {
var link = reveal(btn, raw, text);
if (btn === clicked) focusTarget = link;
});
if (focusTarget) focusTarget.focus();
});
})();
