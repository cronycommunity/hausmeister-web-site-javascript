    let position = 0;
    let animationRepetingControl = 0;
    window.addEventListener("scroll", function(e) {
        imageAnimations();
        position = window.scrollY;
    });

    const imageAnimations = () => {
        if (position > 10 && animationRepetingControl == 0) {
            document.getElementById("img1").animate([
                // keyframes
                { transform: 'translateX(-1200px)' },
                { transform: 'translateX(0px)' }
            ], {
                // timing options
                duration: 1500,
                iterations: 1
            });
            animationRepetingControl++;

        } else if (position > 400 && animationRepetingControl == 1) {
            document.getElementById("img2").animate([
                // keyframes
                { transform: 'translateX(-1200px)' },
                { transform: 'translateX(0px)' }
            ], {
                // timing options
                duration: 1500,
                iterations: 1
            });
            animationRepetingControl++;

        } else if (position > 800 && animationRepetingControl == 2) {
            document.getElementById("img3").animate([
                // keyframes
                { transform: 'translateX(-1200px)' },
                { transform: 'translateX(0px)' }
            ], {
                // timing options
                duration: 1500,
                iterations: 1
            });
            animationRepetingControl++;
        }
    }