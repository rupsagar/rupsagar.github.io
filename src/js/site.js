(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var dialog = document.querySelector(".lightbox");
        if (!dialog || typeof dialog.showModal !== "function") return;

        var full = dialog.querySelector("img");
        var closeBtn = dialog.querySelector(".lightbox-close");

        document.querySelectorAll(".figure-btn").forEach(function (btn) {
            btn.addEventListener("click", function () {
                var img = btn.querySelector("img");
                full.src = img.currentSrc || img.src;
                full.alt = img.alt;
                dialog.showModal();
            });
        });

        function close() { dialog.close(); }
        closeBtn.addEventListener("click", close);
        full.addEventListener("click", close);
        dialog.addEventListener("click", function (e) {
            if (e.target === dialog) close();
        });
        dialog.addEventListener("close", function () { full.removeAttribute("src"); });
    });
})();
