// pages/Contact/Contact.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaEnvelope, 
  FaComment, 
  FaPaperPlane, 
  FaGithub, 
  FaLinkedin,
  FaEnvelope as FaEmailIcon,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";
import Button from "../../components/Button/button";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    error: false,
    message: ""
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  const FORMSPREE_ENDPOINT = "https://formspree.io/f/meewdjvl";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setStatus({
      submitting: true,
      submitted: false,
      error: false,
      message: "Sending message..."
    });

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({
          submitting: false,
          submitted: true,
          error: false,
          message: "✅ Message sent successfully! I'll get back to you soon."
        });
        
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus({
        submitting: false,
        submitted: false,
        error: true,
        message: "❌ Something went wrong. Please try again."
      });
    }
  };

  // Animation variants - "Get In Touch" from TOP
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
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const titleWords = "Get In Touch".split(" ");

  return (
    <section className="contact-page">
      <div className="contact-container">
        <motion.div
          className="contact-wrapper"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.08,
                delayChildren: 0.2,
              }
            }
          }}
        >
          {/* Header - "Get In Touch" from TOP */}
          <div className="contact-header">
            <motion.h1 
              className="contact-title"
              initial="hidden"
              animate="visible"
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
            </motion.h1>
            <motion.p 
              className="contact-subtitle"
              variants={itemVariants}
            >
              Have a project in mind or want to collaborate? Let's talk.
            </motion.p>
          </div>

          {/* Two Column Layout */}
          <div className="contact-grid">
            {/* Left - Form */}
            <motion.form 
              className="contact-form" 
              onSubmit={handleSubmit}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser className="input-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope className="input-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Discussion"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  <FaComment className="input-icon" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                ></textarea>
              </div>

              {status.message && (
                <div className={`status-message ${status.error ? 'error' : ''} ${status.submitted ? 'success' : ''}`}>
                  {status.message}
                </div>
              )}

              <Button 
                type="primary" 
                onClick={handleSubmit}
                icon={<FaPaperPlane />}
              >
                Send Message
              </Button>
            </motion.form>

            {/* Right - Info */}
            <motion.div 
              className="contact-info" 
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <div className="info-card">
                <h3>Let's Build Together</h3>
                <p>
                  Whether you have a project in mind, want to collaborate, 
                  or just want to say hi — I'm always open to great conversations.
                </p>
                
                <div className="info-divider"></div>

                <a href="mailto:abhishek.pant@example.com" className="info-item" style={{ textDecoration: 'none' }}>
                  <span className="info-icon"><FaEmailIcon /></span>
                  <div className="info-text">
                    <p className="info-value">abhishek.pant@example.com</p>
                  </div>
                </a>

                <a href="tel:+916239547147" className="info-item call-item" style={{ textDecoration: 'none' }}>
                  <span className="info-icon"><FaPhone /></span>
                  <div className="info-text">
                    <p className="info-value">+91 62395 47147</p>
                  </div>
                </a>

                <a 
                  href="https://maps.app.goo.gl/GLH2ftPHyswtWUku7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="info-item" 
                  style={{ textDecoration: 'none' }}
                >
                  <span className="info-icon"><FaMapMarkerAlt /></span>
                  <div className="info-text">
                    <p className="info-value">Ropar, Punjab - 140001</p>
                  </div>
                </a>

                <div className="info-divider"></div>

                <div className="social-links">
                  <a href="https://github.com/abhishekpant01" className="social-link" aria-label="GitHub">
                    <FaGithub />
                  </a>
                  <a href="https://linkedin.com/in/abhishek-pant-357975413" className="social-link" aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                </div>
              </div>

              <div className="quote-card">
                <p className="quote-text">
                  "Great things are built by great teams. 
                  Let's create something amazing together."
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;