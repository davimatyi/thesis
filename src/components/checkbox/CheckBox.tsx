import React, { useState } from "react";
import './CheckBox.css';

const CheckBox: React.FC<{ text: string, callBack: Function, isChecked: boolean }> = ({ text, callBack, isChecked = undefined }) => {
  const [checked, setChecked] = useState<boolean>(isChecked !== undefined ? isChecked : false);
  return (
    <label className="checkbox_container">
      <input
        type={"checkbox"}
        onChange={(e) => {
          setChecked(e.target.checked);
          callBack(e.target.checked);
        }}
        checked={checked}
      />
      <span className="checkmark"></span>
      {text}
    </label>
  );
}

export default CheckBox;