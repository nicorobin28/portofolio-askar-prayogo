import React, { useEffect, useState } from "react";
import { MotionConfig } from "motion/react";
import { marqueeItems } from "@/data/cv";
import { ClickSpark } from "@/components/reactbits/ClickSpark";
import { ScrollVelocity } from "@/components/reactbits/ScrollVelocity";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const current =
      document.documentElement.getAttribute("data-theme") === "dark";
    setIsDark(current);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    const nextTheme = nextDark ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // ignore storage errors
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", nextDark ? "#181827" : "#FFFEF9");
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <ClickSpark
        colors={
          isDark
            ? ["#5B8AFF", "#D4FF33", "#FF9F33", "#FFFFFF"]
            : ["#3465FF", "#C7F904", "#FD8401", "#181827"]
        }
      >
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} />

        <main>
          <Hero />
          <ScrollVelocity items={marqueeItems} baseVelocity={-4} />
          <About />
          <Work />
          <Experience />
          <Skills />
          <Education />
          <Contact />
        </main>

        <Footer />
      </ClickSpark>
    </MotionConfig>
  );
};

export default App;
