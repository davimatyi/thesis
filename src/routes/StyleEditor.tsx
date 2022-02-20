import React from 'react';
import { Link } from 'react-router-dom';

const StyleEditor: React.FC = () => {
  return (
    <>
      Style
      <Link to="/editor">Back</Link>
      <Link to="/overview">Next</Link>
    </>
  );
}

export default StyleEditor;