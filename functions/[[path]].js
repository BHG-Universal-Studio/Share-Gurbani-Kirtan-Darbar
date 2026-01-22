export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Extract YouTube video ID from path
  const videoId = url.pathname.replace("/", "").trim();

  // ✅ Cloudinary 16:9 OG image with center play overlay
  const ogImage = videoId
    ? `https://res.cloudinary.com/bhguniversalstudio/image/fetch/c_fill,g_center,w_1280,h_720/l_Untitled_design_utddwl,g_center,w_220,fl_layer_apply/f_jpg,q_auto/https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "https://share-gurbani-kirtan-darbar.pages.dev/logo.png";

  // Fetch real index.html from Pages
  const asset = await context.env.ASSETS.fetch(
    new Request(`${url.origin}/index.html`)
  );

  let html = await asset.text();

  // 🔥 Inject Gurbani-specific Open Graph & Twitter tags
  html = html.replace(
    "</head>",
    `
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Gurbani Kirtan Darbar" />
<meta property="og:title" content="New Gurbani Shabad & Soulful Kirtan" />
<meta property="og:description" content="Listen to newly added Gurbani Shabads, full-length Kirtan, Naam Simran, and live recordings from Sri Guru Granth Sahib Ji. Experience peace, devotion, and divine wisdom." />

<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1280" />
<meta property="og:image:height" content="720" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:url" content="${url.href}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="New Gurbani Shabad & Soulful Kirtan" />
<meta name="twitter:description" content="New Gurbani Shabads, full-length Kirtan, Naam Simran, and live spiritual recordings — listen and feel the divine connection." />
<meta name="twitter:image" content="${ogImage}" />

</head>`
  );

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  });
}
