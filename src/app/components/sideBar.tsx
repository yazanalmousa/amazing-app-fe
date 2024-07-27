"use client";
import { SideBarContext } from "@/Context/sideBarContext";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Slide,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { removeToken } from "@/middleware/handleToken";

export default function SideBar() {
  const router = useRouter();
  const sideBarContext = useContext(SideBarContext);

  if (!sideBarContext) {
    return null;
  }

  const { isSideOpen, setSideState } = sideBarContext;

  return (
    <>
      <Slide
        direction="right"
        in={isSideOpen}
        style={{
          zIndex: 10,
          position: "fixed",
          height: "100vh",
          width: "20%",
          top: 0,
          bottom: 0,
          margin: 0,
        }}
      >
        <Box
          h={"100vh"}
          bg="rgba(30, 30, 30, 0.95)"
          color={"white"}
          width={"100%"}
          p={"0.5rem"}
          borderLeftRadius={"1rem"}
          boxShadow={"0 0 10px 0 rgba(0, 0, 0, 0.5)"}
          position="fixed"
          display={"flex"}
          flexDir={"column"}
          justifyContent={"space-between"}
        >
          <Box>
            <HStack justifyContent={"flex-end"} mb={"1rem"} w={"100%"}>
              <IconButton
                variant={"ghost"}
                aria-label={"menu"}
                icon={<IoCloseSharp fontSize={"1.5rem"} />}
                color={"white"}
                _hover={{
                  transform: "scale(1.1)",
                }}
                borderRadius={"0.5rem"}
                onClick={() => setSideState(!isSideOpen)}
              />
            </HStack>
            <VStack alignItems={"flex-start"} spacing={3} mt={4}>
              <Button
                size="md"
                bg="rgba(50, 50, 50, 0.8)"
                color="gray.300"
                _hover={{
                  bg: "rgba(70, 70, 70, 0.8)",
                  color: "white",
                }}
                borderRadius="0.5rem"
                width="100%"
                fontWeight={"bold"}
              >
                Your Acccount
              </Button>
              <Button
                size="md"
                bg="rgba(50, 50, 50, 0.8)"
                color="gray.300"
                _hover={{
                  bg: "rgba(70, 70, 70, 0.8)",
                  color: "white",
                }}
                borderRadius="0.5rem"
                width="100%"
              >
                Our Sevices
              </Button>
              <Button
                size="md"
                bg="rgba(50, 50, 50, 0.8)"
                color="gray.300"
                _hover={{
                  bg: "rgba(70, 70, 70, 0.8)",
                  color: "white",
                }}
                borderRadius="0.5rem"
                width="100%"
              >
                Who We Are
              </Button>
            </VStack>
          </Box>
          <Box>
            <VStack>
              <Button
                size="md"
                p={"0.2rem"}
                bg="rgba(70, 70, 70, 0.8)"
                color="gray.300"
                _hover={{
                  bg: "rgba(250, 250, 250, 0.9)",
                  color: "black",
                }}
                borderRadius="0.5rem"
                width="100%"
                fontWeight={"bold"}
                onClick={() => router.push("/pages/Register")}
              >
                Join Us
              </Button>
              <Button
                size="md"
                p={"0.2rem"}
                bg="rgba(70, 70, 70, 0.8)"
                color="gray.300"
                _hover={{
                  bg: "rgba(250, 250, 250, 0.9)",
                  color: "black",
                }}
                borderRadius="0.5rem"
                width="100%"
                fontWeight={"bold"}
                onClick={() => {
                  router.push("/");
                  removeToken();
                }}
              >
                sign out
              </Button>
            </VStack>
          </Box>
        </Box>
      </Slide>
    </>
  );
}
