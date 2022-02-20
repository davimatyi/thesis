import React from 'react';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <>
      Welcome
      <Link to="/editor">Next</Link>
    </>
  );
}

export default Welcome;