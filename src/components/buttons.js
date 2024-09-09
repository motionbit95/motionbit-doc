import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

export function OutlineButton(props) {
  return (
    <Button as="a" target="_blank" variant="outline">
      {props.children}
    </Button>
  );
}

export function ColorModeButton() {
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
    />
  );
}
export const SidebarButton = (props) => (
  <Button
    variant="tertiary"
    justifyContent="start"
    iconSpacing="3"
    {...props}
  />
);
