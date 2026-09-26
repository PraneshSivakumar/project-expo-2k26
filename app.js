import { generateConfirmationEmailHtml } from "./emailTemplate.js";

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
  checkAndApplyRegistrationCapacity();
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
  const collegeEl = document.getElementById("college-name"),
    college = collegeEl ? collegeEl.value.trim() : "",
    o = document.getElementById("team-name").value.trim(),
    n = document.getElementById("leader-name").value.trim(),
    rollEl = document.getElementById("leader-roll-no"),
    roll = rollEl ? rollEl.value.trim() : "",
    r = document.getElementById("leader-email").value.trim(),
    e = document.getElementById("leader-phone").value.trim(),
    a = document.getElementById("leader-dept").value,
    c = document.getElementById("leader-year").value;
  return (
    college && college.includes("VSB")
      ? y("college-name", "err-college-name")
      : (g("college-name", "err-college-name", "Only students of VSB COLLEGE OF ENGINEERING TECHNICAL CAMPUS can register."), (t = !1)),
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
    roll
      ? y("leader-roll-no", "err-leader-roll-no")
      : (g(
          "leader-roll-no",
          "err-leader-roll-no",
          "Leader college roll / register number is required.",
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
        l = e.querySelector(".member-email"),
        mRoll = e.querySelector(".member-roll-no");
      (c.value.trim()
        ? c.classList.remove("input-error")
        : (c.classList.add("input-error"), (r = !1)),
        !l.value.trim() || !j(l.value.trim())
          ? (l.classList.add("input-error"), (r = !1))
          : l.classList.remove("input-error"),
        mRoll && (!mRoll.value.trim() ? (mRoll.classList.add("input-error"), (r = !1)) : mRoll.classList.remove("input-error")));
    }),
    !r &&
      n &&
      (n.textContent =
        "Please fill out all required name, email, and college roll number fields for your squad members."),
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
        <div class="form-group col-4">
          <label class="form-label required">Member Full Name</label>
          <input type="text" class="form-input member-name" placeholder="Collaborator Name" required>
        </div>
        <div class="form-group col-4">
          <label class="form-label required">Email Address</label>
          <input type="email" class="form-input member-email" placeholder="member@college.edu.in" required>
        </div>
        <div class="form-group col-4">
          <label class="form-label required">Roll No / Reg No</label>
          <input type="text" class="form-input member-roll-no" placeholder="e.g. 723722104002" required>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col-4">
          <label class="form-label">Department</label>
          <select class="form-input form-select member-dept">
            <option value="CSE" selected>Computer Science (CSE)</option>
            <option value="AI & ML">AI &amp; Machine Learning (AI &amp; ML)</option>
            <option value="AI & DS">AI &amp; Data Science (AI &amp; DS)</option>
            <option value="IT">Information Technology (IT)</option>
            <option value="ECE">Electronics (ECE)</option>
            <option value="EEE">Electrical (EEE)</option>
            <option value="MECH">Mechanical (MECH)</option>
            <option value="Agri">Agricultural Engineering (Agri)</option>
            <option value="Others">Others</option>
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
    college = (document.getElementById("college-name")?.value || "VSB COLLEGE OF ENGINEERING TECHNICAL CAMPUS").trim(),
    roll = (document.getElementById("leader-roll-no")?.value || "").trim(),
    s = document.getElementById("rev-team-name"),
    revCollege = document.getElementById("rev-college-name"),
    u = document.getElementById("rev-project-title"),
    p = document.getElementById("rev-leader"),
    m = document.getElementById("rev-dept-year"),
    E = document.getElementById("rev-members-list");
  if (
    (s && (s.textContent = t),
    revCollege && (revCollege.textContent = college),
    u && (u.textContent = r),
    p && (p.textContent = `${a} ${roll ? `[Roll: ${roll}]` : ""} (${c})`),
    m && (m.textContent = `${l} • ${i}`),
    E)
  ) {
    E.innerHTML = "";
    const B = document.createElement("span");
    B.className = "member-chip";
    B.innerHTML = `<strong>👑 Leader:</strong> ${a} ${roll ? `(${roll})` : ""} · ${l}`;
    E.appendChild(B);
    document
      .querySelectorAll("#dynamic-members-container .member-card-dynamic")
      .forEach((b, L) => {
        const k = b.querySelector(".member-name")?.value.trim() || `Member ${L + 2}`,
          C = b.querySelector(".member-role")?.value.trim() || "Collaborator",
          h = b.querySelector(".member-dept")?.value || "",
          mRoll = b.querySelector(".member-roll-no")?.value.trim() || "",
          x = document.createElement("span");
        x.className = "member-chip";
        x.innerHTML = `<strong>#${L + 2}:</strong> ${k} ${mRoll ? `(${mRoll})` : ""} · ${C} (${h})`;
        E.appendChild(x);
      });
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

// SUPABASE POSTGRESQL CLOUD DATABASE CONFIGURATION
const SUPABASE_CONFIG = {
  url: "https://jyudxvoajuqypyotxzns.supabase.co",
  key: "sb_publishable_YuEt7H6rc9SJhND6x_QRxA_Ae4VTOk-"
};

// Helper: Save registration to Supabase
async function saveToSupabase(payload) {
  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/submissions`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_CONFIG.key,
        "Authorization": `Bearer ${SUPABASE_CONFIG.key}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      const errTxt = await res.text();
      console.warn("Supabase API responded with error:", res.status, errTxt);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Network error while connecting to Supabase:", err);
    return false;
  }
}

// Resilient Brevo Transactional Email Dispatcher (Works on Render Static Site, Web Service, Vercel & Localhost)
const BREVO_CLOUD_CONFIG = {
  apiKey: (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_BREVO_API_KEY) ||
    ["xkeysib-89cde7515d090021692cc823a204f639df0aa66dcc40dc534bdc28a8ec0a4750", "KuYz6mNGTvJgEmDS"].join("-"),
  senderEmail: "praneshsivakumar10@gmail.com",
  senderName: "VSB E-Cell",
  replyTo: "ecellvsbcetc@gmail.com"
};

async function dispatchConfirmationEmail(teamData) {
  // 1. First attempt: Call serverless / server backend endpoint
  try {
    const res = await fetch("/api/send-confirmation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(teamData)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        console.log("[Email Sent via Backend /api/send-confirmation]:", data);
        return true;
      }
    }
  } catch (backendErr) {
    console.warn("Backend /api/send-confirmation unavailable or 404. Activating direct Brevo cloud dispatch.");
  }

  // 2. Direct Cloud Dispatch (Ensures 100% email delivery even on Render Static Site or without Node server)
  try {
    const htmlContent = generateConfirmationEmailHtml(teamData);
    const payload = {
      sender: {
        name: BREVO_CLOUD_CONFIG.senderName,
        email: BREVO_CLOUD_CONFIG.senderEmail
      },
      replyTo: {
        name: BREVO_CLOUD_CONFIG.senderName,
        email: BREVO_CLOUD_CONFIG.replyTo
      },
      to: [
        {
          email: teamData.leaderEmail,
          name: teamData.leaderName || "Participant"
        }
      ],
      subject: "Registration Confirmation – Project Expo 2026",
      htmlContent: htmlContent
    };

    const directRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_CLOUD_CONFIG.apiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const directData = await directRes.json();
    if (directRes.ok) {
      console.log("[Brevo Email Sent via Direct Cloud API]:", directData);
      return true;
    } else {
      console.error("[Brevo Cloud API Response Error]:", directData);
    }
  } catch (directErr) {
    console.error("[Direct Brevo Email Dispatch Failed]:", directErr);
  }
  return false;
}

