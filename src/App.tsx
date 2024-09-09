import { Button, ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <>
      <ChakraProvider>
        <h1 data-testid="title">Hello World</h1>
        <Button>ボタン</Button>
      </ChakraProvider>
    </>
  );
}

export default App;
