import React, { useState } from "react";
import './Slider.css';

const Slider: React.FC<{initialValue: number, min: number, max: number, onChange: Function}> = ({initialValue, min, max, onChange}) => {
  const [value, setValue] = useState<number>(initialValue);
  return (
    <div className="slider_container">
      <input 
        type={"range"} 
        min={min} 
        max={max} 
        value={value} 
        className="slider" 
        onChange={
          (e) => {
            onChange(e.target.value);
            setValue(+e.target.value);
          }
        }/>
    </div>
  );
}

export default Slider;