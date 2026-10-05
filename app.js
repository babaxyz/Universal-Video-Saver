const urlInput = document.getElementById("url");
const checkBtn = document.getElementById("checkBtn");
const statusBox = document.getElementById("status");
const result = document.getElementById("result");

const extensions = ["mp4","webm","mov","m4v","ogv","mp3","m4a","wav","ogg"];

function cleanUrl(value) {
  try {
    const u = new URL(value.trim());
    if (!["http:","https:"].includes(u.protocol)) throw new Error();
    return u;
  } catch { return null; }
}

function getExtension(path) {
  const clean = path.split("?")[0].split("#")[0];
  const last = clean.split("/").pop() || "";
  const dot = last.lastIndexOf(".");
  return dot > -1 ? last.slice(dot + 1).toLowerCase() : "";
}

function platform(host) {
  host = host.toLowerCase().replace(/^www\./,"");
  if (host.includes("youtube.com") || host === "youtu.be") return "YouTube";
  if (host.includes("instagram.com")) return "Instagram";
  if (host.includes("facebook.com") || host === "fb.watch") return "Facebook";
  if (host.includes("tiktok.com")) return "TikTok";
  if (host.includes("x.com") || host === "twitter.com") return "X";
  if (host.includes("pinterest.")) return "Pinterest";
  if (host.includes("reddit.com")) return "Reddit";
  return "Direct media";
}

checkBtn.addEventListener("click", () => {
  const u = cleanUrl(urlInput.value);
  result.classList.add("hidden");
  statusBox.textContent = "";

  if (!u) {
    statusBox.textContent = "Please enter a valid HTTPS/HTTP URL.";
    statusBox.className = "status error";
    return;
  }

  const ext = getExtension(u.pathname);
  const p = platform(u.hostname);

  if (!extensions.includes(ext)) {
    statusBox.textContent =
      `${p} link detected. This page accepts direct media-file URLs; it does not extract protected/social-platform media.`;
    statusBox.className = "status warn";
    return;
  }

  statusBox.textContent = "Direct media file detected.";
  statusBox.className = "status success";

  const safeName = (u.pathname.split("/").pop() || `media.${ext}`).replace(/[^a-zA-Z0-9._-]/g,"_");
  result.innerHTML = `
    <div class="media-info">
      <div><span class="type">${ext.toUpperCase()}</span><strong>${safeName}</strong></div>
      <a class="download" href="${u.href}" download>Save media</a>
    </div>`;
  result.classList.remove("hidden");
});

urlInput.addEventListener("keydown", e => {
  if (e.key === "Enter") checkBtn.click();
});