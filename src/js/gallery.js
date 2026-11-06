(function () {
var dialog = document.getElementById("lightbox");
var shots = Array.prototype.slice.call(document.querySelectorAll(".work .shot"));
if (!dialog || !shots.length || typeof dialog.showModal !== "function") return;
var img = dialog.querySelector("img");
var caption = dialog.querySelector("p");
var current = 0;
function show(i) {
current = (i + shots.length) % shots.length;
var src = shots[current].querySelector("img");
var fig = shots[current].closest(".work");
img.src = src.currentSrc || src.src;
img.alt = src.alt;
caption.textContent = fig.dataset.n + " / " + String(shots.length).padStart(2, "0") +
" — " + fig.querySelector("figcaption").textContent;
}
shots.forEach(function (btn, i) {
btn.addEventListener("click", function () {
show(i);
dialog.showModal();
});
});
dialog.querySelector(".lb-close").addEventListener("click", function () { dialog.close(); });
dialog.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
dialog.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });
dialog.addEventListener("click", function (e) {
if (e.target === dialog) dialog.close();
});
dialog.addEventListener("keydown", function (e) {
if (e.key === "ArrowLeft") show(current - 1);
if (e.key === "ArrowRight") show(current + 1);
});
})();
