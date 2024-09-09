import { Heading, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

function DocumentRFP(props) {
  return (
    <VStack w={"full"}>
      <Heading>요구사항정의서</Heading>
      <Text w={"full"} textAlign={"right"}>
        Last Updated: {}
      </Text>
    </VStack>
  );
}

export default DocumentRFP;
