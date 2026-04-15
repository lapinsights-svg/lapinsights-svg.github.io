// ----------------------------------------------------
// SONS — récupération des éléments audio
// ----------------------------------------------------
const sonGrave = document.getElementById('son-grave');
const sonMedium = document.getElementById('son-medium');
const sonAigu = document.getElementById('son-aigu');
const souffle = document.getElementById('souffle-global');

// ----------------------------------------------------
// SOUFFLE GLOBAL — ambiance de fond
// ----------------------------------------------------
if (souffle) {
  souffle.volume = 0.25;
  souffle.play().catch(() => {
    // Certains navigateurs bloquent l'autoplay : on attend une interaction
    document.addEventListener('click', () => {
      souffle.play();
    }, { once: true });
  });
}

// ----------------------------------------------------
// POINTS LUMINEUX — gestion des interactions
// ----------------------------------------------------
function activerInteractionsEchos() {
  const points = document.querySelectorAll('.point-echo');

  points.forEach(point => {

    // Survol : lumière + son
    point.addEventListener('mouseenter', () => {
      point.classList.add('son-actif');

      if (point.classList.contains('ancien')) {
        sonGrave.currentTime = 0;
        sonGrave.volume = 0.5;
        sonGrave.play();
      }
      else if (point.classList.contains('recent')) {
        sonAigu.currentTime = 0;
        sonAigu.volume = 0.4;
        sonAigu.play();
      }
      else {
        sonMedium.currentTime = 0;
        sonMedium.volume = 0.45;
        sonMedium.play();
      }
    });

    // Fin du survol : on retire l’effet lumineux
    point.addEventListener('mouseleave', () => {
      point.classList.remove('son-actif');
    });

  });
}

// ----------------------------------------------------
// ACTIVATION AUTOMATIQUE
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', activerInteractionsEchos);
