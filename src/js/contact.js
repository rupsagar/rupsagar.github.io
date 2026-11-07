(function () {
    document.addEventListener("DOMContentLoaded", function () {
        var form = document.getElementById("contact-form");
        if (!form) return;

        var status = document.getElementById("form-status");
        var submitBtn = form.querySelector('button[type="submit"]');

        var hideTimer = null;

        function setStatus(text, kind) {
            clearTimeout(hideTimer);
            status.textContent = text;
            status.className = "form-status" + (kind ? " is-" + kind : "");
            if (kind === "success") {
                hideTimer = setTimeout(function () { setStatus(""); }, 3000);
            }
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            if (form.botcheck && form.botcheck.checked) {
                form.reset();
                setStatus("Thank you! Your message has been sent.", "success");
                return;
            }

            var data = new FormData(form);
            if (!data.get("h-captcha-response")) {
                setStatus("Please complete the captcha before sending.", "error");
                return;
            }

            submitBtn.disabled = true;
            setStatus("Sending…");

            fetch(form.action, {
                method: "POST",
                headers: { Accept: "application/json" },
                body: data
            })
                .then(function (res) {
                    return res.json().then(function (json) { return { ok: res.ok, json: json }; });
                })
                .then(function (r) {
                    if (r.ok && r.json.success) {
                        form.reset();
                        setStatus("Thank you! Your message has been sent. I will get back to you soon.", "success");
                    } else {
                        setStatus((r.json && r.json.message) || "Something went wrong. Please try again.", "error");
                    }
                })
                .catch(function () {
                    setStatus("Could not send the message. Please check your connection and try again.", "error");
                })
                .finally(function () {
                    submitBtn.disabled = false;
                    if (window.hcaptcha) {
                        try { window.hcaptcha.reset(); } catch (err) { }
                    }
                });
        });
    });
})();
