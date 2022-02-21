import React from 'react';
import LinkButton from '../components/buttons/LinkButton';

const Welcome: React.FC = () => {
  return (
    <>
      Welcome
      <LinkButton to="/editor">Next</LinkButton>
    </>
  );
}

export default Welcome;