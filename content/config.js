// Dauer der Anzeige links in Sek., bei 0 wird die Anzeige nicht gewechselt.
const duration_links = 20;
// Dauer der Anzeige rechts in Sek., bei 0 wird die Anzeige nicht gewechselt.
const duration_rechts = 30;
// Dauer der Anzeige full_size in Sek., bei 0 wird die Anzeige nicht gewechselt.
const duration_full_size = 15;

// Wenn full_size = 1, dann wird eine Seite für die volle Breite angezeigt. Bei 0 werden links/rechts angezeigt
const full_size = 0;
// Wenn full_size_pages = 2, dann werden 2 Seiten für die volle Breite angezeigt. Bei 3 werden drei Seiten angezeigt.
const full_size_pages = 3;

// Wenn feed_visible = 1, dann wird der RSS-Feed rechts angezeigt. Die Inhalte rechts werden dann ausgeblendet.
const feed_visible = 0;

// Wenn warning_visible = 1, dann wird eine Warnung als Lauftext angezeigt.
const warning_visible = 0;

// Gibt an, in welchen Zeitabständen die Seite neu geladen wird in Sek. (60 = 1 Minute, 300 = 5 Minuten, 600 = 10 Minuten, 1800 = 30 Minuten, 3600 = 1 Stunde)
const location_reload = 300;