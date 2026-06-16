// components/Experience/Experience.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import oceaniekLogo from "../../assets/oceaniek.jpg";
import abhilearnLogo from "../../assets/abhilearn.png";
import "./Experience.css";

const Experience = () => {
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

  const handleViewJourney = () => {
    window.open("https://maps.app.goo.gl/eodYNDDLsJgqDEq5A", "_blank");
  };

  const handleExplorePlatform = () => {
    window.open("https://abhilearn.in", "_blank");
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Increased for better mobile animation
        delayChildren: 0.2,
      }
    }
  };

  // Title animation - upar se aayega
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      }
    }
  };

  const titleWordVariants = {
    hidden: { 
      y: -100, 
      opacity: 0,
      rotateX: -90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: 0.6,
      }
    }
  };

  const subtitleVariants = {
    hidden: { 
      y: -50, 
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
        duration: 0.5,
        delay: 0.3,
      }
    }
  };

  // Cards animation - sides se aayenge
  const cardVariants = {
    hidden: (i) => ({
      x: i === 0 ? -50 : 50,
      opacity: 0,
      rotateY: i === 0 ? -8 : 8,
    }),
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 200,
        duration: 0.5,
      }
    }
  };

  return (
    <section className={`experience ${isDarkMode ? "dark" : "light"}`} id="experience">
      <div className="container">
        {/* Animated Title Section */}
        <motion.div
          className="header-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          variants={titleContainerVariants}
        >
          <div className="title-wrapper">
            <motion.span 
              className="title-word"
              variants={titleWordVariants}
            >
              Experience
            </motion.span>
            <motion.span 
              className="title-amp"
              variants={titleWordVariants}
            >
              &amp;
            </motion.span>
            <motion.span 
              className="title-word"
              variants={titleWordVariants}
            >
              Ventures
            </motion.span>
          </div>
          <motion.p 
            className="subtitle"
            variants={subtitleVariants}
          >
            Building products that solve real problems
          </motion.p>
        </motion.div>

        {/* Animated Cards Grid - ORDER CHANGED: AbhiLearn first now */}
        <motion.div
          className="cards-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "-50px" }} // Added margin for better trigger
          variants={containerVariants}
        >
          {/* Card 1 - AbhiLearn (NOW FIRST) */}
          <motion.div
            custom={0}
            variants={cardVariants}
            className="card"
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="card-top">
              <div className="logo-wrapper">
                <img src={abhilearnLogo} alt="AbhiLearn" className="logo" />
              </div>
              <div className="company-info">
                <h3 className="company-name">AbhiLearn</h3>
                <p className="company-address">Punjabi University, Patiala</p>
              </div>
            </div>

            <div className="card-body">
              <div className="role-section">
                <h4 className="role-title">Founder & Full Stack Developer</h4>
                <p className="role-period">Launched 29 Sep 2025</p>
              </div>
              
              <p className="description">
                An educational platform built for Punjabi University students to access 
                past year question papers, answer keys, and study materials - completely FREE. 
                Started with college friends, now serving 1000+ active users. Every paper is 
                100% verified, no fake content. Students can download instantly without any 
                login or payment.
              </p>
              
              <div className="tech-stack">
                <span>HTML5</span>
                <span>CSS3</span>
                <span>JavaScript</span>
                <span>Supabase</span>
                <span>Formspree</span>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">USERS</span>
                  <strong>1000+ Active</strong>
                </div>
                <div className="info-item">
                  <span className="info-label">LAUNCHED</span>
                  <strong>29 Sep 2025</strong>
                </div>
                <div className="info-item">
                  <span className="info-label">VERIFIED</span>
                  <strong>100% Papers</strong>
                </div>
              </div>
            </div>

            <div className="card-footer" onClick={handleExplorePlatform}>
              <span>Visit Platform</span>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </motion.div>

          {/* Card 2 - Oceaniek Technologies (NOW SECOND) */}
          <motion.div
            custom={1}
            variants={cardVariants}
            className="card"
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="card-top">
              <div className="logo-wrapper">
                <img src={oceaniekLogo} alt="Oceaniek" className="logo" />
              </div>
              <div className="company-info">
                <h3 className="company-name">Oceaniek Technologies India</h3>
                <p className="company-address">Mohali, Punjab</p>
              </div>
            </div>

            <div className="card-body">
              <div className="role-section">
                <h4 className="role-title">Full Stack Developer Intern</h4>
                <p className="role-period">June 2026 - Present</p>
              </div>
              
              <p className="description">
                Working on building an Employee Management System from scratch. 
                My role involves both frontend and backend development, creating features 
                like employee onboarding, attendance tracking, payroll management, and 
                performance review system. Collaborating with a team of 3 developers.
              </p>
              
              <div className="tech-stack">
                <span>Next.js</span>
                <span>Tailwind CSS</span>
                <span>Supabase</span>
                <span>PostgreSQL</span>
              </div>

              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">JOINED</span>
                  <strong>1 June 2026</strong>
                </div>
                <div className="info-item">
                  <span className="info-label">TYPE</span>
                  <strong>Hybrid</strong>
                </div>
                <div className="info-item">
                  <span className="info-label">TEAM SIZE</span>
                  <strong>3 Members</strong>
                </div>
              </div>
            </div>

            <div className="card-footer" onClick={handleViewJourney}>
              <span>View Office Location</span>
              <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;