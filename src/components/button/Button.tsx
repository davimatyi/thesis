import React from "react";
import "./Button.css"

const Button: React.FC<{onClick:Function}> = ({children, onClick}) => {
  return(
    <button onClick={() => onClick}>
      {children}
    </button>
  )
}



export default Button;