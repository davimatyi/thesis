import React from 'react';
import './ScrollBox.css';

const ScrollBox : React.FC = ({children}) => {

  return <div className="scroll_box">{children}</div>
}

export default ScrollBox