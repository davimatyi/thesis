import React from "react";
import './TextField.css';

const TextField: React.FC<{text: string}> = ({ text }) => {
  return <input value={text}></input>;
}

export default TextField;