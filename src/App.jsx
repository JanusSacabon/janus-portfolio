import { useState, useEffect, useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#about",          label: "About" },
  { href: "#skills",         label: "Skills" },
  { href: "#experience",     label: "Experience" },
  { href: "#education",      label: "Education" },
  { href: "#project",        label: "Project" },
  { href: "#certifications", label: "Certifications" },
];

const SKILLS = [
  { cat: "Networking",         items: "LAN/WAN, TCP/IP, VLAN, VPN, DHCP, DNS, NAT, ACLs",                icon: "🌐" },
  { cat: "Protocols",          items: "OSPF, EIGRP, BGP, STP, RIP",                                       icon: "📡" },
  { cat: "Cisco Technologies", items: "Cisco IOS, Packet Tracer, Catalyst switches, routers",             icon: "🔀" },
  { cat: "Tools",              items: "Wireshark, GNS3, SecureCRT, PuTTY",                                icon: "🛠️" },
  { cat: "Operating Systems",  items: "Windows Server, Linux (Ubuntu, CentOS), Switch Engine (Extreme)",  icon: "💻" },
  { cat: "Scripting",          items: "Python, C++, HTML, CSS",                                           icon: "⌨️" },
  { cat: "Electronics & HW",   items: "Circuit design & analysis, PCB design, fusion splicing",           icon: "⚡" },
  { cat: "Office Suites",      items: "Microsoft Office, Google Workspace",                               icon: "📋" },
  { cat: "Soft Skills",        items: "Problem-solving, teamwork, communication, time management",        icon: "🤝" },
];

const CERTS = [
  {
    name:   "Cisco Certified Network Associate (CCNA)",
    issuer: "Cisco Systems",
    date:   "February 2026",
    detail: "Cisco ID: CSCO15040742 · Valid through Feb 16, 2029",
    badge:  "CCNA",
  },
  {
    name:   "Licensed Electronics Engineer",
    issuer: "Professional Regulation Commission",
    date:   "March 2026",
    detail: "Valid through Sep 08, 2029",
    badge:  "PRC",
  },
  {
    name:   "Licensed Electronics Technician",
    issuer: "Professional Regulation Commission",
    date:   "March 2026",
    detail: "Valid through Sep 08, 2029",
    badge:  "PRC",
  },
  {
    name:   "CCNA 200-301 Training Bootcamp",
    issuer: "RivanCyber Training Institute Inc.",
    date:   "January 2026",
    detail: "Subnetting, VLANs, inter-VLAN routing, OSPF, NAT, ACLs, troubleshooting; lab work on Cisco gear; docs and introductory automation.",
    badge:  "BOOT",
  },
];

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useActiveSection(ids) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-35% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);
  return active;
}

