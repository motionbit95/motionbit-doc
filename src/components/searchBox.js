import { HStack, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import { SearchButton } from "./buttons";

function SearchBox(props) {
  const [keyword, setKeyword] = useState("");
  return (
    <HStack>
      <Input
        placeholder="검색어를 입력하세요"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <SearchButton onClick={() => props.onSubmit(keyword)} />
    </HStack>
  );
}

export default SearchBox;
