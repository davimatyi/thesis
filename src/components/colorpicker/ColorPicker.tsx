import React, { useState } from "react";
import { ColorResult, SketchPicker } from 'react-color';

const ColorPicker: React.FC<{ initialColor: string, onColorPicked: Function }> = ({ initialColor, onColorPicked }) => {

  const [displayColorPicker, setDisplay] = useState(false);
  const [currentColor, setCurrentColor] = useState<string>(initialColor);

  const handleClick = () => {
    setDisplay(!displayColorPicker);
  }

  const handleClose = () => {
    setDisplay(false);
    onColorPicked(currentColor);
  }

  const handleChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
  }

  return (
    <div>
      <div className="colorpicker_swatch" onClick={handleClick}>
        <div className="colorpicker_color" style={{backgroundColor: currentColor}} />
      </div>
      { 
        displayColorPicker && 
          <div className="colorpicker_popover">
            <div className="colorpicker_cover" onClick={handleClose}/>
            <SketchPicker color={currentColor} onChange={handleChange} />
          </div>
      }
    </div>
  );
}

export default ColorPicker;