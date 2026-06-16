// components/WhatsAppSticky/WhatsAppSticky.jsx
import { FaWhatsapp } from "react-icons/fa";
import "./Whatsapp.css";

const WhatsAppSticky = () => {
  const handleWhatsApp = () => {
    const phoneNumber = "6239547147";
    const message = "Hi Abhishek! I want to connect with you.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button className="whatsapp-sticky" onClick={handleWhatsApp} aria-label="Chat on WhatsApp">
      <FaWhatsapp className="whatsapp-sticky-icon" />
      <span className="whatsapp-tooltip">Chat with me</span>
    </button>
  );
};

export default WhatsAppSticky;