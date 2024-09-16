import { Box, Button, Center, ChakraProvider, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useForm, SubmitHandler } from "react-hook-form";

import React, { useEffect, useState } from "react";
import { createTodo, getAllTodos } from "./utils/supabaseFunction";
import { Todo } from "./domain/todo";

const App = () => {
  const [studyText, setStudyText] = useState("");
  const [studyTime, setStudyTime] = useState(0);
  const [records, setRecords] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data: any) => {
    console.log("フォームがサブミットされました", data); // 送信されたデータを表示
    console.log("バリデーションエラー", errors); // エラーオブジェクトを確認
  };

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStudyText(value);
    setValue("study", value, { shouldValidate: true });
  };

  const onChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTime(Number(event.target.value));
  };

  const onClickAddTodo = () => {
    if (studyText === "" || studyTime <= 0) {
      console.log("入力してください");
    } else {
      console.log("クリックしました");
      const newRecord: Todo = { id: null, title: studyText, time: studyTime };
      const newRecords = [...records, newRecord];
      setRecords(newRecords);
      console.log(newRecords);
      createTodo(studyText, studyTime);
      setStudyText("");
      setStudyTime(0);
      onClose();
    }
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
        <Box w={{ base: "100%", md: "60%" }} m="auto" bg="gray.100" p={10} position="relative" overflow="visible">
          <Box>
            <Center>
              <Heading as="h1" size="xl" data-testid="title">
                Sutdy Records
              </Heading>
            </Center>
            <Center>
              <Box mt={5}>{loading ? <Text>読み込み中</Text> : <Text></Text>}</Box>
            </Center>
            {records.map((record) => {
              return (
                <Box key={record.id} bg="white" p={10} mb={5} borderRadius="10" display="flex" justifyContent="space-between" mt={5}>
                  <Box display="flex">
                    <Text mr={5} display="flex" alignItems="center">
                      {record.title}
                    </Text>
                    <Text display="flex" alignItems="center">
                      {record.time}時間
                    </Text>
                  </Box>
                  <Button>削除</Button>
                </Box>
              );
            })}
          </Box>
          <Box textAlign="right" position="sticky" right={0} bottom="20%">
            <Button onClick={onOpen} colorScheme="purple" borderRadius="50%" size="lg" display="inline-block">
              <AddIcon />
            </Button>
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
                    <FormControl onSubmit={handleSubmit(onSubmit)}>
                      <Box display="flex">
                        <FormLabel fontSize="lg" display="flex" alignItems="center" m={0}>
                          学習内容
                        </FormLabel>
                        <Input type="text" {...register("study", { required: "内容の入力は必須です" })} placeholder="study" w="60%" ml={5} onChange={onChangeText} value={studyText} />
                      </Box>
                      <Text color="red.500" fontWeight="bold">
                        {errors.study?.message as string}
                      </Text>
                      <Box display="flex" mt={10}>
                        <FormLabel fontSize="lg" display="flex" alignItems="center" m={0}>
                          学習時間
                        </FormLabel>
                        <Input type="text" {...(register("sutdy"), { required: true })} w="60%" ml={5} onChange={onChangeTime} value={studyTime} />
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="blue" onClick={onClickAddTodo}>
                  New Task
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
