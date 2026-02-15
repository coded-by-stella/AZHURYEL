// src/consent.js

(function () {
  const banner = document.getElementById("cookieBanner");
  if (!banner) return;

  const KEY = "azh_cookie_pref"; // "accept" | "reject"

  const existing = localStorage.getItem(KEY);
  if (existing === "accept" || existing === "reject") {
    banner.style.display = "none";
    return;
  }

  const acceptBtn = banner.querySelector("[data-cookie-accept]");
  const rejectBtn = banner.querySelector("[data-cookie-reject]");

  const hide = () => {
    banner.style.display = "none";
  };

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      localStorage.setItem(KEY, "accept");
      hide();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      localStorage.setItem(KEY, "reject");
      hide();
    });
  }
})();
