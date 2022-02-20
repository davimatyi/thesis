import React from 'react';
import { Link } from 'react-router-dom';

const DataEditor: React.FC = () => {
  return (
    <>
      Editor
      <Link to="/">Back</Link>
      <Link to="/style">Next</Link>
    </>
  );
}

export default DataEditor;