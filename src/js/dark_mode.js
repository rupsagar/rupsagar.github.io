(function () {
    var root = document.documentElement;
    var STORAGE_KEY = "theme";
    var media = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

    function getSaved() {
        try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
    }

    var saved = getSaved();
    root.setAttribute("data-theme",
        saved === "dark" || saved === "light" ? saved : (media && media.matches ? "dark" : "light"));

    function save(theme) {
        try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) { }
    }

    function apply(theme) {
        root.setAttribute("data-theme", theme);
        var btn = document.querySelector(".theme-toggle");
        if (btn) {
            btn.setAttribute("aria-pressed", String(theme === "dark"));
            btn.setAttribute("title", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
        }
    }

    function darkMode() {
        var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        apply(next);
        save(next);
    }

    window.darkMode = darkMode;

    function init() {
        apply(root.getAttribute("data-theme") || (media && media.matches ? "dark" : "light"));
        var btn = document.querySelector(".theme-toggle");
        if (btn) btn.addEventListener("click", darkMode);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    if (media && media.addEventListener) {
        media.addEventListener("change", function (e) {
            if (!getSaved()) apply(e.matches ? "dark" : "light");
        });
    }
})();
