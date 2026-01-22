export async function onRequest(context) {
  const url = new URL(context.request.url)

  // Extract YouTube video ID
  const videoId = url.pathname.replace("/", "").trim()

  const imageUrl = videoId
    ? `https://res.cloudinary.com/bhguniversalstudio/image/fetch/c_fill,g_center,w_1280,h_720/l_play_i3pryq,g_center,w_220,fl_layer_apply/f_jpg,q_auto/https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : "https://share-gurbani-kirtan-darbar.pages.dev/logo.png"

  // 🔁 Redirect directly to image
  return Response.redirect(imageUrl, 302)
}
