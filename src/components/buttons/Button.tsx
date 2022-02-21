import React from "react";
import "./Button.css"

const Button: React.FC<{onClick:Function}> = ({children, onClick}) => {
  return(
    <div className="button" onClick={() => onClick}>
      {children}
    </div>
  )
}



export default Button;