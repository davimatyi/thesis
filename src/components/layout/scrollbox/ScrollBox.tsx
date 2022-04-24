import React from 'react';
import './ScrollBox.css';

const ScrollBox : React.FC<{style?: React.CSSProperties | undefined}> = ({children, style = undefined}) => {

  return <div className="scroll_box" style={style}>{children}</div>
}

export default ScrollBox