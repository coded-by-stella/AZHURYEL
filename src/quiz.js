(function () {
  const form = document.getElementById("rebalance-quiz");
  if (!form) return;

  const errorEl = document.getElementById("quiz-error");

  const hiddenProfile = document.getElementById("quiz-profile-hidden");
  const hiddenTitle = document.getElementById("quiz-title-hidden");
  const hiddenDesc = document.getElementById("quiz-desc-hidden");
  const hiddenNext = document.getElementById("quiz-next-hidden");

  function getAnswerValue(name) {
    const checked = form.querySelector(`input[name="${name}"]:checked`);
    return checked ? checked.value : null;
  }

  function computeProfile() {
    const counts = {
      HYPER: 0,
      HOLDER: 0,
      CYCLICAL: 0,
      DISCONNECTED: 0,
    };

    for (let i = 1; i <= 8; i++) {
      const v = getAnswerValue(`q${i}`);
      if (v && counts[v] !== undefined) counts[v] += 1;
    }

    let bestKey = "HYPER";
    let bestVal = -1;

    Object.keys(counts).forEach((k) => {
      if (counts[k] > bestVal) {
        bestVal = counts[k];
        bestKey = k;
      }
    });

    return bestKey;
  }

  function profileCopy(profile) {
    const map = {
      HYPER: {
        title: "The Hyper Alert Leader",
        desc: "Your system stays on guard even when work is done.You carry tension in your body and speed in your mind.Rest does not fully restore you because your nervous system is still scanning for what could go wrong.",
        next: "Next step: rebuild calm focus through nervous system regulation and clean calendar boundaries so your body learns safety again.",
      },
      HOLDER: {
        title: "The Responsibility Holder",
        desc: "You hold everything together.You take care of people, outcomes, and details, often before yourself.Rest can feel undeserved because your mind is still carrying the load.",
        next: "Next step: build delegation, boundaries, and leadership structure while releasing the belief that everything depends on you.",
      },
      CYCLICAL: {
        title: "The Sprint and Crash Leader",
        desc: "You can push hard and deliver, then your energy drops.You move through intense effort cycles followed by shutdown, fatigue, or avoidance.This pattern burns motivation and makes life feel unstable.",
        next: "Next step: create a sustainable weekly rhythm and stabilise energy with structure and spiritual regulation practices.",
      },
      DISCONNECTED: {
        title: "The Disconnected Achiever",
        desc: "You keep performing but you feel distant inside.Achievements do not feel satisfying and presence is hard to access.This often happens when pressure has been running for too long without real recovery.",
        next: "Next step: restore emotional connection and vitality while rebuilding boundaries that protect your private life.",
      },
    };

    return map[profile] || map.HYPER;
  }

  function fillHiddenFields() {
    const profile = computeProfile();
    const copy = profileCopy(profile);

    if (hiddenProfile) hiddenProfile.value = profile;
    if (hiddenTitle) hiddenTitle.value = copy.title;
    if (hiddenDesc) hiddenDesc.value = copy.desc;
    if (hiddenNext) hiddenNext.value = copy.next;
  }

  form.addEventListener("submit", (e) => {
    if (errorEl) errorEl.style.display = "none";

    if (!form.checkValidity()) {
      e.preventDefault();
      if (errorEl) errorEl.style.display = "block";
      form.reportValidity();
      return;
    }

    fillHiddenFields();
  });
})();
