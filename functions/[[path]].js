export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Extract YouTube video ID from path
  const videoId = url.pathname.replace("/", "").trim();

  // OG image: YouTube thumbnail or app logo fallback
  const ogImage = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "https://share-gurbani-kirtan-darbar.pages.dev/logo.png";

  // Fetch the real index.html from Cloudflare Pages
  const asset = await context.env.ASSETS.fetch(
    new Request(`${url.origin}/index.html`)
  );

  let html = await asset.text();

  // 🔥 Inject Gurbani-specific Open Graph & Twitter meta tags
  html = html.replace(
    "</head>",
    `
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Gurbani Kirtan Darbar" />
<meta property="og:title" content="Gurbani Kirtan & Shabad Gurbani" />
<meta property="og:description" content="Listen to full-length Gurbani Kirtan, Shabad Gurbani, Naam Simran, and live Kirtan from Sri Guru Granth Sahib Ji — Gurbani Kirtan Darbar." />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1280" />
<meta property="og:image:height" content="720" />
<meta property="og:url" content="${url.href}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Gurbani Kirtan & Shabad Gurbani" />
<meta name="twitter:description" content="Experience authentic Gurbani Kirtan, Shabad Vani, Naam Simran, and live Kirtan streams — Gurbani Kirtan Darbar." />
<meta name="twitter:image" content="${ogImage}" />

</head>`
  );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  });
}
