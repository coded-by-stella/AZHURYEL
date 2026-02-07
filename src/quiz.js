(function () {
  const quizForm = document.getElementById("rebalance-quiz");
  if (!quizForm) return;

  const errorEl = document.getElementById("quiz-error");
  const emailGate = document.getElementById("email-gate");

  const hiddenProfileEl = document.getElementById("quiz-profile-hidden");
  const hiddenTitleEl = document.getElementById("quiz-title-hidden");
  const hiddenDescEl = document.getElementById("quiz-desc-hidden");
  const hiddenNextEl = document.getElementById("quiz-next-hidden");

  const profiles = {
    HYPER: {
      title: "Your result: The Always-On Leader",
      description:
        "You can lead and deliver, but your system stays on alert. Your mind keeps scanning and your body holds tension. This is not weakness. It is a nervous system trained for constant responsibility.",
      nextStep:
        "Next step: stabilise your nervous system first, then restructure your time. We build a daily downshift ritual and a clean calendar standard so you can switch off without guilt.",
    },
    HOLDER: {
      title: "Your result: The Over-Responsible Holder",
      description:
        "You carry more than your share. You anticipate problems and protect outcomes. Rest often triggers guilt, and delegation can feel unsafe. Over time the business starts consuming the person.",
      nextStep:
        "Next step: choose one responsibility to release this week and define one boundary that protects your private life. We then build a delegation map and belief work to end the “I must” loop.",
    },
    CYCLICAL: {
      title: "Your result: The Burnout Cycle Pattern",
      description:
        "You perform in intense bursts, then crash or shut down. This often happens when urgency fuels output and recovery is not truly built into your system.",
      nextStep:
        "Next step: rebuild rhythm before pushing for more performance. We design your week structure, your energy rules and your stop points so your success stops requiring collapse.",
    },
    DISCONNECTED: {
      title: "Your result: The Disconnected Performer",
      description:
        "You function and achieve, but it does not land emotionally. This is often what happens when the system adapts by numbing to keep going under pressure.",
      nextStep:
        "Next step: restore presence safely, then restructure the workload. We use regulation tools and gentle reconnection practices while redesigning your calendar to create space for real life again.",
    },
  };

  function calculateResult() {
    const counts = { HYPER: 0, HOLDER: 0, CYCLICAL: 0, DISCONNECTED: 0 };
    const data = new FormData(quizForm);

    for (let i = 1; i <= 8; i++) {
      const v = data.get(`q${i}`);
      if (!v) return null;
      counts[v] += 1;
    }

    let winner = "HYPER";
    let max = -1;

    for (const key of Object.keys(counts)) {
      if (counts[key] > max) {
        max = counts[key];
        winner = key;
      }
    }

    return { profile: winner, ...profiles[winner] };
  }

  quizForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const res = calculateResult();
    if (!res) {
      if (errorEl) errorEl.style.display = "block";
      if (emailGate) emailGate.style.display = "none";
      return;
    }

    if (errorEl) errorEl.style.display = "none";

    if (hiddenProfileEl) hiddenProfileEl.value = res.profile;
    if (hiddenTitleEl) hiddenTitleEl.value = res.title;
    if (hiddenDescEl) hiddenDescEl.value = res.description;
    if (hiddenNextEl) hiddenNextEl.value = res.nextStep;

    if (emailGate) {
      emailGate.style.display = "block";
      emailGate.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
})();
