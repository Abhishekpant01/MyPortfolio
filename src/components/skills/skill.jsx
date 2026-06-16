import { useState, useEffect } from "react";
import "./skill.css";

const skills = [
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Framer Motion", logo: "https://cdn.simpleicons.org/framer/ffffff" },
  { name: "GSAP", logo: "https://cdn.simpleicons.org/greensock/88CE02" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/3ECF8E" },
  { name: "Express", logo: "https://cdn.simpleicons.org/express/ffffff" },
  { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/ffffff" },
];

const Skill = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Check initial theme
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark" || document.body.classList.contains("dark-mode");
    setIsDarkMode(isDark);

    // Listen for theme changes
    const checkTheme = () => {
      const savedTheme = localStorage.getItem("theme");
      setIsDarkMode(savedTheme === "dark");
    };
    
    window.addEventListener("storage", checkTheme);
    
    const observer = new MutationObserver(() => {
      const isDark = document.body.classList.contains("dark-mode");
      setIsDarkMode(isDark);
    });
    
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    
    return () => {
      window.removeEventListener("storage", checkTheme);
      observer.disconnect();
    };
  }, []);

  // Don't render until mounted
  if (!isMounted) {
    return <div className="skill-marquee-loading" style={{ padding: '20px 0' }}></div>;
  }

  return (
    <div className={`skill-marquee ${isDarkMode ? "dark" : "light"}`}>
      <div className="track">
        {[...skills, ...skills, ...skills].map((skill, index) => (
          <div className="item" key={index}>
            <img src={skill.logo} alt={skill.name} />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;