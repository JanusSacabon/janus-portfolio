export default function Portfolio() {
  const projects = [
    {
      title: "Intelligent Candling Unit",
      description:
        "AI-powered egg hatch prediction system using Raspberry Pi 4B and YOLOv11 for real-time embryo analysis.",
      tech: ["Python", "YOLOv11", "Raspberry Pi", "TensorFlow"],
    },
    {
      title: "River Garbage Filter",
      description:
        "Hydroelectric-powered river filtration system with automated conveyor-based waste collection.",
      tech: ["Embedded Systems", "Automation", "Hydroelectric", "IoT"],
    },
    {
      title: "Future Network Engineering Lab",
      description:
        "Cisco-focused networking environment for routing, switching, VLANs, and enterprise troubleshooting.",
      tech: ["Cisco", "Routing", "Switching", "CCNA", "CCNP"],
    },
  ];

  const skills = [
    "Networking",
    "Cisco",
    "Python",
    "JavaScript",
    "React",
    "Linux",
    "Raspberry Pi",
    "TensorFlow",
    "YOLO",
    "IoT",
    "Git",
    "Troubleshooting",
  ];
  
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,140,255,0.25),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(120,0,255,0.2),transparent_35%),black]" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10 bg-black/30">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-widest">JANUS</h1>

          <div className="hidden md:flex gap-8 text-sm text-gray-300">
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#skills" className="hover:text-white transition">Skills</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </nav>
      
      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="uppercase tracking-[0.4em] text-blue-400 text-sm mb-6">
              Electronics Engineer • Network Engineer
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              Building Intelligent Systems & Enterprise Networks.
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
              ECE graduate specializing in networking, automation, embedded
              systems, and AI-driven hardware projects.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 transition font-semibold"
              >
                View Projects
              </a>

              <a
                href="https://github.com/"
                target="_blank"
                className="px-8 py-4 rounded-2xl border border-white/20 hover:border-white transition font-semibold"
              >
                GitHub
              </a>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="w-[320px] h-[320px] rounded-full bg-gradient-to-br from-blue-500 via-cyan-400 to-purple-500 blur-3xl opacity-30 absolute" />

            <div className="relative border border-white/10 bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 w-full max-w-md shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm text-gray-400">Current Focus</p>
                  <h3 className="font-bold text-xl mt-1">Network Engineering</h3>
                </div>

                <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse" />
              </div>

              <div className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Routing & Switching</span>
                    <span>85%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[85%] bg-blue-400 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Linux & Systems</span>
                    <span>80%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[80%] bg-cyan-400 rounded-full" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Automation & AI</span>
                    <span>88%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full w-[88%] bg-purple-400 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="mt-10 p-5 rounded-2xl border border-white/10 bg-black/30">
                <p className="text-sm text-gray-400 mb-1">Latest Goal</p>
                <p className="font-semibold text-lg">CCNP Enterprise Path</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="max-w-6xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
              About Me
            </p>

            <h2 className="text-4xl md:text-5xl font-black mb-8">
              Engineering Beyond the Classroom.
            </h2>
          </div>

          <div>
            <p className="text-gray-400 text-lg leading-relaxed">
              Passionate about enterprise networking, intelligent systems, and
              embedded technologies.
            </p>
          </div>
        </div>
      </section>

      <section id="skills" className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-14">
          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
            Skills
          </p>

          <h2 className="text-4xl font-black">Technical Stack</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {skills.map((skill) => (
            <div
              key={skill}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 hover:scale-105 hover:border-blue-400 transition duration-300"
            >
              <p className="font-semibold text-lg">{skill}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="max-w-6xl mx-auto px-6 py-24">
        <div className="mb-14">
          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
            Projects
          </p>

          <h2 className="text-4xl font-black">Featured Work</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:-translate-y-2 transition duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 mb-8" />

              <h3 className="text-2xl font-bold mb-4">{project.title}</h3>

              <p className="text-gray-400 leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-3">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-full text-sm border border-white/10 bg-black/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="max-w-6xl mx-auto px-6 py-28">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl p-10 md:p-16 text-center">
          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-4">
            Contact
          </p>

          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Let’s Build Something.
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg leading-relaxed">
            Open to opportunities in network engineering and embedded systems.
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="mailto:your@email.com"
              className="px-8 py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 transition font-semibold"
            >
              Email Me
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              className="px-8 py-4 rounded-2xl border border-white/20 hover:border-white transition font-semibold"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-gray-500 text-sm">
        © 2026 Janus Sacabon. Built with React & Tailwind CSS.
      </footer>
    </div>
  )
}
