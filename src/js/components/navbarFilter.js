document.querySelectorAll("#filterMen").forEach((item) => {
    item.addEventListener("click", function (event) {
        const categoria = event.target.getAttribute("data-categoria");
        localStorage.setItem("category", categoria);
        window.location.href = "/src/pages/shop/men.html";
    });
});
document.querySelectorAll("#filterWomen").forEach((item) => {
    item.addEventListener("click", function (event) {
        const categoria = event.target.getAttribute("data-categoria");
        localStorage.setItem("category", categoria);
        window.location.href = "/src/pages/shop/women.html";
    });
});
document.querySelectorAll("#filterSale").forEach((item) => {
    item.addEventListener("click", function (event) {
        const categoria = event.target.getAttribute("data-categoria");
        localStorage.setItem("category", categoria);
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