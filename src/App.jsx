import { useState, useEffect, useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#project", label: "Project" },
  { href: "#certifications", label: "Certifications" },
];

const SKILLS = [
  { cat: "Networking", items: "LAN/WAN, TCP/IP, VLAN, VPN, DHCP, DNS, NAT, ACLs" },
  { cat: "Protocols", items: "OSPF, EIGRP, BGP, STP, RIP" },
  { cat: "Cisco Technologies", items: "Cisco IOS, Packet Tracer, Catalyst switches, routers" },
  { cat: "Tools", items: "Wireshark, GNS3, SecureCRT, PuTTY" },
  { cat: "Operating Systems", items: "Windows Server, Linux (Ubuntu, CentOS), Switch Engine (Extreme)" },
  { cat: "Scripting", items: "Python, C++, HTML, CSS" },
  { cat: "Electronics & Hardware", items: "Circuit design & analysis, PCB design, fusion splicing" },
  { cat: "Office Suites", items: "Microsoft Office, Google Workspace" },
  { cat: "Soft Skills", items: "Problem-solving, teamwork, communication, time management" },
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
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids]);
  return active;
}

function useFadeIn(threshold = 0.15) {
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

// ── Sub-components ────────────────────────────────────────────────────────────
function Section({ id, title, children, delay = 0 }) {
  const [ref, visible] = useFadeIn();
  return (
    <section
      id={id}
      ref={ref}
      className="section-block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(22px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      <h2>{title}</h2>
      {children}
    </section>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
  const active = useActiveSection(sectionIds);
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
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{css}</style>

      <a className="skip-link" href="#main-content">Skip to content</a>

      {/* ── Header ── */}
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="container nav-wrap">
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
          <nav
            aria-label="Primary navigation"
            className={`nav-drawer${menuOpen ? " nav-open" : ""}`}
          >
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
        <section id="top" className="hero hero-animate">
          <div className="hero-layout">
            <div className="hero-copy">
              <h1>Janus Xavier R. Sacabon</h1>
              <p className="hero-contact">
                <span>Mandaluyong City, Metro Manila</span>
                <span className="hero-contact-sep" aria-hidden="true">•</span>
                <a href="tel:+639661509076">+63 966 150 9076</a>
                <span className="hero-contact-sep" aria-hidden="true">•</span>
                <a href="mailto:jxsacabon@gmail.com">jxsacabon@gmail.com</a>
              </p>
              <p className="subtitle">
                CCNA-Certified Network Engineer with enterprise routing and switching experience,
                plus real-world ops in retail and WAN environments across 100+ sites.
              </p>
              <ul className="highlight-list">
                <li>Network Specialist, Power Mac Center Inc. (2026–present)</li>
                <li>CCNA (valid through 2029)</li>
              </ul>
              <div className="actions">
                <a
                  className="btn btn-secondary"
                  href="./JanusXavier_Sacabon_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
                <a
                  className="btn btn-ghost"
                  href="https://linkedin.com/in/jxsacabon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="btn btn-ghost"
                  href="https://github.com/JanusSacabon"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
            <div className="hero-photo-wrap">
              <img
                className="hero-photo"
                src="./janus-sacabon-photo.jpg"
                alt="Janus Xavier R. Sacabon, network engineer"
                width="400"
                height="400"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" title="Professional Summary" delay={0}>
          <p>
            CCNA-Certified Network Engineer with expertise in routing, switching, and network
            operations gained through Cisco-based training and real-world enterprise experience.
            Experienced in network documentation, troubleshooting, and infrastructure support in
            fiber and enterprise contexts. Comfortable with enterprise protocols, monitoring, and
            Cisco device configuration, with a focus on reliability, operations support, and
            infrastructure deployment.
          </p>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Technical Skills" delay={50}>
          <ul className="list">
            {SKILLS.map(({ cat, items }) => (
              <li key={cat}>
                <strong>{cat}:</strong> {items}
              </li>
            ))}
          </ul>
        </Section>

        {/* Experience */}
        <Section id="experience" title="Work History" delay={50}>
          <h3>Network Specialist</h3>
          <p className="meta">Power Mac Center Inc. | March 2026 – Present</p>
          <ul className="list">
            <li>Monitored and supported network operations for corporate offices and 100+ stores nationwide.</li>
            <li>Configured and deployed network infrastructure for 10+ store locations.</li>
            <li>Managed multiple Fortinet firewalls via FortiGate and SD-WAN.</li>
          </ul>
        </Section>

        {/* Education */}
        <Section id="education" title="Education" delay={50}>
          <h3>Bachelor of Science in Electronics Engineering (BSECE)</h3>
          <p className="meta">Bicol University Polangui | 2021 – 2025</p>
        </Section>

        {/* Project */}
        <Section id="project" title="Featured Project" delay={50}>
          <h3>Prediction of Hatching Time of Chicken Eggs Using Machine Learning</h3>
          <p className="meta">Capstone Project | 2025</p>
          <ul className="list">
            <li>
              Developed an AI-powered candling system using YOLOv11 on custom annotated datasets,
              achieving 74.89% prediction accuracy.
            </li>
            <li>
              Designed and built a functional device around a Raspberry Pi 4 Model B for real-time
              imaging, on-device inference, and LCD-based predictions.
            </li>
          </ul>
        </Section>

        {/* Certifications */}
        <Section id="certifications" title="Licenses, Certifications & Training" delay={50}>
          <ul className="list">
            <li>
              <strong>Cisco Certified Network Associate (CCNA)</strong> – Cisco Systems (Feb 2026)
              <br />
              Cisco ID: CSCO15040742 • Valid through Feb 16, 2029
            </li>
            <li>
              <strong>Licensed Electronics Engineer</strong> – Professional Regulation Commission
              (Mar 2026)
              <br />
              Valid through Sep 08, 2029
            </li>
            <li>
              <strong>Licensed Electronics Technician</strong> – Professional Regulation Commission
              (Mar 2026)
              <br />
              Valid through Sep 08, 2029
            </li>
            <li>
              <strong>CCNA 200-301 Training Bootcamp</strong> – RivanCyber Training Institute Inc.
              (Jan 2026): subnetting, VLANs, inter-VLAN routing, OSPF, NAT, ACLs, troubleshooting;
              lab work on Cisco gear; docs and introductory automation.
            </li>
          </ul>
        </Section>
      </main>

      {/* Footer */}
      <footer className="container footer">
        <p>Mandaluyong City, Metro Manila</p>
        <p>
          <a href="tel:+639661509076">+63 966 150 9076</a>
          {" | "}
          <a href="mailto:jxsacabon@gmail.com">jxsacabon@gmail.com</a>
        </p>
      </footer>
    </>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const css = `
  :root {
    --mint-50: #f0faf7;
    --mint-600: #0f766e;
    --mint-700: #115e57;
    --text: #1e293b;
    --muted: #64748b;
    --gold: #c9a54a;
    --gold-soft: rgba(201,165,74,0.35);
    --ruby: #be123c;
    --ruby-hover: #9f1239;
    --border: rgba(15,118,110,0.18);
    --font-heading: "Montserrat", system-ui, sans-serif;
    --font-body: "Quicksand", "Segoe UI", system-ui, sans-serif;
  }

  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Quicksand:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    font-weight: 500;
    color: var(--text);
    line-height: 1.65;
    background: linear-gradient(180deg, #f8fcfb 0%, #eef6f3 100%);
    min-height: 100vh;
  }

  h1, h2, h3 {
    font-family: var(--font-heading);
    font-weight: 600;
    letter-spacing: -0.02em;
  }

  .container {
    width: min(960px, 92%);
    margin: 0 auto;
  }

  /* Skip link */
  .skip-link {
    position: absolute;
    left: -999px;
    top: 0;
    background: var(--ruby);
    color: #fff;
    padding: 0.5rem 0.75rem;
    border-radius: 0 0 10px 0;
    font-family: var(--font-body);
    font-weight: 600;
    z-index: 200;
  }
  .skip-link:focus { left: 0; }

  /* Header */
  .site-header {
    position: sticky;
    top: 0;
    z-index: 50;
    backdrop-filter: blur(12px);
    background: rgba(247,249,248,0.88);
    border-bottom: 1px solid var(--gold-soft);
    transition: box-shadow 0.3s ease;
  }
  .site-header.scrolled {
    box-shadow: 0 6px 24px rgba(17,94,89,0.09);
  }

  .nav-wrap {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 4rem;
    position: relative;
  }

  /* Hamburger */
  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 6px;
    margin-left: auto;
    z-index: 60;
  }
  .ham-line {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--mint-700);
    border-radius: 2px;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform-origin: center;
  }
  .ham-line.open:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .ham-line.open:nth-child(2) { opacity: 0; transform: scaleX(0); }
  .ham-line.open:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* Nav */
  .nav-list {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  .nav-list a {
    text-decoration: none;
    color: var(--mint-700);
    font-size: 0.92rem;
    font-weight: 600;
    padding: 0.25rem 0;
    border-bottom: 2px solid transparent;
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  .nav-list a:hover { color: var(--text); border-bottom-color: var(--gold); }
  .nav-list a.nav-active {
    color: var(--text);
    border-bottom-color: var(--mint-600);
  }
  .nav-list a:focus-visible {
    outline: 2px solid var(--mint-600);
    outline-offset: 3px;
    border-radius: 2px;
  }

  /* Hero */
  .page-column { padding-bottom: 0.5rem; }

  .hero {
    margin-top: 1.25rem;
    padding: 2rem 0 2.5rem;
    border-bottom: 1px solid var(--gold-soft);
  }

  .hero-animate {
    animation: heroFadeIn 0.7s ease both;
  }
  @keyframes heroFadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-layout {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 2rem;
    align-items: center;
  }

  h1 {
    font-size: clamp(1.75rem, 4vw, 2.65rem);
    color: var(--text);
  }

  .hero-contact {
    margin: 0.55rem 0 0;
    font-size: 0.95rem;
    color: var(--muted);
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem 0.5rem;
    align-items: center;
    font-weight: 600;
  }
  .hero-contact-sep { color: rgba(17,94,89,0.35); user-select: none; }
  .hero-contact a { color: var(--mint-700); text-decoration: none; }
  .hero-contact a:hover { text-decoration: underline; }

  .subtitle {
    margin-top: 0.85rem;
    color: var(--muted);
    max-width: 68ch;
    font-size: 1.02rem;
  }

  .highlight-list {
    margin: 1rem 0 0;
    padding-left: 1.15rem;
  }
  .highlight-list li { color: #334155; margin: 0.25rem 0; }
  .highlight-list li::marker { color: var(--mint-600); }

  .hero-photo-wrap { flex-shrink: 0; }
  .hero-photo {
    display: block;
    width: min(300px, 48vw);
    height: auto;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: 50% 18%;
    border-radius: 50%;
    border: 2px solid var(--gold);
    box-shadow: 0 4px 18px rgba(17,94,89,0.1);
    background: #fff;
    transition: box-shadow 0.3s ease, transform 0.3s ease;
  }
  .hero-photo:hover {
    box-shadow: 0 8px 28px rgba(17,94,89,0.18);
    transform: scale(1.025);
  }

  /* Buttons */
  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    margin-top: 1.15rem;
  }
  .btn {
    text-decoration: none;
    font-family: var(--font-body);
    font-weight: 600;
    font-size: 0.94rem;
    padding: 0.6rem 1.1rem;
    border-radius: 12px;
    transition: transform 0.2s ease, box-shadow 0.2s ease,
                border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
  }
  .btn:hover { transform: translateY(-2px); }
  .btn:focus-visible { outline: 2px solid var(--mint-700); outline-offset: 3px; }

  .btn-secondary {
    background: #fff;
    color: var(--mint-700);
    border: 2px solid var(--gold);
  }
  .btn-secondary:hover {
    background: var(--mint-50);
    border-color: var(--mint-600);
    color: var(--text);
  }
  .btn-ghost {
    background: transparent;
    color: var(--mint-700);
    border: 2px solid var(--border);
  }
  .btn-ghost:hover {
    border-color: var(--mint-600);
    background: rgba(110,203,179,0.12);
    color: var(--text);
  }

  /* Sections */
  .section-block {
    padding: 2.15rem 0 2.35rem;
  }
  .section-block + .section-block {
    border-top: 1px solid var(--gold-soft);
  }
  .section-block p {
    max-width: 72ch;
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 1.35rem;
    color: var(--mint-700);
    padding-bottom: 0.45rem;
    border-bottom: 2px solid rgba(110,203,179,0.35);
    display: inline-block;
  }
  h3 {
    margin: 0.2rem 0;
    font-size: 1.05rem;
    color: var(--text);
  }

  .meta {
    color: var(--muted);
    margin-top: 0;
    font-size: 0.95rem;
  }

  .list {
    margin: 0.65rem 0 0;
    padding-left: 1.15rem;
    max-width: 72ch;
  }
  .list li { margin: 0.3rem 0; }
  .list li::marker { color: var(--mint-600); }

  /* Footer */
  .footer {
    margin: 1.4rem auto 2.25rem;
    padding-top: 1.1rem;
    border-top: 1px solid var(--gold-soft);
    color: var(--muted);
    font-size: 0.95rem;
  }
  .footer p { margin: 0.3rem 0; }
  .footer a {
    color: var(--mint-700);
    text-decoration: none;
    font-weight: 600;
    border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }
  .footer a:hover { color: var(--ruby); border-bottom-color: var(--ruby); }

  /* Mobile */
  @media (max-width: 860px) {
    .hamburger { display: flex; }

    .nav-drawer {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: rgba(247,249,248,0.97);
      border-bottom: 1px solid var(--gold-soft);
      padding: 1rem 0;
      backdrop-filter: blur(12px);
    }
    .nav-drawer.nav-open { display: block; }

    .nav-list {
      flex-direction: column;
      gap: 0;
      padding: 0 1.25rem;
    }
    .nav-list li { border-bottom: 1px solid var(--gold-soft); }
    .nav-list li:last-child { border-bottom: none; }
    .nav-list a {
      display: block;
      padding: 0.7rem 0;
      font-size: 1rem;
    }

    .hero-layout {
      grid-template-columns: 1fr;
      text-align: center;
    }
    .hero-contact { justify-content: center; }
    .hero-copy { order: 2; }
    .hero-photo-wrap { order: 1; justify-self: center; }
    .hero-photo { width: min(280px, 72vw); object-position: 50% 15%; }
    .subtitle { margin-left: auto; margin-right: auto; }
    .highlight-list { display: inline-block; text-align: left; }
    .actions { justify-content: center; }
  }

  @media (max-width: 480px) {
    .hero { padding: 1.35rem; }
    .actions { flex-direction: column; align-items: stretch; }
    .btn { text-align: center; }
  }
`;
