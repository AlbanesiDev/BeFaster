const contenedorCarrito = document.getElementById("contenedor_carrito");



let botonFinalizar = document.getElementById("RealizarPago");
botonFinalizar.addEventListener("click", finalizarCompra);

function finalizarCompra() {
    Swal.fire({
        title: "¡Gracias Por Su Compra!",
        confirmButtonColor: "#292b2c",
        backdrop: `
    rgba(0,0,0,0.5)
    `,
    }).then((result) => {
        if (result.isConfirmed) {
            window.location = "/index.html"
            CompraFinalizada();
        }
    });
}

const audio = new Audio("/images/Success.mp3");
botonFinalizar.addEventListener("click", () => {
    audio.play();
});

function CompraFinalizada() {
    localStorage.clear();
    carrito = [];
    contenedorCarrito.innerText = "";
}

