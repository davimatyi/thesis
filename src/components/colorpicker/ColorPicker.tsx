import React, { useState } from "react";
import { ColorResult, SketchPicker } from 'react-color';
import './ColorPicker.css';

const ColorPicker: React.FC<{ initialColor: string, onColorPicked: Function, rightClick?: Function }> = ({ initialColor, onColorPicked, rightClick }) => {

  const [displayColorPicker, setDisplay] = useState(false);
  const [currentColor, setCurrentColor] = useState<string>(initialColor);

  const handleClick = (e: React.MouseEvent) => {
    if(e.button === 2 && rightClick !== undefined) rightClick();
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
      <div className="colorpicker_swatch" onClick={handleClick} onContextMenu={handleClick} title="Left click to select color, right click to delete">
        <div className="colorpicker_color" style={{backgroundColor: currentColor}} />
      </div>
      { 
        displayColorPicker && 
          <div className="colorpicker_popover">
            <div className="colorpicker_cover" onClick={handleClose}/>
            <SketchPicker color={currentColor} onChange={handleChange} className="colorpicker_picker"/>
          </div>
      }
    </div>
  );
}

export default ColorPicker;