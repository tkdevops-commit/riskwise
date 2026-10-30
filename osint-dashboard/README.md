# Fieldnotes OSINT signal desk

A small, browser based open source intelligence workspace inspired by live OSINT monitoring dashboards. The signal desk combines public GDELT headlines, topic watch areas, and a searchable/savable research tool library. It uses plain HTML, CSS, and JavaScript, with no build step or dependency install.

## Run locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser. The page can also be opened directly, though a local HTTP server is more reliable for browser API requests.

## What it does

- Loads global news headlines from the public GDELT DOC 2.0 API on page open and when refreshed.
- Filters the feed by watch area, time range, and headline text. “Load more” requests up to 75 results.
- Keeps the research tool library searchable and lets you save favorite links in browser local storage.
- Labels the map as illustrative. It is a visual overview only; this page does not geolocate incidents or run a background collection service.

Headlines are supplied by GDELT and link to their publishers. Treat them as leads and verify details with the original reporting. Feed access requires an internet connection and may be unavailable when the upstream service is down or blocks a request.
