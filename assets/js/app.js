const input = document.getElementById('url');
const button = document.getElementById('analyzeBtn');
const result = document.getElementById('result');
const preview = document.getElementById('preview');

const platforms = [
  {name:'Instagram', icon:'◎', hosts:['instagram.com','www.instagram.com']},
  {name:'Facebook', icon:'f', hosts:['facebook.com','www.facebook.com','fb.watch']},
  {name:'YouTube', icon:'▶', hosts:['youtube.com','www.youtube.com','youtu.be']},
  {name:'X', icon:'𝕏', hosts:['x.com','www.x.com','twitter.com','www.twitter.com']},
  {name:'Pinterest', icon:'P', hosts:['pinterest.com','www.pinterest.com']},
  {name:'Reddit', icon:'●', hosts:['reddit.com','www.reddit.com']}
];

function parseUrl(value) {
  try {
    const u = new URL(value);
    if (!['http:','https:'].includes(u.protocol)) return null;
    return u;
  } catch { return null; }
}

function detect(url) {
  const host = url.hostname.toLowerCase();
  return platforms.find(p => p.hosts.includes(host)) || null;
}

function looksLikeDirectMedia(url) {
  const path = url.pathname.toLowerCase();
  return /\.(mp4|webm|mov|m4v|ogv|mp3|m4a|wav|ogg)(\?.*)?$/.test(path);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

function showResult(title, text, buttonHtml='') {
  result.classList.remove('hidden');
  result.innerHTML = `<strong>${title}</strong><span>${text}</span>${buttonHtml}`;
}

button?.addEventListener('click', () => {
  const value = input.value.trim();
  preview.classList.add('hidden');
  preview.innerHTML = '';

  if (!value) {
    showResult('Paste a URL first.', 'Enter a public media URL.');
    return;
  }

  const url = parseUrl(value);
  if (!url) {
    showResult('Invalid URL', 'Please paste a complete URL starting with https://');
    return;
  }

  if (looksLikeDirectMedia(url)) {
    const safe = escapeHtml(url.href);
    showResult(
      'Direct media file detected',
      'This looks like a direct media URL. Your browser can request the file without using a platform scraper.',
      `<a class="result-action" href="${safe}" download>Save media</a>`
    );
    return;
  }

  const platform = detect(url);
  if (!platform) {
    showResult('Source not recognized', 'This domain is not in the current supported-source list.');
    return;
  }

  const safe = escapeHtml(url.href);
  showResult(
    `${platform.icon} ${platform.name} detected`,
    'The link is valid and the source was identified. This version does not bypass platform restrictions or extract protected media.',
    `<a class="result-action" href="${safe}" target="_blank" rel="noopener noreferrer">Open source</a>`
  );

  preview.classList.remove('hidden');
  preview.innerHTML = `
    <div class="preview-icon">${platform.icon}</div>
    <div><strong>${platform.name}</strong><p>Source link ready</p></div>
  `;
});

input?.addEventListener('keydown', e => {
  if (e.key === 'Enter') button.click();
});
