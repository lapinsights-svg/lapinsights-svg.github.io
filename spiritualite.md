---
layout: default
title: Spiritualité
description: Cheminer vers l’invisible, écouter ce qui respire derrière le monde.
rubrique: true
collection: spiritualite
permalink: /spiritualite/
---

<section class="rubrique-header section-header">
  <h2>{{ page.title }}</h2>
  <p>{{ page.description }}</p>

  <div class="share-rubrique">
    <a href="#"
       onclick="shareArticle('{{ page.title }}', '{{ page.url | absolute_url }}'); return false;">
       partager cette rubrique
    </a>
  </div>
</section>

<div class="section-content">
  {% include rubrique-list.html collection=page.collection %}
</div>
