import React, { useState } from "react";
import './CheckBox.css';

const CheckBox: React.FC<{ callBack: Function, isChecked: boolean }> = ({ children, callBack, isChecked = undefined }) => {
  const [checked, setChecked] = useState<boolean>(isChecked !== undefined ? isChecked : false);
  return (
    <input
      type={"checkbox"}
      onChange={(e) => {
        setChecked(e.target.checked);
        callBack(checked);
      }}
      checked={checked}
    >
      {children}
    </input>
  );
}

export default CheckBox;