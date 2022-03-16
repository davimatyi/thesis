import React from "react";
import './TextField.css';

const TextField: React.FC<{text: string, onChange: Function }> = ({ text, onChange }) => {
  return <input value={text} onChange={(e) => onChange(e.target.value)}></input>;
}

export default TextField;