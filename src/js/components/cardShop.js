const container__products = document.getElementById("container__products");
//=======================================================================================
function displayProducts(products) {
    container__products.innerHTML = "";
    products.forEach((products) => {
        let productContainer = document.createElement("div");
        productContainer.className = "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 col-xxl-3";
        const sizeOptions = products.size.map((size) => `<option>${size}</option>`).join('');
        const colorOptions = products.color.map((color) => `<option>${color}</option>`).join('');
        productContainer.innerHTML = `
            <div class="card__container revealCard">
                <a href="#"><img class="card__img" src="${products.img}" alt="${products.name}"></a>
                <div class="card__body">
                    <h4 class="card__body-title">${products.name}</h4>
                    <p class="card__body-price">$${products.price}</p>
                </div>
                <div class="card__buttons">
                    <select class="card__buttons-select mb mr" name="productSize" id="productSize-${products.id}" required>
                        <option>Talle</option>
                        ${sizeOptions}
                    </select>
                    <select class="card__buttons-select mb" name="productColor" id="productColor-${products.id}" required>
                        <option>Color</option>
                        ${colorOptions}
                    </select>
                </div>
                <div class="card__footer">
                    <button class="card__footer-button addToCartButton" id="${products.id}">Agregar al carrito</button>
                </div>
            </div>
            `;
        container__products.appendChild(productContainer);
        initializeScrollReveal();
    });
    //=======================================================================================
    const addToCartButton = document.querySelectorAll(`.addToCartButton`);
    addToCartButton.forEach((producto) => (producto.onclick = (event) => addToCart(event, products)));
    //=======================================================================================
    if (localStorage.getItem("userProduct") != null) {
        cart = JSON.parse(localStorage.getItem("userProduct"));
        priceFilter = JSON.parse(localStorage.getItem("userProduct"));
        renderCart();
        cartBadge();
    } else {
        localStorage.clear();
        renderCart();
        cartBadge();
    }
    if (container__products.innerHTML == "") {
        container__products.innerHTML += `
            <div id="bg-no-product">
            <p>No se ha encontrado este producto</p>
            </div>
            `;
    }
}    