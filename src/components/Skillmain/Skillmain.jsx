// components/Skills/Skills.jsx
import { motion } from "framer-motion";
import "./Skillmain.css";

const Skills = () => {
  const skills = [
    { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Reactjs", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Talwind CSS", logo: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
    { name: "Framer Motion", logo: "https://cdn.simpleicons.org/framer/ffffff" },
    { name: "GSAP", logo: "https://cdn.simpleicons.org/greensock/88CE02" },
    { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Supabase", logo: "https://cdn.simpleicons.org/supabase/3ECF8E" },
    { name: "Expressjs", logo: "https://cdn.simpleicons.org/express/ffffff" },
   ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 30, 
      opacity: 0,
      scale: 0.9
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { 
      y: -30, 
      opacity: 0 
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="skills" id="skills">
      <div className="skills-container">
        <motion.div
          className="skills-wrapper"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={containerVariants}
        >
          {/* Title */}
          <motion.div className="skills-header" variants={titleVariants}>
            <h2 className="skills-title">
              <span className="title-line"></span>
              My Skills
              <span className="title-line"></span>
            </h2>
            <p className="skills-subtitle">Technologies I work with</p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div className="skills-grid" variants={containerVariants}>
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="skill-card"
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="skill-icon-wrapper">
                  <img 
                    src={skill.logo} 
                    alt={skill.name} 
                    className="skill-icon"
                    loading="lazy"
                  />
                </div>
                <span className="skill-name">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;