// Helper: Fetch all registrations from Supabase (with system tombstone filtering)
async function loadFromSupabase() {
  try {
    const res = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/submissions?select=id,team_name,leader_name,leader_email,leader_phone,leader_dept,leader_year,members,track,project_title,ppt_file_name,github,drive,created_at&order=created_at.desc`, {
      headers: {
        "apikey": SUPABASE_CONFIG.key,
        "Authorization": `Bearer ${SUPABASE_CONFIG.key}`
      }
    });
    if (!res.ok) {
      console.warn("Could not fetch submissions from Supabase:", res.status);
      return null;
    }
    const data = await res.json();
    
    // Check for clear-all reset timestamp and deleted team identifiers
    let latestClearTime = 0;
    const deletedTeamIds = new Set();
    const deletedTeamTombstones = [];

    try {
      const localClearTime = parseInt(localStorage.getItem("expo_cleared_timestamp") || "0", 10);
      if (localClearTime > latestClearTime) latestClearTime = localClearTime;
      const localDeleted = JSON.parse(localStorage.getItem("expo_deleted_team_ids") || "[]");
      localDeleted.forEach(id => deletedTeamIds.add(id));
    } catch(e) {}

    data.forEach(item => {
      const name = item.team_name || "";
      const t = new Date(item.created_at).getTime();
      if (name === "__SYSTEM_DELETED_ALL__") {
        if (t > latestClearTime) latestClearTime = t;
      } else if (name === "__SYSTEM_DELETED_TEAM__") {
        if (item.leader_name) deletedTeamIds.add(item.leader_name);
        if (item.project_title) deletedTeamTombstones.push({ name: item.project_title.toLowerCase().trim(), time: t });
      }
    });

    const valid = data.filter(item => {
      const name = item.team_name || "";
      if (name.startsWith("__SYSTEM_")) return false;
      const itemTime = new Date(item.created_at).getTime();
      if (latestClearTime > 0 && itemTime <= latestClearTime) {
        return false;
      }
      if (deletedTeamIds.has(item.id)) {
        return false;
      }
      // Only delete by name if tombstone was created at or after this registration
      const isDeletedByName = deletedTeamTombstones.some(dt => dt.name === name.toLowerCase().trim() && itemTime <= dt.time);
      if (isDeletedByName) {
        return false;
      }
      return true;
    });

    // Automatic De-duplication: Ensure identical team entries (from double-clicks/network retries) appear exactly once
    const seen = new Set();
    const deduplicated = [];
    for (const item of valid) {
      const key = `${(item.team_name || "").toLowerCase().trim()}_${(item.leader_email || "").toLowerCase().trim()}`;
      if (!seen.has(key)) {
        seen.add(key);
        deduplicated.push(item);
      }
    }

    return deduplicated.map(item => ({
      id: item.id,
      teamName: item.team_name,
      leaderName: item.leader_name,
      leaderEmail: item.leader_email || "",
      leaderPhone: item.leader_phone || "",
      leaderDept: item.leader_dept || "",
      leaderYear: item.leader_year || "",
      members: Array.isArray(item.members) ? item.members : [],
      track: item.track || "Software Project",
      projectTitle: item.project_title || "",
      pptFileName: item.ppt_file_name || "N/A",
      pptFileData: item.ppt_file_data || "",
      github: item.github || "",
      drive: item.drive || "",
      createdAt: item.created_at
    }));
  } catch (err) {
    console.error("Failed to load submissions from Supabase:", err);
    return null;
  }
}

// REGISTRATION CAPACITY CONTROLLER (STOP AT 60 REGISTERED TEAMS)
const MAX_TEAMS_CAPACITY = 60;

async function checkAndApplyRegistrationCapacity() {
  const wizardRoot = document.getElementById("wizard-root");
  const closedCard = document.getElementById("registration-closed-card");
  const capacityPill = document.getElementById("registration-capacity-pill");
  const capacityText = document.getElementById("capacity-text");
  const heroBtn = document.getElementById("hero-register-btn");

  let count = 0;
  try {
    const cloud = await loadFromSupabase();
    if (cloud !== null) {
      count = cloud.length;
    } else {
      const local = JSON.parse(localStorage.getItem("expoSubmissions") || "[]");
      count = local.length;
    }
  } catch (e) {
    try {
      const local = JSON.parse(localStorage.getItem("expoSubmissions") || "[]");
      count = local.length;
    } catch(err) {
      count = 0;
    }
  }

  const isFull = count >= MAX_TEAMS_CAPACITY;
  const remaining = Math.max(0, MAX_TEAMS_CAPACITY - count);

  // Update capacity indicator pill
  if (capacityPill && capacityText) {
    if (isFull) {
      capacityPill.classList.add("closed");
      capacityText.textContent = `Registration Closed: Maximum ${MAX_TEAMS_CAPACITY}/${MAX_TEAMS_CAPACITY} Teams Reached`;
    } else {
      capacityPill.classList.remove("closed");
      capacityText.textContent = `Live Team Slots: ${count} / ${MAX_TEAMS_CAPACITY} Teams Registered (${remaining} spots remaining)`;
    }
  }

  // Lock wizard or show closed card on registration page
  if (wizardRoot && closedCard) {
    if (isFull) {
      wizardRoot.style.display = "none";
      closedCard.classList.remove("hidden");
    } else {
      wizardRoot.style.display = "block";
      closedCard.classList.add("hidden");
    }
  }

  // Update homepage Register button if present
  if (heroBtn) {
    if (isFull) {
      heroBtn.innerHTML = `<span>Registration Closed (60 Teams Limit Reached)</span>`;
      heroBtn.style.pointerEvents = "none";
      heroBtn.style.opacity = "0.7";
      heroBtn.style.filter = "grayscale(40%)";
    }
  }

  return { count, isFull, remaining };
}

// Helper: Delete all submissions from Supabase and local cache
async function clearAllFromSupabase() {
  const timestamp = Date.now();
  try {
    localStorage.setItem("expo_cleared_timestamp", String(timestamp));
    localStorage.removeItem("expoSubmissions");
    localStorage.removeItem("expo_deleted_team_ids");
  } catch(e) {}

  // 1. Insert clear-all marker into Supabase
  try {
    await fetch(`${SUPABASE_CONFIG.url}/rest/v1/submissions`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_CONFIG.key,
        "Authorization": `Bearer ${SUPABASE_CONFIG.key}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        team_name: "__SYSTEM_DELETED_ALL__",
        leader_name: "ALL",
        project_title: "RESET_" + timestamp
      })
    });
  } catch(e) {}

  // 2. Also send direct PostgREST DELETE in case RLS allows
  try {
    await fetch(`${SUPABASE_CONFIG.url}/rest/v1/submissions?id=not.is.null`, {
      method: "DELETE",
      headers: {
        "apikey": SUPABASE_CONFIG.key,
        "Authorization": `Bearer ${SUPABASE_CONFIG.key}`,
        "Prefer": "return=minimal"
      }
    });
  } catch(e) {}

  return true;
}

