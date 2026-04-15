/* ----------------------------------------------------
   SALLE DES ÉCHOS — CONSTELLATION + SONS + RECHERCHE
---------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------------------------------
  // 1. Récupération des contenus depuis Jekyll (5 collections)
  // ----------------------------------------------------

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

  // ----------------------------------------------------
  // 2. Conteneurs
  // ----------------------------------------------------

  const constellation = document.getElementById("constellation-echos");
  const barreResonances = document.querySelector(".recherches-echos");
  const messageEchos = document.getElementById("message-echos");

  // ----------------------------------------------------
  // 3. Fonctions utilitaires
  // ----------------------------------------------------

  function cacher(selector) {
    document.querySelector(selector).classList.add("hidden");
  }

  function montrer(selector) {
    document.querySelector(selector).classList.remove("hidden");
  }

  function viderConstellation() {
    constellation.innerHTML = "";
    constellation.classList.remove("visible");
  }

  // ----------------------------------------------------
  // 4. État initial
  // ----------------------------------------------------

  cacher(".recherches-echos");
  viderConstellation();
  messageEchos.classList.add("hidden");

  // ----------------------------------------------------
  // 5. REMPLISSAGE DES MENUS ANNÉE / MOIS
  // ----------------------------------------------------

  function remplirMenus() {
    const selectAnnee = document.getElementById("annee");
    const selectMois = document.getElementById("mois");

    console.log("annee =", selectAnnee);
    console.log("mois =", selectMois);

    // Extraire toutes les années disponibles
    const annees = [...new Set(
      echos.map(e => new Date(e.date).getFullYear())
    )].sort((a, b) => b - a);

    // Remplir Année
    selectAnnee.innerHTML = '<option value="">—</option>';
    annees.forEach(annee => {
      const opt = document.createElement("option");
      opt.value = annee;
      opt.textContent = annee;
      selectAnnee.appendChild(opt);
    });

    // Quand l'année change → remplir les mois
    selectAnnee.addEventListener("change", () => {
      const anneeChoisie = selectAnnee.value;

      if (!anneeChoisie) {
        selectMois.innerHTML = '<option value="">—</option>';
        return;
      }

      const moisDisponibles = [...new Set(
        echos
          .filter(e => new Date(e.date).getFullYear() == anneeChoisie)
          .map(e => new Date(e.date).getMonth() + 1)
      )].sort((a, b) => b - a);

      selectMois.innerHTML = '<option value="">—</option>';
      moisDisponibles.forEach(mois => {
        const opt = document.createElement("option");
        opt.value = mois;
        opt.textContent = mois.toString().padStart(2, "0");
        selectMois.appendChild(opt);
      });
    });
  }

  remplirMenus();

  // ----------------------------------------------------
  // 6. FILTRAGE TEMPOREL
  // ----------------------------------------------------

  function estEligibleTroisMois(dateStr) {
    const dateArticle = new Date(dateStr);
    const maintenant = new Date();
    const diffMs = maintenant - dateArticle;
    const diffMois = diffMs / (1000 * 60 * 60 * 24 * 30);
    return diffMois >= 3;
  }

  function filtrerParDate(annee, mois) {
    return echos.filter(echo => {
      // if (!estEligibleTroisMois(echo.date)) return false;

      const d = new Date(echo.date);
      const echoAnnee = d.getFullYear();
      const echoMois = d.getMonth() + 1;

      return echoAnnee == annee && echoMois == mois;
    });
  }

  // ----------------------------------------------------
  // 7. Écoute des changements Année/Mois
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

    if (!anneeChoisie || !moisChoisi) {
      viderConstellation();
      cacher(".recherches-echos");
      messageEchos.classList.add("hidden");
      messageEchos.classList.remove("visible");
      return;
    }

    const articlesFiltres = filtrerParDate(anneeChoisie, moisChoisi);

    if (articlesFiltres.length > 0) {
      afficherConstellation(articlesFiltres);

      setTimeout(() => {
        constellation.classList.add("visible");
      }, 10);

      montrer(".recherches-echos");

      messageEchos.classList.add("hidden");
      messageEchos.classList.remove("visible");

    } else {
      viderConstellation();
      cacher(".recherches-echos");

      messageEchos.classList.remove("hidden");
      setTimeout(() => {
        messageEchos.classList.add("visible");
      }, 10);
    }
  });

  // ----------------------------------------------------
  // 8. Affichage de la constellation (temporaire)
  // ----------------------------------------------------

  function afficherConstellation(liste) {
    viderConstellation();

    liste.forEach(echo => {
      const point = document.createElement("div");
      point.classList.add("point-echo");

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
  // 9. Sons
  // ----------------------------------------------------

  function jouerSon(slug) {
    const audio = document.getElementById("son-" + slug);
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  }

  // ----------------------------------------------------
  // 10. Recherche
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
  // 11. Connexion aux champs de recherche
  // ----------------------------------------------------

  const champResonance = document.querySelector(".champ-resonance");
  const champAppel = document.querySelector(".champ-appel");

  champResonance.addEventListener("input", e => {
    filtrerEchos(e.target.value);
  });

  champAppel.addEventListener("input", e => {
    filtrerEchos(e.target.value);
  });

});
