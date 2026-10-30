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
const $ = selector => document.querySelector(selector);
const categoryNav = $("#category-nav");
const toolGroups = $("#tool-groups");
const search = $("#search");
let activeCategory = "all";
let favoritesOnly = false;
let favorites = new Set(JSON.parse(localStorage.getItem("fieldnotes-favorites") || "[]"));

$("#tool-count").textContent = String(allTools.length).padStart(2, "0");
$("#today").textContent = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric" }).format(new Date()).toUpperCase();
function tickClock() { $("#clock").textContent = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", timeZone: "UTC", timeZoneName: "short" }).format(new Date()); }
function tickAustralianClocks() {
  const now = new Date();
  document.querySelectorAll("[data-time-zone]").forEach(clock => {
    clock.textContent = new Intl.DateTimeFormat("en-AU", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: clock.dataset.timeZone }).format(now);
  });
}
tickClock(); tickAustralianClocks(); setInterval(() => { tickClock(); tickAustralianClocks(); }, 1000);

categoryNav.innerHTML = groups.map(group => `<a class="category-item" href="#${group.id}" data-category="${group.id}"><span class="cat-dot" style="--dot:${group.color}"></span>${group.name.replace("&", "and").toLowerCase().replace(/\b\w/g, c => c.toUpperCase())}<span class="nav-count">${String(group.tools.length).padStart(2, "0")}</span></a>`).join("");

function renderTools() {
  const query = search.value.trim().toLowerCase();
  const visibleGroups = groups.map(group => ({ ...group, tools: group.tools.filter(tool => {
    const matchQuery = !query || `${tool.name} ${tool.desc} ${tool.tag} ${group.name}`.toLowerCase().includes(query);
    return matchQuery && (activeCategory === "all" || group.id === activeCategory) && (!favoritesOnly || favorites.has(tool.name));
  })})).filter(group => group.tools.length);
  const count = visibleGroups.reduce((total, group) => total + group.tools.length, 0);
  $("#result-count").textContent = `(${count})`;
  $("#empty-state").hidden = count > 0;
  toolGroups.innerHTML = visibleGroups.map(group => `<section class="category-group" id="${group.id}"><div class="group-heading"><h3>${group.name}</h3><span class="group-rule"></span><span class="group-total">${String(group.tools.length).padStart(2, "0")}</span></div><div class="tool-grid">${group.tools.map(tool => `<article class="tool-card"><a href="${tool.url}" target="_blank" rel="noopener noreferrer" aria-label="Open ${tool.name} in a new tab" style="color:inherit;text-decoration:none"><div class="card-top"><span class="tool-symbol">${tool.symbol}</span><span class="tool-name">${tool.name}</span><span class="external">↗</span></div><p>${tool.desc}</p><div class="card-foot"><span class="tool-tag">${tool.tag}</span></div></a><button class="save-button ${favorites.has(tool.name) ? "saved" : ""}" data-save="${tool.name}" aria-label="${favorites.has(tool.name) ? "Remove" : "Save"} ${tool.name}" title="Save tool">${favorites.has(tool.name) ? "★" : "☆"}</button></article>`).join("")}</div></section>`).join("");
  $("#saved-count").textContent = favorites.size;
}

search.addEventListener("input", renderTools);
categoryNav.addEventListener("click", event => {
  const link = event.target.closest("[data-category]"); if (!link) return;
  event.preventDefault(); activeCategory = link.dataset.category; favoritesOnly = false;
  $("#favorites-filter").classList.remove("active");
  categoryNav.querySelectorAll(".category-item").forEach(item => item.classList.toggle("active", item === link));
  renderTools(); $("#tools").scrollIntoView({ behavior: "smooth" });
});
$("#favorites-filter").addEventListener("click", event => {
  favoritesOnly = !favoritesOnly; activeCategory = "all"; event.currentTarget.classList.toggle("active", favoritesOnly);
  categoryNav.querySelectorAll(".category-item").forEach(item => item.classList.remove("active")); renderTools(); $("#tools").scrollIntoView({ behavior: "smooth" });
});
toolGroups.addEventListener("click", event => {
  const button = event.target.closest("[data-save]"); if (!button) return; event.preventDefault();
  const name = button.dataset.save; favorites.has(name) ? favorites.delete(name) : favorites.add(name);
  localStorage.setItem("fieldnotes-favorites", JSON.stringify([...favorites])); renderTools();
});