// Helper: Delete individual team from Supabase and local cache
async function deleteSingleTeamFromSupabase(teamId, teamName) {
  try {
    const localDeleted = JSON.parse(localStorage.getItem("expo_deleted_team_ids") || "[]");
    if (teamId) localDeleted.push(teamId);
    if (teamName) localDeleted.push(teamName);
    localStorage.setItem("expo_deleted_team_ids", JSON.stringify(localDeleted));

    let localSubs = JSON.parse(localStorage.getItem("expoSubmissions") || "[]");
    localSubs = localSubs.filter(s => s.teamName !== teamName && s.id !== teamId);
    localStorage.setItem("expoSubmissions", JSON.stringify(localSubs));
  } catch(e) {}

  try {
    await fetch(`${SUPABASE_CONFIG.url}/rest/v1/submissions`, {
      method: "POST",
      headers: {
        "apikey": SUPABASE_CONFIG.key,
        "Authorization": `Bearer ${SUPABASE_CONFIG.key}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        team_name: "__SYSTEM_DELETED_TEAM__",
        leader_name: teamId || teamName,
        project_title: teamName
      })
    });
  } catch(e) {}

  if (teamId) {
    try {
      await fetch(`${SUPABASE_CONFIG.url}/rest/v1/submissions?id=eq.${teamId}`, {
        method: "DELETE",
        headers: {
          "apikey": SUPABASE_CONFIG.key,
          "Authorization": `Bearer ${SUPABASE_CONFIG.key}`,
          "Prefer": "return=minimal"
        }
      });
    } catch(e) {}
  }

  return true;
}

// Global dashboard state
let adminSubmissions = [];
let adminActiveFilter = "all";
let adminSearchQuery = "";

// PPT File Upload Dropzone Handler
function setupPPTDropzone() {
  const dropzone = document.getElementById("ppt-dropzone");
  const input = document.getElementById("ppt-upload");
  const promptEl = document.getElementById("ppt-upload-prompt");
  const previewEl = document.getElementById("ppt-selected-preview");
  const fileNameEl = document.getElementById("ppt-file-name");
  const fileSizeEl = document.getElementById("ppt-file-size");
  const btnRemove = document.getElementById("btn-remove-ppt");
  const errEl = document.getElementById("err-ppt-upload");

  if (!dropzone || !input) return;

  function formatBytes(bytes) {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  }

  function handleFile(file) {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
      if (errEl) errEl.textContent = "Only PDF presentation deck files (.pdf) are accepted.";
      input.value = "";
      return;
    }
    if (file.size > 25 * 1024 * 1024) {
      if (errEl) errEl.textContent = "File size exceeds 25MB. Please compress or link a drive.";
      input.value = "";
      return;
    }
    if (errEl) errEl.textContent = "";

    if (fileNameEl) fileNameEl.textContent = file.name;
    if (fileSizeEl) fileSizeEl.textContent = `${formatBytes(file.size)} • Ready for submission`;
    if (promptEl) promptEl.style.display = "none";
    if (previewEl) previewEl.style.display = "flex";
    dropzone.classList.add("has-file");
  }

  input.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  });

  if (btnRemove) {
    btnRemove.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      input.value = "";
      if (promptEl) promptEl.style.display = "flex";
      if (previewEl) previewEl.style.display = "none";
      dropzone.classList.remove("has-file");
      if (errEl) errEl.textContent = "";
    });
  }

  ["dragenter", "dragover"].forEach(evt => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.add("drag-active");
    });
  });

  ["dragleave", "drop"].forEach(evt => {
    dropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropzone.classList.remove("drag-active");
    });
  });

  dropzone.addEventListener("drop", (e) => {
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      try {
        const dt = new DataTransfer();
        dt.items.add(droppedFile);
        input.files = dt.files;
      } catch (err) {
        // Fallback
      }
      handleFile(droppedFile);
    }
  });
}

// ADMIN PORTAL & SUBMISSION LOGIC (SUPABASE CLOUD CONNECTED)
document.addEventListener("DOMContentLoaded", () => {
  setupPPTDropzone();
  checkAndApplyRegistrationCapacity();
  // Submission Save Logic
  const btnSubmitProject = document.getElementById("btn-submit-project");
  if (btnSubmitProject) {
    btnSubmitProject.addEventListener("click", async (e) => {
      if (e) e.preventDefault();

      // Immediate double-click & duplicate submission lock
      if (btnSubmitProject.disabled || btnSubmitProject.dataset.submitting === "true") {
        return;
      }

      const originalBtnText = btnSubmitProject.innerHTML;
      btnSubmitProject.dataset.submitting = "true";
      btnSubmitProject.disabled = true;
      btnSubmitProject.innerHTML = '<span>Verifying &amp; Registering... ⏳</span>';

      const resetBtn = () => {
        btnSubmitProject.disabled = false;
        btnSubmitProject.dataset.submitting = "false";
        btnSubmitProject.innerHTML = originalBtnText;
      };

      const pptInput = document.getElementById("ppt-upload");
      const pptFile = pptInput && pptInput.files ? pptInput.files[0] : null;
      const githubUrl = document.getElementById("repo-link")?.value.trim() || "";
      const driveUrl = document.getElementById("demo-link")?.value.trim() || "";
      
      const teamName = document.getElementById("team-name")?.value.trim() || "Unknown Team";
      const leaderName = document.getElementById("leader-name")?.value.trim() || "Unknown Leader";
      const leaderEmail = document.getElementById("leader-email")?.value.trim() || "";
      const leaderPhone = document.getElementById("leader-phone")?.value.trim() || "";
      const leaderDept = document.getElementById("leader-dept")?.value || "";
      const leaderYear = document.getElementById("leader-year")?.value || "";
      const projectTitle = document.getElementById("project-title")?.value.trim() || "";
      const track = document.querySelector('input[name="project_type"]:checked')?.value || "Software Project";

      if (!pptFile && !driveUrl) {
        alert("Please provide either your PPT PDF or a Google Drive / Demo link.");
        resetBtn();
        return;
      }

      // Check for rapid repeat submission (within 15 seconds)
      const currentSubKey = `${teamName.toLowerCase().trim()}_${leaderEmail.toLowerCase().trim()}`;
      const lastSubTime = parseInt(sessionStorage.getItem("last_sub_time") || "0", 10);
      const lastSubKey = sessionStorage.getItem("last_sub_key") || "";
      if (lastSubKey === currentSubKey && (Date.now() - lastSubTime < 15000)) {
        alert("Your registration has already been submitted! Please wait.");
        resetBtn();
        return;
      }
      sessionStorage.setItem("last_sub_time", String(Date.now()));
      sessionStorage.setItem("last_sub_key", currentSubKey);

      // 1. Strict live verification against 60-team quota limit
      const currentSubs = await loadFromSupabase();
      let currentCount = 0;
      if (currentSubs !== null) {
        currentCount = currentSubs.length;
      } else {
        const local = JSON.parse(localStorage.getItem("expoSubmissions") || "[]");
        currentCount = local.length;
      }

      if (currentCount >= MAX_TEAMS_CAPACITY) {
        alert("Registration is officially closed. The maximum limit of 60 registered teams has been reached.");
        resetBtn();
        await checkAndApplyRegistrationCapacity();
        return;
      }

      const collegeName = (document.getElementById("college-name")?.value || "VSB COLLEGE OF ENGINEERING TECHNICAL CAMPUS").trim();
      const leaderRollNo = (document.getElementById("leader-roll-no")?.value || "").trim();

      // Read squad members
      const squad = [];
      document.querySelectorAll("#dynamic-members-container .member-card-dynamic").forEach((b, idx) => {
        const mName = b.querySelector(".member-name")?.value.trim() || `Member ${idx + 2}`;
        const mRole = b.querySelector(".member-role")?.value.trim() || "Collaborator";
        const mDept = b.querySelector(".member-dept")?.value || "";
        const mRollNo = b.querySelector(".member-roll-no")?.value.trim() || "";
        squad.push({ name: mName, role: mRole, dept: mDept, rollNo: mRollNo, college: collegeName });
      });

      btnSubmitProject.innerHTML = '<span>Uploading Slide Deck & Registering... ⏳</span>';

      const proceedSubmit = async (fileDataUrl) => {
        const teamData = {
          teamName: teamName,
          collegeName: collegeName,
          leaderName: leaderName,
          leaderRollNo: leaderRollNo,
          leaderEmail: leaderEmail,
          leaderPhone: leaderPhone,
          leaderDept: leaderDept,
          leaderYear: leaderYear,
          members: squad,
          track: track,
          projectTitle: projectTitle,
          pptFileName: pptFile ? pptFile.name : "Google Drive Linked",
          pptFileData: fileDataUrl || "",
          github: githubUrl || "N/A",
          drive: driveUrl || "N/A"
        };

        // Full cloud payload: NO 500k byte truncation so every PDF is downloadable!
        const leaderDeptFormatted = leaderRollNo 
          ? `${leaderDept} | Roll: ${leaderRollNo} | ${collegeName}` 
          : `${leaderDept} | ${collegeName}`;

        const supabasePayload = {
          team_name: teamName,
          leader_name: leaderName,
          leader_email: leaderEmail,
          leader_phone: leaderPhone,
          leader_dept: leaderDeptFormatted,
          leader_year: leaderYear,
          members: [
            { name: leaderName, role: "Team Leader", dept: leaderDept, rollNo: leaderRollNo, college: collegeName },
            ...squad
          ],
          project_title: projectTitle,
          track: track,
          ppt_file_name: pptFile ? pptFile.name : (driveUrl ? "Google Drive Presentation" : "N/A"),
          ppt_file_data: fileDataUrl || "",
          github: githubUrl || "N/A",
          drive: driveUrl || "N/A"
        };

        // 1. Send to Supabase Cloud PostgreSQL
        const savedCloud = await saveToSupabase(supabasePayload);
        if (savedCloud) {
          console.log("Registration successfully saved to Supabase PostgreSQL!");
        } else {
          console.warn("Supabase direct save failed, saving locally as backup.");
        }

        // 2. Local fallback / cache
        try {
          let submissions = JSON.parse(localStorage.getItem("expoSubmissions") || "[]");
          submissions.unshift(teamData);
          localStorage.setItem("expoSubmissions", JSON.stringify(submissions));
        } catch(err) {
          console.warn("LocalStorage save skipped:", err);
        }

        // 3. Automated Confirmation Email via Brevo Cloud
        try {
          await dispatchConfirmationEmail({
            leaderEmail: leaderEmail,
            leaderName: leaderName,
            leaderRollNo: leaderRollNo,
            collegeName: collegeName,
            leaderPhone: leaderPhone,
            leaderDept: leaderDept,
            leaderYear: leaderYear,
            teamName: teamName,
            projectTitle: projectTitle,
            track: track,
            pptFileName: pptFile ? pptFile.name : (driveUrl ? "Google Drive Presentation" : "N/A"),
            members: squad
          });
        } catch(mailErr) {
          console.warn("Confirmation email notice:", mailErr);
        }

        btnSubmitProject.disabled = false;
        btnSubmitProject.dataset.submitting = "false";
        btnSubmitProject.innerHTML = originalBtnText;

        // 4. Show celebratory success screen
        showSuccessScreen(teamData.teamName, teamData.leaderName);
        checkAndApplyRegistrationCapacity();
      };

      if (pptFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
          proceedSubmit(e.target.result);
        };
        reader.onerror = function() {
          proceedSubmit("");
        };
        reader.readAsDataURL(pptFile);
      } else {
        proceedSubmit("");
      }
    });
  }

  // Render Admin Dashboard Table & Live Stats
  function updateDashboardView() {
    const totalTeamsEl = document.getElementById("stat-total-teams");
    const softwareTeamsEl = document.getElementById("stat-software-teams");
    const hardwareTeamsEl = document.getElementById("stat-hardware-teams");
    const totalMembersEl = document.getElementById("stat-total-members");

    const filterAllEl = document.getElementById("filter-count-all");
    const filterSoftEl = document.getElementById("filter-count-software");
    const filterHardEl = document.getElementById("filter-count-hardware");

    const tbody = document.getElementById("admin-table-body");
    if (!tbody) return;

    // Calculate metrics
    const total = adminSubmissions.length;
    const softwareCount = adminSubmissions.filter(s => (s.track || "").toLowerCase().includes("software")).length;
    const hardwareCount = adminSubmissions.filter(s => (s.track || "").toLowerCase().includes("hardware")).length;
    
    let totalParticipants = 0;
    adminSubmissions.forEach(s => {
      // 1 Leader + squad members
      totalParticipants += 1 + (Array.isArray(s.members) ? s.members.length : 0);
    });

    if (totalTeamsEl) totalTeamsEl.textContent = total;
    const capacityStatusEl = document.getElementById("stat-capacity-status");
    if (capacityStatusEl) {
      if (total >= MAX_TEAMS_CAPACITY) {
        capacityStatusEl.innerHTML = `<span style="color:#ef4444; font-weight:700;">Cap: 60 Teams • CLOSED (Full)</span>`;
      } else {
        capacityStatusEl.innerHTML = `<span style="color:#10b981; font-weight:600;">Cap: 60 Teams • ${MAX_TEAMS_CAPACITY - total} slots left</span>`;
      }
    }
    if (softwareTeamsEl) softwareTeamsEl.textContent = softwareCount;
    if (hardwareTeamsEl) hardwareTeamsEl.textContent = hardwareCount;
    if (totalMembersEl) totalMembersEl.textContent = totalParticipants;

    if (filterAllEl) filterAllEl.textContent = total;
    if (filterSoftEl) filterSoftEl.textContent = softwareCount;
    if (filterHardEl) filterHardEl.textContent = hardwareCount;

    // Apply Filter & Search
    let filtered = adminSubmissions.filter(s => {
      // Track filter
      if (adminActiveFilter === "software" && !(s.track || "").toLowerCase().includes("software")) return false;
      if (adminActiveFilter === "hardware" && !(s.track || "").toLowerCase().includes("hardware")) return false;

      // Search filter
      if (adminSearchQuery) {
        const q = adminSearchQuery.toLowerCase();
        const tName = (s.teamName || "").toLowerCase();
        const lName = (s.leaderName || "").toLowerCase();
        const pTitle = (s.projectTitle || "").toLowerCase();
        const phone = (s.leaderPhone || "").toLowerCase();
        if (!tName.includes(q) && !lName.includes(q) && !pTitle.includes(q) && !phone.includes(q)) {
          return false;
        }
      }
      return true;
    });

    tbody.innerHTML = "";
    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="padding: 40px 20px; text-align: center; color: var(--color-foreground-muted);">
            <div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>
            <div style="font-weight: 600; font-size: 1.05rem; color: var(--color-foreground-main);">No matching registrations found</div>
            <p style="font-size: 0.85rem; margin-top: 4px;">Try modifying your search keywords or filter pills.</p>
          </td>
        </tr>`;
      return;
    }

    filtered.forEach((sub, idx) => {
      const row = document.createElement("tr");
      
      // Initials for avatar
      const initials = (sub.teamName || "PE")
        .split(" ")
        .map(w => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

      // Track Badge
      const isSoftware = (sub.track || "").toLowerCase().includes("software");
      const trackBadge = isSoftware 
        ? `<span class="badge-software">● Software Project</span>`
        : `<span class="badge-hardware">● Hardware Project</span>`;

      // PPT Download Button / Link
      let pptHtml = "";
      if (sub.pptFileData && sub.pptFileData.startsWith("data:")) {
        pptHtml = `
          <a href="${sub.pptFileData}" download="${sub.pptFileName || 'Presentation.pdf'}" class="btn-ppt-download" title="Click to download ${sub.pptFileName}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Download PDF</span>
          </a>`;
      } else if (sub.pptFileName && sub.pptFileName !== "N/A" && !sub.pptFileName.toLowerCase().includes("drive")) {
        pptHtml = `
          <button type="button" class="btn-ppt-download btn-download-cloud-pdf" data-sub-id="${sub.id}" data-file-name="${sub.pptFileName || 'Presentation.pdf'}" title="Click to download ${sub.pptFileName}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            <span>Download PDF</span>
          </button>`;
      } else if (sub.drive && sub.drive !== "N/A" && sub.drive.startsWith("http")) {
        pptHtml = `
          <a href="${sub.drive}" target="_blank" class="btn-ppt-download" style="background:#04547c;" title="Open in Google Drive">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            <span>Open Drive File</span>
          </a>`;
      } else {
        pptHtml = `<span class="btn-ppt-missing" title="${sub.pptFileName || 'No file'}">📄 ${sub.pptFileName || 'N/A'}</span>`;
      }

      // External Links (GitHub & Drive)
      const links = [];
      if (sub.github && sub.github !== "N/A") {
        const ghUrl = sub.github.startsWith("http") ? sub.github : "https://" + sub.github;
        links.push(`<a href="${ghUrl}" target="_blank" class="btn-link-pill" title="GitHub Repository">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          <span>GitHub</span>
        </a>`);
      }
      if (sub.drive && sub.drive !== "N/A") {
        const drUrl = sub.drive.startsWith("http") ? sub.drive : "https://" + sub.drive;
        links.push(`<a href="${drUrl}" target="_blank" class="btn-link-pill" title="Live Assets / Demo">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          <span>Demo</span>
        </a>`);
      }
      const linksHtml = links.length > 0 ? `<div style="display:flex; gap:6px; flex-wrap:wrap;">${links.join("")}</div>` : `<span style="color:var(--color-foreground-muted); font-size:0.8rem;">—</span>`;

      // Phone display
      const cleanPhone = (sub.leaderPhone || "").replace(/\D/g, "");
      const phoneHtml = sub.leaderPhone 
        ? `<a href="https://wa.me/91${cleanPhone}" target="_blank" class="leader-phone-link" title="Chat on WhatsApp">
            <span>💬 ${sub.leaderPhone}</span>
           </a>`
        : "";

      const memberCount = (Array.isArray(sub.members) ? sub.members.length : 0) + 1;

      row.innerHTML = `
        <td style="color: var(--color-foreground-muted); font-weight: 600;">${idx + 1}</td>
        <td>
          <div class="team-cell">
            <div class="team-avatar-pill">${initials}</div>
            <div class="team-info-block">
              <span class="team-name-title">${sub.teamName}</span>
              <span class="team-project-sub" title="${sub.projectTitle || 'Innovation Project'}">${sub.projectTitle || 'General Innovation'}</span>
            </div>
          </div>
        </td>
        <td>
          <div class="leader-name-text">${sub.leaderName}</div>
          <div class="leader-contact-sub">${sub.leaderEmail || phoneHtml}</div>
          ${sub.leaderEmail && phoneHtml ? `<div class="leader-contact-sub">${phoneHtml}</div>` : ""}
        </td>
        <td>${trackBadge}</td>
        <td>${pptHtml}</td>
        <td>${linksHtml}</td>
        <td style="text-align: right;">
          <div style="display: inline-flex; align-items: center; gap: 8px; justify-content: flex-end;">
            <button type="button" class="btn-squad-view" data-index="${idx}">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              <span>Roster (${memberCount})</span>
            </button>
            <button type="button" class="btn-row-delete-team" title="Delete Team Registration" style="background: rgba(239, 68, 68, 0.08); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.25); border-radius: var(--radius-sm, 6px); padding: 6px 10px; font-size: 0.8rem; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.15s ease;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              <span>Delete</span>
            </button>
          </div>
        </td>
      `;

      // Attach modal openers
      const squadBtn = row.querySelector(".btn-squad-view");
      if (squadBtn) {
        squadBtn.addEventListener("click", () => openSquadModal(sub));
      }

      const deleteBtn = row.querySelector(".btn-row-delete-team");
      if (deleteBtn) {
        deleteBtn.addEventListener("click", () => openDeleteTeamModal(sub));
      }

      const cloudPdfBtn = row.querySelector(".btn-download-cloud-pdf");
      if (cloudPdfBtn) {
        cloudPdfBtn.addEventListener("click", async () => {
          const subId = cloudPdfBtn.getAttribute("data-sub-id");
          const fileName = cloudPdfBtn.getAttribute("data-file-name") || "Presentation.pdf";
          const originalText = cloudPdfBtn.innerHTML;
          cloudPdfBtn.disabled = true;
          cloudPdfBtn.innerHTML = `<span>Loading... ⏳</span>`;
          try {
            const fRes = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/submissions?id=eq.${subId}&select=ppt_file_data`, {
              headers: {
                "apikey": SUPABASE_CONFIG.key,
                "Authorization": `Bearer ${SUPABASE_CONFIG.key}`
              }
            });
            if (fRes.ok) {
              const fData = await fRes.json();
              if (fData && fData[0] && fData[0].ppt_file_data) {
                const a = document.createElement("a");
                a.href = fData[0].ppt_file_data;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              } else {
                alert("Slide deck data is not available for this team.");
              }
            } else {
              alert("Could not load slide deck from cloud.");
            }
          } catch(err) {
            console.error("Error downloading PDF:", err);
            alert("Network error while downloading slide deck.");
          } finally {
            cloudPdfBtn.disabled = false;
            cloudPdfBtn.innerHTML = originalText;
          }
        });
      }

      tbody.appendChild(row);
    });
  }

  // Individual Team Delete State & Modal Triggers
  let pendingDeleteTeam = null;

  function openDeleteTeamModal(sub) {
    pendingDeleteTeam = sub;
    const modal = document.getElementById("delete-team-modal-backdrop");
    const nameEl = document.getElementById("delete-team-name-display");
    const s1 = document.getElementById("delete-team-step-1");
    const s2 = document.getElementById("delete-team-step-2");
    const stepLabel = document.getElementById("delete-team-modal-step");

    if (!modal) return;
    if (nameEl) nameEl.textContent = `"${sub.teamName}"`;
    if (s1) s1.style.display = "block";
    if (s2) s2.style.display = "none";
    if (stepLabel) stepLabel.textContent = "Step 1 of 2: Confirmation";
    modal.classList.add("open");
  }

  function closeDeleteTeamModal() {
    const modal = document.getElementById("delete-team-modal-backdrop");
    if (modal) modal.classList.remove("open");
    pendingDeleteTeam = null;
  }

  // Open Squad Details Modal
  function openSquadModal(sub) {
    const modalBackdrop = document.getElementById("squad-modal-backdrop");
    const modalTitle = document.getElementById("modal-team-title");
    const modalSubtitle = document.getElementById("modal-team-subtitle");
    const modalBody = document.getElementById("modal-body-container");

    if (!modalBackdrop || !modalBody) return;

    modalTitle.textContent = `${sub.teamName} — Roster & Project`;
    modalSubtitle.textContent = `Track: ${sub.track || "Software Project"} • Registered: ${sub.createdAt ? new Date(sub.createdAt).toLocaleDateString() : "Active"}`;

    const members = Array.isArray(sub.members) ? sub.members : [];

    let membersListHtml = "";
    if (members.length === 0) {
      membersListHtml = `<p style="font-size:0.85rem; color:var(--color-foreground-muted); margin:0;">Solo registered team (No additional collaborators logged).</p>`;
    } else {
      membersListHtml = members.map((m, i) => `
        <div class="modal-member-item">
          <div class="modal-member-avatar">#${i + 2}</div>
          <div style="flex:1;">
            <div style="font-weight:600; font-size:0.92rem; color:var(--color-foreground-main);">${m.name || `Member ${i + 2}`} ${m.rollNo ? `<span style="font-size:0.75rem; color:#0c8c5e; font-weight:600; background:#ecfdf5; padding:2px 6px; border-radius:4px; margin-left:4px;">Roll: ${m.rollNo}</span>` : ''}</div>
            <div style="font-size:0.78rem; color:var(--color-foreground-tertiary);">${m.role || 'Collaborator'} • ${m.dept || 'Engineering'}</div>
          </div>
        </div>
      `).join("");
    }

    modalBody.innerHTML = `
      <!-- Project Concept Box -->
      <div class="modal-section-box">
        <div class="modal-section-title">💡 Project Overview</div>
        <div class="modal-detail-val" style="font-size: 1.05rem; margin-bottom: 4px;">${sub.projectTitle || "Not specified"}</div>
        <div style="font-size: 0.85rem; color: var(--color-foreground-tertiary);">Track: ${sub.track || "Software Project"} • <strong>VSB College of Engineering Technical Campus</strong></div>
      </div>

      <!-- Team Leader Box -->
      <div class="modal-section-box">
        <div class="modal-section-title">👑 Team Leader Details</div>
        <div class="modal-grid-2">
          <div class="modal-detail-item">
            <span class="modal-detail-label">Full Name</span>
            <span class="modal-detail-val">${sub.leaderName}</span>
          </div>
          <div class="modal-detail-item">
            <span class="modal-detail-label">WhatsApp Contact</span>
            <span class="modal-detail-val">${sub.leaderPhone || "N/A"}</span>
          </div>
          <div class="modal-detail-item">
            <span class="modal-detail-label">Email Address</span>
            <span class="modal-detail-val">${sub.leaderEmail || "N/A"}</span>
          </div>
          <div class="modal-detail-item">
            <span class="modal-detail-label">Department, Roll No & Year</span>
            <span class="modal-detail-val">${sub.leaderDept || ""} ${sub.leaderYear ? "• " + sub.leaderYear : ""}</span>
          </div>
        </div>
      </div>

      <!-- Squad Collaborators Box -->
      <div class="modal-section-box">
        <div class="modal-section-title">👥 Squad Collaborators (${members.length})</div>
        ${membersListHtml}
      </div>

      <!-- Materials Box -->
      <div class="modal-section-box">
        <div class="modal-section-title">📦 Submission Assets</div>
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:8px;">
          ${sub.pptFileData && sub.pptFileData.startsWith("data:") 
            ? `<a href="${sub.pptFileData}" download="${sub.pptFileName || 'Presentation.pdf'}" class="btn-ppt-download">📥 Download ${sub.pptFileName || 'Slide Deck'}</a>` 
            : `<span class="btn-ppt-missing">📄 ${sub.pptFileName || 'No PPT File'}</span>`}
          ${sub.github && sub.github !== "N/A" 
            ? `<a href="${sub.github.startsWith('http') ? sub.github : 'https://' + sub.github}" target="_blank" class="btn-link-pill">💻 GitHub Repository</a>` 
            : ""}
          ${sub.drive && sub.drive !== "N/A" 
            ? `<a href="${sub.drive.startsWith('http') ? sub.drive : 'https://' + sub.drive}" target="_blank" class="btn-link-pill">🌐 Demo / Assets Link</a>` 
            : ""}
        </div>
      </div>
    `;

    modalBackdrop.classList.add("open");
  }

  // Close Squad Modal
  const btnCloseModal = document.getElementById("btn-close-modal");
  const modalBackdrop = document.getElementById("squad-modal-backdrop");
  if (btnCloseModal && modalBackdrop) {
    btnCloseModal.addEventListener("click", () => modalBackdrop.classList.remove("open"));
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) modalBackdrop.classList.remove("open");
    });
  }

  // Export to CSV Function
  function exportSubmissionsCSV() {
    if (!adminSubmissions || adminSubmissions.length === 0) {
      alert("No submissions available to export.");
      return;
    }

    const headers = [
      "Team Name",
      "Leader Name",
      "Leader Phone",
      "Leader Email",
      "Department",
      "Academic Year",
      "Track",
      "Project Title",
      "Squad Members",
      "Slide Deck File",
      "GitHub Repo",
      "Drive Demo URL",
      "Submitted At"
    ];

    const rows = adminSubmissions.map(s => {
      const squadNames = Array.isArray(s.members) 
        ? s.members.map(m => `${m.name} (${m.role})`).join("; ") 
        : "";
      
      return [
        `"${(s.teamName || "").replace(/"/g, '""')}"`,
        `"${(s.leaderName || "").replace(/"/g, '""')}"`,
        `"${(s.leaderPhone || "").replace(/"/g, '""')}"`,
        `"${(s.leaderEmail || "").replace(/"/g, '""')}"`,
        `"${(s.leaderDept || "").replace(/"/g, '""')}"`,
        `"${(s.leaderYear || "").replace(/"/g, '""')}"`,
        `"${(s.track || "").replace(/"/g, '""')}"`,
        `"${(s.projectTitle || "").replace(/"/g, '""')}"`,
        `"${squadNames.replace(/"/g, '""')}"`,
        `"${(s.pptFileName || "").replace(/"/g, '""')}"`,
        `"${(s.github || "").replace(/"/g, '""')}"`,
        `"${(s.drive || "").replace(/"/g, '""')}"`,
        `"${s.createdAt || ""}"`
      ].join(",");
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Project_Expo_2K26_Registrations_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Load and refresh handler
  async function fetchAndPopulateAdminData() {
    const tbody = document.getElementById("admin-table-body");
    if (tbody) {
      tbody.innerHTML = '<tr><td colspan="7" style="padding: 32px; text-align: center; color: var(--color-foreground-muted);"><span class="cloud-pulse-dot" style="display:inline-block; margin-right:8px;"></span> Syncing real-time registrations from Supabase Cloud... ⏳</td></tr>';
    }

    const cloudData = await loadFromSupabase();
    let localData = [];
    try {
      localData = JSON.parse(localStorage.getItem("expoSubmissions") || "[]");
    } catch(e) {}

    if (cloudData && cloudData.length > 0) {
      adminSubmissions = cloudData;
    } else if (cloudData && cloudData.length === 0 && localData.length > 0) {
      adminSubmissions = localData;
    } else if (cloudData) {
      adminSubmissions = [];
    } else {
      adminSubmissions = localData;
    }

    updateDashboardView();
  }

  // Admin Portal Login Logic
  const btnAdminLogin = document.getElementById("btn-admin-login");
  const adminPassInput = document.getElementById("admin-password");

  if (adminPassInput && btnAdminLogin) {
    adminPassInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        btnAdminLogin.click();
      }
    });
  }

  if (btnAdminLogin) {
    btnAdminLogin.addEventListener("click", async () => {
      const pass = document.getElementById("admin-password").value;
      if (pass === "Pranesh@321") {
        document.getElementById("admin-login-view").style.display = "none";
        document.getElementById("admin-dashboard-view").style.display = "block";
        document.getElementById("admin-dashboard-view").classList.remove("hidden");
        
        await fetchAndPopulateAdminData();

        // Search listener
        const searchInput = document.getElementById("admin-search-input");
        if (searchInput) {
          searchInput.addEventListener("input", (e) => {
            adminSearchQuery = e.target.value.trim();
            updateDashboardView();
          });
        }

        // Filter buttons
        document.querySelectorAll(".filter-btn").forEach(btn => {
          btn.addEventListener("click", (e) => {
            document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            adminActiveFilter = btn.getAttribute("data-filter") || "all";
            updateDashboardView();
          });
        });

        // Refresh button
        const btnRefresh = document.getElementById("btn-admin-refresh");
        if (btnRefresh) {
          btnRefresh.addEventListener("click", async () => {
            btnRefresh.disabled = true;
            btnRefresh.innerHTML = `<span>Syncing... ⏳</span>`;
            await fetchAndPopulateAdminData();
            btnRefresh.disabled = false;
            btnRefresh.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12a9 9 0 0 1 15.5-6.4L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.4L3 16M3 21v-5h5"/></svg>
              <span>Refresh</span>`;
          });
        }

        // Export CSV button
        const btnExport = document.getElementById("btn-admin-export");
        if (btnExport) {
          btnExport.addEventListener("click", exportSubmissionsCSV);
        }

        // Clear All Submissions with Math Challenge Protection
        const btnClearAll = document.getElementById("btn-admin-clear-all");
        const clearModalBackdrop = document.getElementById("clear-all-modal-backdrop");
        const btnCloseClearModal = document.getElementById("btn-close-clear-modal");
        const btnCancelClearAll = document.getElementById("btn-cancel-clear-all");
        const btnConfirmClearAll = document.getElementById("btn-confirm-clear-all");
        const mathQuestionEl = document.getElementById("clear-math-question");
        const mathAnswerInput = document.getElementById("clear-math-answer");
        const errClearMath = document.getElementById("err-clear-math");

        let currentMathSum = 0;

        function generateMathChallenge() {
          const n1 = Math.floor(Math.random() * 40) + 11;
          const n2 = Math.floor(Math.random() * 40) + 12;
          currentMathSum = n1 + n2;
          if (mathQuestionEl) {
            mathQuestionEl.textContent = `What is ${n1} + ${n2} ?`;
          }
          if (mathAnswerInput) {
            mathAnswerInput.value = "";
          }
          if (errClearMath) {
            errClearMath.textContent = "";
          }
        }

        function openClearModal() {
          generateMathChallenge();
          if (clearModalBackdrop) {
            clearModalBackdrop.classList.add("open");
          }
          setTimeout(() => {
            if (mathAnswerInput) mathAnswerInput.focus();
          }, 100);
        }

        function closeClearModal() {
          if (clearModalBackdrop) {
            clearModalBackdrop.classList.remove("open");
          }
          if (errClearMath) {
            errClearMath.textContent = "";
          }
        }

        if (btnClearAll) {
          btnClearAll.addEventListener("click", openClearModal);
        }

        if (btnCloseClearModal) {
          btnCloseClearModal.addEventListener("click", closeClearModal);
        }

        if (btnCancelClearAll) {
          btnCancelClearAll.addEventListener("click", closeClearModal);
        }

        if (clearModalBackdrop) {
          clearModalBackdrop.addEventListener("click", (e) => {
            if (e.target === clearModalBackdrop) {
              closeClearModal();
            }
          });
        }

        if (btnConfirmClearAll) {
          btnConfirmClearAll.addEventListener("click", async () => {
            const val = mathAnswerInput ? parseInt(mathAnswerInput.value.trim(), 10) : NaN;
            if (isNaN(val) || val !== currentMathSum) {
              if (errClearMath) {
                errClearMath.textContent = "Incorrect answer! Please solve the question correctly to proceed.";
                errClearMath.style.color = "#ef4444";
              }
              generateMathChallenge();
              if (mathAnswerInput) mathAnswerInput.focus();
              return;
            }

            // Correct answer provided, execute clear
            btnConfirmClearAll.disabled = true;
            btnConfirmClearAll.innerHTML = `<span>Clearing... ⏳</span>`;

            // 1. Clear Supabase cloud & local storage
            await clearAllFromSupabase();

            // 2. Clear in-memory array & refresh views
            adminSubmissions = [];
            updateDashboardView();

            btnConfirmClearAll.disabled = false;
            btnConfirmClearAll.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              <span>Clear Everything</span>`;

            closeClearModal();
            alert("All registrations have been permanently cleared from both cloud and local storage.");
          });
        }

        if (mathAnswerInput) {
          mathAnswerInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              btnConfirmClearAll?.click();
            }
          });
        }

        // Individual Team Delete (2-Step Verification: asks two times)
        const deleteTeamModalBackdrop = document.getElementById("delete-team-modal-backdrop");
        const btnCloseDeleteTeamModal = document.getElementById("btn-close-delete-team-modal");
        const btnCancelDeleteTeam = document.getElementById("btn-cancel-delete-team");
        const btnProceedStep2 = document.getElementById("btn-proceed-delete-team-step-2");
        const btnBackStep1 = document.getElementById("btn-back-delete-team-step-1");
        const btnFinalConfirmDelete = document.getElementById("btn-final-confirm-delete-team");
        const deleteTeamStep1 = document.getElementById("delete-team-step-1");
        const deleteTeamStep2 = document.getElementById("delete-team-step-2");
        const deleteTeamModalStep = document.getElementById("delete-team-modal-step");

        if (btnCloseDeleteTeamModal) {
          btnCloseDeleteTeamModal.addEventListener("click", closeDeleteTeamModal);
        }
        if (btnCancelDeleteTeam) {
          btnCancelDeleteTeam.addEventListener("click", closeDeleteTeamModal);
        }
        if (deleteTeamModalBackdrop) {
          deleteTeamModalBackdrop.addEventListener("click", (e) => {
            if (e.target === deleteTeamModalBackdrop) closeDeleteTeamModal();
          });
        }

        // Step 1 -> Step 2 (First question answered -> Proceed to second question)
        if (btnProceedStep2) {
          btnProceedStep2.addEventListener("click", () => {
            if (deleteTeamStep1) deleteTeamStep1.style.display = "none";
            if (deleteTeamStep2) deleteTeamStep2.style.display = "block";
            if (deleteTeamModalStep) deleteTeamModalStep.textContent = "Step 2 of 2: Final Warning";
          });
        }

        // Step 2 -> Back to Step 1
        if (btnBackStep1) {
          btnBackStep1.addEventListener("click", () => {
            if (deleteTeamStep2) deleteTeamStep2.style.display = "none";
            if (deleteTeamStep1) deleteTeamStep1.style.display = "block";
            if (deleteTeamModalStep) deleteTeamModalStep.textContent = "Step 1 of 2: Confirmation";
          });
        }

        // Final Confirm Delete (After answering both prompts)
        if (btnFinalConfirmDelete) {
          btnFinalConfirmDelete.addEventListener("click", async () => {
            if (!pendingDeleteTeam) return;
            const target = pendingDeleteTeam;
            btnFinalConfirmDelete.disabled = true;
            btnFinalConfirmDelete.innerHTML = `<span>Deleting... ⏳</span>`;

            await deleteSingleTeamFromSupabase(target.id, target.teamName);

            adminSubmissions = adminSubmissions.filter(s => s !== target && s.teamName !== target.teamName && (!target.id || s.id !== target.id));
            updateDashboardView();

            btnFinalConfirmDelete.disabled = false;
            btnFinalConfirmDelete.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              <span>Confirm &amp; Delete</span>`;

            closeDeleteTeamModal();
            alert(`Team "${target.teamName}" has been permanently deleted.`);
          });
        }

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

// ==========================================
// 📱 UNIVERSAL MOBILE NAVIGATION SETUP
// Ensures Home, About, Schedule, Guidelines, Registration, FAQ, Contact
// are accessible and beautifully displayed on all mobile devices!
// ==========================================
function setupMobileNav() {
  const navContainer = document.querySelector(".nav-container");
  const stickyNav = document.querySelector(".sticky-nav");
  if (!navContainer || !stickyNav) return;

  const currentPath = window.location.pathname.toLowerCase();

  const navItems = [
    { title: "Home", href: "/index.html", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>` },
    { title: "About", href: "/about.html", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>` },
    { title: "Schedule", href: "/schedule.html", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>` },
    { title: "Registration", href: "/registration.html", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>`, highlight: true },
    { title: "Contact", href: "/contact.html", icon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>` }
  ];

  // 1. Add Hamburger button on LEFT side next to Project Expo logo
  if (!document.getElementById("btn-mobile-nav-toggle")) {
    const hamburgerBtn = document.createElement("button");
    hamburgerBtn.type = "button";
    hamburgerBtn.className = "mobile-nav-toggle";
    hamburgerBtn.id = "btn-mobile-nav-toggle";
    hamburgerBtn.setAttribute("aria-label", "Toggle navigation menu");
    hamburgerBtn.innerHTML = `
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
      <span class="hamburger-line"></span>
    `;

    const brandLogo = navContainer.querySelector(".brand-logo");
    if (brandLogo) {
      let leftGroup = navContainer.querySelector(".nav-left-brand-group");
      if (!leftGroup) {
        leftGroup = document.createElement("div");
        leftGroup.className = "nav-left-brand-group";
        leftGroup.style.display = "inline-flex";
        leftGroup.style.alignItems = "center";
        leftGroup.style.gap = "8px";
        brandLogo.parentNode.insertBefore(leftGroup, brandLogo);
        leftGroup.appendChild(hamburgerBtn);
        leftGroup.appendChild(brandLogo);
      } else {
        leftGroup.prepend(hamburgerBtn);
      }
    } else {
      navContainer.prepend(hamburgerBtn);
    }
  }

  // 2. Add Mobile Slide-Out Drawer if not present
  if (!document.getElementById("mobile-nav-drawer")) {
    const drawer = document.createElement("div");
    drawer.className = "mobile-nav-drawer";
    drawer.id = "mobile-nav-drawer";

    const backdrop = document.createElement("div");
    backdrop.className = "mobile-nav-backdrop";
    backdrop.id = "mobile-nav-backdrop";

    const linksHtml = navItems.map(item => {
      const isActive = currentPath === item.href.toLowerCase() || 
        (item.href === "/index.html" && (currentPath === "/" || currentPath.endsWith("index.html") || currentPath === ""));
      return `
        <a href="${item.href}" class="mobile-drawer-link ${isActive ? 'active' : ''}">
          <span class="drawer-link-icon">${item.icon}</span>
          <span>${item.title}</span>
          ${item.highlight ? `<span class="drawer-badge">Live</span>` : ''}
        </a>
      `;
    }).join("");

    drawer.innerHTML = `
      <div class="mobile-drawer-header">
        <div class="mobile-drawer-title">
          <span>Project Expo 2K26</span>
        </div>
        <button type="button" class="mobile-drawer-close" id="btn-mobile-drawer-close">✕</button>
      </div>
      <div class="mobile-drawer-links">
        ${linksHtml}
      </div>
      <div class="mobile-drawer-footer">
        <a href="/registration.html" class="btn btn-primary btn-submit-glow" style="width:100%; justify-content:center;">
          <span>Register Team Now</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    `;

    document.body.appendChild(drawer);
    document.body.appendChild(backdrop);

    // Toggle drawer open/close
    const toggleBtn = document.getElementById("btn-mobile-nav-toggle");
    const closeBtn = document.getElementById("btn-mobile-drawer-close");

    function openDrawer() {
      drawer.classList.add("open");
      backdrop.classList.add("open");
      toggleBtn?.classList.add("open");
      document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
      drawer.classList.remove("open");
      backdrop.classList.remove("open");
      toggleBtn?.classList.remove("open");
      document.body.style.overflow = "";
    }

    toggleBtn?.addEventListener("click", () => {
      if (drawer.classList.contains("open")) closeDrawer();
      else openDrawer();
    });

    closeBtn?.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);
  }
}

// Intra-College Verification Portal Handler (for the 15 registered teams & ongoing students)
function initVerificationPortal() {
  const openBtn = document.getElementById("btn-open-verify-modal");
  const modal = document.getElementById("verify-modal-backdrop");
  const closeBtn = document.getElementById("btn-close-verify-modal");
  const searchBtn = document.getElementById("btn-search-verify");
  const searchInput = document.getElementById("verify-search-input");
  const resultBox = document.getElementById("verify-result-box");

  if (!modal) return;

  function openModal() {
    modal.style.display = "flex";
    modal.classList.add("open");
    if (resultBox) resultBox.style.display = "none";
    if (searchInput) searchInput.value = "";
  }

  function closeModal() {
    modal.style.display = "none";
    modal.classList.remove("open");
  }

  if (openBtn) openBtn.addEventListener("click", openModal);
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  if (searchBtn && searchInput && resultBox) {
    searchBtn.addEventListener("click", async () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        alert("Please enter your Team Name or Team Leader Email.");
        return;
      }

      searchBtn.disabled = true;
      searchBtn.innerHTML = "<span>Searching Database... ⏳</span>";
      resultBox.style.display = "block";
      resultBox.innerHTML = `<div style="text-align:center; padding:16px; color:var(--color-foreground-muted);">Fetching registration records...</div>`;

      try {
        const subs = await loadFromSupabase();
        const list = subs || JSON.parse(localStorage.getItem("expoSubmissions") || "[]");
        
        const matched = list.find(s => {
          const t = (s.teamName || "").toLowerCase().trim();
          const e = (s.leaderEmail || "").toLowerCase().trim();
          return t === q || e === q || t.includes(q) || e.includes(q);
        });

        if (!matched) {
          resultBox.innerHTML = `
            <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 8px; padding: 14px; text-align: center;">
              <span style="font-size: 1.3rem;">⚠️</span>
              <div style="font-weight: 700; color: #ef4444; margin-top: 4px;">No Registration Record Found</div>
              <p style="font-size: 0.82rem; color: var(--color-foreground-secondary); margin: 6px 0 0 0;">
                We couldn't locate a team matching "<strong>${escapeHtml(searchInput.value)}</strong>". Please double-check spelling or enter the Team Leader's registered email address.
              </p>
            </div>
          `;
          return;
        }

        // Check if Roll No is already present
        const hasRoll = (matched.leaderDept || "").toLowerCase().includes("roll:") || 
                        Boolean(matched.leaderRollNo) ||
                        (Array.isArray(matched.members) && matched.members.some(m => m.rollNo));

        const isOtherCollegeEmail = (matched.leaderEmail || "").endsWith("@kongu.edu") || (matched.leaderEmail || "").endsWith("@dsce.ac.in");

        resultBox.innerHTML = `
          <!-- Status Banner -->
          <div style="background: ${hasRoll ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.12)'}; border: 1.5px solid ${hasRoll ? '#10b981' : '#f59e0b'}; border-radius: 8px; padding: 12px 16px; margin-bottom: 14px;">
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size: 1.2rem;">${hasRoll ? '✅' : '⏳'}</span>
              <div>
                <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: ${hasRoll ? '#065f46' : '#b45309'}; display:block;">Current Registration Status</span>
                <span style="font-size: 0.95rem; font-weight: 700; color: ${hasRoll ? '#065f46' : '#92400e'};">
                  ${hasRoll ? 'REGISTRATION CONFIRMED (VSB CETC)' : 'PENDING REGISTRATION VERIFICATION'}
                </span>
              </div>
            </div>
            ${!hasRoll ? `
              <p style="font-size: 0.8rem; color: #78350f; margin: 6px 0 0 0; line-height: 1.45;">
                This intra-college expo is exclusively for <strong>VSB College of Engineering Technical Campus</strong>. All 15 registered teams must verify their VSB Roll Number or cancel their entry.
              </p>
            ` : ''}
          </div>

          <!-- Team Details Block -->
          <div style="border-bottom: 1px solid var(--color-border-secondary); padding-bottom: 12px; margin-bottom: 14px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap: 8px;">
              <div>
                <span style="font-size: 0.72rem; font-weight: 700; text-transform: uppercase; color: #0c8c5e; letter-spacing: 0.5px;">Registered Team</span>
                <h4 style="margin: 2px 0 0 0; font-size: 1.1rem; color: var(--color-foreground-main);">${escapeHtml(matched.teamName)}</h4>
              </div>
              <span style="font-size: 0.75rem; background: #ecfdf5; color: #065f46; font-weight: 700; padding: 3px 8px; border-radius: 4px;">
                ${escapeHtml(matched.track || "Software")}
              </span>
            </div>
            <div style="font-size: 0.83rem; color: var(--color-foreground-secondary); margin-top: 6px;">
              <strong>Leader:</strong> ${escapeHtml(matched.leaderName)} (${escapeHtml(matched.leaderEmail)})
            </div>
            <div style="font-size: 0.83rem; color: var(--color-foreground-secondary); margin-top: 3px;">
              <strong>Dept:</strong> ${escapeHtml(matched.leaderDept || "N/A")}
            </div>
            <div style="font-size: 0.83rem; color: #0c8c5e; font-weight: 600; margin-top: 3px;">
              <strong>College:</strong> VSB COLLEGE OF ENGINEERING TECHNICAL CAMPUS
            </div>
          </div>

          ${isOtherCollegeEmail ? `
            <div style="background: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 6px; padding: 10px 12px; margin-bottom: 14px; font-size: 0.82rem; color: #991b1b; line-height: 1.4;">
              ⚠️ <strong>Non-VSB Institution Notice:</strong> The email domain indicates you are from another college. Since Project Expo 2K26 is an intra-college event, please use the delete button below to release the slot.
            </div>
          ` : ''}

          ${hasRoll ? `
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 6px; padding: 12px; text-align: center;">
              <span style="font-size: 1.2rem;">🎉</span>
              <div style="font-weight: 700; color: #065f46; font-size: 0.9rem; margin-top: 2px;">Intra-College Eligibility Confirmed</div>
              <p style="font-size: 0.8rem; color: #374151; margin: 4px 0 0 0;">
                Your VSB Register Number is registered. Your team pass is confirmed for the Expo on 29-09-2026.
              </p>
            </div>
          ` : `
            <!-- Option 1: VSB Student Verification -->
            <div style="background: var(--color-background-primary); border: 1px solid var(--color-border-secondary); border-radius: 8px; padding: 14px; margin-bottom: 14px;">
              <div style="font-weight: 700; font-size: 0.88rem; color: #0c8c5e; margin-bottom: 4px;">
                🎓 Option 1: Are you a VSB CETC Student?
              </div>
              <p style="font-size: 0.8rem; color: var(--color-foreground-secondary); margin: 0 0 8px 0;">
                Enter your VSB College Register Number / Roll No to validate your team slot:
              </p>
              <div class="input-wrapper" style="margin-bottom: 8px;">
                <input type="text" id="verify-roll-input" class="form-input" placeholder="e.g. 723722104001 or 22CS001" style="font-size: 0.88rem;">
              </div>
              <button type="button" class="btn btn-primary" id="btn-submit-roll-verify" style="width: 100%; font-size: 0.85rem; padding: 9px;">
                <span>✅ Confirm VSB Student Registration</span>
              </button>
            </div>

            <!-- Option 2: Self-Service Deletion for Non-VSB Students -->
            <div style="background: rgba(239, 68, 68, 0.04); border: 1.5px dashed rgba(239, 68, 68, 0.35); border-radius: 8px; padding: 14px;">
              <div style="font-weight: 700; color: #dc2626; font-size: 0.88rem; margin-bottom: 4px;">
                🏛️ Option 2: Not from VSB College of Engineering Technical Campus?
              </div>
              <p style="font-size: 0.8rem; color: var(--color-foreground-secondary); line-height: 1.45; margin: 0 0 10px 0;">
                As Project Expo 2K26 is strictly an intra-college event, non-VSB students must delete their registration to free up the slot for college participants.
              </p>
              <button type="button" class="btn btn-outline" id="btn-self-delete-toggle" style="color: #dc2626; border-color: rgba(220, 38, 38, 0.45); font-size: 0.82rem; padding: 8px 14px; width: 100%; justify-content: center; font-weight: 600;">
                🗑️ I am Not from VSB — Cancel &amp; Delete My Registration
              </button>

              <div id="self-delete-confirm-box" style="display: none; background: #fff5f5; border: 1px solid #fecaca; border-radius: 6px; padding: 12px; margin-top: 10px; text-align: center;">
                <p style="font-size: 0.82rem; font-weight: 600; color: #991b1b; margin: 0 0 10px 0; line-height: 1.4;">
                  Are you sure? This will permanently cancel and delete registration for "<strong>${escapeHtml(matched.teamName)}</strong>".
                </p>
                <div style="display: flex; gap: 8px; justify-content: center;">
                  <button type="button" class="btn btn-secondary" id="btn-self-delete-cancel" style="font-size: 0.78rem; padding: 6px 12px;">Keep Registration</button>
                  <button type="button" class="btn btn-primary" id="btn-self-delete-confirm" style="background: #dc2626; border-color: #dc2626; font-size: 0.78rem; padding: 6px 12px;">Yes, Delete My Registration</button>
                </div>
              </div>
            </div>
          `}
        `;

        // Attach VSB Verification handler
        const submitRollBtn = document.getElementById("btn-submit-roll-verify");
        const rollInput = document.getElementById("verify-roll-input");
        if (submitRollBtn && rollInput) {
          submitRollBtn.addEventListener("click", async () => {
            const rollVal = rollInput.value.trim();
            if (!rollVal) {
              alert("Please enter a valid VSB Register Number.");
              return;
            }

            submitRollBtn.disabled = true;
            submitRollBtn.innerHTML = "<span>Saving Verification... ⏳</span>";

            try {
              const updatedDept = `${matched.leaderDept || 'Engineering'} | Roll: ${rollVal} | VSB CETC Verified`;
              const patchRes = await fetch(`${SUPABASE_CONFIG.url}/rest/v1/submissions?id=eq.${matched.id}`, {
                method: "PATCH",
                headers: {
                  "apikey": SUPABASE_CONFIG.key,
                  "Authorization": `Bearer ${SUPABASE_CONFIG.key}`,
                  "Content-Type": "application/json",
                  "Prefer": "return=minimal"
                },
                body: JSON.stringify({
                  leader_dept: updatedDept
                })
              });

              resultBox.innerHTML = `
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 16px; text-align: center;">
                  <span style="font-size: 1.6rem;">🎉</span>
                  <div style="font-weight: 700; color: #065f46; font-size: 0.95rem; margin-top: 4px;">Verification Successful!</div>
                  <p style="font-size: 0.84rem; color: #374151; margin: 6px 0 0 0; line-height: 1.45;">
                    Thank you! Team <strong>${escapeHtml(matched.teamName)}</strong> has verified Register Number <strong>${escapeHtml(rollVal)}</strong> at VSB College of Engineering Technical Campus. Your registration slot is confirmed.
                  </p>
                </div>
              `;
            } catch (err) {
              console.warn("Could not patch Supabase:", err);
              alert("Verification recorded. Thank you!");
            }
          });
        }

        // Attach Self-Deletion handler
        const selfDeleteToggle = document.getElementById("btn-self-delete-toggle");
        const selfDeleteBox = document.getElementById("self-delete-confirm-box");
        const selfDeleteCancel = document.getElementById("btn-self-delete-cancel");
        const selfDeleteConfirm = document.getElementById("btn-self-delete-confirm");

        if (selfDeleteToggle && selfDeleteBox) {
          selfDeleteToggle.addEventListener("click", () => {
            selfDeleteBox.style.display = selfDeleteBox.style.display === "none" ? "block" : "none";
          });
        }

        if (selfDeleteCancel && selfDeleteBox) {
          selfDeleteCancel.addEventListener("click", () => {
            selfDeleteBox.style.display = "none";
          });
        }

        if (selfDeleteConfirm) {
          selfDeleteConfirm.addEventListener("click", async () => {
            selfDeleteConfirm.disabled = true;
            selfDeleteConfirm.innerHTML = "<span>Deleting Registration... ⏳</span>";

            try {
              await deleteSingleTeamFromSupabase(matched.id, matched.teamName);
              await checkAndApplyRegistrationCapacity();

              resultBox.innerHTML = `
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 20px; text-align: center;">
                  <span style="font-size: 1.8rem;">🗑️</span>
                  <div style="font-weight: 700; color: #065f46; font-size: 1rem; margin-top: 4px;">Registration Successfully Deleted</div>
                  <p style="font-size: 0.85rem; color: #374151; margin: 8px 0 0 0; line-height: 1.5;">
                    Your team registration for "<strong>${escapeHtml(matched.teamName)}</strong>" has been permanently removed from the database and the registration slot has been released for VSB College students. Thank you for your cooperation!
                  </p>
                </div>
              `;
            } catch (delErr) {
              console.error("Self delete error:", delErr);
              alert("Registration cancelled and removed from list. Thank you.");
              closeModal();
            }
          });
        }
      } catch (err) {
        console.error("Verification lookup error:", err);
        resultBox.innerHTML = `<div style="color:#ef4444; font-size:0.85rem; padding:8px;">Failed to query database. Please try again.</div>`;
      } finally {
        searchBtn.disabled = false;
        searchBtn.innerHTML = "<span>Look Up Registration</span>";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  initVerificationPortal();
});


