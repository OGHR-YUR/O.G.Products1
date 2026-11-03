/* O.G. Products – site behavior. Settings live in config.js */
(function () {
  "use strict";
  var C = window.OG_CONFIG || {};
  var base = (C.SHOPIFY_URL || "").replace(/\/+$/, "");
  var cols = C.COLLECTIONS || {};

  function shopUrl(key) {
    if (!base) return "#";
    if (!key || key === "STORE") return base;
    if (key === "CART") return base + (C.CART_PATH || "/cart");
    var path = cols[key] || cols.ALL || "/collections/all";
    return base + (path.charAt(0) === "/" ? path : "/" + path);
  }

  // 1) Point every Shop / category link at Shopify
  document.querySelectorAll("[data-shop]").forEach(function (a) {
    a.href = shopUrl(a.getAttribute("data-shop"));
    a.target = "_blank";
    a.rel = "noopener";
  });

  // 2) Brand name
  if (C.BRAND_NAME) {
    document.querySelectorAll("[data-brand]").forEach(function (el) { el.textContent = C.BRAND_NAME; });
  }

  // 3) Socials (hide empty ones; hide the whole row if none)
  var socials = C.SOCIALS || {};
  document.querySelectorAll(".socials").forEach(function (row) {
    var shown = 0;
    row.querySelectorAll("[data-social]").forEach(function (a) {
      var url = socials[a.getAttribute("data-social")];
      if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; shown++; }
      else { a.remove(); }
    });
    row.hidden = shown === 0;
  });

  // 4) Contact email
  document.querySelectorAll("[data-email]").forEach(function (el) {
    if (C.CONTACT_EMAIL) {
      var a = el.querySelector("a") || el;
      a.href = "mailto:" + C.CONTACT_EMAIL;
      a.textContent = C.CONTACT_EMAIL;
    } else { el.hidden = true; }
  });

  // 5) Mobile menu
  var btn = document.querySelector(".menu-btn"), menu = document.getElementById("mobile-menu");
  if (btn && menu) {
    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); btn.focus(); }
    });
  }

  // 6) Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });

  // 7) Contact form -> Formspree
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var endpoint = C.FORM_ENDPOINT || "";
    var notReady = !endpoint || endpoint.indexOf("REPLACE") !== -1;
    form.action = endpoint;
    if (notReady) {
      var n = document.getElementById("form-notice"); if (n) n.hidden = false;
    }
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      if (form.querySelector(".hp input").value) return; // spam bot
      if (!form.checkValidity()) { form.reportValidity(); return; }
      if (notReady) {
        status.textContent = "The contact form isn't connected yet. Please reach us through the store or social media for now.";
        status.classList.add("err"); return;
      }
      var submit = form.querySelector("[type=submit]");
      submit.disabled = true; status.textContent = "Sending…";
      fetch(endpoint, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error();
          form.reset(); status.textContent = "Thanks! Your message was sent. We'll get back to you soon."; status.classList.add("ok");
        })
        .catch(function () { status.textContent = "Sorry, something went wrong. Please try again in a moment."; status.classList.add("err"); })
        .finally(function () { submit.disabled = false; });
    });
  }
})();
