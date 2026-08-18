# Referenz-Galerie – so fügen Sie ein neues Projekt hinzu

Jeder **Unterordner** in diesem Verzeichnis wird auf der Webseite automatisch
als eigenes Album angezeigt. Am Code muss **nichts** geändert werden.

## Ablauf

1. Neuen Ordner hier anlegen, z. B. `Trockenbau-Augsburg/`
2. Fotos hineinlegen (`.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`)
3. Änderung ins Git-Repository einchecken
4. Jenkins-Job starten → `docker build` → `docker run`

Nach dem Deployment ist das neue Album ohne weitere Anpassung sichtbar.
Die Bilder liegen im Docker-Image (`COPY` im Dockerfile); nginx liest das
Verzeichnis zur Laufzeit per Autoindex aus.

## Album-Titel

Der Ordnername wird zum Titel. Bindestriche und Unterstriche werden zu
Leerzeichen, eine führende Zahl dient nur der Sortierung:

| Ordnername                      | Angezeigter Titel          |
|---------------------------------|----------------------------|
| `Trockenbau-Augsburg`           | Trockenbau Augsburg        |
| `01_Badsanierung_Neusaess`      | Badsanierung Neusaess      |

Die Alben werden alphabetisch sortiert – mit `01_`, `02_` … bestimmen Sie
die Reihenfolge selbst.

## Optionale Beschreibung

Eine Datei `beschreibung.txt` im Projektordner anlegen: Die erste Zeile wird
als Untertitel des Albums angezeigt.

## Titelbild

Standardmäßig ist das erste Bild (alphabetisch) das Titelbild. Eine Datei,
die mit `cover` beginnt (z. B. `cover.jpg`), wird bevorzugt.

## Hinweise

* Ordnernamen ohne Umlaute halten (`Neusaess` statt `Neusäß`) – das erspart
  Probleme mit unterschiedlichen Dateisystemen.
* Fotos vor dem Einchecken auf eine sinnvolle Größe bringen
  (Richtwert: max. 1920 px Breite, ca. 300–500 KB pro Bild).
* Ist dieses Verzeichnis leer, zeigt die Seite den Hinweis
  „Aktuell sind keine Referenzen hinterlegt.“
