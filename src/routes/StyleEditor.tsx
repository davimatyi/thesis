import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';

const StyleEditor: React.FC = () => {
  return (
    <>
      Style
      <LinkButton to="/editor">Back</LinkButton>
      <LinkButton to="/overview">Next</LinkButton>
    </>
  );
}

export default StyleEditor;