const DEFAULT_QUERY = "(conflict OR diplomacy OR election OR security OR economy OR disaster)";
let currentQuery = DEFAULT_QUERY;
let articles = [];
let recordLimit = 25;
let requestController;
const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
const timeAgo = value => {
  const date = new Date(value); if (Number.isNaN(date.getTime())) return "Time unavailable";
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 60) return `${minutes}m ago`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
  return `${Math.floor(minutes / 1440)}d ago`;
};
function renderFeed() {
  const searchTerm = $("#feed-search").value.trim().toLowerCase();
  const visible = articles.filter(item => !searchTerm || `${item.title} ${item.domain}`.toLowerCase().includes(searchTerm));
  $("#article-count").textContent = String(visible.length).padStart(2, "0");
  if (!visible.length) {
    $("#feed-results").innerHTML = `<div class="empty-feed"><b>No matching headlines</b><span>Try another search term or refresh the feed.</span></div>`;
    return;
  }
  $("#feed-results").innerHTML = visible.map(item => `<article class="news-item"><div class="news-time">${escapeHTML(timeAgo(item.seendate))}<span class="news-source">${escapeHTML(item.domain || "NEWS SOURCE")}</span></div><div class="news-copy"><a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.title || "Untitled article")} <span>↗</span></a><small>${escapeHTML(item.language || "")} ${item.sourcecountry ? `· ${escapeHTML(item.sourcecountry)}` : ""}</small></div><span class="news-mark">NEWS</span></article>`).join("");
}
async function loadHeadlines() {
  if (requestController) requestController.abort();
  requestController = new AbortController();
  const button = $("#refresh"); button.classList.add("loading");
  $("#feed-status").textContent = "Refreshing public feed";
  $("#feed-results").innerHTML = `<div class="loading-state"><span class="spinner"></span> Fetching public headlines…</div>`;
  const params = new URLSearchParams({ query: currentQuery, mode: "artlist", format: "json", timespan: $("#feed-window").value, maxrecords: String(recordLimit), sort: "datedesc" });
  try {
    const response = await fetch(`https://api.gdeltproject.org/api/v2/doc/doc?${params}`, { signal: requestController.signal, headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error(`GDELT returned HTTP ${response.status}`);
    const data = await response.json();
    articles = Array.isArray(data.articles) ? data.articles : [];
    $("#feed-status").textContent = "GDELT connected";
    $("#updated-at").textContent = `Updated ${new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", timeZoneName: "short" }).format(new Date())}`;
    $("#load-more").hidden = recordLimit >= 75 || articles.length < recordLimit;
    renderFeed();
  } catch (error) {
    if (error.name === "AbortError") return;
    articles = [];
    $("#feed-status").textContent = "Feed unavailable";
    $("#updated-at").textContent = "Check your connection, then retry";
    $("#article-count").textContent = "—";
    $("#feed-results").innerHTML = `<div class="empty-feed"><b>Could not load public headlines</b><span>${escapeHTML(error.message)}. The research links below remain available.</span></div>`;
  } finally { button.classList.remove("loading"); }
}
function selectWatch(button) {
  currentQuery = button.dataset.query === "world" ? DEFAULT_QUERY : `(${button.dataset.query})`;
  document.querySelectorAll(".watch-item,.focus-row").forEach(item => item.classList.toggle("selected", item.dataset.query === button.dataset.query));
  const watchName = button.textContent.trim().replace(/\s+/g, " ").replace("↗", "").toUpperCase();
  $("#active-watch").textContent = watchName.split("\n").find(Boolean).slice(0, 24);
  $("#feed-title").textContent = button.dataset.query === "world" ? "Latest reporting" : `${watchName} reporting`;
  recordLimit = 25; loadHeadlines(); $("#feed").scrollIntoView({ behavior: "smooth", block: "start" });
}
document.querySelectorAll("[data-query]").forEach(button => button.addEventListener("click", () => selectWatch(button)));
$("#refresh").addEventListener("click", () => { recordLimit = 25; loadHeadlines(); });
$("#feed-window").addEventListener("change", () => { recordLimit = 25; loadHeadlines(); });
$("#feed-search").addEventListener("input", renderFeed);
$("#load-more").addEventListener("click", () => { recordLimit = Math.min(75, recordLimit + 25); loadHeadlines(); });
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) { event.preventDefault(); search.focus(); }
  if (event.key === "Escape") {
    if (!mapOverlay.hidden) closeMap();
    search.value = ""; search.blur(); renderTools();
  }
});
renderTools();
loadHeadlines();

