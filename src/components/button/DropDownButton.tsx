import React, { useState } from "react";
import "./DropDownButton.css";

const DropDownButton: React.FC<{ props: { text: string } }> = ({ children, props }) => {
  const [openState, toggleState] = useState<boolean>(false);
  return (
    <>
      <button onClick={openState => toggleState(!openState)}>
        {props.text}
      </button>
      {/* { 
      if(openState)
      return (<div className="dropdown_box">{children}</div>) 
    } */}
    </>
  )
}

export default DropDownButton;