import { FiSun, FiMoon } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import signDark from "../../assets/sign-light.png";
import signLight from "../../assets/sign-dark.png";
import Button from "../Button/button";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [scrollTarget, setScrollTarget] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const getNavbarHeight = () => {
    const navbar = document.querySelector('.navbar');
    return navbar ? navbar.offsetHeight : 80;
  };

  const isContactPage = location.pathname === "/contact";

  // Handle scroll when scrollTarget changes
  useEffect(() => {
    if (scrollTarget) {
      // Multiple attempts to scroll
      const attemptScroll = (attempt = 0) => {
        setTimeout(() => {
          const element = document.getElementById(scrollTarget);
          if (element) {
            const navbarHeight = getNavbarHeight();
            const elementPosition = element.offsetTop - navbarHeight;
            window.scrollTo({
              top: elementPosition,
              behavior: "smooth"
            });
            setScrollTarget(null);
          } else if (attempt < 5) {
            // Retry if element not found
            attemptScroll(attempt + 1);
          }
        }, 300 + (attempt * 100));
      };
      
      attemptScroll();
    }
  }, [scrollTarget]);

  // Handle navigation to home with scroll
  const navigateToHomeWithScroll = (sectionId) => {
    // Agar already home page par hain toh direct scroll
    if (!isContactPage) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navbarHeight = getNavbarHeight();
          const elementPosition = element.offsetTop - navbarHeight;
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth"
          });
        }
      }, 100);
      setActiveLink(sectionId);
      setIsMenuOpen(false);
      return;
    }

    // Contact page se home page par jao with scroll
    navigate("/", { replace: true });
    setScrollTarget(sectionId);
    setActiveLink(sectionId);
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigateToHomeWithScroll("home");
  };

  const handleNavClick = (sectionId, linkName) => {
    // Agar contact link hai
    if (linkName === "contact") {
      if (isContactPage) {
        setIsMenuOpen(false);
        return;
      }
      navigate("/contact", { replace: true });
      setActiveLink("contact");
      setIsMenuOpen(false);
      // Contact page top se start
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }, 100);
      return;
    }

    // Home section ke liye
    navigateToHomeWithScroll(sectionId);
  };

  const handleHireClick = () => {
    if (isContactPage) {
      setIsMenuOpen(false);
      return;
    }
    navigate("/contact", { replace: true });
    setActiveLink("contact");
    setIsMenuOpen(false);
    // Contact page top se start
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }, 100);
  };

  // Scroll spy - only work on home page
  useEffect(() => {
    if (isContactPage) {
      setActiveLink("contact");
      return;
    }

    const sections = ["home", "about", "skills", "experience", "projects", "contact"];
    const handleScroll = () => {
      const navbarHeight = getNavbarHeight();
      const scrollPos = window.scrollY + navbarHeight + 50;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setActiveLink(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isContactPage]);

  return (
    <>
      <nav className={`navbar ${isDarkMode ? "dark" : "light"}`}>
        <div className="logo-container" onClick={handleLogoClick}>
          <img 
            src={isDarkMode ? signLight : signDark} 
            alt="Abhishek Pant" 
            className="logo"
          />
        </div>

        <ul className="nav-links">
          <li>
            <a 
              href="#home" 
              className={activeLink === "home" ? "active" : ""} 
              onClick={(e) => { 
                e.preventDefault(); 
                handleNavClick("home", "home"); 
              }}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={activeLink === "about" ? "active" : ""} 
              onClick={(e) => { 
                e.preventDefault(); 
                handleNavClick("about", "about"); 
              }}
            >
              About
            </a>
          </li>
          <li>
            <a 
              href="#skills" 
              className={activeLink === "skills" ? "active" : ""} 
              onClick={(e) => { 
                e.preventDefault(); 
                handleNavClick("skills", "skills"); 
              }}
            >
              Skills
            </a>
          </li>
          <li>
            <a 
              href="#experience" 
              className={activeLink === "experience" ? "active" : ""} 
              onClick={(e) => { 
                e.preventDefault(); 
                handleNavClick("experience", "experience"); 
              }}
            >
              Experience
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={activeLink === "projects" ? "active" : ""} 
              onClick={(e) => { 
                e.preventDefault(); 
                handleNavClick("projects", "projects"); 
              }}
            >
              Projects
            </a>
          </li>
          <li>
            <Link 
              to="/contact"
              className={activeLink === "contact" ? "active" : ""}
              onClick={() => {
                setActiveLink("contact");
                setIsMenuOpen(false);
                // Contact page top se start
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  });
                }, 100);
              }}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className="desktop-right-actions">
          <label className="theme-switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
            <span className="slider">
              <span className="sun"><FiSun /></span>
              <span className="moon"><FiMoon /></span>
            </span>
          </label>

          <Button type="primary" onClick={handleHireClick}>
            Hire Me
          </Button>
        </div>

        <div className={`hamburger ${isMenuOpen ? "active" : ""}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </nav>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <ul className="mobile-nav-links">
          <li>
            <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick("home", "home"); }}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={(e) => { e.preventDefault(); handleNavClick("about", "about"); }}>
              About
            </a>
          </li>
          <li>
            <a href="#skills" onClick={(e) => { e.preventDefault(); handleNavClick("skills", "skills"); }}>
              Skills
            </a>
          </li>
          <li>
            <a href="#experience" onClick={(e) => { e.preventDefault(); handleNavClick("experience", "experience"); }}>
              Experience
            </a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => { e.preventDefault(); handleNavClick("projects", "projects"); }}>
              Projects
            </a>
          </li>
          <li>
            <Link 
              to="/contact"
              onClick={() => {
                setActiveLink("contact");
                setIsMenuOpen(false);
                setTimeout(() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  });
                }, 100);
              }}
            >
              Contact
            </Link>
          </li>
        </ul>
        
        <Button type="primary" onClick={handleHireClick}>
          Hire Me
        </Button>
        
        <div className="mobile-theme-row">
          <span className="theme-text">
            {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          </span>
          <label className="mobile-theme-switch">
            <input type="checkbox" checked={isDarkMode} onChange={toggleTheme} />
            <span className="mobile-slider">
              <span className="sun"><FiSun /></span>
              <span className="moon"><FiMoon /></span>
            </span>
          </label>
        </div>
      </div>
    </>
  );
};

export default Navbar;