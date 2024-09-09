import logo from "./logo.svg";
import "./App.css";

import { ChakraProvider } from "@chakra-ui/react";
import MainDocument from "./pages/main_doc";

function App() {
  return (
    <ChakraProvider>
      <MainDocument />
    </ChakraProvider>
  );
}

export default App;