// Investigation records are kept locally in this browser.
const NOTE_KEY = "fieldnotes-investigations-v1";
const noteOverlay = $("#note-overlay");
const noteForm = $("#investigation-form");
let records = JSON.parse(localStorage.getItem(NOTE_KEY) || "[]");
let evidence = [];
let sessionActive = false;
const noteFields = ["record-title", "investigator", "credentials", "authorization", "preliminary", "methodology", "search-details", "findings", "session-start", "session-end", "evidence-url"];
function saveRecords() { localStorage.setItem(NOTE_KEY, JSON.stringify(records)); renderRecordOptions(); }
function renderRecordOptions(selected = "") {
  const select = $("#record-select");
  select.innerHTML = `<option value="">New investigation</option>` + records.map(record => `<option value="${escapeHTML(record.id)}">${escapeHTML(record.title || "Untitled investigation")}</option>`).join("");
  select.value = selected;
  $("#investigation-count").textContent = records.length;
}
function renderEvidence() {
  $("#evidence-list").innerHTML = evidence.map((item, index) => `<div class="evidence-item"><span>${escapeHTML(item.name)}${item.url ? ` · <a href="${escapeHTML(item.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.url)}</a>` : ""}</span><button type="button" data-remove-evidence="${index}" aria-label="Remove ${escapeHTML(item.name)}">×</button></div>`).join("");
}
function resetRecord(record = null) {
  noteForm.reset(); evidence = record?.evidence || []; $("#record-id").value = record?.id || "";
  noteFields.forEach(id => { const field = $("#" + id); field.value = record?.[id] || ""; });
  $("#delete-record").hidden = !record; sessionActive = false; $("#session-toggle").textContent = "▶ Start session";
  $("#session-toggle").disabled = false; renderEvidence(); updateDuration();
}
function openNotes() { noteOverlay.hidden = false; document.body.classList.add("note-open"); renderRecordOptions(); resetRecord(); $("#record-title").focus(); }
function closeNotes() { noteOverlay.hidden = true; document.body.classList.remove("note-open"); }
function updateDuration() {
  const start = new Date($("#session-start").value), end = new Date($("#session-end").value);
  if (!Number.isNaN(start.getTime()) && !Number.isNaN(end.getTime()) && end >= start) {
    const minutes = Math.floor((end - start) / 60000);
    $("#session-duration").textContent = `Duration: ${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  } else $("#session-duration").textContent = "Duration is calculated from start and end.";
}
$("#open-investigation").addEventListener("click", openNotes);
$("#close-investigation").addEventListener("click", closeNotes);
noteOverlay.addEventListener("click", event => { if (event.target === noteOverlay) closeNotes(); });
$("#new-record").addEventListener("click", () => { renderRecordOptions(); resetRecord(); $("#record-select").value = ""; $("#record-title").focus(); });
$("#record-select").addEventListener("change", event => resetRecord(records.find(record => record.id === event.target.value) || null));
$("#session-toggle").addEventListener("click", event => {
  if (!sessionActive) {
    $("#session-start").value = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    $("#session-end").value = ""; sessionActive = true; event.currentTarget.textContent = "■ End session";
  } else {
    $("#session-end").value = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    sessionActive = false; event.currentTarget.textContent = "Session ended"; event.currentTarget.disabled = true;
  }
  updateDuration();
});
$("#session-start").addEventListener("input", updateDuration);
$("#session-end").addEventListener("input", updateDuration);
$("#evidence-file").addEventListener("change", async event => {
  const file = event.target.files[0]; if (!file) return;
  if (file.size > 2_000_000) { alert("Please choose a file under 2 MB so it can be stored locally in this browser."); event.target.value = ""; return; }
  const data = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = reject; reader.readAsDataURL(file); });
  evidence.push({ name: file.name, type: file.type, data, url: $("#evidence-url").value.trim() });
  event.target.value = ""; renderEvidence();
});
$("#evidence-list").addEventListener("click", event => { const button = event.target.closest("[data-remove-evidence]"); if (!button) return; evidence.splice(Number(button.dataset.removeEvidence), 1); renderEvidence(); });
noteForm.addEventListener("submit", event => {
  event.preventDefault();
  const id = $("#record-id").value || crypto.randomUUID();
  const record = { id, evidence, updated: new Date().toISOString() };
  noteFields.forEach(field => record[field] = $("#" + field).value.trim());
  const index = records.findIndex(item => item.id === id);
  if (index < 0) records.unshift(record); else records[index] = record;
  saveRecords(); $("#record-id").value = id; $("#record-select").value = id; $("#delete-record").hidden = false;
  $("#session-toggle").disabled = !sessionActive && Boolean(record["session-end"]);
});
$("#delete-record").addEventListener("click", () => {
  const id = $("#record-id").value; if (!id) return;
  records = records.filter(record => record.id !== id); saveRecords(); resetRecord();
});
renderRecordOptions();

// A local, descriptive roster for research personas and AI assistants.
const ROSTER_KEY = "fieldnotes-personas-agents-v1";
const rosterOverlay = $("#roster-overlay");
const rosterForm = $("#roster-form");
let roster = JSON.parse(localStorage.getItem(ROSTER_KEY) || "[]");
function persistRoster() {
  localStorage.setItem(ROSTER_KEY, JSON.stringify(roster));
  renderRoster();
}
function renderRoster() {
  $("#roster-count").textContent = String(roster.length);
  $("#roster-summary").textContent = `${roster.length} ${roster.length === 1 ? "entry" : "entries"}`;
  $("#roster-list").innerHTML = roster.length ? roster.map(entry => `
    <article class="roster-card">
      <div class="roster-card-head"><span class="roster-avatar">${entry.type === "AI assistant" ? "✳" : "◎"}</span><div class="roster-card-title"><b>${escapeHTML(entry.name)}</b><small>${escapeHTML(entry.type)} · ${escapeHTML(entry.status)}</small></div><span class="roster-status ${entry.status.toLowerCase()}">${escapeHTML(entry.status)}</span></div>
      <p>${escapeHTML(entry.purpose || "No purpose or disclosure notes added yet.")}</p>
      <div class="roster-card-foot"><span>${escapeHTML(entry.scope || "Scope not set")}</span><div><button type="button" data-roster-edit="${escapeHTML(entry.id)}">Edit</button><button type="button" data-roster-delete="${escapeHTML(entry.id)}">Remove</button></div></div>
    </article>`).join("") : `<div class="roster-empty"><span>◎</span><b>Your roster is empty</b><small>Add a research persona or AI assistant to keep its role and scope visible.</small></div>`;
}
function closeRoster() { rosterOverlay.hidden = true; document.body.classList.remove("note-open"); }
function resetRosterForm(entry = null) {
  rosterForm.reset();
  $("#roster-id").value = entry?.id || "";
  $("#roster-name").value = entry?.name || "";
  $("#roster-type").value = entry?.type || "Research persona";
  $("#roster-purpose").value = entry?.purpose || "";
  $("#roster-scope").value = entry?.scope || "";
  $("#roster-status").value = entry?.status || "Ready";
  rosterForm.hidden = false;
  $("#roster-name").focus();
}
$("#open-roster").addEventListener("click", () => { rosterOverlay.hidden = false; document.body.classList.add("note-open"); rosterForm.hidden = true; renderRoster(); });
$("#close-roster").addEventListener("click", closeRoster);
rosterOverlay.addEventListener("click", event => { if (event.target === rosterOverlay) closeRoster(); });
$("#add-roster-entry").addEventListener("click", () => resetRosterForm());
$("#cancel-roster").addEventListener("click", () => { rosterForm.hidden = true; });
$("#roster-list").addEventListener("click", event => {
  const edit = event.target.closest("[data-roster-edit]");
  const remove = event.target.closest("[data-roster-delete]");
  if (edit) resetRosterForm(roster.find(item => item.id === edit.dataset.rosterEdit));
  if (remove) { roster = roster.filter(item => item.id !== remove.dataset.rosterDelete); persistRoster(); }
});
rosterForm.addEventListener("submit", event => {
  event.preventDefault();
  const id = $("#roster-id").value || crypto.randomUUID();
  const entry = { id, name: $("#roster-name").value.trim(), type: $("#roster-type").value, purpose: $("#roster-purpose").value.trim(), scope: $("#roster-scope").value.trim(), status: $("#roster-status").value };
  const existing = roster.findIndex(item => item.id === id);
  if (existing < 0) roster.unshift(entry); else roster[existing] = entry;
  persistRoster(); rosterForm.hidden = true;
});
renderRoster();

// Expand the illustrative map into a full-screen view.
const mapVisual = $("#map-visual");
const mapOverlay = $("#map-overlay");
function openMap() {
  const expanded = mapVisual.cloneNode(true);
  expanded.removeAttribute("id");
  expanded.setAttribute("role", "img");
  expanded.removeAttribute("tabindex");
  $(".map-fullscreen-content").replaceChildren(expanded);
  mapOverlay.hidden = false;
  document.body.classList.add("map-open");
  $("#map-close").focus();
}
function closeMap() {
  mapOverlay.hidden = true;
  document.body.classList.remove("map-open");
  mapVisual.focus();
}
mapVisual.addEventListener("click", openMap);
mapVisual.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openMap(); }
});
$("#map-close").addEventListener("click", closeMap);
mapOverlay.addEventListener("click", event => { if (event.target === mapOverlay) closeMap(); });
