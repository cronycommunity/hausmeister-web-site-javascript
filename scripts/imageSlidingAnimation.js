document.addEventListener("DOMContentLoaded", function() {
    const image1 = document.getElementById("img1");
    const image2 = document.getElementById("img2");
    const image3 = document.getElementById("img3");
    image1.style.left = "-1200px";
    image2.style.left = "-1200px";
    image3.style.left = "-1200px";

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

    if (position > 10 && animationRepetingControl == 0) {
        const image = document.getElementById("img1");
        image.animate(imageSliding, imageTiming);
        document.getElementById("img1").style.left = "0px";
        animationRepetingControl++;

    } else if (position > 400 && animationRepetingControl == 1) {
        const image = document.getElementById("img2");
        image.animate(imageSliding, imageTiming);
        document.getElementById("img2").style.left = "0px";
        animationRepetingControl++;

    } else if (position > 800 && animationRepetingControl == 2) {
        const image = document.getElementById("img3");
        image.animate(imageSliding, imageTiming);
        document.getElementById("img3").style.left = "0px";
        animationRepetingControl++;
    }



}