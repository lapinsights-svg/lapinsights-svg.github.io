/* ----------------------------------------------------
   SALLE DES ÉCHOS — CONSTELLATION + SONS + RECHERCHE
---------------------------------------------------- */

// 1. Récupération des contenus depuis Jekyll (5 collections)
const echos = [
  {% assign echos = site.actualites 
    | concat: site.creations 
    | concat: site.idees 
    | concat: site.spiritualite
    | concat: site.passe %}

  {% for item in echos %}
    {
      title: "{{ item.title | escape }}",
      url: "{{ item.url | relative_url }}",
      slug: "{{ item.slug }}",
      excerpt: "{{ item.excerpt | strip_newlines | escape }}",
      sound: "/sons/{{ item.slug }}.mp3",
      date: "{{ item.date | date: '%Y-%m-%d' }}",
      collection: "{{ item.collection }}"
    },
  {% endfor %}
];

// 2. Conteneurs
const constellation = document.getElementById("constellation-echos");
const barreResonances = document.querySelector(".recherches-echos");

// 3. Fonctions utilitaires
function cacher(selector) {
  document.querySelector(selector).classList.add("hidden");
}

function montrer(selector) {
  document.querySelector(selector).classList.remove("hidden");
}

function viderConstellation() {
  constellation.innerHTML = "";
}

// 4. État initial
cacher(".recherches-echos");
viderConstellation();

// ----------------------------------------------------
// 5. FILTRAGE TEMPOREL
// ----------------------------------------------------

// Vérifie si un article a plus de 3 mois
function estEligibleTroisMois(dateStr) {
  const dateArticle = new Date(dateStr);
  const maintenant = new Date();

  const diffMs = maintenant - dateArticle;
  const diffMois = diffMs / (1000 * 60 * 60 * 24 * 30);

  return diffMois >= 3;
}

// Filtre par année + mois + règle des 3 mois
function filtrerParDate(annee, mois) {
  return echos.filter(echo => {
    if (!estEligibleTroisMois(echo.date)) return false;

    const d = new Date(echo.date);
    const echoAnnee = d.getFullYear();
    const echoMois = d.getMonth() + 1; // 0 → janvier

    return echoAnnee == annee && echoMois == mois;
  });
}

// ----------------------------------------------------
// 6. Écoute des changements Année/Mois
// ----------------------------------------------------

function onChangeAnneeOuMois(callback) {
  const annee = document.getElementById("annee");
  const mois = document.getElementById("mois");

  annee.addEventListener("change", callback);
  mois.addEventListener("change", callback);
}

onChangeAnneeOuMois(() => {
  const anneeChoisie = document.getElementById("annee").value;
  const moisChoisi = document.getElementById("mois").value;

  // Si l’un des deux n’est pas choisi → on ne fait rien
  if (!anneeChoisie || !moisChoisi) {
    viderConstellation();
    cacher(".recherches-echos");
    return;
  }

  const articlesFiltres = filtrerParDate(anneeChoisie, moisChoisi);

  if (articlesFiltres.length > 0) {
    afficherConstellation(articlesFiltres);
    montrer(".recherches-echos");
  } else {
    viderConstellation();
    cacher(".recherches-echos");
  }
});

// ----------------------------------------------------
// 7. Affichage de la constellation (temporaire)
// ----------------------------------------------------

function afficherConstellation(liste) {
  viderConstellation();

  liste.forEach(echo => {
    const point = document.createElement("div");
    point.classList.add("point-echo");

    // Position aléatoire (sera remplacée par les constellations)
    point.style.top = Math.random() * 90 + "%";
    point.style.left = Math.random() * 90 + "%";

    point.dataset.slug = echo.slug;

    point.addEventListener("click", () => {
      window.location.href = echo.url;
    });

    point.addEventListener("mouseenter", () => {
      jouerSon(echo.slug);
    });

    constellation.appendChild(point);
  });
}

// ----------------------------------------------------
// 8. Sons
// ----------------------------------------------------

function jouerSon(slug) {
  const audio = document.getElementById("son-" + slug);
  if (audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// ----------------------------------------------------
// 9. Recherche
// ----------------------------------------------------

function filtrerEchos(terme) {
  const points = document.querySelectorAll(".point-echo");

  points.forEach(point => {
    const slug = point.dataset.slug;
    const echo = echos.find(e => e.slug === slug);

    if (!terme) {
      point.classList.remove("son-actif");
      return;
    }

    const match =
      echo.title.toLowerCase().includes(terme.toLowerCase()) ||
      echo.excerpt.toLowerCase().includes(terme.toLowerCase());

    if (match) {
      point.classList.add("son-actif");
      jouerSon(echo.slug);
    } else {
      point.classList.remove("son-actif");
    }
  });
}

// ----------------------------------------------------
// 10. Connexion aux champs de recherche
// ----------------------------------------------------

const champResonance = document.querySelector(".champ-resonance");
const champAppel = document.querySelector(".champ-appel");

champResonance.addEventListener("input", e => {
  filtrerEchos(e.target.value);
});

champAppel.addEventListener("input", e => {
  filtrerEchos(e.target.value);
});
