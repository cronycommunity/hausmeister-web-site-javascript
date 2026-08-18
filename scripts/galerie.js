/*
 * Automatische Referenz-Galerie
 * -----------------------------
 * Liest per nginx-Autoindex (JSON) alle Unterordner von images/referenzen/
 * aus und erzeugt daraus Alben. Ein neues Projekt erscheint automatisch,
 * sobald der Ordner mit den Bildern abgelegt wurde.
 */

(() => {
    "use strict";

    const BASIS_PFAD = "images/referenzen/";
    const BILD_ENDUNGEN = /\.(jpe?g|png|webp|avif|gif)$/i;

    /* ------------------------------------------------------------------ */
    /* Hilfsfunktionen                                                     */
    /* ------------------------------------------------------------------ */

    // "01_Badsanierung_Neusaess" -> "Badsanierung Neusaess"
    const ordnerNameZuTitel = (name) =>
        name
            .replace(/^\d+[\s._-]+/, "")
            .replace(/[._-]+/g, " ")
            .trim();

    const verzeichnisLesen = async (pfad) => {
        const antwort = await fetch(pfad, { headers: { Accept: "application/json" } });
        if (!antwort.ok) throw new Error(`${antwort.status} bei ${pfad}`);
        return antwort.json();
    };

    const natuerlichSortieren = (a, b) =>
        a.localeCompare(b, "de", { numeric: true, sensitivity: "base" });

    // Ordner- und Dateinamen stammen zwar aus eigener Hand, koennen aber
    // Sonderzeichen enthalten - deshalb vor der Ausgabe maskieren.
    const maskieren = (text) =>
        String(text).replace(/[&<>"']/g, (z) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
        })[z]);

    /* ------------------------------------------------------------------ */
    /* Daten einlesen                                                      */
    /* ------------------------------------------------------------------ */

    const albumLaden = async (ordner) => {
        const eintraege = await verzeichnisLesen(BASIS_PFAD + encodeURIComponent(ordner) + "/");

        const bilder = eintraege
            .filter((e) => e.type === "file" && BILD_ENDUNGEN.test(e.name))
            .map((e) => e.name)
            .sort(natuerlichSortieren);

        if (bilder.length === 0) return null;

        // Ein "cover*"-Bild wird nach vorne sortiert
        const coverIndex = bilder.findIndex((n) => /^cover/i.test(n));
        if (coverIndex > 0) bilder.unshift(bilder.splice(coverIndex, 1)[0]);

        // Optionale Beschreibung
        let beschreibung = "";
        if (eintraege.some((e) => e.type === "file" && e.name.toLowerCase() === "beschreibung.txt")) {
            try {
                const res = await fetch(BASIS_PFAD + encodeURIComponent(ordner) + "/beschreibung.txt");
                if (res.ok) beschreibung = (await res.text()).split("\n")[0].trim();
            } catch (_) {
                /* Beschreibung ist optional */
            }
        }

        return {
            titel: ordnerNameZuTitel(ordner),
            beschreibung,
            bilder: bilder.map((name) => ({
                url: BASIS_PFAD + encodeURIComponent(ordner) + "/" + encodeURIComponent(name),
                name,
            })),
        };
    };

    const alleAlbenLaden = async () => {
        const eintraege = await verzeichnisLesen(BASIS_PFAD);
        const ordner = eintraege
            .filter((e) => e.type === "directory")
            .map((e) => e.name)
            .sort(natuerlichSortieren);

        const alben = await Promise.all(ordner.map((o) => albumLaden(o).catch(() => null)));
        return alben.filter(Boolean);
    };

    /* ------------------------------------------------------------------ */
    /* Darstellung                                                         */
    /* ------------------------------------------------------------------ */

    const albumKarte = (album, index) => {
        const spalte = document.createElement("div");
        spalte.className = "col-12 col-sm-6 col-lg-4";

        const bildAnzahl = album.bilder.length;
        const titel = maskieren(album.titel);
        spalte.innerHTML = `
            <article class="album-karte h-100" tabindex="0" role="button"
                     aria-label="Album öffnen">
                <div class="album-karte__bild">
                    <img src="${album.bilder[0].url}" alt="Referenzprojekt" loading="lazy" />
                    <span class="album-karte__anzahl">
                        <i class="bi bi-images"></i> ${bildAnzahl}
                    </span>
                </div>
            </article>`;

        const oeffnen = () => lightboxOeffnen(index, 0);
        const karte = spalte.querySelector(".album-karte");
        karte.addEventListener("click", oeffnen);
        karte.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                oeffnen();
            }
        });

        return spalte;
    };

    /* ------------------------------------------------------------------ */
    /* Lightbox                                                            */
    /* ------------------------------------------------------------------ */

    let alben = [];
    let aktuellesAlbum = 0;
    let aktuellesBild = 0;

    const lightbox = () => document.getElementById("lightbox");

    const lightboxAktualisieren = () => {
        const album = alben[aktuellesAlbum];
        const bild = album.bilder[aktuellesBild];
        const box = lightbox();
        box.querySelector(".lightbox__bild").src = bild.url;
        box.querySelector(".lightbox__bild").alt = `Referenz – Bild ${aktuellesBild + 1}`;
        const titelEl = box.querySelector(".lightbox__titel");
        if (titelEl) titelEl.textContent = "";
        box.querySelector(".lightbox__zaehler").textContent =
            `${aktuellesBild + 1} / ${album.bilder.length}`;
        const mehrfach = album.bilder.length > 1;
        box.querySelectorAll(".lightbox__nav").forEach((b) => (b.hidden = !mehrfach));
    };

    const lightboxOeffnen = (albumIndex, bildIndex) => {
        aktuellesAlbum = albumIndex;
        aktuellesBild = bildIndex;
        lightboxAktualisieren();
        lightbox().classList.add("ist-offen");
        document.body.style.overflow = "hidden";
    };

    const lightboxSchliessen = () => {
        lightbox().classList.remove("ist-offen");
        document.body.style.overflow = "";
    };

    const blaettern = (richtung) => {
        const anzahl = alben[aktuellesAlbum].bilder.length;
        aktuellesBild = (aktuellesBild + richtung + anzahl) % anzahl;
        lightboxAktualisieren();
    };

    const lightboxVerdrahten = () => {
        const box = lightbox();
        box.querySelector(".lightbox__schliessen").addEventListener("click", lightboxSchliessen);
        box.querySelector(".lightbox__zurueck").addEventListener("click", () => blaettern(-1));
        box.querySelector(".lightbox__weiter").addEventListener("click", () => blaettern(1));
        box.addEventListener("click", (e) => {
            if (e.target === box) lightboxSchliessen();
        });
        document.addEventListener("keydown", (e) => {
            if (!box.classList.contains("ist-offen")) return;
            if (e.key === "Escape") lightboxSchliessen();
            if (e.key === "ArrowLeft") blaettern(-1);
            if (e.key === "ArrowRight") blaettern(1);
        });

        // Wischgesten auf dem Smartphone
        let startX = null;
        box.addEventListener("touchstart", (e) => (startX = e.changedTouches[0].clientX), { passive: true });
        box.addEventListener("touchend", (e) => {
            if (startX === null) return;
            const diff = e.changedTouches[0].clientX - startX;
            if (Math.abs(diff) > 50) blaettern(diff < 0 ? 1 : -1);
            startX = null;
        }, { passive: true });
    };

    /* ------------------------------------------------------------------ */
    /* Start                                                               */
    /* ------------------------------------------------------------------ */

    const hinweisAnzeigen = (text) => {
        const raster = document.getElementById("galerie-raster");
        raster.innerHTML = `<div class="col-12"><p class="galerie-hinweis">${text}</p></div>`;
    };

    document.addEventListener("DOMContentLoaded", async () => {
        const raster = document.getElementById("galerie-raster");
        if (!raster) return;

        lightboxVerdrahten();

        try {
            alben = await alleAlbenLaden();
        } catch (fehler) {
            console.error("Referenzen konnten nicht geladen werden:", fehler);
            hinweisAnzeigen("Die Referenzen können derzeit nicht geladen werden.");
            return;
        }

        if (alben.length === 0) {
            hinweisAnzeigen("Aktuell sind keine Referenzen hinterlegt.");
            return;
        }

        raster.innerHTML = "";
        alben.forEach((album, i) => raster.appendChild(albumKarte(album, i)));
    });
})();
