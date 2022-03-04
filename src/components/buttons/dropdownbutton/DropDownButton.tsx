import React, { useState } from "react";
import "./DropDownButton.css";

const DropDownButton: React.FC<{ text: string }> = ({ children, text }) => {
  const [openState, toggleState] = useState<boolean>(false);
  if (openState)
    return (
      <>
        <div onClick={() => toggleState(!openState)}>
          {text}
        </div>
        <div className="dropdown_box">{children}</div>
      </>
    )
  else return (
    <div onClick={() => toggleState(!openState)}>
      {text}
    </div>
  )
}

export default DropDownButton;