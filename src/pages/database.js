import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { carejoa_collection } from "../erd";
import AddFormDrawer from "../components/drawer";
import CouponForm from "../forms/couponForm";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import CouponTable from "../tables/couponTable";
import { FiChevronDown } from "react-icons/fi";
import SelectMenu from "../components/select";
import { SearchButton } from "../components/buttons";
import SearchBox from "../components/searchBox";

export const company = "carejoa";
export const couponFields = [
  { key: "code", name: "쿠폰코드" },
  { key: "division", name: "구분" },
  { key: "type", name: "쿠폰타입" },
  { key: "discount", name: "적용값" },
  { key: "title", name: "쿠폰명" },
  { key: "expire", name: "만료일" },
  { key: "description", name: "쿠폰설명" },
];

function Database(props) {
  const navigate = useNavigate();

  const handleSubmit = (e, collectionName) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    console.log(data);

    // 쿠폰코드를 id로 하는 문서를 저장합니다.

    const docRef = doc(db, "database", company, collectionName, data.code);

    setDoc(docRef, data)
      .then(() => {
        alert(
          "데이터가 성공적으로 Firestore의 COUPON 컬렉션에 저장되었습니다."
        );
      })
      .catch((error) => {
        console.error("데이터 저장 중 오류 발생: ", error);
      });
  };
  return (
    <>
      {company === "carejoa" && (
        <Tabs>
          <TabList>
            {Object.keys(carejoa_collection).map((key) => (
              <Tab
                onClick={() =>
                  navigate("/database/" + carejoa_collection[key].toLowerCase())
                }
                key={key}
              >
                {key}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {Object.values(carejoa_collection).map((key) => (
              <TabPanel key={key}>
                <Stack>
                  <HStack justifyContent={"space-between"}>
                    <AddFormDrawer onSubmit={(e) => handleSubmit(e, key)}>
                      {key === "COUPON" && <CouponForm />}
                    </AddFormDrawer>
                    <HStack>
                      <SelectMenu
                        fields={couponFields.map((field) => field.name)}
                      />
                      <SearchBox onSubmit={(keyword) => console.log(keyword)} />
                    </HStack>
                  </HStack>
                  <CouponTable fields={couponFields} />
                </Stack>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </>
  );
}

export default Database;
