import {
  Box,
  Button,
  Center,
  ChakraProvider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import "./App.css";

function App() {
  return (
    <>
      <ChakraProvider>
        <Box>
          <Heading as="h1" size="xl" data-testid="title" mt={10}>
            学習記録一覧
          </Heading>
          <Box w="60%" m="auto">
            <Box>
              <FormControl display="flex">
                <FormLabel
                  fontSize="lg"
                  display="flex"
                  alignItems="center"
                  m={0}
                >
                  学習内容
                </FormLabel>
                <Input type="text" w="60%" />
              </FormControl>
            </Box>
            <Box mt={10}>
              <FormControl display="flex">
                <FormLabel
                  fontSize="lg"
                  display="flex"
                  alignItems="center"
                  m={0}
                >
                  学習時間
                </FormLabel>
                <Input type="text" w="60%" />
              </FormControl>
            </Box>
          </Box>
          <Button>登録</Button>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
