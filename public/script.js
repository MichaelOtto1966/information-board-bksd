
function countdown_links (counter_links) {

  var l1 = document.getElementById('links_1');
  var l2 = document.getElementById('links_2');
   
  if (counter_links == undefined) {
    // Startwert
    counter_links = duration_links;
  }
  if (duration_links == 0) {
    counter_links = 1000;
  };
  if (counter_links > 0) {
      counter_links--;
      // Funktion verzögert aufrufen
      var timeout = window.setTimeout('countdown_links(' + counter_links + ')', 1000);
  } else {
      if (l1.classList.contains('fade-out')) {
          l1.classList.remove('fade-out');
          l1.classList.add('fade-in');
          // l1.style.display = "block";
          l2.classList.remove('fade-in');
          l2.classList.add('fade-out');
          // l2.style.display = "none";
      } else {
          l1.classList.remove('fade-in');
          l1.classList.add('fade-out');
          // l1.style.display = "none";
          l2.classList.remove('fade-out');
          l2.classList.add('fade-in');
          // l2.style.display = "block";
   }
      // Startwert
    var timeout = window.setTimeout('countdown_links(' + duration_links + ')', 1000);
  }
}

function countdown_rechts (counter_rechts) {

  var r1 = document.getElementById('rechts_1');
  var r2 = document.getElementById('rechts_2');
  var rss_feed = document.getElementById('rss-feed');
  
  if (counter_rechts == undefined) {
    // Startwert
    counter_rechts = duration_rechts;
  }
  if (feed_visible == 1) {
    r1.style.display = "none";
    r2.style.display = "none";
    rss_feed.style.display = "block";
  } else {

    rss_feed.style.display = "none";
    //alert(li);
    if (duration_rechts == 0) {
      counter_rechts = 1000;
    };
    
    if (counter_rechts > 0) {
      counter_rechts--;
      // Funktion verzögert aufrufen
      var timeout = window.setTimeout('countdown_rechts(' + counter_rechts + ')', 1000);
    } else {
      if (r1.classList.contains('fade-out')) {
          r1.classList.remove('fade-out');
          r1.classList.add('fade-in');
          // r1.style.display = "block";
          r2.classList.remove('fade-in');
          r2.classList.add('fade-out');
          // r2.style.display = "none";
      } else {
          r1.classList.remove('fade-in');
          r1.classList.add('fade-out');
          // r1.style.display = "none";
          r2.classList.remove('fade-out');
          r2.classList.add('fade-in');
          // r2.style.display = "block";
      }
    // Startwert
    var timeout = window.setTimeout('countdown_rechts(' + duration_rechts + ')', 1000);
    }
  }
}

function countdown_full_size (counter_full_size) {

  var f1 = document.getElementById('full_size_1');
  var f2 = document.getElementById('full_size_2');
  var f3 = document.getElementById('full_size_3');

  if (counter_full_size == undefined) {
    // Startwert
    counter_full_size = duration_full_size;
  }
  if (duration_full_size == 0) {
    counter_full_size = 1000;
  };
  if (counter_full_size > 0) {
      counter_full_size--;
      // Funktion verzögert aufrufen
      var timeout = window.setTimeout('countdown_full_size(' + counter_full_size + ')', 1000);
  } else {
      if (full_size_pages == 2) {
        if (f3.classList.contains('fade-in_full')) {
            f3.classList.remove('fade-in_full');
            f3.classList.add('fade-out_full');
        }
        if (f1.classList.contains('fade-out_full')) {
            f1.classList.remove('fade-out_full');
            f1.classList.add('fade-in_full');
            f2.classList.remove('fade-in_full');
            f2.classList.add('fade-out_full');
        } else {
            f1.classList.remove('fade-in_full');
            f1.classList.add('fade-out_full');
            f2.classList.remove('fade-out_full');
            f2.classList.add('fade-in_full');
        }
      } else {
          if (f1.classList.contains('fade-in_full')) {
            f1.classList.remove('fade-in_full');
            f1.classList.add('fade-out_full');
            f2.classList.add('fade-in_full');
            f2.classList.remove('fade-out_full');
        } else if (f2.classList.contains('fade-in_full')) {
            f2.classList.remove('fade-in_full');
            f2.classList.add('fade-out_full');
            f3.classList.remove('fade-out_full');
            f3.classList.add('fade-in_full');
        } else if (f3.classList.contains('fade-in_full')) {
            f3.classList.remove('fade-in_full');
            f3.classList.add('fade-out_full');
            f1.classList.remove('fade-out_full');
            f1.classList.add('fade-in_full');
        }
      }
     // Startwert
    var timeout = window.setTimeout('countdown_full_size(' + duration_full_size + ')', 1000);
  }
}

// Countdown anstoßen
const v_full_size_table = document.getElementById('full_size_table');
const v_left_right_table = document.getElementById('left_right_table');
  
  if (full_size == 0) {
     v_full_size_table.style.display = "none";
     v_left_right_table.style.display = "table";
     countdown_links(duration_links);
     countdown_rechts(duration_rechts);
  } else {
    v_left_right_table.style.display = "none";
    v_full_size_table.style.display = "table";
    countdown_full_size(duration_full_size);
  }



/* ------------------------------------------ */
/* -- Inhalte laden                           */
/* -- ---------------- ---------------------- */
   function load_content(bereich, page) {
      let obj1 = document.getElementById(bereich);   
       $(obj1).load('/' + page, function () {
      });
    }
/* ------------------------------------------ */
/* -- Uhrzeit generieren und anzeigen lassen  */
/* -- ---------------- ---------------------- */

const dayName = (date, locale) =>
  date.toLocaleDateString(locale, { weekday: "long" });

function show_date(){
var akt_date = new Date();
akt_date = akt_date.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
akt_date = dayName(new Date()) + " - " + akt_date.toLocaleString('de-DE', { timeZone: 'Europe/Berlin' });
document.getElementById('clock').innerHTML = '<p class="header-title">' + akt_date + '</p>';
var timeout_date = window.setTimeout('show_date()', 1000);
}
// Datum anstoßen
show_date()

/* ------------------------------------------ */
/* -- Die Warnung als Lauftext anzeigen lassen */
/* -- ---------------- ---------------------- */

var warning = document.getElementById('warnungsbereich');

if (warning_visible == 1) {
    warning.style.display = "block";
} else {
  warning.style.display = "none";
}
/* ------------------------------------------              */
/* -- In regelmäßigen Abständen wird die Seite neu geladen */
/* -- ---------------- ----------------------              */

var location_reload_ms = location_reload * 1000;

setInterval(function() {
  location.reload(true); // Läd die Seite vom Server
}, location_reload_ms);