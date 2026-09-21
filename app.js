(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) r(e);
  new MutationObserver((e) => {
    for (const a of e)
      if (a.type === "childList")
        for (const c of a.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && r(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(e) {
    const a = {};
    return (
      e.integrity && (a.integrity = e.integrity),
      e.referrerPolicy && (a.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : e.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
      a
    );
  }
  function r(e) {
    if (e.ep) return;
    e.ep = !0;
    const a = n(e);
    fetch(e.href, a);
  }
})();
document.addEventListener("DOMContentLoaded", () => {
  (D(), $(), N(), P(), H(), O(), Y(), F(), z(), V(), _());
});
function D() {
  const t = new Date("2026-09-28T23:59:59+05:30").getTime();
  function o() {
    const n = new Date().getTime(),
      r = t - n;
    if (r < 0) {
      document.getElementById("countdown-timer").innerHTML =
        '<span class="time-number">EXPO IS LIVE NOW</span>';
      return;
    }
    const e = Math.floor(r / (1e3 * 60 * 60 * 24)),
      a = Math.floor((r % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60)),
      c = Math.floor((r % (1e3 * 60 * 60)) / (1e3 * 60)),
      l = Math.floor((r % (1e3 * 60)) / 1e3),
      i = (m) => String(m).padStart(2, "0"),
      s = document.getElementById("count-days"),
      d = document.getElementById("count-hours"),
      u = document.getElementById("count-minutes"),
      p = document.getElementById("count-seconds");
    (s && (s.textContent = i(e)),
      d && (d.textContent = i(a)),
      u && (u.textContent = i(c)),
      p && (p.textContent = i(l)));
  }
  (o(), setInterval(o, 1e3));
}
let I = 1;
const A = 4;
function $() {
  const t = document.getElementById("btn-next-step-1"),
    o = document.getElementById("btn-next-step-2"),
    n = document.getElementById("btn-next-step-3"),
    r = document.getElementById("btn-back-step-2"),
    e = document.getElementById("btn-back-step-3"),
    a = document.getElementById("btn-back-step-4");
  (t &&
    t.addEventListener("click", () => {
      T() && f(2);
    }),
    o &&
      o.addEventListener("click", () => {
        q() && f(3);
      }),
    n &&
      n.addEventListener("click", () => {
        w() && (M(), f(4));
      }),
    r && r.addEventListener("click", () => f(1)),
    e && e.addEventListener("click", () => f(2)),
    a && a.addEventListener("click", () => f(3)));
    const btnNext4 = document.getElementById("btn-next-step-4"),
          btnBack5 = document.getElementById("btn-back-step-5");
    btnNext4 && btnNext4.addEventListener("click", () => { f(5); });
    btnBack5 && btnBack5.addEventListener("click", () => f(4));
  for (let i = 1; i <= A; i++) {
    const s = document.getElementById(`step-btn-${i}`);
    s &&
      s.addEventListener("click", () => {
        i < I
          ? f(i)
          : i === I + 1 &&
            (I === 1 && T()
              ? f(2)
              : I === 2 && q()
                ? f(3)
                : I === 3 && w()
                  ? (M(), f(4))
                  : I === 4 && (f(5)));
      });
  }
  const c = document.getElementById("dummy-project-abstract"),
    l = document.getElementById("dummy-abstract-char-count");
  c &&
    l &&
    c.addEventListener("input", () => {
      l.textContent = `${c.value.length} / 600 chars`;
    });
}
function f(t) {
  I = t;
  for (let n = 1; n <= A; n++) {
    const r = document.getElementById(`pane-step-${n}`),
      e = document.getElementById(`step-btn-${n}`);
    (r && (n === t ? r.classList.add("active") : r.classList.remove("active")),
      e &&
        (e.classList.remove("active"),
        n < t ? e.classList.add("completed") : e.classList.remove("completed"),
        n === t && e.classList.add("active")));
  }
  if (t === 3) {
    const n =
        document.getElementById("leader-name").value.trim() || "Team Leader",
      r =
        document.getElementById("leader-email").value.trim() ||
        "leader@college.edu.in",
      e = document.getElementById("leader-dept").value || "Engineering",
      a = document.getElementById("leader-year").value || "UG",
      c = document.getElementById("preview-leader-name"),
      l = document.getElementById("preview-leader-details");
    (c && (c.textContent = n), l && (l.textContent = `${r} • ${e} (${a})`));
  }
  const o = document.getElementById("wizard-root");
  o && o.scrollIntoView({ behavior: "smooth", block: "start" });
}
function g(t, o, n) {
  const r = document.getElementById(t),
    e = document.getElementById(o);
  (r && r.classList.add("input-error"), e && (e.textContent = n));
}
function y(t, o) {
  const n = document.getElementById(t),
    r = document.getElementById(o);
  (n && n.classList.remove("input-error"), r && (r.textContent = ""));
}
function j(t) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t);
}
function T() {
  let t = !0;
  const o = document.getElementById("team-name").value.trim(),
    n = document.getElementById("leader-name").value.trim(),
    r = document.getElementById("leader-email").value.trim(),
    e = document.getElementById("leader-phone").value.trim(),
    a = document.getElementById("leader-dept").value,
    c = document.getElementById("leader-year").value;
  return (
    o
      ? y("team-name", "err-team-name")
      : (g("team-name", "err-team-name", "Team name is required."), (t = !1)),
    n
      ? y("leader-name", "err-leader-name")
      : (g(
          "leader-name",
          "err-leader-name",
          "Team leader full name is required.",
        ),
        (t = !1)),
    !r || !j(r)
      ? (g(
          "leader-email",
          "err-leader-email",
          "Please provide a valid leader email address.",
        ),
        (t = !1))
      : y("leader-email", "err-leader-email"),
    !e || e.length < 8
      ? (g(
          "leader-phone",
          "err-leader-phone",
          "Valid contact WhatsApp number is required.",
        ),
        (t = !1))
      : y("leader-phone", "err-leader-phone"),
    a
      ? y("leader-dept", "err-leader-dept")
      : (g(
          "leader-dept",
          "err-leader-dept",
          "Please select leader department.",
        ),
        (t = !1)),
    c
      ? y("leader-year", "err-leader-year")
      : (g("leader-year", "err-leader-year", "Please select academic year."),
        (t = !1)),
    t
  );
}
function q() {
  let t = !0;
  const o = document.getElementById("project-title").value.trim();
  return (
    o
      ? y("project-title", "err-project-title")
      : (g("project-title", "err-project-title", "Project title is required."),
        (t = !1)),
    t
  );
}
function w() {
  const o = document
      .getElementById("dynamic-members-container")
      .querySelectorAll(".member-card-dynamic"),
    n = document.getElementById("err-members-general");
  if ((n && (n.textContent = ""), o.length < 0))
    return (
      n &&
        (n.textContent =
          "Please add at least 0 team member in addition to the leader (minimum 1 members required)."),
      !1
    );
  let r = !0;
  return (
    o.forEach((e, a) => {
      const c = e.querySelector(".member-name"),
        l = e.querySelector(".member-email");
      (c.value.trim()
        ? c.classList.remove("input-error")
        : (c.classList.add("input-error"), (r = !1)),
        !l.value.trim() || !j(l.value.trim())
          ? (l.classList.add("input-error"), (r = !1))
          : l.classList.remove("input-error"));
    }),
    !r &&
      n &&
      (n.textContent =
        "Please fill out all required name and email fields for your squad members."),
    r
  );
}
function P() {
  const t = document.querySelectorAll(".track-card");
  t.forEach((n) => {
    n.addEventListener("click", () => {
      (t.forEach((e) => e.classList.remove("selected")),
        n.classList.add("selected"));
      const r = n.querySelector('input[type="radio"]');
      r && (r.checked = !0);
    });
  });
  const o = document.querySelectorAll(".pill-radio");
  o.forEach((n) => {
    n.addEventListener("click", () => {
      (o.forEach((e) => e.classList.remove("selected")),
        n.classList.add("selected"));
      const r = n.querySelector('input[type="radio"]');
      r && (r.checked = !0);
    });
  });
}
function H() {
  const t = document.getElementById("dummy-tech-tag-container"),
    o = document.getElementById("dummy-selected-tech-stacks");
  if (!t || !o) return;
  t.querySelectorAll(".dummy-tech-tag").forEach((e) => {
    e.addEventListener("click", () => {
      (e.classList.toggle("active"), r());
    });
  });
  function r() {
    const e = [];
    (t.querySelectorAll(".tech-tag.active").forEach((a) => {
      e.push(a.getAttribute("data-tech") || a.textContent.trim());
    }),
      (o.value = e.join(", ")));
  }
}
function N() {
  const t = document.getElementById("dynamic-members-container"),
    o = document.getElementById("btn-add-member"),
    n = document.getElementById("member-counter");
  (
    o &&
      o.addEventListener("click", () => {
        const a = t.querySelectorAll(".member-card-dynamic").length;
        a < 2
          ? r(a + 2)
          : alert(
              "Maximum team size reached (3 members including Team Leader).",
            );
      }));
  function r(a) {
    const c = document.createElement("div");
    ((c.className = "member-card-dynamic"),
      (c.innerHTML = `
      <div class="member-card-header">
        <span class="member-num-badge">
          <span>👤 Member #${a}</span>
        </span>
        <button type="button" class="btn-remove-member" title="Remove member">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          Remove
        </button>
      </div>
      <div class="form-row">
        <div class="form-group col-6">
          <label class="form-label required">Member Full Name</label>
          <input type="text" class="form-input member-name" placeholder="Collaborator Name" required>
        </div>
        <div class="form-group col-6">
          <label class="form-label required">Email Address</label>
          <input type="email" class="form-input member-email" placeholder="member@college.edu.in" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-4">
          <label class="form-label">Department</label>
          <select class="form-input form-select member-dept">
            <option value="CSE" selected>Computer Science (CSE)</option>
            <option value="AI&DS">AI & Data Science</option>
            <option value="IT">Information Technology</option>
            <option value="ECE">Electronics (ECE)</option>
            <option value="EEE">Electrical (EEE)</option>
            <option value="MECH">Mechanical</option>
            <option value="Other">Other Branch</option>
          </select>
        </div>
        <div class="form-group col-4">
          <label class="form-label">Academic Year</label>
          <select class="form-input form-select member-year">
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year" selected>3rd Year</option>
          </select>
        </div>
        <div class="form-group col-4">
          <label class="form-label">Role in Team</label>
          <input type="text" class="form-input member-role" placeholder="e.g. Frontend / ML / Hardware" value="Full Stack Dev">
        </div>
      </div>
    `),
      c.querySelector(".btn-remove-member").addEventListener("click", () => {
        if (t.querySelectorAll(".member-card-dynamic").length <= 0) {
          return;
        }
        (c.remove(), e());
      }),
      t.appendChild(c),
      e());
  }
  function e() {
    const a = t.querySelectorAll(".member-card-dynamic");
    (a.forEach((c, l) => {
      const i = c.querySelector(".member-num-badge");
      i && (i.innerHTML = `<span>👤 Member #${l + 2}</span>`);
    }),
      n && (n.textContent = a.length + 1));
  }
}
function M() {
  const t = document.getElementById("team-name").value.trim(),
    
    r = document.getElementById("project-title").value.trim(),
    
    a = document.getElementById("leader-name").value.trim(),
    c = document.getElementById("leader-email").value.trim(),
    l = document.getElementById("leader-dept").value,
    i = document.getElementById("leader-year").value,
    s = document.getElementById("rev-team-name"),
    u = document.getElementById("rev-project-title"),
    p = document.getElementById("rev-leader"),
    m = document.getElementById("rev-dept-year"),
    v = document.getElementById("rev-abstract"),
    E = document.getElementById("rev-members-list");
  if (
    (s && (s.textContent = t),
    u && (u.textContent = r),
    p && (p.textContent = `${a} (${c})`),
    m && (m.textContent = `${l} • ${i}`),
    v && (v.textContent = e),
    E)
  ) {
    E.innerHTML = "";
    const B = document.createElement("span");
    ((B.className = "member-chip"),
      (B.innerHTML = `<strong>👑 Leader:</strong> ${a} (${l})`),
      E.appendChild(B),
      document
        .querySelectorAll("#dynamic-members-container .member-card-dynamic")
        .forEach((b, L) => {
          const k =
              b.querySelector(".member-name").value.trim() || `Member ${L + 2}`,
            C = b.querySelector(".member-role").value.trim() || "Collaborator",
            h = b.querySelector(".member-dept").value || "",
            x = document.createElement("span");
          ((x.className = "member-chip"),
            (x.innerHTML = `<strong>#${L + 2}:</strong> ${k} · ${C} (${h})`),
            E.appendChild(x));
        }));
  }
}
function O() {
  const t = document.getElementById("registration-form"),
    o = document.getElementById("registration-success-card");
  if (!t) return;
  t.addEventListener("submit", (c) => {
    c.preventDefault();
    const l = document.getElementById("accept-rules"),
      i = document.getElementById("err-accept-rules");
    if (l.checked) i && (i.textContent = "");
    else {
      i &&
        (i.textContent =
          "You must accept the terms, guidelines, and declaration to proceed.");
      return;
    }
    const d = `EXP-2K26-MINT-${Math.floor(1e3 + Math.random() * 9e3)}`,
      u = document.getElementById("team-name").value.trim(),
      p = document.getElementById("leader-name").value.trim(),
      m = document.getElementById("leader-email").value.trim(),
      v = document.querySelector('input[name="project_track"]:checked'),
      E = v ? v.value : "AI & Machine Learning",
      B = document.getElementById("project-title").value.trim(),
      S = document.getElementById("ticket-pass-id"),
      b = document.getElementById("ticket-team-name"),
      L = document.getElementById("ticket-track"),
      k = document.getElementById("ticket-leader");
    (S && (S.textContent = d),
      b && (b.textContent = u),
      L && (L.textContent = E),
      k && (k.textContent = p));
    const C = {
      passId: d,
      teamName: u,
      leaderName: p,
      leaderEmail: m,
      trackName: E,
      projectTitle: B,
      registeredAt: new Date().toISOString(),
    };
    try {
      const h = JSON.parse(
        localStorage.getItem("project_expo_registrations") || "[]",
      );
      (h.unshift(C),
        localStorage.setItem("project_expo_registrations", JSON.stringify(h)));
    } catch (h) {
      console.warn("LocalStorage error", h);
    }
    (t.classList.add("hidden"),
      document.querySelector(".wizard-stepper").classList.add("hidden"),
      o.classList.remove("hidden"),
      R(),
      o.scrollIntoView({ behavior: "smooth", block: "center" }));
  });
  const n = document.getElementById("btn-print-ticket");
  n &&
    n.addEventListener("click", () => {
      window.print();
    });
  const r = document.getElementById("btn-copy-id");
  r &&
    r.addEventListener("click", () => {
      const c = document.getElementById("ticket-pass-id").textContent.trim();
      navigator.clipboard.writeText(c).then(() => {
        ((r.innerHTML = "<span>✓ Copied to Clipboard!</span>"),
          setTimeout(() => {
            r.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy Pass ID</span>
          `;
          }, 2500));
      });
    });
  const e = document.getElementById("btn-go-submit");
  e &&
    e.addEventListener("click", (c) => {
      const l = document.getElementById("ticket-pass-id").textContent.trim(),
        i = document.getElementById("project-title").value.trim(),
        s = document.getElementById("sub-pass-id"),
        d = document.getElementById("sub-project-title");
      (s && (s.value = l), d && (d.value = i));
    });
  const a = document.getElementById("btn-register-another");
  a &&
    a.addEventListener("click", () => {
      (t.reset(),
        t.classList.remove("hidden"),
        document.querySelector(".wizard-stepper").classList.remove("hidden"),
        o.classList.add("hidden"),
        f(1));
    });
}
function R() {
  const t = document.getElementById("confetti-canvas");
  if (!t) return;
  t.innerHTML = "";
  const o = ["#18e299", "#0c8c5e", "#1fa77a", "#04547c", "#ffa723", "#d87cff"];
  for (let n = 0; n < 40; n++) {
    const r = document.createElement("div"),
      e = o[Math.floor(Math.random() * o.length)],
      a = Math.random() * 100,
      c = 1.5 + Math.random() * 2,
      l = 6 + Math.random() * 8;
    ((r.style.cssText = `
      position: absolute;
      top: -10px;
      left: ${a}%;
      width: ${l}px;
      height: ${l * 1.5}px;
      background-color: ${e};
      border-radius: 2px;
      opacity: 0.9;
      transform: rotate(${Math.random() * 360}deg);
      animation: fallDown ${c}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      pointer-events: none;
      z-index: 10;
    `),
      t.appendChild(r));
  }
}
function Y() {
  const t = document.getElementById("submission-form"),
    o = document.getElementById("sub-success-alert");
  if (!t) return;
  t.addEventListener("submit", (r) => {
    r.preventDefault();
    const e = document.getElementById("sub-pass-id").value.trim(),
      a = document.getElementById("sub-project-title").value.trim(),
      c = document.getElementById("sub-ppt-link").value.trim();
    let l = !0;
    if (
      (e
        ? y("sub-pass-id", "err-sub-pass-id")
        : (g(
            "sub-pass-id",
            "err-sub-pass-id",
            "Registration Pass ID is required.",
          ),
          (l = !1)),
      a
        ? y("sub-project-title", "err-sub-title")
        : (g(
            "sub-project-title",
            "err-sub-title",
            "Project Title is required.",
          ),
          (l = !1)),
      !c || !c.startsWith("http")
        ? (g(
            "sub-ppt-link",
            "err-sub-ppt",
            "Valid URL to PPT presentation (Drive/OneDrive) is required.",
          ),
          (l = !1))
        : y("sub-ppt-link", "err-sub-ppt"),
      !l)
    )
      return;
    o && o.classList.remove("hidden");
    const i = document.getElementById("btn-submit-project");
    i &&
      ((i.innerHTML = "<span>✓ Materials Logged Successfully</span>"),
      (i.disabled = !0),
      setTimeout(() => {
        ((i.disabled = !1),
          (i.innerHTML = "<span>Update Submitted Materials</span>"));
      }, 4e3));
  });
  const n = document.getElementById("btn-download-ppt-template");
  n &&
    n.addEventListener("click", () => {
      alert(
        "Official Project Expo 2K26 Keynote & Presentation Template (.pptx) download initiated!",
      );
    });
}
function F() {
  const t = document.querySelectorAll(".faq-item");
  (t.forEach((n) => {
    n.querySelector(".faq-question").addEventListener("click", () => {
      const e = n.classList.contains("open");
      (t.forEach((a) => a.classList.remove("open")),
        e || n.classList.add("open"));
    });
  }),
    t.length > 0 && t[0].classList.add("open"));
  const o = document.getElementById("faq-search-input");
  o &&
    o.addEventListener("input", (n) => {
      const r = n.target.value.toLowerCase().trim();
      t.forEach((e) => {
        const a = e.textContent.toLowerCase(),
          c = (e.getAttribute("data-keywords") || "").toLowerCase();
        a.includes(r) || c.includes(r)
          ? (e.style.display = "block")
          : (e.style.display = "none");
      });
    });
}
function z() {
  const t = document.getElementById("contact-form"),
    o = document.getElementById("contact-toast");
  t &&
    t.addEventListener("submit", (n) => {
      (n.preventDefault(),
        t.reset(),
        o &&
          (o.classList.remove("hidden"),
          setTimeout(() => o.classList.add("hidden"), 5e3)));
    });
}
function V() {
  const t = document.getElementById("btn-demo-autofill");
  t &&
    t.addEventListener("click", () => {
      const o = document.getElementById("team-name"),
        n = document.getElementById("leader-name"),
        r = document.getElementById("leader-email"),
        e = document.getElementById("leader-phone"),
        a = document.getElementById("leader-dept"),
        c = document.getElementById("leader-year");
      (o && (o.value = "NeuroVanguard Systems"),
        n && (n.value = "Siddharth Ramanathan"),
        r && (r.value = "siddharth.r@college.edu.in"),
        e && (e.value = "+91 98401 23456"),
        a && (a.value = "Artificial Intelligence & Data Science (AI&DS)"),
        c && (c.value = "3rd Year (Junior)"));
      const l = document.getElementById("project-title"),
        i = document.getElementById("dummy-project-abstract"),
        s = document.getElementById("repo-link"),
        d = document.getElementById("demo-link");
      if (
        (l &&
          (l.value =
            "AuraMed: Edge-AI Assisted Remote Triage & Autonomous Medical Drone Dispatch"),
        i)
      ) {
        i.value =
          "AuraMed integrates on-device computer vision models with real-time telemetry to prioritize rural emergency medical kits. When an incident is verified through our Flutter patient app, an autonomous fixed-wing quadcopter calculates optimal wind vectors to dispatch defibrillators and epinephrine within 7 minutes.";
        const m = document.getElementById("dummy-abstract-char-count");
        m && (m.textContent = `${i.value.length} / 600 chars`);
      }
      (s && (s.value = "https://github.com/neurovanguard/auramed-edge"),
        d && (d.value = "https://youtu.be/sample-auramed-demo"));
      const u = document.getElementById("dynamic-members-container");
      if (u) {
        const m = u.querySelectorAll(".member-card-dynamic");
        if (m.length > 0) {
          const v = m[0];
          ((v.querySelector(".member-name").value = "Pooja Venkatesh"),
            (v.querySelector(".member-email").value = "pooja.v@college.edu.in"),
            (v.querySelector(".member-role").value =
              "Edge ML & Embedded Systems"));
        }
      }
      const p = document.getElementById("registration");
      (p && p.scrollIntoView({ behavior: "smooth" }),
        (t.innerHTML = "<span>⚡ Demo Loaded!</span>"),
        setTimeout(() => {
          t.innerHTML = `
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m13 2-2 2.5h3L11 9l7-3.5-3 1.5 4-5.5z"/><path d="M12 22v-6"/></svg>
        Demo Fill
      `;
        }, 2500));
    });
}
function _() {
  const t = document.querySelectorAll("section[id]"),
    o = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    let n = "";
    const r = window.pageYOffset + 120;
    (t.forEach((e) => {
      const a = e.offsetTop,
        c = e.offsetHeight;
      r >= a && r < a + c && (n = e.getAttribute("id"));
    }),
      o.forEach((e) => {
        (e.classList.remove("active"),
          e.getAttribute("href") === `#${n}` && e.classList.add("active"));
      }));
  });
}

// ADMIN PORTAL & SUBMISSION LOGIC
document.addEventListener("DOMContentLoaded", () => {
  // Submission Save Logic
  const btnSubmitProject = document.getElementById("btn-submit-project");
  if (btnSubmitProject) {
    btnSubmitProject.addEventListener("click", () => {
      const pptFile = document.getElementById("ppt-upload").files[0];
      const githubUrl = document.getElementById("repo-link")?.value.trim() || "";
      const driveUrl = document.getElementById("demo-link")?.value.trim() || "";
      
      if (!pptFile) {
        alert("Please provide the PPT PDF.");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = function(e) {
        const teamData = {
          teamName: document.getElementById("team-name")?.value.trim() || "Unknown Team",
          leaderName: document.getElementById("leader-name")?.value.trim() || "Unknown Leader",
          track: document.querySelector('input[name="project_type"]:checked')?.value || "Software Project",
          pptFileName: pptFile.name,
          pptFileData: e.target.result,
          github: githubUrl,
          drive: driveUrl || "N/A"
        };
        
        let submissions = JSON.parse(localStorage.getItem("expoSubmissions") || "[]");
        submissions.push(teamData);
        try {
            localStorage.setItem("expoSubmissions", JSON.stringify(submissions));
        } catch(err) {
            alert("Warning: LocalStorage quota exceeded (files too large). Submission saved without file.");
            delete teamData.pptFileData;
            submissions.pop();
            submissions.push(teamData);
            localStorage.setItem("expoSubmissions", JSON.stringify(submissions));
        }
        
        showSuccessScreen(teamData.teamName, teamData.leaderName);
      };
      reader.readAsDataURL(pptFile);
    });
  }

  // Admin Portal Login Logic
  const btnAdminLogin = document.getElementById("btn-admin-login");
  if (btnAdminLogin) {
    btnAdminLogin.addEventListener("click", () => {
      const pass = document.getElementById("admin-password").value;
      if (pass === "admin123") {
        document.getElementById("admin-login-view").style.display = "none";
        document.getElementById("admin-dashboard-view").style.display = "block";
        document.getElementById("admin-dashboard-view").classList.remove("hidden");
        
        // Populate table
        const tbody = document.getElementById("admin-table-body");
        tbody.innerHTML = "";
        let submissions = JSON.parse(localStorage.getItem("expoSubmissions") || "[]");
        
        if (submissions.length === 0) {
          tbody.innerHTML = '<tr><td colspan="6" style="padding: 20px; text-align: center; color: var(--color-foreground-muted);">No submissions yet.</td></tr>';
          return;
        }
        
        submissions.forEach(sub => {
          const row = document.createElement("tr");
          row.style.borderBottom = "1px solid var(--color-border)";
          row.innerHTML = `
            <td style="padding: 12px 16px; font-weight: 600;">${sub.teamName}</td>
            <td style="padding: 12px 16px;">${sub.leaderName}</td>
            <td style="padding: 12px 16px;">
              <span class="badge" style="background-color: var(--color-background-subtle); color: var(--accent-color); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">
                ${sub.track}
              </span>
            </td>
            <td style="padding: 12px 16px;">${sub.pptFileData ? `<a href="${sub.pptFileData}" download="${sub.pptFileName}" style="color: var(--accent-color); text-decoration: underline;" title="Download PPT">${sub.pptFileName}</a>` : sub.pptFileName}</td>
            <td style="padding: 12px 16px;">${sub.github && sub.github !== "N/A" ? `<a href="${sub.github.startsWith('http') ? sub.github : 'https://' + sub.github}" target="_blank" style="color: var(--accent-color); text-decoration: underline;">View Code</a>` : "N/A"}</td>
            <td style="padding: 12px 16px;">${sub.drive && sub.drive !== "N/A" ? `<a href="${sub.drive.startsWith('http') ? sub.drive : 'https://' + sub.drive}" target="_blank" style="color: var(--accent-color); text-decoration: underline;">View Assets</a>` : "N/A"}</td>
          `;
          tbody.appendChild(row);
        });
      } else {
        const err = document.getElementById("err-admin-login");
        err.textContent = "Incorrect password.";
        err.style.color = "red";
      }
    });
  }
});

// Hardware/Software Toggle Logic
document.addEventListener("DOMContentLoaded", () => {
  const projectTypeRadios = document.querySelectorAll('input[name="project_type"]');
  const repoGroup = document.getElementById("repo-link-group");
  const demoLabel = document.getElementById("demo-link-label");
  const demoGroup = document.getElementById("demo-link")?.closest('.form-group');

  if (projectTypeRadios.length > 0 && repoGroup && demoLabel) {
    projectTypeRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        if (e.target.value === "Hardware Project") {
          repoGroup.style.display = "none";
          demoLabel.textContent = "Demo Video Link (Optional)";
          if(demoGroup) {
              demoGroup.classList.remove("col-6");
              demoGroup.classList.add("col-12");
          }
        } else {
          repoGroup.style.display = "block";
          demoLabel.textContent = "Live Demo / Video Link (Optional)";
          if(demoGroup) {
              demoGroup.classList.remove("col-12");
              demoGroup.classList.add("col-6");
          }
        }
      });
    });
  }
});

