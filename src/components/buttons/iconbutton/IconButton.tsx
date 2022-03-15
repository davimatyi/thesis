import React from "react";
import './IconButton.css';
import plus_icon from './plus_icon.png';

const IconButton: React.FC<{ onClick?: React.MouseEventHandler }> = ({ onClick }) => {
  return (
    <div className="icon_button" onClick={onClick}>
      <img src={plus_icon} alt="add"/>
    </div>
  );
}

export default IconButton;