import React, { useState } from "react";
import "./DropDownButton.css";

const DropDownButton: React.FC<{ props: { text: string } }> = ({ children, props }) => {
  const [openState, toggleState] = useState<boolean>(false);
  if (openState)
    return (
      <>
        <button onClick={openState => toggleState(!openState)}>
          {props.text}
        </button>
        <div className="dropdown_box">{children}</div>
      </>
    )
  else return (
    <button onClick={openState => toggleState(!openState)}>
      {props.text}
    </button>
  )
}

export default DropDownButton;