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

  // 8) Bags page: build cards from OG_CONFIG.BAGS
  var bagGrid = document.getElementById("bags-grid");
  if (bagGrid) {
    var bags = C.BAGS || [];
    var esc = function (t) { return String(t == null ? "" : t).replace(/[&<>"']/g, function (ch) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]; }); };
    var linkFor = function (l) {
      if (!l) return shopUrl("ALL");
      if (/^https?:\/\//i.test(l)) return l;
      return base ? base + (l.charAt(0) === "/" ? l : "/" + l) : "#";
    };
    var money = function (p) { var n = Number(p); return isNaN(n) ? esc(p) : "$" + (n % 1 ? n.toFixed(2) : n); };
    bagGrid.innerHTML = bags.map(function (b) {
      var label = esc(b.name) + (b.type ? " – " + esc(b.type) : "");
      return '<a class="card bag-card" href="' + esc(linkFor(b.link)) + '" target="_blank" rel="noopener">' +
        (b.image ? '<div class="bag-img"><img src="' + esc(b.image) + '" alt="' + label + '" loading="lazy" width="600" height="380"></div>'
                 : '<div class="ph"><span class="ph-label">Photo coming soon</span></div>') +
        '<div class="card-body"><span class="bag-type">' + esc(b.type) + '</span><h3>' + esc(b.name) + '</h3>' +
        '<div class="bag-row"><span class="price">' + money(b.price) + '</span><span class="card-link">Buy &rarr;</span></div></div></a>';
    }).join("");
    var cnt = document.getElementById("bags-count");
    if (cnt) cnt.textContent = bags.length + (bags.length === 1 ? " bag" : " bags");
    if (C.BAGS_SECTION_TITLE) document.querySelectorAll("[data-bags-title]").forEach(function (el) { el.textContent = C.BAGS_SECTION_TITLE; });
  }
})();
