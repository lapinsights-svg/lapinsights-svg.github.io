---
layout: default
title: Créations
soustitre: Poèmes, fragments, éclats — les passages intimes du territoire.
rubrique: true
collection: creations
permalink: /creations/
---

<section class="rubrique-header section-header">
  <h2>{{ page.title }}</h2>
  <p>{{ page.soustitre }}</p>

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
