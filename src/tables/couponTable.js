import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  Button,
  Icon,
} from "@chakra-ui/react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { company } from "../pages/database";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

function CouponTable(props) {
  const [couponList, setCouponList] = useState([]);
  const [orderBy_, setOrderBy] = useState("code");
  const [order, setOrder] = useState("asc");

  const getCouponList = async () => {
    const q = query(
      collection(db, "database", company, "COUPON"),
      orderBy(orderBy_, order)
    );

    const querySnapshot = await getDocs(q);

    let couponList = [];
    querySnapshot.forEach((doc) => {
      couponList.push({
        id: doc.id,
        ...doc.data(),
      });
      setCouponList(couponList);
    });
  };

  useEffect(() => {
    getCouponList();
  }, [orderBy_, order]);
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {props.fields?.map((value, index) => (
              <Th
                key={index}
                cursor={"pointer"}
                color={orderBy_ === value.key ? "blue.400" : "inherit"}
                onClick={() => {
                  setOrderBy(value.key);
                  setOrder("asc" === order ? "desc" : "asc");
                }}
              >
                {value.name}
                <Icon
                  visibility={orderBy_ === value.key ? "visible" : "hidden"}
                  color={orderBy_ === value.key ? "blue.400" : "inherit"}
                  as={order === "asc" ? FiArrowDown : FiArrowUp}
                />
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {couponList.map((value, index) => (
            <Tr key={index}>
              <Td>{value.code}</Td>
              <Td>{value.title}</Td>
              <Td>{value.description}</Td>
              <Td>{value.division}</Td>
              <Td>{value.type}</Td>
              <Td>
                {value.discount}
                {value.type === "할인율"
                  ? "% 할인"
                  : value.type === "금액할인"
                  ? "원 할인"
                  : "회 무료"}
              </Td>
              <Td>{value.expire}</Td>
              <Td>
                <HStack>
                  <Button size={"xs"}>수정</Button>
                  <Button size={"xs"} colorScheme="red" variant={"outline"}>
                    삭제
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default CouponTable;
