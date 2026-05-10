export default function Portfolio() {
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
