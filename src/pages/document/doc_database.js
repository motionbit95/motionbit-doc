import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import ExcelUpload from "../../components/excelupload";

function DocumentDB(props) {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchCollections = async () => {
      // Firebase Function URL
      const functionUrl = `http://127.0.0.1:5001/motionbit-doc/us-central1/getSubCollections?collection=database&doc=carejoa`;

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
          setCollections(data.subCollections);
        })
        .catch((error) => {
          // 에러가 발생했을 때 처리
          console.error("There was a problem with the fetch operation:", error);
        });
    };

    fetchCollections();
  }, []);
  return (
    <Stack>
      <Tabs>
        <TabList>
          {collections?.map((collection) => (
            <Tab>{collection}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {collections?.map((collection) => (
            <TabPanel>
              {/* <Text>{collection}</Text> */}
              <ExcelUpload collection={collection} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Stack>
  );
}

export default DocumentDB;
