import React, { useState } from 'react';
import './Accordion.css';
import { useSpring, animated } from 'react-spring';

const AccordionItem: React.FC<{ text: string }> = ({ children, text }) => {

  const [open, setOpen] = useState(false);

  const toggleHandler = (e: any) => {
    setOpen(!open);
  }

  const styles = {
    accordionTitle: {
      color: open ? '#10d6f5' : '#000'
    }
  };



  const openAnimation = useSpring({ 
    opacity: open ? 1 : 0, 
    maxHeight: open ? "120px" : "25px",
    config: {duration: 300} 
  });
  const iconAnimation = useSpring({ 
    transform: open ? "rotate(180deg)" : "rotate(0deg)", 
    color: open ? "#10d6f5" : "#fff",
    config: {duration: 120} 
  });

  return (
    <animated.div className="accordion_item" style={openAnimation}>
      <div className="accordion_header" onClick={toggleHandler}>
        <h4 style={styles.accordionTitle}>
          {text}
        </h4>
        {/* <animated.i style={iconAnimation}>
          {TODO add icon }
        </animated.i> */}
      </div>
      <div className="accordion_content">
        {children}
      </div>
    </animated.div>
  );
}

export default AccordionItem;