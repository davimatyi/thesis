import React from "react";
import "./Button.css"

const Button: React.FC<{ onClick?: React.MouseEventHandler }> = ({ children, onClick = undefined }) => {
  return (
    <div className="button" onClick={onClick}>
      {children}
    </div>
  )
}

export default Button;