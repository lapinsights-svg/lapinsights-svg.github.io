---
layout: default
title: "Créations"
---

<section class="liste-creations">
  {% for item in site.creations %}
    <div class="creation-item">
      <a href="{{ item.url | relative_url }}">{{ item.title }}</a>
    </div>
  {% endfor %}
</section>
