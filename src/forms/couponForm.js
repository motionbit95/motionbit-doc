import {
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import React from "react";

function CouponForm(props) {
  function generateCouponCode(length = 12) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // 사용할 문자 집합
    let couponCode = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters[randomIndex];
    }

    return couponCode;
  }

  const [couponCode, setCouponCode] = React.useState("");
  const [autoCode, setAutoCode] = React.useState(false);

  return (
    <Stack>
      <FormControl isRequired>
        <HStack justifyContent={"space-between"}>
          <FormLabel>쿠폰코드</FormLabel>
        </HStack>
        <Input
          isReadOnly={autoCode}
          _readOnly={{ bg: "gray.200" }}
          value={couponCode}
          placeholder="쿠폰코드를 입력하세요."
          name={"code"}
          maxLength={12}
          onChange={(e) => setCouponCode(e.target.value)}
        />
      </FormControl>
      <Checkbox
        justifyContent={"flex-end"}
        onChange={(e) => {
          setAutoCode(e.target.checked);
          if (e.target.checked) {
            setCouponCode(generateCouponCode());
          } else {
            setCouponCode("");
          }
        }}
      >
        자동
      </Checkbox>
      <FormControl isRequired>
        <FormLabel>회원구분</FormLabel>
        <RadioGroup name={"division"} defaultValue={"공통"}>
          <HStack gap={8}>
            <Radio value="공통">공통</Radio>
            <Radio value="기관">기관</Radio>
            <Radio value="일반">일반</Radio>
          </HStack>
        </RadioGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>쿠폰명</FormLabel>
        <Input placeholder="쿠폰명을 입력하세요." name={"title"} />
      </FormControl>
      <FormControl>
        <FormLabel>쿠폰설명</FormLabel>
        <Input placeholder="쿠폰설명을 입력하세요." name={"description"} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>쿠폰설정</FormLabel>
        <HStack>
          <Select name={"type"} placeholder="---선택---">
            <option value="금액할인">금액할인</option>
            <option value="할인율">할인율</option>
            <option value="상담쿠폰">상담쿠폰</option>
            <option value="견적쿠폰">견적쿠폰</option>
          </Select>
          <Input
            type="number"
            placeholder="쿠폰설정값을 입력하세요."
            name={"discount"}
            min={0}
          />
        </HStack>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>만료일</FormLabel>
        <Input
          type="date"
          defaultValue={new Date().toISOString().split("T")[0]}
          name={"expire"}
        />
      </FormControl>
    </Stack>
  );
}

export default CouponForm;
