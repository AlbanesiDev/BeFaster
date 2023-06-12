document.querySelectorAll("#filterMen").forEach((item) => {
  item.addEventListener("click", function (event) {
    const categoria = event.target.getAttribute("data-categoria");
    localStorage.setItem("category", categoria);
    localStorage.setItem("gender", "hombre");
    window.location.href = "/src/pages/shop/men.html";
  });
});

document.querySelectorAll("#filterWomen").forEach((item) => {
  item.addEventListener("click", function (event) {
    const categoria = event.target.getAttribute("data-categoria");
    localStorage.setItem("category", categoria);
    localStorage.setItem("gender", "mujer");
    window.location.href = "/src/pages/shop/women.html";
  });
});

document.querySelectorAll("#filterSale").forEach((item) => {
  item.addEventListener("click", function (event) {
    const categoria = event.target.getAttribute("data-categoria");
    localStorage.setItem("sale", categoria);
    window.location.href = "/src/pages/shop/sale.html";
  });
});
//===========================================================================================
if (window.innerWidth < 900) {
  const header = document.querySelector("header");

  document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
      dropdown.addEventListener("show.bs.dropdown", () => {
        header.classList.remove("sticky");
        header.style.position = "relative";
      });
      dropdown.addEventListener("hide.bs.dropdown", () => {
        header.classList.add("relative");
        header.style.position = "sticky";
      });
    });
  });
}
//===========================================================================================
const texts = document.querySelectorAll('.header__top-text');
let index = 0;

function fadeIn(element) {
  element.style.transitionDelay = '0.5s';
  element.style.opacity = '1';
}
function fadeOut(element) {
  element.style.transitionDelay = '0s';
  element.style.opacity = '0';
}
function showNextText() {
  const currentText = texts[index];
  fadeOut(currentText);
  index = (index + 1) % texts.length;
  const nextText = texts[index];
  fadeIn(nextText);
  setTimeout(showNextText, 2400);
}
fadeIn(texts[0]);
setTimeout(showNextText, 2400);