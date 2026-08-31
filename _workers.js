export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // /stats → renvoie les vues agrégées
    if (url.pathname === "/stats") {
      const list = await env.LAPIN_STATS.list({ prefix: "views:" });
      const stats = [];
      const aggregated = {};

      for (const item of list.keys) {
        let slug = item.name.replace("views:", "");
        
        // Normaliser : supprimer le slash final
        slug = slug.replace(/\/$/, "");
        
        // Éviter les doublons (index, assets, etc.)
        if (!slug || slug.startsWith("assets") || slug === "index") {
          continue;
        }

        // Aggréger les compteurs par slug normalisé
        const count = parseInt(await env.LAPIN_STATS.get(item.name) || "0", 10);
        aggregated[slug] = (aggregated[slug] || 0) + count;
      }

      // Convertir en array et trier par count décroissant
      for (const [slug, count] of Object.entries(aggregated)) {
        stats.push({ slug, count });
      }
      stats.sort((a, b) => b.count - a.count);

      return new Response(JSON.stringify(stats, null, 2), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // ignorer les assets
    if (
      url.pathname.endsWith(".css") ||
      url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".png") ||
      url.pathname.endsWith(".jpg") ||
      url.pathname.endsWith(".jpeg") ||
      url.pathname.endsWith(".svg") ||
      url.pathname.startsWith("/assets")
    ) {
      return env.ASSETS ? env.ASSETS.fetch(request) : fetch(request);
    }

    // compter les vues
    let slug = url.pathname.replace(/^\//, "") || "index";
    
    // Normaliser : supprimer le slash final
    slug = slug.replace(/\/$/, "");
    
    const key = `views:${slug}`;
    const current = await env.LAPIN_STATS.get(key);
    const count = current ? parseInt(current, 10) + 1 : 1;

    await env.LAPIN_STATS.put(key, String(count));

    // laisser Pages servir le site
    return fetch(request);
  }
};
