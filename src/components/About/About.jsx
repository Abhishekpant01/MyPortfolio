// About.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../Button/button";
import profileLight from "../../assets/profile-light.png";
import profileDark from "../../assets/profile-dark.png";
import "./About.css";

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.body.classList.contains("dark-mode");
      setIsDarkMode(isDark);
    };
    
    checkTheme();
    
    const observer = new MutationObserver(() => {
      const isDark = document.body.classList.contains("dark-mode");
      setIsDarkMode(isDark);
    });
    
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    
    return () => observer.disconnect();
  }, []);

  // Select profile image based on theme
  const profileImage = isDarkMode ? profileDark : profileLight;

  // Animation variants for "About Me" - FROM TOP (same as Experience & Contact)
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      }
    }
  };

  const textWordVariants = {
    hidden: { 
      y: -80,  // Starts from TOP
      opacity: 0,
      rotateX: 15,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 0.5,
      }
    }
  };

  // For other elements - simple fade in
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const handleKnowMore = () => {
    window.location.href = "/about";
  };

  // Split "About Me" into words
  const titleWords = "About Me".split(" ");

  return (
    <section className="about" id="about">
      <div className="about-container">
        <motion.div
          className="about-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "-50px 0px 0px 0px" }}
          variants={containerVariants}
        >
          {/* Title - "About Me" with stagger animation from TOP */}
          <div className="about-title-wrapper">
            <motion.h2 
              className="about-title"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={textContainerVariants}
            >
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  className="title-word"
                  variants={textWordVariants}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h2>
            <p className="about-subtitle">Get to know me better</p>
          </div>

          {/* Content Grid - Photo left, Content right */}
          <div className="about-grid">
            {/* Profile Image - Direct show, no side movement */}
            <motion.div 
              className="about-image-wrapper"
              variants={imageVariants}
            >
              <div className="image-container">
                <img src={profileImage} alt="Abhishek Pant" className="about-image" />
              </div>
            </motion.div>

            {/* Content - Direct show, no side movement */}
            <motion.div 
              className="about-content-wrapper"
              variants={contentVariants}
            >
              <div className="about-header">
                <h3 className="about-name">Abhishek Pant</h3>
                <div className="about-role">
                  <span className="role-icon">💻</span>
                  <span>Full Stack Developer</span>
                </div>
              </div>

              <p className="about-description">
                Passionate Full Stack Developer with a strong interest in building 
                modern web applications and solving real-world problems. Currently 
                working as a Full Stack Developer Intern at Oceaniek Technologies 
                while building AbhiLearn, an educational platform helping Punjabi 
                University students with verified study resources.
              </p>

              {/* Quick Info - Simple text, no icons/dots */}
              <div className="quick-info">
                <div className="info-item">
                  <strong>Location</strong>
                  <p>Rupnagar, Punjab</p>
                </div>
                <div className="info-item">
                  <strong>Education</strong>
                  <p>BCA Student</p>
                </div>
                <div className="info-item">
                  <strong>Current Work</strong>
                  <p>Oceaniek Technologies</p>
                </div>
                <div className="info-item">
                  <strong>Project</strong>
                  <p>AbhiLearn Founder</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;