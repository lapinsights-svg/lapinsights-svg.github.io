document.addEventListener("DOMContentLoaded", function () {
  // Trouver tous les boutons avec openPDF(...)
  const buttons = document.querySelectorAll("button[onclick^='openPDF']");

  buttons.forEach(button => {
    const onclick = button.getAttribute("onclick");

    // Extraire le chemin du PDF depuis openPDF('chemin.pdf')
    const match = onclick.match(/openPDF\(['"](.+?)['"]\)/);
    if (!match) return;

    const pdfPath = match[1];

    // Créer un lien <a> qui remplace le bouton
    const link = document.createElement("a");
    link.href = pdfPath;
    link.target = "_blank";
    link.textContent = "Explorer le terrier";
    link.className = "pdf-button"; // pour garder ton style

    // Remplacer le bouton par le lien
    button.replaceWith(link);
  });
});
