import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  HStack,
  Input,
  Stack,
  StackDivider,
  styled,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Sidebar } from "../parts/sidebar";

function MainDocument(props) {
  const menu = window.location.pathname.split("/").pop();
  return (
    <Stack gap={4}>
      <HStack>
        <Sidebar
          onChangeMenu={(value) => {
            window.location.href = `/${value}`;
          }}
        />
        <Flex flex={1} w={"full"} minH={"100vh"} p={4}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink
                isCurrentPage
                fontSize={"xl"}
                fontWeight={"bold"}
                href={menu}
              >
                {menu.toLocaleUpperCase()}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
      </HStack>
    </Stack>
  );
}

export default MainDocument;
