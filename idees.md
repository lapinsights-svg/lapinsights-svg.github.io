---
layout: default
title: Territoires d’idées
description: Explorer les architectures conceptuelles, les systèmes et les pensées qui structurent le monde.
rubrique: true
permalink: /idees/
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
  {% include rubrique-list.html collection="idees" %}
</div>
