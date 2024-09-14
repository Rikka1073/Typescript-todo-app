import { Box, Button, Center, ChakraProvider, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

import "./App.css";
import React, { useEffect, useState } from "react";
import { getAllTodos } from "./utils/supabaseFunction";
import { Todo } from "./domain/todo";

const App = () => {
  const [studyText, setStudyText] = useState("");
  const [studyTime, setStudyTime] = useState("");
  const [records, setRecords] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudyText(event.target.value);
  };

  const onChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTime(event.target.value);
  };

  const onClickAddTodo = () => {
    console.log("クリックしました");
    const newRecord = { title: studyText, time: studyTime };
    const newRecords = [...records, newRecord];
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
      setLoading(false);
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
          <Box mt={10} bg="white" pt={5} pb={5} borderRadius="10">
            <Text ml={5}>入力されている学習内容 {studyText}</Text>
          </Box>
          <Box mt={5} bg="white" pt={5} pb={5} borderRadius="10">
            <Text ml={5}>入力されている学習時間 {studyTime}時間</Text>
          </Box>
          <Center mt={10}>
            <Button onClick={onOpen} colorScheme="purple" borderRadius="50%" size="lg">
              <AddIcon />
            </Button>
          </Center>
          <Box mt={10}>
            <Center>
              <Box>{loading ? <Text>読み込み中</Text> : <Text>読み込み完了</Text>}</Box>
            </Center>
            {records.map((record) => {
              return (
                <>
                  <Box bg="white" p={10} mb={5} borderRadius="10" display="flex" justifyContent="space-between" mt={5}>
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
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Center>Create New Task</Center>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
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
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  キャンセル
                </Button>
                <Button colorScheme="blue" onClick={onClickAddTodo}>
                  登録
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
