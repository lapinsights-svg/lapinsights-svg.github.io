---
title: "Couloir de poussière cosmique"
categories: creations
date: 2026-06-03
layout: article
tags: ["video", "ia", "lapinsights", "poesie", "cosmique", "vertical"]
og_image: /images/creations/corridor.png
---

*Cliquer sur play pour entrer dans la vidéo.*

<video controls playsinline width="100%">
  <source src="/assets/videos/corridorfinal.mp4" type="video/mp4">
  Votre navigateur ne peut pas lire cette vidéo.
</video>

<div class="poeme">
La nuit s’ouvre d’un seul élan.
La brume se fend en éclats glacés.
La poussière monte, droite, affamée de hauteur.
Chaque particule cherche un sommet sans nom.
Les parois vibrent d’une lumière étrangère.
Un souffle cosmique traverse la pierre.
Tout s’élève, même l’ombre la plus lourde.
La verticalité devient une force brute.
La lumière frappe, brève, métallique.
Le corridor se tend comme une flèche nocturne.
Le silence pulse, rapide, presque vivant.
La nuit se contracte, puis se déploie d’un coup.
Un axe invisible entraîne tout vers le fond.
Et quelque chose disparaît dans l’obscurité.
</div>

<div style="height: 1.2rem;"></div>

Céleste R.

<style>
.poeme {
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  line-height: 1.6;
}

.poeme span {
  opacity: 0;
  transform: translateY(6px);
  animation: reveal 0.4s forwards ease-out;
  display: block;
  margin-bottom: 0.3rem;
}

@keyframes reveal {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<script>
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".poeme");
  if (!container) return;

  // Récupère le texte brut avec les retours à la ligne
  let raw = container.textContent || "";
  const lines = raw.split("\n").map(l => l.trim()).filter(l => l.length > 0);

  // Vide le conteneur
  container.innerHTML = "";

  // Reconstruit chaque ligne en <span> animé
  lines.forEach((line, i) => {
    const span = document.createElement("span");
    span.textContent = line;
    span.style.animationDelay = `${i * 0.5}s`; // 0,5 s entre chaque ligne
    container.appendChild(span);
  });
});
</script>
