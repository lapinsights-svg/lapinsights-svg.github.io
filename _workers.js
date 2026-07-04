export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // /stats → renvoie les vues
    if (url.pathname === "/stats") {
      const list = await env.LAPIN_STATS.list({ prefix: "views:" });
      const stats = [];

      for (const item of list.keys) {
        const slug = item.name.replace("views:", "");
        const count = await env.LAPIN_STATS.get(item.name);
        stats.push({ slug, count: parseInt(count || "0", 10) });
      }

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
    const slug = url.pathname.replace(/^\//, "") || "index";
    const key = `views:${slug}`;
    const current = await env.LAPIN_STATS.get(key);
    const count = current ? parseInt(current, 10) + 1 : 1;

    await env.LAPIN_STATS.put(key, String(count));

    // laisser Pages servir le site
    return fetch(request);
  }
};
