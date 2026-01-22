const player = document.getElementById("player");
const thumbnail = document.getElementById("thumbnail");
const loader = document.getElementById("loader");
const muteBtn = document.getElementById("muteBtn");
const downloadBtn = document.getElementById("downloadBtn");

let isMuted = true;

/* Get VIDEO_ID from URL */
function getVideoIdFromPath() {
  const path = window.location.pathname.replace("/", "").trim();
  return path || null;
}

const videoId = getVideoIdFromPath();

downloadBtn.addEventListener("click", openInPlayStore);

if (!videoId) {
  loader.style.display = "none";
  window.location.replace("https://sites.google.com/view/bhg-universal-studio");
} else {
  const thumbUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  thumbnail.style.backgroundImage = `url(${thumbUrl})`;

  player.src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&modestbranding=1`;

  player.onload = () => {
    loader.style.display = "none";
    thumbnail.style.display = "none";
  };
}

/* Unmute */
muteBtn.addEventListener("click", () => {
  if (!videoId) return;

  player.src =
    `https://www.youtube.com/embed/${videoId}` +
    `?autoplay=1&mute=0&playsinline=1&controls=0&rel=0`;

  muteBtn.style.display = "none";
});

function openInPlayStore() {
  window.location.href =
    "https://play.google.com/store/apps/details?id=com.BHG.gurbani";
}

function openInApp() {
  if (!videoId) return;

  const appUrl = `gurbanikirtan://video/${videoId}`;
  window.location.href = appUrl;

  setTimeout(() => {
    openInPlayStore();
  }, 2000);
}
