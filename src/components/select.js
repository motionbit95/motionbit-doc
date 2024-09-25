import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

function SelectMenu(props) {
  const [selectItem, setSelectItem] = useState("---선택---");
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FiChevronDown />}>
        {selectItem}
      </MenuButton>
      <MenuList>
        {props.fields?.map((value) => (
          <MenuItem key={value} onClick={() => setSelectItem(value)}>
            {value}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default SelectMenu;
