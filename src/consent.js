(function () {
  const KEY = "azhuryel_cookie_consent_v1";

  function readConsent() {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }

  function writeConsent(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
  }

  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const essentialBtn = document.getElementById("cookie-essential");
  const acceptBtn = document.getElementById("cookie-accept");

  const consent = readConsent();

  if (!consent) {
    banner.style.display = "block";
  } else {
    banner.style.display = "none";
  }

  function close(choice) {
    writeConsent(choice);
    banner.style.display = "none";
  }

  if (essentialBtn) {
    essentialBtn.addEventListener("click", () => close("essential"));
  }

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => close("accepted"));
  }
})();
