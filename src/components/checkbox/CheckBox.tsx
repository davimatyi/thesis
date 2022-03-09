import React, { useState } from "react";
import './CheckBox.css';

const CheckBox: React.FC<{ value: string, callBack: Function, isChecked: boolean }> = ({ value, callBack, isChecked = undefined }) => {
  const [checked, setChecked] = useState<boolean>(isChecked !== undefined ? isChecked : false);
  return (
    <input
      type={"checkbox"}
      onChange={(e) => {
        setChecked(e.target.checked);
        callBack(e.target.checked);
      }}
      checked={checked}
      value={value}
    >
    </input>
  );
}

export default CheckBox;