// server.mjs
// where your node app starts
// init project
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { configDotenv } from "dotenv";
configDotenv();
import express from 'express';
import multiparty from 'multiparty';
import bodyParser from 'body-parser';
import device from 'express-device';
import path from 'path';
import matter from 'gray-matter';
import markdownIt from 'markdown-it';
import cors from 'cors';
const app = express();
import fs from 'fs';
import { Easy } from 'easy-feed';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Definition des Blogs
app.use(cors());
app.set("view engine", "ejs");

//Alle Seiten auf HTTPS umleiten.
function checkHttps(req, res, next) {
  // protocol check, if http, redirect to https

  if (req.get("X-Forwarded-Proto").indexOf("https") != -1) {
    return next();
  } else {
    res.redirect("https://" + req.hostname + req.url);
  }
}
app.all("*", checkHttps);

const appBasePath = process.env.APP_BASE_PATH || '/'; // Default zu '/' für Entwicklung
let dynamicBasePath = process.env.APP_BASE_PATH || '/';

// Middleware zur dynamischen Bestimmung des Basispfades
app.use((req, res, next) => {
    let base = process.env.APP_BASE_PATH; // Starten mit dem Produktions-Pfad (oder undefined)

    // Überschreibe, falls ein Proxy-Prefix Header vorhanden ist (für Preview-Umgebungen)
    const previewPrefix = req.headers['x-forwarded-prefix'] || req.headers['x-original-uri-prefix']; 
    if (previewPrefix) {
        base = previewPrefix.endsWith('/') ? previewPrefix : previewPrefix + '/';
    }

    // Wenn immer noch undefined, setze auf Standard-Root
    if (!base) {
        base = '/'; 
    }

    req.appBasePath = base; // Setze den endgültigen Basispfad am Request-Objekt
    next();
});

// Die statischen Seiten in public und content werden als "statisch" definiert. So können Sie direkt adressiert werden.
app.use(express.static("public"));
//app.use(appBasePath, express.static(path.join(__dirname, "public")));
//app.use(appBasePath + 'media', express.static(path.join(__dirname, 'public/media')));
app.use("/media", express.static(path.join(__dirname, "content/media")));
app.use(express.static("content"));
//app.use(appBasePath, express.static(path.join(__dirname, "content")));
app.use(express.static("content/cms"));
//app.use(appBasePath, express.static(path.join(__dirname, "content/cms")));
app.use(express.static(path.join(__dirname,"media")));
//app.use(appBasePath, express.static(path.join(__dirname, 'public/media')));


// Generierung des Feeds - DIESER TEIL WIRD JETZT IN EINE ASYNC FUNKTION VERSCHOBEN!
const easy = new Easy({
  rss: [{ source: 'Wired', url: process.env.feed_url }],
  category: 'Top-News',
  locale: 'de',
  page: 0,
  limit: 4
});

// **START DER KRITISCHEN ÄNDERUNG**
// Wir definieren eine asynchrone Funktion, die den Feed holt und dann den Server startet
async function startApplication() {
  const feed = await easy.getFeed(); // Das await ist jetzt in einer async-Funktion!

  console.log(feed); // Dieser Log erscheint, NACHDEM der Feed geladen wurde

  // Deine Routen, die den Feed verwenden, bleiben hier
  app.get("/", async (request, response) => {
    app.set("views", path.join(__dirname, "views"));
    try {
      response.render("index", {
        feed: feed,
        appBasePath: request.appBasePath
      });  
    } catch (error) {
      console.error("Error fetching or rendering feed:", error);
      response.status(500).send("Error fetching feed");
    }
  });

  app.get("/index", async (request, response) => {
    app.set("views", path.join(__dirname, "views"));
    try {
      response.render("index", {
        feed: feed,
        appBasePath: request.appBasePath
      });
    } catch (error) {
      console.error("Error fetching or rendering feed:", error);
      response.status(500).send("Error fetching feed");
    }
  });

  // listen for requests :)
  // Der Server startet erst, NACHDEM der Feed geladen wurde
  var listener = app.listen(process.env.PORT, () => {
    console.log(`Your app is listening on port ${listener.address().port}`);
  });
}

// **ENDE DER KRITISCHEN ÄNDERUNG**

// Die asynchrone Funktion aufrufen, um die Anwendung zu starten
startApplication();