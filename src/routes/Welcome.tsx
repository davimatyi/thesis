import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';

const Welcome: React.FC = () => {
  return (
    <>
      Welcome
      <LinkButton to="/editor">Next</LinkButton>
    </>
  );
}

export default Welcome;