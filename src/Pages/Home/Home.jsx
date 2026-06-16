// pages/Home/Home.jsx
import Hero from "../../components/HeroSection/HeroSection";
import Expeirence from "../../components/Experience/Experience";
import About from "../../components/About/About";
import SkilMain from "../../components/Skillmain/Skillmain";
import Projects from "../../components/Project/Project";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-page">
      <Hero /> 
      <Expeirence />
      <About />
      <SkilMain />
      <Projects />
      
    </div>
  );
};

export default Home;