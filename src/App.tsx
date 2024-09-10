import { Button, ChakraProvider } from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <>
      <ChakraProvider>
        <h1 data-testid="title">学習記録一覧</h1>
        <Button>ボタン</Button>
      </ChakraProvider>
    </>
  );
}

export default App;
