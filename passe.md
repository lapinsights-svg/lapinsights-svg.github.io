---
layout: default
title: Dans le passé
description: Traces anciennes, éclats d’avant, ce qui demeure dans les replis du temps.
rubrique: true
collection: passe
permalink: /passe/
categories: passe
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
