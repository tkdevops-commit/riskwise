# Fieldnotes OSINT workspace

A small, browser based OSINT launchpad. It uses plain HTML, CSS, and JavaScript, so there is no build step or dependency install.

## Run locally

From this folder, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser. You can also open `index.html` directly.

Tools are listed in `app.js`. Saved tools are kept in the browser's local storage.
