const offcanvasRight = document.getElementById("offcanvasRight");
const cart__badge = document.getElementById('cart__badge');
const cart__icon = document.getElementById('cart__icon');
cart__icon.onclick = renderCart
//=======================================================================================
let cart = [];
let products;
//=======================================================================================
fetch("/database/db.json")
    .then((response) => response.json())
    .then((data) => {
        products = data.products;
        displayProducts(products);
        filterShop(products);
        renderCart();
    });
//=======================================================================================
function renderCart() {
    offcanvasRight.innerHTML = "";
    offcanvasRight.innerHTML += `
        <div class="offcanvas-header">
            <h5  id="offcanvasRightLabel">Carrito</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas__card-container" id="container__cart"></div>
        <span id="cart__total"></span>
        <button class="button__checkout">Finalizar Compra</button>
    `;
    
    const buttonCheckout = offcanvasRight.querySelector('.button__checkout');
    buttonCheckout.addEventListener('click', function() {
        window.location.href = '/src/pages/checkout/checkout.html';
    });

    const cart__total = document.getElementById('cart__total');
    const container__cart = document.getElementById("container__cart");
    container__cart.innerHTML = "";
    subTotal = [];
    cart.forEach((product) => {
        const totalPrice = product.quantity * product.price;
        subTotal.push(totalPrice);
        container__cart.innerHTML += `
        <div class="card__cart">
        <button class="card__buttons-remove removeItem" data-id="${product.id}">
            <i class="bi bi-x-lg"></i>
        </button>
        <h4 class="card__title">${product.name}</h4>
        <img src="${product.img}" alt="${product.name}">
        <p class="card__price">$${totalPrice}</p>
            <div class="card__buttons">
                <button class="card__buttons-reduce reduceItem" id="add${product.id}">
                    <i class="bi bi-dash-lg"></i>
                </button>
                <span class="card__buttons-counter">${product.quantity}</span>
                <button class="card__buttons-add addItem" id="reduce${product.id}">
                    <i class="bi bi-plus-lg"></i>
                </button>
            </div>
        </div>
        `;
    });
    total = subTotal.reduce((parameter, product) => parameter + product, 0);
    cart__total.textContent = `Total: $${total}`;
    if (cart != "") {
        let btnAddItem = document.querySelectorAll(`.addItem`);
        let btnReduceItem = document.querySelectorAll(`.reduceItem`);
        let btnRemoveItem = document.querySelectorAll(`.removeItem`);
        btnAddItem.forEach((product) => (product.onclick = addArticle));
        btnReduceItem.forEach((product) => (product.onclick = reduceArticle));
        btnRemoveItem.forEach((button) => {
            button.addEventListener('click', removeArticle);
        });
        localStorage.setItem("userProduct", JSON.stringify(cart));
    } else {
        container__cart.innerHTML += `
            <h4 class="offcanvas__text">Tu carrito está vacío.</h4>
        `;
    }
}
//=======================================================================================
function addToCart(event, products) {
    container__cart.innerText = "";
    let idProducto = Number(extractNumbers(event.target.id));
    if (cart.find((product) => product.id == idProducto)) {
        let index = cart.indexOf(
            cart.find((product) => product.id == idProducto)
        );
        cart[index].quantity++;
    } else {
        let product = products.find((product) => product.id == idProducto);
        if (product) {
            cart.push(product);
            cart[cart.length - 1].quantity = 1;
        }
    }
    renderCart();
    cartBadge();
    shakeIcon();
}
//=======================================================
function extractNumbers(e) {
    let idObtained = "";
    for (i = 0; i < e.length; i++) {
        if (isNaN(e[i]) == false) {
            idObtained = idObtained + e[i];
        }
    }
    return idObtained;
}
//=======================================================
function removeArticle(event) {
    container__cart.innerText = "";
    let idProduct = Number(event.target.dataset.id);
    let remove = cart.findIndex((product) => product.id === idProduct);
    if (remove !== -1) {
        cart.splice(remove, 1);
    }
    if (cart.length === 0) {
        localStorage.clear();
        container__cart.innerText = "";
    }
    renderCart();
    cartBadge();
}
//=======================================================
function reduceArticle(x) {
    container__cart.innerText = "";
    let idProduct = Number(extractNumbers(x.target.id));
    if (cart.find((product) => product.id == idProduct)) {
        let index = cart.indexOf(cart.find((product) => product.id == idProduct));
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        }
    }
    renderCart();
    cartBadge();
    shakeIcon();
}
//=======================================================
function addArticle(x) {
    container__cart.innerText = "";
    let idProducto = Number(extractNumbers(x.target.id));
    if (cart.find((product) => product.id == idProducto)) {
        let index = cart.indexOf(cart.find((product) => product.id == idProducto));
        cart[index].quantity++;
    }
    renderCart();
    cartBadge();
    shakeIcon();
}
//=======================================================
function cartBadge() {
    let totalItems = cart.reduce(function (total, product) {
        return total + product.quantity;
    }, 0);
    cart__badge.innerHTML = totalItems.toString();
}

function shakeIcon() {
    cart__icon.classList.add('jump-shaking');
    cart__badge.classList.add('jump-shaking');
    setTimeout(function () {
        cart__icon.classList.remove('jump-shaking');
        cart__badge.classList.remove('jump-shaking');
    }, 1000);
}
//=======================================================

