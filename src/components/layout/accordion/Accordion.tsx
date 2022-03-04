import React from 'react';
import './Accordion.css';

const Accordion: React.FC<{text: string}> = ({children, text}) => {
  return <>{children}</>
}

export default Accordion;