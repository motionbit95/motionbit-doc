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
import Database from "./database";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function MainDocument(props) {
  const menu = window.location.pathname.split("/").slice(1).join(" / ");
  return (
    <Stack gap={4}>
      <HStack alignItems={"start"}>
        <Sidebar
          onChangeMenu={(value) => {
            window.location.href = `/${value}`;
          }}
        />
        <Flex flex={1} w={"full"} minH={"100vh"} p={4}>
          <Stack w={"full"}>
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

            <BrowserRouter>
              <Routes>
                <Route path="/database/*" element={<Database />} />
              </Routes>
            </BrowserRouter>
          </Stack>
        </Flex>
      </HStack>
    </Stack>
  );
}

export default MainDocument;
