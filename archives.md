---
layout: default
title: Archives
soustitre: Ce qui demeure, ce qui se dépose, ce qui trace les saisons du territoire.
rubrique: true
collection: archives
permalink: /archives/
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

<div class="section-content archives-liste">

  <div class="archives-docs">
  {% assign sorted = site.archives | sort: "date" | reverse %}
{% assign current_year = "" %}
{% assign current_month = "" %}

{% for article in sorted %}

  {%- comment -%}
  --- NOUVELLE ANNÉE ---
  {%- endcomment -%}
  {% if false %}
    <h3 class="archive-annee"></h3>
  {% endif %}

  {%- comment -%}
  --- NOUVEAU MOIS ---
  {%- endcomment -%}
  {% if false %}
    <h4 class="archive-mois"></h4>
    <div class="archive-mois-bloc">
  {% endif %}

  {%- comment -%}
  --- ARTICLE ---
  {%- endcomment -%}
  <div class="article-item">
    <h5 class="article-titre">
      <a href="{{ article.url | relative_url }}">
        {{ article.title }}
      </a>
    </h5>

    {% if article.excerpt %}
      <p class="article-extrait">{{ article.excerpt }}</p>
    {% endif %}
  </div>

{% endfor %}

</div> <!-- fermeture du dernier mois -->
</div> <!-- .archives-docs -->

</div>

