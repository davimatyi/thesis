import React from 'react';
import Button from '../components/buttons/button/Button';
import DropDownButton from '../components/buttons/dropdownbutton/DropDownButton';
import LinkButton from '../components/buttons/linkbutton/LinkButton';
import Slider from '../components/inputs/slider/Slider';
import Accordion from '../components/layout/accordion/Accordion';
import AccordionItem from '../components/layout/accordion/AccordionItem';

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
      <Accordion>
        <AccordionItem text='Accordion 1'>
          <Button onClick={undefined}>asd</Button>
        </AccordionItem>
        <AccordionItem text='Accordion 2'>
          <Button onClick={undefined}>kek</Button>
        </AccordionItem>
      </Accordion>
      <Slider max={100} min={0} initialValue={50} onChange={(val: number) => {}}/>
    </>
  );
}

export default Welcome;