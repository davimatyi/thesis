import React from "react";
import './FlexBox.css';

const FlexContainer: React.FC = (props) => {
  return (
    <div className="flex_container">{props.children}</div>
  );
}

export default FlexContainer;