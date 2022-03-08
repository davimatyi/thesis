import React from "react";
import './Accordion.css';

const Accordion: React.FC = (children) => {
  return (
    <div className="accordion">{children}</div>
  );
}

export default Accordion;