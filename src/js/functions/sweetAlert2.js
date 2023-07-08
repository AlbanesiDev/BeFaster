//===============================================================================
// Newsletter
//===============================================================================
const newsletterEmailInput = document.getElementById('newsletterEmailInput');
const newsletterEmailButton = document.getElementById('newsletterEmail');
newsletterEmailButton.addEventListener("click", newsletterEmailSwal);

newsletterEmailInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        newsletterEmailSwal();
    }
});

function newsletterEmailSwal() {
    const email = newsletterEmailInput.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        Swal.fire({
            title: '¡El campo del mail se encuentra vacío!',
            icon: 'error',  
            confirmButtonColor: '#212121',
        });
    } else if (!emailRegex.test(email)) {
        Swal.fire({
            title: '¡El mail ingresado es inválido!',
            text: 'Por favor, ingresa un correo electrónico válido.',
            icon: 'error',
            confirmButtonColor: '#212121',
        });
    } else {
        Swal.fire({
            title: '¡Gracias por suscribirte!',
            text: 'A partir de ahora vas a recibir nuestras novedades en tu email.',
            icon: 'success',
            confirmButtonColor: '#212121',
        });
    }
}

//===============================================================================
// Checkout
//===============================================================================
function checkout() {
    Swal.fire({

    })
}