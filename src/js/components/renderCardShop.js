fetch("/database/db.json")
    .then((response) => response.json())
    .then((data) => {
        let products = data.products;
        const selectedCategory = localStorage.getItem('category');
        if (selectedCategory) {
            products = products.filter(product => product.category === selectedCategory);
        }
        let currentPage = 1;
        ecommerce(products, currentPage);
    });
//===============================================================================================================================================
function ecommerce(products, currentPage) {
    const cardContainer = document.getElementById("container__products");
    const productsPerPage = 12;
    let cart = [];
    //==========================================================================================================================================
    function showProducts(products, page) {
        const startIndex = (page - 1) * productsPerPage;
        const endIndex = page * productsPerPage;
        const productsToShow = products.slice(startIndex, endIndex);
        cardContainer.innerHTML = "";
        productsToShow.forEach((product) => {
            let productContainer = document.createElement("div");
            productContainer.className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 col-xxl-3";
            const sizeOptions = product.size.map((size) => `<option>${size}</option>`).join('');
            const colorOptions = product.color.map((color) => `<option>${color}</option>`).join('');
            productContainer.innerHTML = `
        <div class="card__container">
            <a href="#"><img class="card__img" src="${product.img}" alt="${product.name}"></a>
            <div class="card__body">
                <h4 class="card__body-title">${product.name}</h4>
                <p class="card__body-price">$${product.price}</p>
            </div>
            <div class="card__buttons">
                <select class="card__buttons-select mb mr" name="productSize" id="productSize-${product.id}" required>
                    <option>Talle</option>
                    ${sizeOptions}
                </select>
                <select class="card__buttons-select mb" name="productColor" id="productColor-${product.id}" required>
                    <option>Color</option>
                    ${colorOptions}
                </select>
            </div>
            <div class="card__footer">
                <button class="card__footer-button">Agregar al carrito</button>
            </div>
        </div>
        `;
            cardContainer.appendChild(productContainer);
        });
        if (localStorage.getItem("userProduct") != null) {
            cart = JSON.parse(localStorage.getItem("userProduct"));
            renderCart();
        } else {
            localStorage.clear();
        }
        if (productsToShow.length === 0) {
            cardContainer.innerHTML += `
            <div id="bg-no-product">
                <p>No product found</p>
            </div>
            `;
        }
    }
    //==========================================================================================================================================
    function createPagination(totalProducts) {
        const paginationContainer = document.getElementById("paginationContainer");
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement("li");
            li.className = "page-item pagination__custom";
            const link = document.createElement("a");
            link.className = "page-link";
            link.href = "#";
            link.innerText = i;
            if (i === currentPage) {
                li.classList.add("active");
            }
            li.appendChild(link);
            paginationContainer.appendChild(li);
        }
    }
    //==========================================================================================================================================
    function renderPage(page) {
        currentPage = page;
        showProducts(products, page);
        createPagination(products.length);
    }
    renderPage(currentPage);
    //==========================================================================================================================================
    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.addEventListener("click", (event) => {
        if (event.target.tagName === "A") {
            const page = parseInt(event.target.innerText);
            renderPage(page);
        }
    });
}