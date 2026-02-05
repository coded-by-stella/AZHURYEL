// src/quiz.js
(function () {
  const form = document.getElementById("rebalance-quiz");
  if (!form) return;

  const errorEl = document.getElementById("quiz-error");
  const resultBox = document.getElementById("quiz-result");
  const titleEl = document.getElementById("result-title");
  const descEl = document.getElementById("result-description");
  const nextEl = document.getElementById("result-nextstep");
  const hiddenResultEl = document.getElementById("quiz-result-hidden");

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
        "Your energy and motivation move in waves. You can enter intense focus and then crash, avoid, or feel emptied out. This often happens when your system relies on urgency to perform and collapses when urgency disappears.",
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

  function getResult() {
    const counts = { HYPER: 0, HOLDER: 0, CYCLICAL: 0, DISCONNECTED: 0 };
    const data = new FormData(form);

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

    return profiles[winner];
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const res = getResult();
    if (!res) {
      errorEl.style.display = "block";
      resultBox.style.display = "none";
      return;
    }

    errorEl.style.display = "none";
    titleEl.textContent = res.title;
    descEl.textContent = res.description;
    nextEl.textContent = res.nextStep;

    if (hiddenResultEl) hiddenResultEl.value = res.title;

    resultBox.style.display = "block";
    resultBox.scrollIntoView({ behavior: "smooth", block: "start" });
  });
})();
