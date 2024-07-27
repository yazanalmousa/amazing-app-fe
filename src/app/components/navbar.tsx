"use client";
import {
  Box,
  HStack,
  Img,
  VStack,
  IconButton,
  Button,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import { IoHome } from "react-icons/io5";
import React, { useContext } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { SideBarContext } from "@/Context/sideBarContext";
import { usePathname, useRouter } from "next/navigation";
import { RiRobot3Line } from "react-icons/ri";
import { chatbotModeContext } from "@/Context/chatbotModeContext";

export default function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const sideBarContext = useContext(SideBarContext);
  const chatbotContext = useContext(chatbotModeContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!sideBarContext) {
    return null;
  }
  if (!chatbotContext) {
    return null;
  }

  const { isSideOpen, setSideState } = sideBarContext;
  const { setChatbotMode } = chatbotContext;

  return (
    <>
      <Box h={"5rem"}>
        <Box h={"100%"} w={"100%"}>
          <HStack justifyContent={"space-between"} px={"2rem"} py={"1rem"}>
            <VStack>
              <Img src="/ai.png" h={"3.5rem"} />
            </VStack>
            <VStack w={"50%"}>
              <HStack justifyContent={"flex-end"} w={"100%"} spacing={25}>
                {pathname !== "/" && (
                  <Tooltip label="Home" hasArrow>
                    <IconButton
                      aria-label={"Home"}
                      variant={"ghost"}
                      icon={<IoHome fontSize={"1.5rem"} color="white" />}
                      _hover={{
                        transform: "scale(1.1)",
                      }}
                      p={3}
                      borderRadius={"0.5rem"}
                      onClick={() => router.push("/")}
                    />
                  </Tooltip>
                )}
                {pathname !== "/pages/sign-in" &&
                  pathname !== "/pages/main" && (
                    <Tooltip label="Sign In" hasArrow>
                      <Button
                        color={"white"}
                        colorScheme="red"
                        size={"sm"}
                        variant={"ghost"}
                        onClick={() => router.push("/pages/sign-in")}
                      >
                        Sign in
                      </Button>
                    </Tooltip>
                  )}
                {pathname === "/pages/main" && (
                  <Menu isOpen={isOpen} onClose={onClose}>
                    <Tooltip label="Mode" hasArrow placement="bottom">
                      <MenuButton
                        as={IconButton}
                        aria-label={"mode"}
                        icon={
                          <RiRobot3Line fontSize={"1.5rem"} color="white" />
                        }
                        variant={"ghost"}
                        _hover={{
                          transform: "scale(1.1)",
                        }}
                        p={3}
                        borderRadius={"0.5rem"}
                        onClick={isOpen ? onClose : onOpen}
                      />
                    </Tooltip>
                    <MenuList
                      bg={"black"}
                      color={"white"}
                      borderColor={"gray.700"}
                    >
                      <MenuItem
                        bg={"black"}
                        _hover={{ bg: "gray.700" }}
                        _focus={{ bg: "gray.700" }}
                        value={"Trip Advisorer Mode"}
                        onClick={() => setChatbotMode("Trip")}
                      >
                        Trip Advisorer Mode
                      </MenuItem>
                      <MenuItem
                        bg={"black"}
                        _hover={{ bg: "gray.700" }}
                        _focus={{ bg: "gray.700" }}
                        value={"Tech Master Mode"}
                        onClick={() => setChatbotMode("Tech")}
                      >
                        Tech Master Mode
                      </MenuItem>
                    </MenuList>
                  </Menu>
                )}
                <Tooltip label="Menu" hasArrow>
                  <IconButton
                    aria-label={"menu"}
                    icon={<CiMenuBurger fontSize={"1.5rem"} color="white" />}
                    variant={"ghost"}
                    _hover={{
                      transform: "scale(1.1)",
                    }}
                    p={3}
                    borderRadius={"0.5rem"}
                    onClick={() => setSideState(!isSideOpen)}
                  />
                </Tooltip>
              </HStack>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
