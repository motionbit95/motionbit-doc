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
import DocumentRFP from "./document/doc_rfp";
import DocumentRequest from "./document/doc_request";
import DocumentDB from "./document/doc_database";
import DocumentIA from "./document/doc_ia";

function MainDocument(props) {
  const menu = window.location.pathname.split("/").pop();
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

            {/* page */}
            {menu === "database" && <DocumentDB />}
            {menu === "request" && <DocumentRequest />}
            {menu === "RFP" && <DocumentRFP />}
            {menu === "IA" && <DocumentIA />}
          </Stack>
        </Flex>
      </HStack>
    </Stack>
  );
}

export default MainDocument;
