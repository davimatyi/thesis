import React from "react";
import './FlexBox.css';

const FlexBox: React.FC<{flexAmount?: string, height?: string}> = ({children, flexAmount=undefined, height="auto"}) => {
  return (
    <div className="flex_box" style={{flex: flexAmount, height: height, maxHeight: height}}>{children}</div>
  );
}

export default FlexBox;