// ==========================================
// 🎉 SUCCESS SCREEN WITH CONFETTI
// ==========================================
function showSuccessScreen(teamName, leaderName) {
  const overlay = document.createElement("div");
  overlay.id = "success-overlay";
  overlay.innerHTML = `
    <style>
      #success-overlay {
        position: fixed;
        inset: 0;
        z-index: 99999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0,0,0,0.6);
        backdrop-filter: blur(8px);
        animation: fadeInOverlay 0.4s ease;
      }
      @keyframes fadeInOverlay {
        from { opacity: 0; } to { opacity: 1; }
      }
      .success-card {
        background: #fff;
        border-radius: 20px;
        padding: 48px 40px;
        text-align: center;
        max-width: 480px;
        width: 90%;
        box-shadow: 0 25px 60px rgba(0,0,0,0.3);
        animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        position: relative;
        overflow: hidden;
      }
      @keyframes scaleIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .success-check {
        width: 80px; height: 80px;
        border-radius: 50%;
        background: linear-gradient(135deg, #12ac76, #0d8c5f);
        display: flex; align-items: center; justify-content: center;
        margin: 0 auto 24px;
        animation: bounceIn 0.6s ease 0.3s both;
        box-shadow: 0 8px 24px rgba(18, 172, 118, 0.35);
      }
      @keyframes bounceIn {
        0% { transform: scale(0); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      .success-check svg { width: 40px; height: 40px; color: #fff; }
      .success-title {
        font-size: 1.8rem; font-weight: 700;
        color: #1a1a2e; margin-bottom: 8px;
        font-family: 'Inter', sans-serif;
      }
      .success-team {
        font-size: 1.1rem; color: #12ac76; font-weight: 600;
        margin-bottom: 16px;
      }
      .success-msg {
        font-size: 0.95rem; color: #6b7280;
        line-height: 1.6; margin-bottom: 28px;
      }
      .success-btn {
        display: inline-flex; align-items: center; gap: 8px;
        padding: 12px 28px;
        background: linear-gradient(135deg, #12ac76, #0d8c5f);
        color: #fff; border: none; border-radius: 10px;
        font-size: 1rem; font-weight: 600;
        cursor: pointer; text-decoration: none;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(18, 172, 118, 0.3);
      }
      .success-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(18, 172, 118, 0.4);
      }
      .success-timer {
        font-size: 0.8rem; color: #9ca3af; margin-top: 16px;
      }
      .confetti-piece {
        position: fixed;
        width: 10px; height: 10px;
        z-index: 100000;
        animation: confettiFall linear forwards;
        pointer-events: none;
      }
      @keyframes confettiFall {
        0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
        100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
      }
    </style>

    <div class="success-card">
      <div class="success-check">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6L9 17l-5-5"/>
        </svg>
      </div>
      <div class="success-title">Registration Complete! 🎉</div>
      <div class="success-team">Team "${teamName}"</div>
      <div class="success-msg">
        Your project has been successfully registered for<br>
        <strong>Project Expo 2K26</strong>.<br>
        The organizing committee will review your submission shortly.
      </div>
      <a href="/index.html" class="success-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        Back to Home
      </a>
      <div class="success-timer">Redirecting in <span id="countdown-timer">8</span>s...</div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Confetti burst
  const colors = ["#12ac76","#f59e0b","#ef4444","#3b82f6","#8b5cf6","#ec4899","#14b8a6"];
  for (let i = 0; i < 60; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (Math.random() * 8 + 6) + "px";
    piece.style.height = (Math.random() * 8 + 6) + "px";
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    piece.style.animationDuration = (Math.random() * 2 + 2) + "s";
    piece.style.animationDelay = (Math.random() * 1) + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4000);
  }

  // Countdown redirect
  let sec = 8;
  const timer = setInterval(() => {
    sec--;
    const el = document.getElementById("countdown-timer");
    if (el) el.textContent = sec;
    if (sec <= 0) { clearInterval(timer); window.location.href = "/index.html"; }
  }, 1000);
}
