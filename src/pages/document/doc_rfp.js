import {
  Avatar,
  Badge,
  Checkbox,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useBreakpointValue,
  Stack,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Container,
  Box,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { FiSearch, FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";
import React from "react";

function DocumentRFP(props) {
  const data = [
    {
      id: 1,
      date: "2024.09.09 16:00:08",
      title: "0902요양모션빛0610피드백",
      filepath: "",
    },
  ];
  const isMobile = useBreakpointValue({ base: true, md: false });
  return (
    <Stack spacing={4}>
      <Flex bgColor={"purple.100"} p={3} borderRadius={"lg"}>
        <HStack alignItems={"flex-start"}>
          <Text>💡</Text>
          <Text>
            클라이언트가 프로젝트 구축 요청 시 전달하는 문서로{" "}
            <strong>프로젝트에 제안 받을 내용</strong>이나{" "}
            <strong>프로젝트 요구사항</strong>이 포함되어 있습니다.
          </Text>
        </HStack>
      </Flex>
      <Box
        bg="bg.surface"
        boxShadow={{ base: "none", md: "sm" }}
        borderRadius={{ base: "none", md: "lg" }}
      >
        <Stack spacing="5">
          <HStack justifyContent="space-between">
            <Text>검색결과 {data.length}개</Text>
            <ButtonGroup>
              <Button colorScheme="purple">등록</Button>
              <Button>삭제</Button>
            </ButtonGroup>
          </HStack>
          <Box overflowX="auto">
            <RFPTable data={data} />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

export const RFPTable = (props) => {
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th width="1">
            <Checkbox />
          </Th>
          <Th>등록일시</Th>
          <Th>제목</Th>
          <Th>수정</Th>
          <Th>삭제</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.data.map((value, index) => (
          <Tr key={value.id}>
            <Td>
              <Checkbox />
            </Td>
            <Td>
              <Text color="fg.muted">{value.date}</Text>
            </Td>
            <Td>
              <Text color="fg.muted">{value.title}</Text>
            </Td>
            <Td>
              <IconButton
                icon={<FiTrash2 />}
                variant="tertiary"
                aria-label="Delete"
              />
            </Td>
            <Td>
              <IconButton
                icon={<FiEdit2 />}
                variant="tertiary"
                aria-label="Edit"
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DocumentRFP;
