const groups = [
  { name: "SEARCH & DISCOVERY", id: "search", color: "#a7be82", tools: [
    { name: "Google Search", symbol: "G", url: "https://www.google.com/", desc: "Broad web search with advanced operators.", tag: "WEB SEARCH" },
    { name: "Bing", symbol: "B", url: "https://www.bing.com/", desc: "Alternative web index and image search.", tag: "WEB SEARCH" },
    { name: "OSINT Framework", symbol: "⌘", url: "https://osintframework.com/", desc: "A directory of OSINT tools organized by task.", tag: "DIRECTORY" },
    { name: "Google Lens", symbol: "◎", url: "https://lens.google/", desc: "Find visually similar images and sources.", tag: "IMAGE SEARCH" },
  ]},
  { name: "DOMAINS & INFRASTRUCTURE", id: "infrastructure", color: "#91b4aa", tools: [
    { name: "crt.sh", symbol: "⌁", url: "https://crt.sh/", desc: "Search public certificate transparency logs.", tag: "CERTIFICATES" },
    { name: "urlscan.io", symbol: "↗", url: "https://urlscan.io/", desc: "Inspect public website scans and page resources.", tag: "URL ANALYSIS" },
    { name: "Shodan", symbol: "⌖", url: "https://www.shodan.io/", desc: "Search internet connected devices and services.", tag: "DEVICE SEARCH" },
    { name: "ICANN Lookup", symbol: "◇", url: "https://lookup.icann.org/", desc: "Look up registration data for domain names.", tag: "DOMAIN LOOKUP" },
    { name: "VirusTotal", symbol: "◈", url: "https://www.virustotal.com/gui/home/search", desc: "Review public URL, domain, IP and file reports.", tag: "THREAT INTEL" },
  ]},
  { name: "IDENTITY & SOCIAL", id: "identity", color: "#c29a77", tools: [
    { name: "Have I Been Pwned", symbol: "!", url: "https://haveibeenpwned.com/", desc: "Check an email address against known breaches.", tag: "EMAIL CHECK" },
    { name: "Namechk", symbol: "@", url: "https://namechk.com/", desc: "Check username availability across platforms.", tag: "USERNAME" },
    { name: "LinkedIn", symbol: "in", url: "https://www.linkedin.com/", desc: "Professional profiles and organization research.", tag: "PROFILES" },
  ]},
  { name: "MAPS & GEOSPATIAL", id: "maps", color: "#8ca2c0", tools: [
    { name: "OpenStreetMap", symbol: "⌖", url: "https://www.openstreetmap.org/", desc: "Collaborative open map of the world.", tag: "MAP" },
    { name: "Google Maps", symbol: "G", url: "https://maps.google.com/", desc: "Explore places, routes and street level imagery.", tag: "MAP" },
    { name: "Google Earth", symbol: "◉", url: "https://earth.google.com/web/", desc: "Explore satellite imagery and 3D terrain.", tag: "SATELLITE" },
  ]},
  { name: "ARCHIVES & REFERENCE", id: "archives", color: "#b19abf", tools: [
    { name: "Wayback Machine", symbol: "◷", url: "https://web.archive.org/", desc: "Find archived snapshots of public websites.", tag: "WEB ARCHIVE" },
    { name: "Internet Archive", symbol: "▤", url: "https://archive.org/", desc: "Search a library of digitized media and records.", tag: "DIGITAL LIBRARY" },
    { name: "Wikidata", symbol: "W", url: "https://www.wikidata.org/", desc: "Explore structured, linked open knowledge.", tag: "REFERENCE" },
  ]},
];

const allTools = groups.flatMap(group => group.tools.map(tool => ({ ...tool, group: group.name, groupId: group.id, color: group.color })));
const categoryNav = document.querySelector("#category-nav");
const toolGroups = document.querySelector("#tool-groups");
const search = document.querySelector("#search");
let activeCategory = "all";
let favoritesOnly = false;
let favorites = new Set(JSON.parse(localStorage.getItem("fieldnotes-favorites") || "[]"));

document.querySelector("#tool-count").textContent = String(allTools.length).padStart(2, "0");
document.querySelector("#today").textContent = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(new Date()).toUpperCase();

categoryNav.innerHTML = groups.map(group => `<a class="category-item" href="#${group.id}" data-category="${group.id}"><span class="cat-dot" style="--dot:${group.color}"></span>${group.name.replace("&", "and").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}<span class="nav-count">${String(group.tools.length).padStart(2, "0")}</span></a>`).join("");

function render() {
  const query = search.value.trim().toLowerCase();
  const visibleGroups = groups.map(group => ({ ...group, tools: group.tools.filter(tool => {
    const matchQuery = !query || `${tool.name} ${tool.desc} ${tool.tag} ${group.name}`.toLowerCase().includes(query);
    return matchQuery && (activeCategory === "all" || group.id === activeCategory) && (!favoritesOnly || favorites.has(tool.name));
  })})).filter(group => group.tools.length);
  const count = visibleGroups.reduce((total, group) => total + group.tools.length, 0);
  document.querySelector("#result-count").textContent = `(${count})`;
  document.querySelector("#empty-state").hidden = count > 0;
  toolGroups.innerHTML = visibleGroups.map(group => `<section class="category-group" id="${group.id}"><div class="group-heading"><h3>${group.name}</h3><span class="group-rule"></span><span class="group-total">${String(group.tools.length).padStart(2, "0")}</span></div><div class="tool-grid">${group.tools.map(tool => `<article class="tool-card"><a href="${tool.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${tool.name} in a new tab" style="color:inherit;text-decoration:none"><div class="card-top"><span class="tool-symbol">${tool.symbol}</span><span class="tool-name">${tool.name}</span><span class="external">↗</span></div><p>${tool.desc}</p><div class="card-foot"><span class="tool-tag">${tool.tag}</span></div></a><button class="save-button ${favorites.has(tool.name) ? "saved" : ""}" data-save="${tool.name}" aria-label="${favorites.has(tool.name) ? "Remove" : "Save"} ${tool.name}" title="Save tool">${favorites.has(tool.name) ? "★" : "☆"}</button></article>`).join("")}</div></section>`).join("");
  document.querySelector("#saved-count").textContent = favorites.size;
}

search.addEventListener("input", render);
categoryNav.addEventListener("click", event => {
  const link = event.target.closest("[data-category]");
  if (!link) return;
  event.preventDefault();
  activeCategory = link.dataset.category;
  favoritesOnly = false;
  document.querySelector("#favorites-filter").classList.remove("active");
  categoryNav.querySelectorAll(".category-item").forEach(item => item.classList.toggle("active", item === link));
  render();
  document.querySelector("#tools").scrollIntoView({ behavior: "smooth" });
});
document.querySelector("#favorites-filter").addEventListener("click", event => {
  favoritesOnly = !favoritesOnly;
  activeCategory = "all";
  event.currentTarget.classList.toggle("active", favoritesOnly);
  categoryNav.querySelectorAll(".category-item").forEach(item => item.classList.remove("active"));
  render();
  document.querySelector("#tools").scrollIntoView({ behavior: "smooth" });
});
toolGroups.addEventListener("click", event => {
  const button = event.target.closest("[data-save]");
  if (!button) return;
  event.preventDefault();
  const name = button.dataset.save;
  favorites.has(name) ? favorites.delete(name) : favorites.add(name);
  localStorage.setItem("fieldnotes-favorites", JSON.stringify([...favorites]));
  render();
});
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) { event.preventDefault(); search.focus(); }
  if (event.key === "Escape") { search.value = ""; search.blur(); render(); }
});
render();
