import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';

const Welcome: React.FC = () => {
  return (
    <>
      <h2>Welcome</h2>
      <LinkButton to="/editor">Next</LinkButton>
    </>
  );
}

export default Welcome;