// HeroSection.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../button/Button";
import Scroller from "../Skills/skill"; 
import "./HeroSection.css";

const HeroSection = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });
  
  const [displayName, setDisplayName] = useState("");
  const [nameIndex, setNameIndex] = useState(0);
  const [showRole, setShowRole] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [stage, setStage] = useState(1);
  
  const fullName = "ABHISHEK  PANT";
  const mainLine = "Code with logic. Build with creativity. Building web experiences that are ";
  const changingWords = ["fast", "responsive", "scalable", "user-focused"];
  const [wordIndex, setWordIndex] = useState(0);
  
  useEffect(() => {
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
  
  // Name animation
  useEffect(() => {
    if (nameIndex < fullName.length) {
      const timer = setTimeout(() => {
        setDisplayName(fullName.slice(0, nameIndex + 1));
        setNameIndex(nameIndex + 1);
      }, 100);
      return () => clearTimeout(timer);
    } else if (!showRole) {
      setTimeout(() => setShowRole(true), 300);
    }
  }, [nameIndex, showRole, fullName.length]);
  
  // Typewriter effect
  useEffect(() => {
    if (!showRole) return;
    
    let timer;
    
    if (stage === 1) {
      if (textIndex < mainLine.length) {
        timer = setTimeout(() => {
          setTypedText(mainLine.slice(0, textIndex + 1));
          setTextIndex(textIndex + 1);
        }, 60);
        return () => clearTimeout(timer);
      } else if (textIndex === mainLine.length) {
        timer = setTimeout(() => {
          setStage(2);
          setTextIndex(0);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
    
    if (stage === 2) {
      const currentWord = changingWords[wordIndex];
      
      if (!isDeleting && textIndex < currentWord.length) {
        timer = setTimeout(() => {
          setTypedText(mainLine + currentWord.slice(0, textIndex + 1));
          setTextIndex(textIndex + 1);
        }, 100);
        return () => clearTimeout(timer);
      } else if (!isDeleting && textIndex === currentWord.length) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
        return () => clearTimeout(timer);
      } else if (isDeleting && textIndex > 0) {
        timer = setTimeout(() => {
          setTypedText(mainLine + currentWord.slice(0, textIndex - 1));
          setTextIndex(textIndex - 1);
        }, 50);
        return () => clearTimeout(timer);
      } else if (isDeleting && textIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % changingWords.length);
      }
    }
    
    return () => clearTimeout(timer);
  }, [showRole, stage, textIndex, isDeleting, wordIndex, mainLine, changingWords]);

  const handleViewProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadCV = () => {
  // Create a link to the CV file in the public folder
  const cvUrl = '/resume.pdf'; // Public folder ke root mein file hai
  const link = document.createElement('a');
  link.href = cvUrl;
  link.download = 'Abhishek-pant Resume.pdf'; // Download karne par file ka naam
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <>
      <section className={`hero ${isDarkMode ? "dark" : "light"}`} id="home">
        <div className="hero-container">
          {/* Left Side - Content */}
          <div className="hero-left">
            <div className="hero-content">
              {/* Name */}
              <div className="hero-name-wrapper">
                <h1 className="hero-name">
                  {displayName.split("").map((char, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                      className={char === " " ? "space-char" : ""}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </h1>
              </div>
              
              {/* Full Stack Developer */}
              {showRole && (
                <motion.div
                  className="hero-role"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  <span className="role-line">FULL STACK</span>
                  <span className="role-line role-highlight">DEVELOPER</span>
                </motion.div>
              )}
              
              {/* Typewriter Text */}
              {showRole && (
                <motion.div
                  className="hero-dynamic-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <p className="dynamic-text">
                    {typedText}
                    {stage === 2 && (
                      <span className="changing-word-cursor">|</span>
                    )}
                    {stage === 1 && textIndex < mainLine.length && (
                      <span className="cursor">|</span>
                    )}
                  </p>
                </motion.div>
              )}
              
              {/* Buttons */}
              {showRole && (
                <motion.div
                  className="hero-buttons"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <Button type="primary" onClick={handleViewProjects}>
                    View Projects
                  </Button>
                  <Button type="secondary" onClick={handleDownloadCV}>
                    Download CV
                  </Button>
                </motion.div>
              )}
              
              {/* Social Links */}
              {showRole && (
                <motion.div
                  className="hero-social"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                >
                 <div className="social-links">
  {/* GitHub */}
  <a
    href="https://github.com/Abhishekpant01"
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
    aria-label="GitHub"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.18.08 1.8 1.2 1.8 1.2 1.04 1.8 2.75 1.28 3.42.98.1-.76.41-1.28.74-1.57-2.55-.29-5.23-1.28-5.23-5.67 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.18 1.17a11.1 11.1 0 0 1 5.8 0c2.2-1.48 3.17-1.17 3.17-1.17.63 1.58.24 2.75.12 3.04.74.8 1.18 1.82 1.18 3.07 0 4.4-2.68 5.38-5.24 5.67.42.36.79 1.06.79 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/>
    </svg>
  </a>

  {/* LinkedIn */}
  <a
    href="https://linkedin.com/in/abhishek-pant-357975413"
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
    aria-label="LinkedIn"
  >
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM0 8h5v16H0V8zm8 0h4.79v2.19h.07c.67-1.27 2.3-2.61 4.74-2.61C22.42 7.58 24 10.08 24 14.1V24h-5v-8.47c0-2.02-.04-4.62-2.82-4.62-2.82 0-3.25 2.2-3.25 4.47V24H8V8z"/>
    </svg>
  </a>

  {/* Email */}
  <a
    href="mailto:abhishekpant212@gmail.com"
    className="social-link"
    aria-label="Email"
  >
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M3.5 7.5L12 13.5L20.5 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </a>
</div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Right Side - Animation */}
          {showRole && (
            <motion.div 
              className="hero-right"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="animation-container">
                <div className="floating-cube">
                  <div className="cube-front">{'</>'}</div>
                  <div className="cube-back">{'{}'}</div>
                  <div className="cube-left">{'()'}</div>
                  <div className="cube-right">{'[]'}</div>
                </div>
                <div className="code-particles">
                  <span className="particle">{'const'}</span>
                  <span className="particle">{'let'}</span>
                  <span className="particle">{'=>'}</span>
                  <span className="particle">{'{}'}</span>
                  <span className="particle">{'()'}</span>
                  <span className="particle">{'[]'}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="hero-glow"></div>
      </section>

      {/* Scroller Component - Yahan pe add kiya */}
      <Scroller />
    </>
  );
};

export default HeroSection;