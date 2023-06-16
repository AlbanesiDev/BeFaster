ScrollReveal().reveal(".revealImage", {
    distance: '800px',
    opacity: 0,
    easing: "ease-out",
    delay: 100,
    duration: 600,
    interval: 300,
});
window.initializeScrollReveal = function () {
    ScrollReveal().reveal('.revealCard', {
        distance: '300px',
        opacity: 0,
        easing: 'ease-out',
        scale: 0.1,
        duration: 500,
        delay: 200,
    });
};
