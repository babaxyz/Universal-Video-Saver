const input = document.getElementById('url');
const button = document.getElementById('analyzeBtn');
const result = document.getElementById('result');

const platforms = [
  {name:'Instagram', hosts:['instagram.com','www.instagram.com']},
  {name:'Facebook', hosts:['facebook.com','www.facebook.com','fb.watch']},
  {name:'YouTube', hosts:['youtube.com','www.youtube.com','youtu.be']},
  {name:'X', hosts:['x.com','www.x.com','twitter.com','www.twitter.com']},
  {name:'Pinterest', hosts:['pinterest.com','www.pinterest.com']},
  {name:'Reddit', hosts:['reddit.com','www.reddit.com']}
];

function detect(url) {
  try {
    const u = new URL(url);
    return platforms.find(p => p.hosts.includes(u.hostname.toLowerCase()));
  } catch { return null; }
}

button?.addEventListener('click', () => {
  const value = input.value.trim();
  result.classList.remove('hidden');
  if (!value) {
    result.innerHTML = '<strong>Paste a URL first.</strong><span>Please enter a public media URL.</span>';
    return;
  }
  const platform = detect(value);
  if (!platform) {
    result.innerHTML = '<strong>Source not recognized</strong><span>Try a supported public-media URL.</span>';
    return;
  }
  result.innerHTML = `<strong>${platform.name} detected</strong><span>This starter build recognizes the source. Actual downloading must use an authorized/public media endpoint and must not bypass platform protections.</span>`;
});

input?.addEventListener('keydown', e => {
  if (e.key === 'Enter') button.click();
});
