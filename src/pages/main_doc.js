import { HStack, Input, Stack } from "@chakra-ui/react";
import React from "react";

function MainDocument(props) {
  return (
    <Stack>
      <HStack>
        <Input />
        <Input />
      </HStack>
    </Stack>
  );
}

export default MainDocument;
