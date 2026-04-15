/* ----------------------------------------------------
   ÉCHOS — CONSTELLATION + SONS + RECHERCHE
---------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------------------------------
  // 1. Récupération des contenus depuis Jekyll
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
  const barreFiltres = document.querySelector(".barre-filtres");
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

  cacher(".barre-filtres");
  viderConstellation();
  messageEchos.classList.add("hidden");

  // ----------------------------------------------------
  // 5. REMPLISSAGE DES MENUS ANNÉE / MOIS
  // ----------------------------------------------------

  function remplirMenus() {
    const selectAnnee = document.getElementById("annee");
    const selectMois = document.getElementById("mois");

    const annees = [...new Set(
      echos.map(e => new Date(e.date).getFullYear())
    )].sort((a, b) => b - a);

    selectAnnee.innerHTML = '<option value="">—</option>';
    annees.forEach(annee => {
      const opt = document.createElement("option");
      opt.value = annee;
      opt.textContent = annee;
      selectAnnee.appendChild(opt);
    });

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

  function filtrerParDate(annee, mois) {
    return echos.filter(echo => {
      const d = new Date(echo.date);
      return d.getFullYear() == annee && (d.getMonth() + 1) == mois;
    });
  }

  // ----------------------------------------------------
  // 7. Écoute des changements Année/Mois
  // ----------------------------------------------------

  function onChangeAnneeOuMois(callback) {
    document.getElementById("annee").addEventListener("change", callback);
    document.getElementById("mois").addEventListener("change", callback);
  }

  onChangeAnneeOuMois(() => {
    const anneeChoisie = document.getElementById("annee").value;
    const moisChoisi = document.getElementById("mois").value;

    if (!anneeChoisie || !moisChoisi) {
      viderConstellation();
      cacher(".barre-filtres");
      messageEchos.classList.add("hidden");
      return;
    }

    const articlesFiltres = filtrerParDate(anneeChoisie, moisChoisi);

    if (articlesFiltres.length > 0) {
      afficherConstellation(articlesFiltres);

      setTimeout(() => {
        constellation.classList.add("visible");
      }, 10);

      montrer(".barre-filtres");
      messageEchos.classList.add("hidden");

    } else {
      viderConstellation();
      cacher(".barre-filtres");

      messageEchos.classList.remove("hidden");
      setTimeout(() => {
        messageEchos.classList.add("visible");
      }, 10);
    }
  });

  // ----------------------------------------------------
  // 8. Affichage de la constellation
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

  document.querySelector(".champ-resonance")
    .addEventListener("input", e => filtrerEchos(e.target.value));

  document.querySelector(".champ-appel")
    .addEventListener("input", e => filtrerEchos(e.target.value));

});