function useFadeIn(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

// ── Sub-components ────────────────────────────────────────────────────────────
function Section({ id, title, children }) {
  const [ref, visible] = useFadeIn();
  return (
    <section
      id={id}
      ref={ref}
      className="section-block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: "opacity 0.6s cubic-bezier(.22,1,.36,1), transform 0.6s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div className="section-heading">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}

function SkillCard({ cat, items, icon, index }) {
  const [ref, visible] = useFadeIn(0.05);
  return (
    <div
      ref={ref}
      className="skill-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(20px) scale(0.97)",
        transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms`,
      }}
    >
      <span className="skill-icon">{icon}</span>
      <div>
        <p className="skill-cat">{cat}</p>
        <p className="skill-items">{items}</p>
      </div>
    </div>
  );
}

function TimelineItem({ title, sub, meta, bullets, isLast }) {
  const [ref, visible] = useFadeIn();
  return (
    <div
      ref={ref}
      className="timeline-item"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-16px)",
        transition: "opacity 0.55s ease, transform 0.55s ease",
      }}
    >
      <div className="timeline-marker">
        <span className="timeline-dot" />
        {!isLast && <span className="timeline-line" />}
      </div>
      <div className="timeline-body">
        <h3 className="timeline-title">{title}</h3>
        {sub && <p className="timeline-sub">{sub}</p>}
        <p className="meta">{meta}</p>
        {bullets && (
          <ul className="list" style={{ marginTop: "0.6rem" }}>
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}

function CertCard({ name, issuer, date, detail, badge, index }) {
  const [ref, visible] = useFadeIn(0.05);
  return (
    <div
      ref={ref}
      className="cert-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms`,
      }}
    >
      <div className="cert-badge">{badge}</div>
      <div className="cert-body">
        <p className="cert-name">{name}</p>
        <p className="cert-issuer">{issuer} · {date}</p>
        <p className="cert-detail">{detail}</p>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
  const active   = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{css}</style>
      <a className="skip-link" href="#main-content">Skip to content</a>

      {/* Scroll progress */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {/* ── Header ── */}
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container nav-wrap">
          <a href="#top" className="nav-brand" onClick={(e) => handleNavClick(e, "#top")}>
            JXS
          </a>
          <button
            className="hamburger"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`ham-line${menuOpen ? " open" : ""}`} />
            <span className={`ham-line${menuOpen ? " open" : ""}`} />
            <span className={`ham-line${menuOpen ? " open" : ""}`} />
          </button>
          <nav aria-label="Primary navigation" className={`nav-drawer${menuOpen ? " nav-open" : ""}`}>
            <ul className="nav-list">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={active === href.slice(1) ? "nav-active" : ""}
                    onClick={(e) => handleNavClick(e, href)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* ── Main ── */}
      <main id="main-content" className="container page-column">

        {/* Hero */}
        <section id="top" className="hero">
          <div className="hero-layout">
            <div className="hero-copy hero-animate">
              <p className="hero-eyebrow">Network Engineer · CCNA Certified · ECE</p>
              <h1>Janus Xavier<br />R. Sacabon</h1>
              <p className="hero-contact">
                <span>Mandaluyong City, Metro Manila</span>
                <span className="sep" aria-hidden="true">·</span>
                <a href="tel:+639661509076">+63 966 150 9076</a>
                <span className="sep" aria-hidden="true">·</span>
                <a href="mailto:jxsacabon@gmail.com">jxsacabon@gmail.com</a>
              </p>
              <p className="subtitle">
                CCNA-Certified Network Engineer with enterprise routing and switching experience,
                plus real-world ops in retail and WAN environments across 100+ sites.
              </p>
              <ul className="highlight-list">
                <li>Network Specialist · Power Mac Center Inc. (2026–present)</li>
                <li>CCNA · valid through February 2029</li>
              </ul>
              <div className="actions">
                <a className="btn btn-primary" href="./JanusXavier_Sacabon_RESUME.pdf" target="_blank" rel="noopener noreferrer">
                  <span>View Resume</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </a>
                <a className="btn btn-outline" href="https://linkedin.com/in/jxsacabon" target="_blank" rel="noopener noreferrer">LinkedIn</a>
               //<a className="btn btn-outline" href="https://github.com/JanusXavierSacabon" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
            <div className="hero-photo-wrap hero-photo-animate">
              <div className="photo-ring">
                <img
                  className="hero-photo"
                  src="./janus-sacabon-photo.jpg"
                  alt="Janus Xavier R. Sacabon"
                  width="400" height="400"
                  loading="eager" decoding="async"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title="Professional Summary">
          <p className="about-text">
            CCNA-Certified Network Engineer with expertise in routing, switching, and network
            operations gained through Cisco-based training and real-world enterprise experience.
            Experienced in network documentation, troubleshooting, and infrastructure support in
            fiber and enterprise contexts. Comfortable with enterprise protocols, monitoring, and
            Cisco device configuration, with a focus on reliability, operations support, and
            infrastructure deployment.
          </p>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Technical Skills">
          <div className="skills-grid">
            {SKILLS.map((s, i) => <SkillCard key={s.cat} {...s} index={i} />)}
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" title="Work History">
          <div className="timeline">
            <TimelineItem
              title="Network Specialist"
              sub="Power Mac Center Inc."
              meta="March 2026 – Present"
              bullets={[
                "Monitored and supported network operations for corporate offices and 100+ stores nationwide.",
                "Configured and deployed network infrastructure for 10+ store locations.",
                "Managed multiple Fortinet firewalls via FortiGate and SD-WAN.",
              ]}
              isLast
            />
          </div>
        </Section>

        {/* Education */}
        <Section id="education" title="Education">
          <div className="timeline">
            <TimelineItem
              title="Bachelor of Science in Electronics Engineering (BSECE)"
              sub="Bicol University Polangui"
              meta="2021 – 2025"
              isLast
            />
          </div>
        </Section>

        {/* Project */}
        <Section id="project" title="Featured Project">
          <div className="project-card">
            <div className="project-header">
              <div className="project-tag">Capstone · 2025</div>
              <h3 className="project-title">
                Prediction of Hatching Time of Chicken Eggs Using Machine Learning
              </h3>
            </div>
            <div className="project-body">
              <ul className="list">
                <li>
                  Developed an AI-powered candling system using YOLOv11 on custom annotated
                  datasets, achieving <strong>74.89% prediction accuracy</strong>.
                </li>
                <li>
                  Designed and built a functional device around a <strong>Raspberry Pi 4 Model B</strong> for
                  real-time imaging, on-device inference, and LCD-based predictions.
                </li>
              </ul>
              <div className="project-chips">
                {["YOLOv11", "Raspberry Pi 4B", "Python", "TensorFlow", "Custom Dataset"].map((t) => (
                  <span key={t} className="chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Certifications */}
        <Section id="certifications" title="Licenses, Certifications & Training">
          <div className="certs-grid">
            {CERTS.map((c, i) => <CertCard key={c.name} {...c} index={i} />)}
          </div>
        </Section>

      </main>

      {/* Footer */}
      <footer className="container footer">
        <p className="footer-name">Janus Xavier R. Sacabon</p>
        <p>Mandaluyong City, Metro Manila</p>
        <p>
          <a href="tel:+639661509076">+63 966 150 9076</a>
          <span className="sep"> · </span>
          <a href="mailto:jxsacabon@gmail.com">jxsacabon@gmail.com</a>
        </p>
      </footer>
    </>
  );
}

// ── CSS ───────────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Quicksand:wght@400;500;600&display=swap');

:root {
  --mint-50:   #f0faf7;
  --mint-100:  #d5f2ea;
  --mint-600:  #0f766e;
  --mint-700:  #115e57;
  --mint-800:  #0d4d47;
  --text:      #1e293b;
  --muted:     #64748b;
  --gold:      #c9a54a;
  --gold-soft: rgba(201,165,74,0.28);
  --gold-glow: rgba(201,165,74,0.15);
  --ruby:      #be123c;
  --border:    rgba(15,118,110,0.14);
  --surface:   rgba(255,255,255,0.72);
  --ff-head:   "Montserrat", system-ui, sans-serif;
  --ff-body:   "Quicksand", "Segoe UI", system-ui, sans-serif;
  --radius:    16px;
  --shadow-sm: 0 2px 10px rgba(17,94,89,0.07);
  --shadow-md: 0 6px 24px rgba(17,94,89,0.11);
  --shadow-lg: 0 14px 44px rgba(17,94,89,0.14);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: var(--ff-body);
  font-weight: 500;
  color: var(--text);
  line-height: 1.7;
  background: linear-gradient(160deg, #f4fbf8 0%, #edf6f2 55%, #f9f5ee 100%);
  min-height: 100vh;
}

h1,h2,h3,h4 { font-family: var(--ff-head); letter-spacing: -0.025em; }

/* Progress bar */
.progress-bar {
  position: fixed; top: 0; left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--mint-600), var(--gold));
  z-index: 200;
  transition: width 0.1s linear;
  border-radius: 0 2px 2px 0;
  box-shadow: 0 0 8px rgba(15,118,110,0.4);
}

/* Skip link */
.skip-link {
  position: absolute; left: -999px; top: 0;
  background: var(--ruby); color: #fff;
  padding: 0.5rem 0.75rem; border-radius: 0 0 10px 0;
  font-family: var(--ff-body); font-weight: 600; z-index: 300;
}
.skip-link:focus { left: 0; }

/* Header */
.site-header {
  position: sticky; top: 0; z-index: 100;
  backdrop-filter: blur(18px) saturate(1.8);
  -webkit-backdrop-filter: blur(18px) saturate(1.8);
  background: rgba(244,251,248,0.82);
  border-bottom: 1px solid var(--gold-soft);
  transition: box-shadow 0.35s ease, background 0.35s ease;
}
.site-header.scrolled {
  box-shadow: var(--shadow-md);
  background: rgba(244,251,248,0.96);
}

.container { width: min(960px, 92%); margin: 0 auto; }

.nav-wrap {
  display: flex; align-items: center;
  justify-content: space-between;
  min-height: 4rem; gap: 1rem;
}

.nav-brand {
  font-family: var(--ff-head); font-weight: 800;
  font-size: 1.05rem; letter-spacing: 0.14em;
  color: var(--mint-700); text-decoration: none;
  padding: 0.3rem 0.7rem;
  border: 2px solid var(--gold-soft);
  border-radius: 10px;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  flex-shrink: 0;
}
.nav-brand:hover {
  border-color: var(--gold);
  background: var(--gold-glow);
  box-shadow: 0 2px 10px var(--gold-glow);
}

.hamburger {
  display: none; flex-direction: column; gap: 5px;
  background: none; border: none; cursor: pointer;
  padding: 6px; z-index: 110;
}
.ham-line {
  display: block; width: 22px; height: 2px;
  background: var(--mint-700); border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: center;
}
.ham-line.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.ham-line.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
.ham-line.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.nav-list { list-style: none; display: flex; gap: 0.2rem; }
.nav-list a {
  text-decoration: none; color: var(--muted);
  font-size: 0.875rem; font-weight: 600;
  padding: 0.35rem 0.7rem; border-radius: 8px;
  transition: color 0.2s, background 0.2s;
  position: relative;
}
.nav-list a::after {
  content: ''; position: absolute;
  bottom: 4px; left: 50%; transform: translateX(-50%);
  width: 0; height: 2px; border-radius: 2px;
  background: var(--gold);
  transition: width 0.25s ease;
}
.nav-list a:hover { color: var(--text); background: var(--gold-glow); }
.nav-list a:hover::after { width: 55%; }
.nav-list a.nav-active { color: var(--mint-700); }
.nav-list a.nav-active::after { width: 55%; background: var(--mint-600); }
.nav-list a:focus-visible { outline: 2px solid var(--mint-600); outline-offset: 3px; border-radius: 6px; }

/* Hero */
.page-column { padding-bottom: 0.5rem; }

.hero {
  margin-top: 1.5rem;
  padding: 2.75rem 0 3.25rem;
  border-bottom: 1px solid var(--gold-soft);
}

.hero-layout {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3rem;
  align-items: center;
}

@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(26px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes heroFadeRight {
  from { opacity: 0; transform: translateX(22px); }
  to   { opacity: 1; transform: translateX(0); }
}
.hero-animate       { animation: heroFadeUp 0.72s cubic-bezier(.22,1,.36,1) both; }
.hero-photo-animate { animation: heroFadeRight 0.72s cubic-bezier(.22,1,.36,1) 0.15s both; }

.hero-eyebrow {
  font-size: 0.75rem; font-weight: 700;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--mint-600);
  margin-bottom: 0.7rem;
  display: flex; align-items: center; gap: 0.55rem;
}
.hero-eyebrow::before {
  content: '';
  display: inline-block; width: 28px; height: 2px;
  background: linear-gradient(90deg, var(--mint-600), var(--gold));
  border-radius: 2px; flex-shrink: 0;
}

h1 {
  font-size: clamp(2rem, 5vw, 3.1rem);
  font-weight: 800; color: var(--text);
  line-height: 1.1; margin-bottom: 1rem;
}

.hero-contact {
  font-size: 0.9rem; color: var(--muted); font-weight: 600;
  display: flex; flex-wrap: wrap;
  gap: 0.35rem 0.5rem; align-items: center;
  margin-bottom: 0.9rem;
}
.hero-contact a { color: var(--mint-700); text-decoration: none; }
.hero-contact a:hover { text-decoration: underline; }
.sep { color: var(--gold); opacity: 0.8; user-select: none; }

.subtitle {
  color: var(--muted); max-width: 60ch;
  font-size: 1rem; line-height: 1.78;
  margin-bottom: 0.9rem;
}

.highlight-list {
  list-style: none; padding: 0; margin-bottom: 1.4rem;
}
.highlight-list li {
  color: #334155; padding: 0.22rem 0;
  padding-left: 1.15rem; position: relative;
  font-size: 0.93rem;
}
.highlight-list li::before {
  content: ''; position: absolute;
  left: 0; top: 50%; transform: translateY(-50%);
  width: 6px; height: 6px; border-radius: 50%;
  background: linear-gradient(135deg, var(--mint-600), var(--gold));
}

.actions { display: flex; flex-wrap: wrap; gap: 0.65rem; }

.btn {
  display: inline-flex; align-items: center; gap: 0.4rem;
  text-decoration: none;
  font-family: var(--ff-body); font-weight: 700; font-size: 0.9rem;
  padding: 0.65rem 1.3rem; border-radius: 12px;
  transition: transform 0.22s ease, box-shadow 0.22s ease,
              background 0.22s ease, border-color 0.22s ease;
  border: 2px solid transparent; cursor: pointer;
}
.btn:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.btn:focus-visible { outline: 2px solid var(--mint-600); outline-offset: 3px; }

.btn-primary {
  background: linear-gradient(135deg, var(--mint-700), var(--mint-600));
  color: #fff;
  box-shadow: 0 4px 14px rgba(15,118,110,0.28);
}
.btn-primary:hover {
  background: linear-gradient(135deg, var(--mint-800), var(--mint-700));
  box-shadow: 0 6px 22px rgba(15,118,110,0.36);
}

.btn-outline {
  background: var(--surface);
  color: var(--mint-700); border-color: var(--border);
  backdrop-filter: blur(8px);
}
.btn-outline:hover { border-color: var(--mint-600); background: var(--mint-50); }

/* Photo */
.hero-photo-wrap {
  position: relative; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
}
.photo-ring {
  padding: 4px;
  background: linear-gradient(135deg, var(--mint-600) 0%, var(--gold) 50%, var(--mint-600) 100%);
  border-radius: 50%;
  box-shadow: 0 0 0 6px var(--gold-glow), var(--shadow-lg);
  animation: ringPulse 4s ease-in-out infinite;
}
@keyframes ringPulse {
  0%,100% { box-shadow: 0 0 0 6px var(--gold-glow), var(--shadow-lg); }
  50%      { box-shadow: 0 0 0 10px rgba(201,165,74,0.08), var(--shadow-lg); }
}
.hero-photo {
  display: block;
  width: min(255px, 44vw); height: auto; aspect-ratio: 1;
  object-fit: cover; object-position: 50% 18%;
  border-radius: 50%; border: 4px solid #fff;
  transition: transform 0.4s ease;
}
.hero-photo:hover { transform: scale(1.035); }

.photo-badge {
  position: absolute;
  font-family: var(--ff-head); font-weight: 700;
  font-size: 0.68rem; letter-spacing: 0.04em;
  padding: 0.3rem 0.7rem; border-radius: 20px;
  box-shadow: var(--shadow-sm);
  animation: badgeFloat 3.5s ease-in-out infinite alternate;
  white-space: nowrap;
}
.photo-badge-ccna {
  bottom: 16%; right: -10%;
  background: linear-gradient(135deg, var(--mint-700), var(--mint-600));
  color: #fff; animation-delay: 0s;
}
.photo-badge-prc {
  top: 16%; left: -14%;
  background: rgba(255,255,255,0.94);
  color: var(--mint-700);
  border: 1px solid var(--gold-soft);
  animation-delay: 1.75s;
}
@keyframes badgeFloat {
  from { transform: translateY(0px); }
  to   { transform: translateY(-7px); }
}

/* Sections */
.section-block { padding: 2.65rem 0 2.9rem; }
.section-block + .section-block { border-top: 1px solid var(--gold-soft); }
.section-heading { margin-bottom: 1.6rem; }

h2 {
  font-size: 1.25rem; font-weight: 700;
  color: var(--mint-700);
  display: inline-flex; align-items: center; gap: 0.45rem;
}
h2::after {
  content: ''; display: inline-block;
  width: 32px; height: 3px; border-radius: 3px;
  background: linear-gradient(90deg, var(--mint-600), var(--gold));
  margin-left: 0.2rem;
}

/* About */
.about-text { max-width: 70ch; color: #334155; line-height: 1.82; }

/* Skills grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(264px, 1fr));
  gap: 0.8rem;
}
.skill-card {
  display: flex; gap: 0.9rem; align-items: flex-start;
  padding: 1rem 1.15rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s ease, box-shadow 0.25s ease,
              border-color 0.25s ease, background 0.25s ease;
  cursor: default;
}
.skill-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
  border-color: rgba(15,118,110,0.28);
  background: rgba(255,255,255,0.92);
}
.skill-icon {
  font-size: 1.25rem; line-height: 1;
  flex-shrink: 0; margin-top: 0.12rem;
}
.skill-cat {
  font-family: var(--ff-head); font-weight: 700;
  font-size: 0.78rem; color: var(--mint-700);
  text-transform: uppercase; letter-spacing: 0.06em;
  margin-bottom: 0.2rem;
}
.skill-items { font-size: 0.87rem; color: var(--muted); line-height: 1.5; }

/* Timeline */
.timeline { display: flex; flex-direction: column; }
.timeline-item {
  display: grid;
  grid-template-columns: 28px 1fr;
  gap: 0 1rem;
}
.timeline-marker {
  display: flex; flex-direction: column;
  align-items: center; padding-top: 0.32rem;
}
.timeline-dot {
  width: 12px; height: 12px; border-radius: 50%; flex-shrink: 0;
  background: linear-gradient(135deg, var(--mint-600), var(--gold));
  box-shadow: 0 0 0 3px var(--gold-glow);
}
.timeline-line {
  flex: 1; width: 2px; margin-top: 6px;
  background: linear-gradient(180deg, var(--gold-soft), transparent);
  border-radius: 2px; min-height: 24px;
}
.timeline-body { padding-bottom: 2rem; }
.timeline-title {
  font-family: var(--ff-head); font-size: 1.05rem;
  font-weight: 700; color: var(--text); margin-bottom: 0.1rem;
}
.timeline-sub { font-weight: 600; color: var(--mint-700); font-size: 0.95rem; }
.meta { color: var(--muted); font-size: 0.88rem; margin-top: 0.1rem; }

.list { padding-left: 1.1rem; }
.list li { margin: 0.3rem 0; font-size: 0.93rem; color: #334155; }
.list li::marker { color: var(--mint-600); }

/* Project card */
.project-card {
  border-radius: calc(var(--radius) + 4px);
  border: 1px solid var(--border);
  background: var(--surface);
  backdrop-filter: blur(10px);
  box-shadow: var(--shadow-sm);
  overflow: hidden;
  transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
}
.project-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-3px);
  border-color: rgba(15,118,110,0.22);
}
.project-header {
  padding: 1.6rem 1.8rem 1.3rem;
  background: linear-gradient(135deg, rgba(15,118,110,0.05), rgba(201,165,74,0.05));
  border-bottom: 1px solid var(--gold-soft);
}
.project-tag {
  display: inline-block;
  font-family: var(--ff-head); font-size: 0.68rem;
  font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: var(--gold); margin-bottom: 0.65rem;
  padding: 0.2rem 0.65rem;
  border: 1px solid var(--gold-soft);
  border-radius: 20px;
  background: rgba(201,165,74,0.08);
}
.project-title {
  font-size: 1.08rem; font-weight: 700;
  color: var(--text); line-height: 1.45;
}
.project-body { padding: 1.5rem 1.8rem; }

.project-chips { display: flex; flex-wrap: wrap; gap: 0.45rem; margin-top: 1.1rem; }
.chip {
  font-size: 0.77rem; font-weight: 600;
  padding: 0.25rem 0.7rem; border-radius: 20px;
  background: rgba(15,118,110,0.07);
  color: var(--mint-700); border: 1px solid var(--border);
  transition: background 0.2s, border-color 0.2s, transform 0.2s;
}
.chip:hover {
  background: var(--mint-100);
  border-color: rgba(15,118,110,0.28);
  transform: translateY(-1px);
}

/* Certs */
.certs-grid { display: flex; flex-direction: column; gap: 0.8rem; }
.cert-card {
  display: flex; gap: 1.1rem; align-items: flex-start;
  padding: 1.15rem 1.3rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  backdrop-filter: blur(8px);
  box-shadow: var(--shadow-sm);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}
.cert-card:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-md);
  border-color: rgba(15,118,110,0.26);
}
.cert-badge {
  flex-shrink: 0;
  width: 50px; height: 50px; border-radius: 12px;
  background: linear-gradient(135deg, var(--mint-700), var(--mint-600));
  color: #fff;
  font-family: var(--ff-head); font-weight: 800;
  font-size: 0.6rem; letter-spacing: 0.06em;
  display: flex; align-items: center; justify-content: center;
  text-align: center; line-height: 1.25;
  box-shadow: 0 4px 12px rgba(15,118,110,0.24);
}
.cert-name {
  font-family: var(--ff-head); font-weight: 700;
  font-size: 0.93rem; color: var(--text); margin-bottom: 0.15rem;
}
.cert-issuer { font-size: 0.82rem; font-weight: 600; color: var(--mint-600); margin-bottom: 0.25rem; }
.cert-detail { font-size: 0.82rem; color: var(--muted); line-height: 1.55; }

