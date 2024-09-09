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
import { FiDownload } from "react-icons/fi";
import React, { useEffect } from "react";
import { formatTimestamp } from "../../firebase/common";

function DocumentRequest(props) {
  const [data, setData] = React.useState([]);
  const isMobile = useBreakpointValue({ base: true, md: false });

  useEffect(() => {
    const getRequestList = async () => {
      // 사용자 ID를 설정합니다.
      const userId = "carejoa"; // 상위 컬렉션의 문서 ID

      // Firebase Function URL
      const functionUrl = `http://127.0.0.1:5001/motionbit-doc/us-central1/getRequests?userId=${encodeURIComponent(
        userId
      )}`;

      console.log("Fetching user orders from:", functionUrl);

      // fetch 요청을 보냅니다.
      fetch(functionUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Network response was not ok " + response.statusText
            );
          }
          return response.json(); // JSON 형태로 응답 데이터를 파싱
        })
        .then((data) => {
          // 성공적으로 데이터를 받았을 때 처리
          console.log("User orders:", data);
          setData(data);
        })
        .catch((error) => {
          // 에러가 발생했을 때 처리
          console.error("There was a problem with the fetch operation:", error);
        });
    };
    getRequestList();
  }, []);
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
            <RequestTable data={data} />
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}

export const RequestTable = (props) => {
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th width="1">
            <Checkbox />
          </Th>
          <Th>등록일시</Th>
          <Th>제목</Th>
          <Th>첨부파일</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.data.map((value, index) => (
          <Tr key={value.id}>
            <Td>
              <Checkbox />
            </Td>
            <Td>
              <Text color="fg.muted">
                {formatTimestamp(value.date._seconds, value.date._nanoseconds)}
              </Text>
            </Td>
            <Td>
              <Text color="fg.muted">{value.title}</Text>
            </Td>
            <Td>
              <IconButton
                icon={<FiDownload />}
                variant="tertiary"
                aria-label="Download"
                onClick={() => window.open(value.filepath)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DocumentRequest;
