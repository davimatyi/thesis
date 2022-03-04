import React from 'react';
import LinkButton from '../components/buttons/linkbutton/LinkButton';

const DataEditor: React.FC = () => {
  return (
    <>
      Editor
      <LinkButton to="/">Back</LinkButton>
      <LinkButton to="/style">Next</LinkButton>
    </>
  );
}

export default DataEditor;