import { Box, Button, Center, ChakraProvider, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, Wrap, WrapItem } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

import React, { useEffect, useState } from "react";
import { createTodo, deleteTodo, getAllTodos } from "./utils/supabaseFunction";
import { Todo } from "./domain/todo";

const App = () => {
  const [studyText, setStudyText] = useState("");
  const [studyTime, setStudyTime] = useState(0);
  const [records, setRecords] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [openModalId, setModalId] = useState<string>();

  const editModal = useDisclosure();
  const addModal = useDisclosure();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data: any) => {
    console.log("フォームがサブミットされました", data);
    console.log("バリデーションエラー", errors);
  };

  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setStudyText(value);
    setValue("study", value);
  };

  const onChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudyTime(Number(event.target.value));
  };

  const modalClose = () => {
    setStudyTime(0);
    setStudyText("");
    setValue("study", "");
    setValue("time", 0);
  };

  const onClickReset = () => {
    setStudyTime(0);
    setStudyText("");
  };

  const onClickAddTodo = () => {
    if (studyText === "" || studyTime <= 0) {
      return;
    } else {
      const newRecord: Todo = { id: "", title: studyText, time: studyTime };
      const newRecords = [...records, newRecord];
      setRecords(newRecords);
      console.log(newRecords);
      createTodo(studyText, studyTime);
      setStudyText("");
      setStudyTime(0);
      addModal.onClose();
    }
  };

  const onClickDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    const record = await getAllTodos();
    setRecords(record as Todo[]);
  };

  const onClickCancel = () => {
    editModal.onClose();
  };

  const onClickSaveTodo = () => {
    editModal.onClose();
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
        <Box w={{ base: "100%", md: "60%" }} m="auto" bg="gray.50" p={10} position="relative" overflow="visible">
          <Box>
            <Center>
              <Heading as="h1" size="xl" data-testid="title">
                Study Records
              </Heading>
            </Center>
            <Center>
              <Box mt={5}>{loading ? <Text data-testid="loading-title">読み込み中</Text> : <Text></Text>}</Box>
            </Center>
            {records.map((record) => {
              return (
                <Box key={record.id} bg="white" display="flex" justifyContent="space-between" pt={5} pb={5} pr={3} pl={3} mb={5} borderRadius="20px" mt={5} data-testid="todos-data">
                  <Wrap display="flex" alignItems="center">
                    <WrapItem>
                      <Box display="flex">
                        <Text mr={5}>{record.title}</Text>
                        <Text>{record.time}時間</Text>
                      </Box>
                    </WrapItem>
                  </Wrap>
                  <Wrap>
                    <WrapItem>
                      <Button
                        onClick={() => {
                          onClickDeleteTodo(record.id);
                        }}
                        bg="gray.50"
                        boxShadow="md"
                        p="4"
                        rounded="md"
                        borderRadius="999px"
                        data-testid={`delete-button-${record.id}`}
                      >
                        <DeleteIcon />
                      </Button>
                    </WrapItem>
                    <WrapItem>
                      <Button
                        onClick={() => {
                          setModalId(record.id);
                          editModal.onOpen();
                        }}
                        bg="gray.50"
                        boxShadow="md"
                        p="4"
                        rounded="md"
                        borderRadius="999px"
                      >
                        <EditIcon />
                      </Button>
                    </WrapItem>
                  </Wrap>
                </Box>
              );
            })}
          </Box>
          <Box textAlign="right" position="sticky" right={0} bottom="20%">
            <Button onClick={addModal.onOpen} bg="blue.500" borderRadius="50%" size="lg" display="inline-block" data-testid="modal-button">
              <AddIcon color="white" />
            </Button>
          </Box>
          <Modal
            isOpen={addModal.isOpen}
            onClose={() => {
              addModal.onClose();
              modalClose();
            }}
          >
            <ModalOverlay />
            <ModalContent mr={5} ml={5}>
              <ModalHeader>
                <Center data-testid="modal-title">Create New Task</Center>
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
                      <Text color="red.500" fontWeight="bold" mt={2} data-testid="errors-text">
                        {errors.study?.message as string}
                      </Text>
                      <Box display="flex" mt={10}>
                        <FormLabel fontSize="lg" display="flex" alignItems="center" m={0}>
                          学習時間
                        </FormLabel>
                        <Input type="text" {...register("time", { required: "時間の入力は必須です" })} w="60%" ml={5} onChange={onChangeTime} value={studyTime} />
                        <Text color="red.500" fontWeight="bold">
                          {errors.time?.message as string}
                        </Text>
                      </Box>
                    </FormControl>
                  </Box>
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" bg="pink.300" onClick={onClickReset} mr={5} borderRadius="999px">
                  <Text color="white">Reset</Text>
                </Button>
                <Button type="submit" bg="blue.300" onClick={onClickAddTodo} borderRadius="999px" data-testid="create-button">
                  <Text color="white">New Task</Text>
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          {records.map((record) => {
            return (
              <Modal
                isOpen={openModalId === record.id}
                onClose={() => {
                  editModal.onClose();
                  modalClose();
                }}
                key={record.id}
              >
                <ModalOverlay />
                <ModalContent mr={5} ml={5}>
                  <ModalHeader>
                    <Center data-testid="modal-title">Edit Task</Center>
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
                            <Input type="text" w="60%" ml={5} onChange={onChangeText} value={record.title} />
                          </Box>
                          <Box display="flex" mt={10}>
                            <FormLabel fontSize="lg" display="flex" alignItems="center" m={0}>
                              学習時間
                            </FormLabel>
                            <Input type="text" w="60%" ml={5} onChange={onChangeTime} value={studyTime} />
                          </Box>
                        </FormControl>
                      </Box>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button type="submit" bg="pink.300" onClick={onClickCancel} mr={5} borderRadius="999px">
                      <Text color="white">Cancel</Text>
                    </Button>
                    <Button type="submit" bg="blue.300" onClick={onClickSaveTodo} borderRadius="999px" data-testid="create-button">
                      <Text color="white">Save</Text>
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            );
          })}
        </Box>
      </ChakraProvider>
    </>
  );
};

export default App;
