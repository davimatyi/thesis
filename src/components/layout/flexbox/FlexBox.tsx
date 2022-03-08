import React from "react";
import './FlexBox.css';

const FlexBox: React.FC<{flexAmount: string}> = ({children, flexAmount}) => {
  return (
    <div className="flex_box" style={{flex: flexAmount}}>{children}</div>
  );
}

export default FlexBox;