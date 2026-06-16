import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Experience from './components/Experience/Experience'
import Project from './components/Project/Project'
import HeroSection from './components/HeroSection/HeroSection'
import About from './components/About/About'
import Whatsapp from './components/Whatsapp/Whatsapp'
import Contact from './Pages/Contact/Contact'
import Home from './Pages/Home/Home'
import './App.css'
import WhatsAppSticky from './components/Whatsapp/Whatsapp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Navbar />
      <Whatsapp />

            <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer/>
        </Router>
     
          </>
  )
}

export default App
