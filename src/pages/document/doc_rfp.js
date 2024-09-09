import {
  Badge,
  Checkbox,
  HStack,
  useBreakpointValue,
  Stack,
  Text,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  ButtonGroup,
  Progress,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AddModal, EditModal } from "../../modals/add_rfs";

function DocumentRFP(props) {
  const [data, setData] = React.useState([]);
  const isMobile = useBreakpointValue({ base: true, md: false });
  useEffect(() => {
    const getRfpList = async () => {
      // 사용자 ID를 설정합니다.
      const userId = "carejoa"; // 상위 컬렉션의 문서 ID
      const subCollection = "rfp";

      // Firebase Function URL
      const functionUrl = `http://127.0.0.1:5001/motionbit-doc/us-central1/getDocuments?userId=${encodeURIComponent(
        userId
      )}&subCollection=${subCollection}`;

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
    getRfpList();
  }, []);

  const addDocument = (data) => {
    // 사용자 ID, 하위 컬렉션 이름 및 저장할 데이터를 설정합니다.
    const userId = "carejoa";
    const subCollection = "rfp";
    const documentData = data;

    // Firebase Function URL
    const functionUrl = `http://127.0.0.1:5001/motionbit-doc/us-central1/saveDocument?userId=${encodeURIComponent(
      userId
    )}&subCollection=${encodeURIComponent(subCollection)}`;

    // fetch 요청을 통해 문서를 저장합니다.
    fetch(functionUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(documentData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Document saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving document:", error);
      });
  };

  return (
    <Stack spacing={4}>
      <Box
        bg="bg.surface"
        boxShadow={{ base: "none", md: "sm" }}
        borderRadius={{ base: "none", md: "lg" }}
      >
        <Stack spacing="5">
          <HStack justifyContent="space-between">
            <Text>검색결과 {data.length}개</Text>
            <ButtonGroup>
              <AddModal onSubmit={addDocument} />
              {/* <Button>삭제</Button> */}
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
  const [selectedItem, setSelectedItem] = React.useState(null);
  return (
    <Table {...props}>
      <Thead>
        <Tr>
          <Th width="1">
            <Checkbox />
          </Th>
          <Th>스프린트</Th>
          <Th>구분</Th>
          {/* <Th>제목</Th> */}
          <Th>설명</Th>
          <Th w={"25%"}>진행도</Th>
          <Th>수정</Th>
        </Tr>
      </Thead>
      <Tbody>
        {props.data.map((value, index) => (
          <Tr
            key={value.id}
            _hover={{ bg: "gray.50", cursor: "pointer" }}
            onClick={() => setSelectedItem(value)}
          >
            <Td>
              <Checkbox />
            </Td>
            <Td>
              <Badge size="sm" colorScheme={"red"}>
                {value.sprint}
              </Badge>
            </Td>
            <Td>
              <Badge size="sm" colorScheme={"green"}>
                {value.division}
              </Badge>
            </Td>
            {/* <Td>
              <Text color="fg.muted">{value.title}</Text>
            </Td> */}
            <Td>
              <Text color="fg.muted">{value.description}</Text>
            </Td>
            <Td>
              <Progress value={value.progress} colorScheme={"purple"} />
            </Td>
            <Td>
              <EditModal data={value} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default DocumentRFP;
