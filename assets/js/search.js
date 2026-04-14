document.addEventListener("DOMContentLoaded", function () {
  const input = document.getElementById("search-input");
  if (!input) return; // Pas de recherche si pas sur la page d’accueil

  // Création du conteneur des résultats
  const resultsBox = document.createElement("div");
  resultsBox.id = "search-results";
  input.parentNode.appendChild(resultsBox);

  // Masquer les résultats au départ
  resultsBox.style.display = "none";

  // Désactiver complètement la recherche sur GSM
  if (window.innerWidth < 768) {
    input.style.display = "none";
    return;
  }

  fetch("/search.json")
    .then(response => response.json())
    .then(data => {
      input.addEventListener("input", function () {
        const query = this.value.toLowerCase().trim();

        // Réinitialiser
        resultsBox.innerHTML = "";
        resultsBox.style.display = "none";

        // Pas de recherche si moins de 2 caractères
        if (query.length < 2) return;

        // Filtrer les pages pertinentes
        const results = data.filter(page => {
          if (!page.title || !page.url) return false;
          if (page.title.toLowerCase() === "archives") return false;
          if (page.url.startsWith("/archives")) return false;

          const title = page.title.toLowerCase();
          const content = (page.content || "").toLowerCase();

          return title.includes(query) || content.includes(query);
        });

        // Si aucun résultat → invisible
        if (results.length === 0) {
          resultsBox.style.display = "none";
          return;
        }

        // Sinon → afficher
        resultsBox.style.display = "block";

        // Affichage des résultats
        results.slice(0, 10).forEach(page => {
          const item = document.createElement("div");

          item.innerHTML = `
            <a href="${page.url}" style="text-decoration:none; color:#333;">
              <strong>${page.title}</strong>
            </a>
          `;

          resultsBox.appendChild(item);
        });
      });
    });
});
