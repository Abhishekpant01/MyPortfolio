// components/Button.jsx
import React from 'react';
import './Button.css';

const Button = ({ children, onClick, type = "primary", icon = null, className = "" }) => {
  return (
    <button className={`custom-btn ${type}`} onClick={onClick}>
      {icon && <span className="btn-icon">{icon}</span>}
      <span className="btn-text">{children}</span>
    </button>
  );
};

export default Button;