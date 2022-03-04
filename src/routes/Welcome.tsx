import React from 'react';
import Button from '../components/buttons/button/Button';
import DropDownButton from '../components/buttons/dropdownbutton/DropDownButton';
import LinkButton from '../components/buttons/linkbutton/LinkButton';

const Welcome: React.FC = () => {
  return (
    <>
      Welcome
      <LinkButton to="/editor">Next</LinkButton>
      <DropDownButton text="dropdown">
        {
          ["asd", "sad", "dsa"].map((val, ind) => {
            return <Button key={ind} onClick={() => console.log(val)}>{val}</Button>
          })
        }
      </DropDownButton>
    </>
  );
}

export default Welcome;