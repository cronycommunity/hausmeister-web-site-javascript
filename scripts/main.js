$(function() {
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 10) {
            $('.navbar').addClass('active');
        } else {
            $('.navbar').removeClass('active');
        }
    });
});

// ========================CURVE THEMA==========================
(function() {
    // Variables
    var $curve = document.getElementById("curve");
    var last_known_scroll_position = 0;
    var defaultCurveValue = 350;
    var curveRate = 3;
    var ticking = false;
    var curveValue;

    // Handle the functionality
    function scrollEvent(scrollPos) {
        if (scrollPos >= 0 && scrollPos < defaultCurveValue) {
            curveValue = defaultCurveValue - parseFloat(scrollPos / curveRate);
            $curve.setAttribute(
                "d",
                "M 800 300 Q 400 " + curveValue + " 0 300 L 0 0 L 800 0 L 800 300 Z"
            );
        }
    }

    // Scroll Listener
    // https://developer.mozilla.org/en-US/docs/Web/Events/scroll
    window.addEventListener("scroll", function(e) {

        asd();

        last_known_scroll_position = window.scrollY;
        console.log(last_known_scroll_position)
        if (!ticking) {
            window.requestAnimationFrame(function() {
                scrollEvent(last_known_scroll_position);
                ticking = false;
            });
        }

        ticking = true;
    });
})();

// =========================================

const asd = () => {

}