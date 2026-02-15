// src/quiz.js

(function () {
  const form = document.querySelector("[data-quiz-form]");
  if (!form) return;

  const errorEl = document.querySelector("[data-quiz-error]");

  const getChecked = (name) => {
    const el = form.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const q1 = getChecked("q1");
    const q2 = getChecked("q2");
    const q3 = getChecked("q3");

    const name = form.querySelector("#qname")?.value?.trim() || "";
    const email = form.querySelector("#qemail")?.value?.trim() || "";
    const role = form.querySelector("#qrole")?.value?.trim() || "";
    const company = form.querySelector("#qcompany")?.value?.trim() || "";

    if (!q1 || !q2 || !q3 || !name || !email) {
      if (errorEl) {
        errorEl.textContent =
          "Please answer all questions and fill in name and email.";
      }
      return;
    }

    if (errorEl) errorEl.textContent = "";

    const payload = {
      q1,
      q2,
      q3,
      name,
      email,
      role,
      company,
      ts: new Date().toISOString(),
    };

    localStorage.setItem("azh_quiz_submission", JSON.stringify(payload));
    window.location.href = "thank-you.html";
  });
})();
