import { Box, Button, Center, ChakraProvider, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import "./App.css";
import React, { useEffect, useState } from "react";
import { getAllTodos } from "./utils/supabaseFunction";
import { Todo } from "./domain/todo";

const App = () => {
  const [studyText, setStudyText] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [records, setRecords] = useState<Todo[]>([]);
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudyText(event.target.value);
  };

  const onChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTime(event.target.value);
  };

  const onClickAddTodo = () => {
    console.log("クリックしました");
    const newRecords = [...records];
    setRecords(newRecords);
  };

  useEffect(() => {
    const getTodos = async () => {
      const todosData = await getAllTodos();
      if (Array.isArray(todosData)) {
        setRecords(todosData);
      } else {
        console.error("Error fetching todos");
      }
    };
    getTodos();
  }, []);

  return (
    <>
      <ChakraProvider>
        <Box w="60%" m="auto" bg="gray.100" p={10}>
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
          <Box mt={10} bg="white" pt={5} pb={5} borderRadius="10">
            <Text ml={5}>入力されている学習内容 {studyText}</Text>
          </Box>
          <Box mt={5} bg="white" pt={5} pb={5} borderRadius="10">
            <Text ml={5}>入力されている学習時間 {studyTime}時間</Text>
          </Box>
          <Center>
            <Button onClick={onClickAddTodo} mt={2} colorScheme="purple" w="50%" borderRadius="999" m="5">
              登録
            </Button>
          </Center>
          <Box mt={10}>
            {records.map((record) => {
              return (
                <>
                  <Box bg="white" p={10} mb={5} borderRadius="10" display="flex" justifyContent="space-between">
                    <Box key={record.id} display="flex">
                      <Text mr={5} display="flex" alignItems="center">
                        {record.title}
                      </Text>
                      <Text display="flex" alignItems="center">
                        {record.time}時間
                      </Text>
                    </Box>
                    <Button>削除</Button>
                  </Box>
                </>
              );
            })}
          </Box>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
