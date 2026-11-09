import { useCallback, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Background, CursorGlow, Grain } from "./components/Atmosphere";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";

import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import ProjectModal from "./components/ProjectModal";
import { projects } from "./data/portfolio";

export default function App() {
  const [activeProject, setActiveProject] = useState(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const openProject = useCallback((index) => {
    setActiveProject(index);
  }, []);

  const closeProject = useCallback(() => {
    setActiveProject(null);
  }, []);

  const navigateProject = useCallback((direction) => {
    setActiveProject((current) =>
      current === null
        ? null
        : (current + direction + projects.length) % projects.length
    );
  }, []);

  return (
    <>
      <Background />
      <CursorGlow />
      <Grain />

      <motion.div
        aria-hidden="true"
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent via-accent-2 to-mint"
      />

      <Header />

      <main>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Projects onOpen={openProject} />
        <Experience />
        <Contact />
      </main>

      <Footer />
      <BackToTop />

      <AnimatePresence>
        {activeProject !== null ? (
          <ProjectModal
            key="project-modal"
            project={projects[activeProject]}
            index={activeProject}
            total={projects.length}
            onClose={closeProject}
            onNavigate={navigateProject}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
