import { Box, Button, Center, ChakraProvider, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [studyText, setStudyText] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [records, setRecords] = useState([]);
  const onChangeText = (event) => {
    setStudyText(event.target.value);
  };

  const onChangeTime = (event) => {
    setStudyTime(event.target.value);
  };

  const onClickAddTodo = () => {
    console.log("クリックしました");
    const newRecords = [...records];
    setRecords(newRecords);
  };

  return (
    <>
      <ChakraProvider>
        <Box w="60%" m="auto" bg="gray.100">
          <Center>
            <Heading as="h1" size="xl" data-testid="title" mt={10}>
              学習記録一覧
            </Heading>
          </Center>
          <Box>
            <Box mt={10}>
              <FormControl display="flex">
                <FormLabel fontSize="lg" display="flex" alignItems="center" m={0}>
                  学習内容
                </FormLabel>
                <Input type="text" w="60%" ml={5} onChange={onChangeText} value={studyText} />
              </FormControl>
            </Box>
            <Box mt={10}>
              <FormControl display="flex">
                <FormLabel fontSize="lg" display="flex" alignItems="center" m={0}>
                  学習時間
                </FormLabel>
                <Input type="text" w="60%" ml={5} onChange={onChangeTime} value={studyTime} />
              </FormControl>
            </Box>
          </Box>
          <Box mt={10}>
            <Text>入力されている学習内容 {studyText}</Text>
          </Box>
          <Box mt={2}>
            <Text>入力されている学習時間 {studyTime}時間</Text>
          </Box>
          <Button onClick={onClickAddTodo} mt={2}>
            登録
          </Button>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
