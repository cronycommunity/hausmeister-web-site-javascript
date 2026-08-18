/*
 * Allgemeine Seitenfunktionen:
 * - Jahreszahl in der Fußzeile
 * - sanftes Einblenden der Abschnitte beim Scrollen
 * - mobiles Menü nach Klick auf einen Link schließen
 */

document.addEventListener("DOMContentLoaded", () => {
    // Aktuelles Jahr in der Fußzeile
    const jahr = document.getElementById("jahr");
    if (jahr) jahr.textContent = new Date().getFullYear();

    // Einblenden beim Scrollen
    const elemente = document.querySelectorAll(
        ".leistung, .album-karte, .zitat, .band-slogans .col-md-4"
    );
    elemente.forEach((el) => el.classList.add("einblenden"));

    if ("IntersectionObserver" in window) {
        const beobachter = new IntersectionObserver(
            (eintraege) => {
                eintraege.forEach((eintrag) => {
                    if (eintrag.isIntersecting) {
                        eintrag.target.classList.add("sichtbar");
                        beobachter.unobserve(eintrag.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        elemente.forEach((el) => beobachter.observe(el));

        // Nachgeladene Galerie-Karten ebenfalls einblenden
        const raster = document.getElementById("galerie-raster");
        if (raster) {
            new MutationObserver(() => {
                raster.querySelectorAll(".album-karte:not(.einblenden)").forEach((el) => {
                    el.classList.add("einblenden");
                    beobachter.observe(el);
                });
            }).observe(raster, { childList: true, subtree: true });
        }
    } else {
        elemente.forEach((el) => el.classList.add("sichtbar"));
    }

    // Mobiles Menü nach Klick schließen
    const menue = document.getElementById("hauptmenue");
    if (menue) {
        menue.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                if (menue.classList.contains("show")) {
                    bootstrap.Collapse.getOrCreateInstance(menue).hide();
                }
            });
        });
    }
});
