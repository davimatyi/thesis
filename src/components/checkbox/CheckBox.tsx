import React, { useState } from "react";
import './CheckBox.css';

interface PropType { 
  text: string, 
  callBack: Function, 
  isChecked: boolean, 
  onClick?: React.MouseEventHandler<HTMLInputElement>
};

const CheckBox: React.FC<PropType> = ({ text, callBack, isChecked = undefined, onClick = undefined }) => {

  const [checked, setChecked] = useState<boolean>(isChecked !== undefined ? isChecked : false);

  return (
    <div className="checkbox_container">
      <label>
        <input
          type={"checkbox"}
          onChange={(e) => {
            setChecked(e.target.checked);
            callBack(e.target.checked);
          }}
          checked={checked}
          onClick={onClick}
        />
        <span className="checkmark"></span>
        {text}
      </label>
    </div>
  );
}

export default CheckBox;