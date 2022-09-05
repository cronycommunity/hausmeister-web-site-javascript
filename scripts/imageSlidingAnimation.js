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

    if (position > 0 && animationRepetingControl == 0) {
        const image = document.getElementById("img1");
        image.animate(imageSliding, imageTiming);
        animationRepetingControl++;
    }



}