/* Footer */
.footer {
  margin: 1.5rem auto 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--gold-soft);
  color: var(--muted); font-size: 0.9rem; text-align: center;
}
.footer p { margin: 0.25rem 0; }
.footer-name {
  font-family: var(--ff-head); font-weight: 700;
  color: var(--text); font-size: 1rem; margin-bottom: 0.4rem;
}
.footer a {
  color: var(--mint-700); text-decoration: none;
  font-weight: 600; transition: color 0.2s;
}
.footer a:hover { color: var(--ruby); }

/* Mobile */
@media (max-width: 860px) {
  .hamburger { display: flex; }

  .nav-drawer {
    display: none; position: absolute;
    top: 100%; left: 0; right: 0;
    background: rgba(244,251,248,0.97);
    border-bottom: 1px solid var(--gold-soft);
    padding: 0.75rem 0;
    backdrop-filter: blur(18px);
    box-shadow: var(--shadow-md);
  }
  .nav-drawer.nav-open { display: block; }
  .nav-list { flex-direction: column; gap: 0; padding: 0 1rem; }
  .nav-list li { border-bottom: 1px solid var(--gold-soft); }
  .nav-list li:last-child { border-bottom: none; }
  .nav-list a { display: block; padding: 0.75rem 0.25rem; font-size: 0.95rem; border-radius: 0; }
  .nav-list a::after { display: none; }

  .hero-layout { grid-template-columns: 1fr; text-align: center; }
  .hero-copy { order: 2; }
  .hero-photo-wrap { order: 1; margin: 0 auto; }
  .hero-photo { width: min(200px, 60vw); }
  .hero-eyebrow { justify-content: center; }
  .hero-contact { justify-content: center; }
  .subtitle { margin: 0 auto 0.9rem; }
  .highlight-list { text-align: left; display: inline-block; }
  .actions { justify-content: center; }
  .photo-badge-ccna { right: 0; }
  .photo-badge-prc  { left: 0; }
  .skills-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .hero { padding: 1.5rem 0 2rem; }
  .actions { flex-direction: column; align-items: stretch; }
  .btn { text-align: center; justify-content: center; }
  .photo-badge { display: none; }
}
`;
