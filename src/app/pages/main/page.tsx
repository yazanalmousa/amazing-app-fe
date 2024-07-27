"use client";
import {
  Box,
  Flex,
  Heading,
  VStack,
  List,
  ListItem,
  ListIcon,
  Input,
  Button,
  Text,
  IconButton,
  HStack,
  Tooltip,
  keyframes,
  Spinner,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import React, { useEffect, useState, useRef, useContext } from "react";
import { ImAttachment } from "react-icons/im";
import { TbRefresh } from "react-icons/tb";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import URLS from "@/app/config/config";
import { chatbotModeContext } from "@/Context/chatbotModeContext";

interface Message {
  message: string;
  type: string;
}

const spin = keyframes`  
  from {transform: rotate(0deg);}   
  to {transform: rotate(360deg)} 
`;

export default function Page() {
  const router = useRouter();
  const chatbotContext = useContext(chatbotModeContext);
  if (!chatbotContext) {
    return null;
  }
  const { chatbotMode } = chatbotContext;

  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isLoadingChatbotResponse, setLoadingChatbotResponse] =
    useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const spinAnimation = `${spin} infinite 2s linear`;
  const token = Cookie.get("token");

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch(URLS.chatbotMode.suggestedQuestion, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const parsedQuestions = JSON.parse(data.data);
      setSuggestedQuestions(parsedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!token) {
      router.push("/pages/sign-in");
    }
  }, [token, router]);

  const getUserQuestionAnswer = async () => {
    const token = Cookie.get("token");

    setLoadingChatbotResponse(true);
    try {
      const questionToSend = inputValue || selectedQuestion;
      const response = await fetch("http://localhost:5000/api/user-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ question: questionToSend }),
      });
      const responseData = await response.json();
      setMessages((msg: any) => [
        ...msg,
        { message: responseData.data, type: "ai" },
      ]);
      setInputValue("");
      setSelectedQuestion(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error fetching answer:", error);
    } finally {
      setLoadingChatbotResponse(false);
    }
  };

  const handleSuggestedQuestionClick = (question: string) => {
    setSelectedQuestion(question);
    setInputValue("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSelectedQuestion(null);
  };

  return (
    <Box>
      <Flex flexDir={"row"} h={"85vh"} justifyContent={"space-between"} p={4}>
        <Box
          flex={1}
          p={"1rem"}
          bg={"#0F0E0E"}
          borderRadius={"0.5rem"}
          boxShadow={"0 0 10px rgba(0, 0, 0, 0.5)"}
          mr={"1rem"}
          overflowY={"scroll"}
        >
          <VStack alignItems={"start"}>
            <HStack>
              <Heading
                fontSize={"1.2rem"}
                fontWeight={"bold"}
                color={"gray.300"}
                mb={"1rem"}
                w={"fit-content"}
              >
                Suggested Questions
              </Heading>
              <Tooltip label="regenerate" hasArrow>
                <IconButton
                  animation={isLoading ? spinAnimation : ""}
                  icon={
                    <TbRefresh fontSize={isLoading ? "1.4rem" : "1.2rem"} />
                  }
                  aria-label="refresh"
                  bg="none"
                  mb="1rem"
                  color="white"
                  _hover={{
                    bg: "none",
                    transform: "scale(1.1)",
                  }}
                  onClick={() => {
                    fetchQuestions();
                  }}
                />
              </Tooltip>
            </HStack>

            <List spacing={5} w={"100%"} color={"gray.300"} fontWeight={"bold"}>
              {suggestedQuestions?.map((question, index) => (
                <ListItem
                  key={index}
                  p={2}
                  borderRadius="0.5rem"
                  _hover={{
                    bg: "rgba(50, 50, 50, 0.8)",
                    color: "white",
                    cursor: "pointer",
                    transform: "scale(1.05)",
                  }}
                  onClick={() => handleSuggestedQuestionClick(question)}
                >
                  <ListIcon
                    as={MdCheckCircle}
                    color="green.400"
                    mr={"0.5rem"}
                  />
                  {question}
                </ListItem>
              ))}
            </List>
          </VStack>
        </Box>
        <Box
          flex={4}
          p={"1rem"}
          bg={"#0F0E0E"}
          borderRadius={"0.5rem"}
          boxShadow={"0 0 10px rgba(0, 0, 0, 0.5)"}
        >
          <VStack justifyContent={"space-between"} h={"100%"} w={"100%"}>
            <Box
              w={"100%"}
              h={"75vh"}
              maxH={"75vh"}
              border={"0.1rem solid gray"}
              borderRadius={"0.5rem"}
              overflowY={"scroll"}
              p={5}
              bg={"#0F0E0E"}
              color={"gray"}
            >
              {messages.map((msg, index) => (
                <Flex
                  key={index}
                  justifyContent={msg.type === "ai" ? "flex-start" : "flex-end"}
                  mb={2}
                >
                  <Text
                    p={3}
                    borderRadius={"0.5rem"}
                    bg={msg.type === "ai" ? "#1A1A1A" : "#3D0000"}
                    color={"white"}
                    maxW={"60%"}
                  >
                    {msg.message}
                  </Text>
                </Flex>
              ))}
              {isLoadingChatbotResponse && (
                <Flex justifyContent={"flex-start"} mb={2}>
                  <Text
                    p={3}
                    borderRadius={"0.5rem"}
                    bg={"#1A1A1A"}
                    color={"white"}
                    maxW={"60%"}
                  >
                    <HStack>
                      <Spinner
                        color={"#950101"}
                        emptyColor="gray"
                        size={"md"}
                      />
                      <Text>Thinking...</Text>
                    </HStack>
                  </Text>
                </Flex>
              )}
              {messages.length === 0 && (
                <Text
                  color={"gray"}
                  mr={"1rem"}
                  fontSize={"1.1rem"}
                  fontWeight={"bold"}
                >
                  Ask me anything...
                </Text>
              )}
            </Box>

            <Flex w={"100%"} mt={2}>
              <Tooltip label="attach" hasArrow>
                <IconButton
                  icon={<ImAttachment />}
                  aria-label={"menu"}
                  _hover={{ bg: "none", transform: "scale(1.1)" }}
                  color={"white"}
                  variant={"ghost"}
                  w={"4rem"}
                  borderRadius={"0.5rem"}
                  isDisabled={isLoadingChatbotResponse}
                />
              </Tooltip>
              <Input
                isDisabled={isLoadingChatbotResponse}
                placeholder="Type your question here"
                type="text"
                w={"100%"}
                bg={"#0F0E0E"}
                color={"white"}
                border={"none"}
                _placeholder={{ color: "gray" }}
                _focus={{
                  bg: "#45474B",
                  outline: "none",
                  _placeholder: { color: "white" },
                }}
                p={"1rem"}
                borderRadius={"0.5rem"}
                h={"3rem"}
                value={inputValue || selectedQuestion || ""}
                onChange={handleInputChange}
                ref={inputRef}
              />
              <Button
                ml={4}
                mr={10}
                bg={"#950101"}
                color={"white"}
                _hover={{ bg: "#3D0000" }}
                borderRadius={"0.5rem"}
                onClick={() => {
                  getUserQuestionAnswer();
                  setMessages((msg) => [
                    ...msg,
                    {
                      message: inputValue || selectedQuestion || "",
                      type: "user",
                    },
                  ]);
                }}
              >
                Send
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}
