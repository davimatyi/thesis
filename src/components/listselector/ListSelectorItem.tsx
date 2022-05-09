import React, { useEffect, useState } from "react";
import FlexBox from "../layout/flexbox/FlexBox";
import FlexContainer from "../layout/flexbox/FlexContainer";
import ListGroupController from "./ListGroupController";
import './ListSelector.css';

interface props {
  index: number
  iconSrc: string, 
  text: string, 
  onSelection: Function, 
  group: ListGroupController,
  selected?: boolean
}

const ListSelectorItem: React.FC<props> = ({ index, iconSrc, text, onSelection, group, selected }) => {

  const [isSelected, setSelected] = useState(selected);

  const handleClick = () => {
    setSelected(true);
    group.updateSelection(index);
    onSelection();
  }

  const unselect = () => {
    setSelected(false);
  }

  useEffect(() => {
    group.subscribe(index, unselect);
  }, [index, group])


  return (
    <div className="listselector" onClick={handleClick} style={{backgroundColor: isSelected ? "#aaa" : "#eee", color: isSelected ? "white" : "black", margin: "0 20px 0 20px"}}>
      <FlexContainer>
        <FlexBox>
          <img src={iconSrc} alt=""/>
        </FlexBox>
        <FlexBox>
          <div className="listselector_label">{text}</div>
        </FlexBox>
      </FlexContainer>
    </div>
  );
}

export default ListSelectorItem;