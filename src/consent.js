(function () {
  const KEY = "azhuryel_cookie_consent_v1";

  function getConsent() {
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
  }

  const banner = document.getElementById("cookie-banner");
  if (!banner) return;

  const consent = getConsent();
  if (!consent) {
    banner.style.display = "block";
  }

  const btnEssential = document.getElementById("cookie-essential");
  const btnAccept = document.getElementById("cookie-accept");

  function closeBanner(choice) {
    setConsent(choice);
    banner.style.display = "none";
  }

  if (btnEssential) {
    btnEssential.addEventListener("click", () => closeBanner("essential"));
  }

  if (btnAccept) {
    btnAccept.addEventListener("click", () => closeBanner("accepted"));
  }
})();
