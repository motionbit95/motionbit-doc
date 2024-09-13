import React, { useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Button, HStack, Input, Text } from "@chakra-ui/react";
import { FiSave, FiUpload } from "react-icons/fi";

const ExcelUpload = (props) => {
  const [excelData, setExcelData] = useState([]);
  const inputRef = useRef(null);

  const [downloaing, setDownload] = useState(false);

  // 엑셀 파일 처리 함수
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      // 첫 번째 시트를 가져옴
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // 시트의 내용을 JSON 형식으로 변환
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);

      console.log(jsonData);
    };

    reader.readAsArrayBuffer(file);
  };

  // Firestore에 데이터 저장
  const saveDataToFirestore = async () => {
    const mainCollection = "database"; // 상위 컬렉션 이름
    const mainDocument = "carejoa"; // 상위 문서 ID
    const subCollection = props.collection; // 하위 컬렉션 이름

    // 상위 컬렉션 -> 상위 문서 -> 하위 컬렉션의 경로 지정
    const collectionRef = collection(
      db,
      mainCollection,
      mainDocument,
      subCollection
    );

    try {
      setDownload(true);
      for (const row of excelData) {
        await addDoc(collectionRef, row); // 각 행을 하위 컬렉션에 문서로 저장
      }
      alert("데이터가 성공적으로 Firestore의 하위 컬렉션에 저장되었습니다.");
      setDownload(false);
    } catch (error) {
      console.error("데이터 저장 중 오류 발생: ", error);
    }
  };

  return (
    <HStack>
      {excelData.length === 0 && (
        <Button
          onClick={() => inputRef.current.click()}
          rightIcon={<FiUpload />}
        >
          파일업로드
        </Button>
      )}
      <Input
        ref={inputRef}
        display={"none"}
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
      />
      {excelData.length > 0 && (
        <Button
          rightIcon={<FiSave />}
          onClick={saveDataToFirestore}
          isLoading={downloaing}
        >
          Firestore에 저장
        </Button>
      )}
    </HStack>
  );
};

export default ExcelUpload;
