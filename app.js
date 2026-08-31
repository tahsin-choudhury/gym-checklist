/* App logic. Workout content lives in data.js - edit that file, not this one. */
(function () {
  "use strict";

  var STORE_KEY = "gym-checklist-state-v1";

  /* ---------- storage ---------------------------------------------------- */

  // Local calendar date, e.g. "2026-08-31". Not UTC, so it flips at your midnight.
  function today() {
    var d = new Date();
    return d.getFullYear() + "-" +
      String(d.getMonth() + 1).padStart(2, "0") + "-" +
      String(d.getDate()).padStart(2, "0");
  }

  function emptyState() {
    return { date: today(), tab: DAYS[0].id, checked: {} };
  }

  function loadState() {
    var state;
    try {
      state = JSON.parse(localStorage.getItem(STORE_KEY));
    } catch (e) {
      state = null;
    }
    if (!state || typeof state !== "object") return emptyState();
    if (!state.checked || typeof state.checked !== "object") state.checked = {};
    if (!state.tab) state.tab = DAYS[0].id;
    // New calendar day: wipe the checkmarks, keep the tab you were on.
    if (state.date !== today()) {
      state.date = today();
      state.checked = {};
    }
    return state;
  }

  function saveState() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch (e) {
      /* private mode or quota full - the app still works for this session */
    }
  }

  var state = loadState();
  saveState(); // write back immediately, e.g. after an automatic new-day reset

  /* ---------- helpers ---------------------------------------------------- */

  function dayById(id) {
    for (var i = 0; i < DAYS.length; i++) {
      if (DAYS[i].id === id) return DAYS[i];
    }
    return null;
  }

  // Every checkable item gets a stable key: "day1:w2" (warm-up) or "day1:e5".
  function itemKey(dayId, group, index) { return dayId + ":" + group + index; }

  function isChecked(key) { return state.checked[key] === true; }

  function setChecked(key, value) {
    if (value) state.checked[key] = true;
    else delete state.checked[key];
    saveState();
  }

  function dayItemKeys(day) {
    var keys = [], i;
    for (i = 0; i < WARMUP.length; i++) keys.push(itemKey(day.id, "w", i));
    for (i = 0; i < day.exercises.length; i++) keys.push(itemKey(day.id, "e", i));
    return keys;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- rendering -------------------------------------------------- */

  var tabsEl = document.getElementById("tabs");
  var viewEl = document.getElementById("view");
  var headerEl = document.getElementById("app-header");
  var titleEl = document.getElementById("view-title");
  var subtitleEl = document.getElementById("view-subtitle");
  var countEl = document.getElementById("progress-count");
  var fillEl = document.getElementById("progress-fill");

  function renderTabs() {
    tabsEl.innerHTML = "";
    var tabs = DAYS.map(function (d) { return { id: d.id, label: d.tab }; });
    tabs.push({ id: "notes", label: "Notes" });

    tabs.forEach(function (t) {
      var btn = el("button", "tab", t.label);
      btn.type = "button";
      if (t.id === state.tab) btn.classList.add("is-active");
      btn.setAttribute("aria-current", t.id === state.tab ? "page" : "false");
      btn.addEventListener("click", function () {
        state.tab = t.id;
        saveState();
        render();
        window.scrollTo(0, 0);
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderProgress(day) {
    if (!day) {
      headerEl.classList.add("no-progress");
      headerEl.classList.remove("is-complete");
      titleEl.textContent = "Notes";
      subtitleEl.textContent = "Reference";
      countEl.textContent = "";
      fillEl.style.width = "0%";
      return;
    }
    headerEl.classList.remove("no-progress");
    titleEl.textContent = day.tab;
    subtitleEl.textContent = day.title;

    var keys = dayItemKeys(day);
    var done = keys.filter(isChecked).length;
    countEl.textContent = done + "/" + keys.length;
    fillEl.style.width = (keys.length ? (done / keys.length) * 100 : 0) + "%";
    headerEl.classList.toggle("is-complete", keys.length > 0 && done === keys.length);
  }

  function makeRow(dayId, group, index, item) {
    var key = itemKey(dayId, group, index);
    var row = el("button", "row");
    row.type = "button";
    row.setAttribute("aria-pressed", isChecked(key) ? "true" : "false");
    if (isChecked(key)) row.classList.add("is-checked");

    var box = el("span", "box");
    box.setAttribute("aria-hidden", "true");
    row.appendChild(box);

    var body = el("span", "row-body");

    var nameLine = el("span", "row-name");
    nameLine.appendChild(document.createTextNode(item.name));
    if (item.shoulder) {
      nameLine.appendChild(el("span", "badge", "SHOULDER CARE"));
    }
    body.appendChild(nameLine);

    var metaBits = [];
    if (item.sets) metaBits.push(item.sets);
    if (item.rest) metaBits.push("rest " + item.rest);
    if (metaBits.length) body.appendChild(el("span", "row-meta", metaBits.join("   ·   ")));
    if (item.cue) body.appendChild(el("span", "row-cue", item.cue));

    row.appendChild(body);

    row.addEventListener("click", function () {
      var next = !isChecked(key);
      setChecked(key, next);
      row.classList.toggle("is-checked", next);
      row.setAttribute("aria-pressed", next ? "true" : "false");
      renderProgress(dayById(dayId));
    });

    return row;
  }

  function renderDay(day) {
    viewEl.innerHTML = "";

    var warmSection = el("section", "section");
    warmSection.appendChild(el("h2", "section-title", "Warm-up"));
    var warmList = el("div", "list");
    WARMUP.forEach(function (item, i) {
      warmList.appendChild(makeRow(day.id, "w", i, item));
    });
    warmSection.appendChild(warmList);
    viewEl.appendChild(warmSection);

    var mainSection = el("section", "section");
    mainSection.appendChild(el("h2", "section-title", "Exercises"));
    var mainList = el("div", "list");
    day.exercises.forEach(function (item, i) {
      mainList.appendChild(makeRow(day.id, "e", i, item));
    });
    mainSection.appendChild(mainList);
    viewEl.appendChild(mainSection);

    var reset = el("button", "reset-btn", "Reset checkmarks for " + day.tab);
    reset.type = "button";
    reset.addEventListener("click", function () {
      if (!window.confirm("Clear all checkmarks for " + day.tab + "?")) return;
      dayItemKeys(day).forEach(function (k) { delete state.checked[k]; });
      saveState();
      render();
    });
    viewEl.appendChild(reset);

    viewEl.appendChild(el("p", "footnote",
      "Checkmarks save automatically and clear on their own the next day."));
  }

  function renderNotes() {
    viewEl.innerHTML = "";
    NOTES.forEach(function (note) {
      var section = el("section", "section");
      section.appendChild(el("h2", "section-title", note.title));
      var card = el("div", "note");
      if (note.text) card.appendChild(el("p", "note-text", note.text));
      if (note.list) {
        var ul = el("ul", "note-list");
        note.list.forEach(function (line) { ul.appendChild(el("li", null, line)); });
        card.appendChild(ul);
      }
      section.appendChild(card);
      viewEl.appendChild(section);
    });
    viewEl.appendChild(el("p", "footnote", "Reference only - nothing here to check off."));
  }

  function render() {
    // Handles the app being left open overnight.
    if (state.date !== today()) {
      state.date = today();
      state.checked = {};
      saveState();
    }
    renderTabs();
    var day = dayById(state.tab);
    renderProgress(day);
    if (day) renderDay(day);
    else renderNotes();
  }

  render();

  // Re-check the date when the app comes back to the foreground.
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden && state.date !== today()) render();
  });

  /* ---------- service worker -------------------------------------------- */

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () {
        /* offline caching unavailable (e.g. opened over file://) */
      });
    });
  }
})();
