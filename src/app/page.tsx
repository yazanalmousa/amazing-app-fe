"use client";
import {
  SimpleGrid,
  Flex,
  Image,
  Box,
  Heading,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <Flex
      maxH="100vh"
      justifyContent="center"
      alignItems="center"
      flexDir={"column"}
    >
      <Box mb={"2rem"} mt={"5rem"} textAlign="center">
        <Heading fontSize={"4rem"} mb={4} fontWeight={"bold"} color={"white"}>
          Summarize Your Files
        </Heading>
        <Text fontSize={"1.5rem"} fontWeight={"thin"} color={"white"}>
          Easily and efficiently summarize all your documents with our powerful
          app.
        </Text>
        <HStack justifyContent="center" spacing={4} mt={"2rem"}>
          <Button
            colorScheme="red"
            bg={"white"}
            color={"black"}
            p={3}
            borderRadius={"0.2rem"}
            _hover={{
              bg: "#EEEDEB",
              transform: "scale(1.1)",
              transition: "0.3s",
            }}
            fontWeight={"bold"}
            onClick={() => router.push("/pages/main")}
          >
            Get Started
          </Button>
          <Button
            colorScheme="red"
            bg={"none"}
            color={"white"}
            p={3}
            borderRadius={"0.2rem"}
            _hover={{
              transform: "scale(1.1)",
              transition: "0.3s",
            }}
            border={"0.1rem solid white"}
            fontWeight={"bold"}
            onClick={() => router.push("/pages/Register")}
          >
            Register Now
          </Button>
        </HStack>
      </Box>
      <SimpleGrid columns={4} spacing={5}>
        <Image src="./giphy.webp" alt="GIF 1" />
        <Image src="./giphy.webp" alt="GIF 2" />
        <Image src="./giphy.webp" alt="GIF 3" />
        <Image src="./giphy.webp" alt="GIF 4" />
      </SimpleGrid>
    </Flex>
  );
}
