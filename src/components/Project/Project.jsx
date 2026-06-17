// Projects.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import portfolioImage from "../../assets/portfolio.png";
import abhilearnImage from "../../assets/abhilearn2.png";
import "./Project.css";

const Projects = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  const projects = [
    {
      id: 1,
      name: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing my skills, projects, and professional journey. Built with React and Framer Motion for smooth animations, featuring dark mode support and fully responsive design across all devices.",
      image: portfolioImage,
      techStack: ["React.js", "Framer Motion", "CSS3", "React Icons"],
      liveLink: "#home",
      githubLink: "https://github.com/Abhishekpant01/MyPortfolio",
      year: "2026",
      featured: true
    },
    {
      id: 2,
      name: "AbhiLearn",
      description: "Educational platform for Punjabi University students to access past year question papers, answer keys, and study materials completely FREE. Serving 1000+ active users with verified content.",
      image: abhilearnImage,
      techStack: ["HTML5", "CSS3", "JavaScript", "Supabase", "Formspree"],
      liveLink: "https://abhilearn.in",
      githubLink: "https://github.com/Team-Abhilearn/previous-year-papers",
      year: "2025",
      featured: false
    }
  ];

  // Animation variants for "Featured Projects" - FROM TOP (same as others)
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

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.5
      }
    }
  };

  const openLiveDemo = (url) => {
    if (url === "#home") {
      const element = document.getElementById("home");
      if (element) {
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 80;
        const elementPosition = element.offsetTop - navbarHeight;
        window.scrollTo({
          top: elementPosition,
          behavior: "smooth"
        });
      }
    } else {
      window.open(url, "_blank");
    }
  };

  // Split "Featured Projects" into words
  const titleWords = "Featured Projects".split(" ");

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <motion.div
          className="projects-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2, margin: "-50px 0px 0px 0px" }}
          variants={containerVariants}
        >
          {/* Title - "Featured Projects" with stagger animation from TOP */}
          <div className="projects-title-wrapper">
            <motion.h2 
              className="projects-title"
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
            <p className="projects-subtitle">Some of my recent work</p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                variants={cardVariants}
                onMouseEnter={() => setHoveredCard(project.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="project-image-wrapper">
                  <img 
                    src={project.image} 
                    alt={project.name} 
                    className="project-image"
                  />
                  <div className={`image-overlay ${hoveredCard === project.id ? 'visible' : ''}`}>
                    <button 
                      className="live-demo-btn"
                      onClick={() => openLiveDemo(project.liveLink)}
                    >
                      <span>Live Demo</span>
                      <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </button>
                  </div>
                  {project.featured && <span className="featured-badge">Featured</span>}
                </div>

                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-name">{project.name}</h3>
                    <span className="project-year">{project.year}</span>
                  </div>
                  
                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="tech-stack">
                    {project.techStack.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="project-links">
                    <button 
                      className="project-link-btn primary"
                      onClick={() => openLiveDemo(project.liveLink)}
                    >
                      <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                        <polyline points="15 3 21 3 21 9"/>
                        <line x1="10" y1="14" x2="21" y2="3"/>
                      </svg>
                      Live Demo
                    </button>
                    <button 
                      className="project-link-btn secondary"
                      onClick={() => openLiveDemo(project.githubLink)}
                    >
                      <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                      </svg>
                      GitHub
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;