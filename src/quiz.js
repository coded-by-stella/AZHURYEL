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
      title: "Your result: The Hyper-Activated Leader",
      description:
        "You can lead, decide and perform, but your system stays on high alert. Even when nothing is urgent, your body carries tension and your mind keeps scanning. This is not weakness. It is a nervous system that learned to stay ready.",
      nextStep:
        "Grounded next step: build a short daily downshift ritual that teaches your body safety again. We start by regulating first, then we work on the pressure loop that keeps you in permanent alert.",
    },
    HOLDER: {
      title: "Your result: The Responsible Holder",
      description:
        "You are the person who carries more than your share. You anticipate problems, protect outcomes and often take responsibility for everyone’s stability. Over time, this can turn rest into guilt and support into discomfort.",
      nextStep:
        "Grounded next step: identify the responsibility pattern you are over-holding and practice one clean boundary this week. We work on nervous system safety, emotional release and sustainable leadership support.",
    },
    CYCLICAL: {
      title: "Your result: The Cyclical Burner",
      description:
        "Your energy and motivation move in waves. You can enter intense focus and then crash, avoid or feel emptied out. This often happens when your system relies on urgency to perform and collapses when urgency disappears.",
      nextStep:
        "Grounded next step: rebuild rhythm before pushing for more output. We start with micro-structures that stabilize your baseline so your work stops requiring burnout to happen.",
    },
    DISCONNECTED: {
      title: "Your result: The Disconnected Performer",
      description:
        "You function, deliver and stay in control, but something feels emotionally distant. Achievements may not land inside you. This is often what happens when the system adapts by numbing to keep going.",
      nextStep:
        "Grounded next step: restore presence through gentle reconnection practices that feel safe, not forced. We work on regulation, emotional access and energetic coherence so life feels like yours again.",
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
