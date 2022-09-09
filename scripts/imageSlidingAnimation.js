    // initial position of the images
    document.addEventListener("DOMContentLoaded", () => {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
    });

    ////////////////////////////

    let position = 0;
    let animationRepetingControl = 0;
    window.addEventListener("scroll", function(e) {
        imageAnimations();
        position = window.scrollY;
    });

    const imageAnimations = () => {
        if (position > 10 && animationRepetingControl == 0) {
            img1.style.animation = "slidingAnimation 1.5s linear 1";
            img1.style.transform = "translateX(" + (0) + "%)";
            animationRepetingControl++;

        } else if (position > 400 && animationRepetingControl == 1) {
            img2.style.animation = "slidingAnimation 1.5s linear 1";
            img2.style.transform = "translateX(" + (0) + "%)";
            animationRepetingControl++;

        } else if (position > 800 && animationRepetingControl == 2) {
            img3.style.animation = "slidingAnimation 1.5s linear 1";
            img3.style.transform = "translateX(" + (0) + "%)";
            animationRepetingControl++;
        }
    }