import React from "react";
import './FlexBox.css';

const FlexContainer: React.FC = (children) => {
  return(
    <div className="flex_container">{children}</div>
  );
}

export default FlexContainer;