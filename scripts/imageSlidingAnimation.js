document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("img1").style.left = "-500px";
    document.getElementById("img2").style.left = "-500px";

});
let position = 0;
let animationRepetingControl = 0;
window.addEventListener("scroll", function(e) {
    imageAnimations();
    position = window.scrollY;
    console.log(position)
});

const imageAnimations = () => {

    const imageSliding = [
        { left: "-500px" },
        { left: "0px" }
    ];

    const imageTiming = {
        duration: 1000,
        iterations: 1,
    }

    if (position > 100 && animationRepetingControl == 0) {
        const image = document.getElementById("img1");
        image.animate(imageSliding, imageTiming);
        document.getElementById("img1").style.left = "0px";
        animationRepetingControl++;
    } else if (position > 500 && animationRepetingControl == 1) {
        const image = document.getElementById("img2");
        image.animate(imageSliding, imageTiming);
        document.getElementById("img2").style.left = "0px";

        animationRepetingControl++;
    }



}