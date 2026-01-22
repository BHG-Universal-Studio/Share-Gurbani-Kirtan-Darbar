export async function onRequest(context) {
  const url = new URL(context.request.url)

  const videoId = url.pathname.replace("/", "").trim()

  const ogImage = videoId
    ? `https://res.cloudinary.com/bhguniversalstudio/image/fetch/c_fill,g_center,w_1280,h_720/l_play_i3pryq,g_center,w_220,fl_layer_apply/f_jpg,q_auto/https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "https://share-gurbani-kirtan-darbar.pages.dev/logo.png"

  const asset = await context.env.ASSETS.fetch(
    new Request(`${url.origin}/index.html`)
  )

  let html = await asset.text()

  // ✅ IMAGE-ONLY Open Graph (Facebook-safe)
  html = html.replace(
    "</head>",
    `
<meta property="og:type" content="website" />
<meta property="og:image" content="${ogImage}" />
<meta property="og:image:width" content="1280" />
<meta property="og:image:height" content="720" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:url" content="${url.href}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="${ogImage}" />

</head>`
  )

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=UTF-8"
    }
  })
}
