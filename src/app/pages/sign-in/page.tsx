"use client";
import {
  Box,
  Flex,
  HStack,
  Heading,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { TbHeartHandshake } from "react-icons/tb";
import { handleToken } from "@/middleware/handleToken";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

interface Errors {
  email?: string;
  password?: string;
  form?: string;
}

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const token = Cookie.get("token");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          handleToken(data.data.token);
          router.push("/pages/main");
        } else {
          setErrors({ form: data.data || data.msg });
        }
      } catch (e) {
        console.log(e);
        setErrors({ form: "An error occurred. Please try again." });
      }
    }
  };

  useEffect(() => {
    if (token) {
      router.push("/pages/main");
    }
  }, [token, router]);

  return (
    <Box h={"100vh"} w={"full"}>
      <Flex
        flexDirection={"column"}
        justifyContent={"space-around"}
        w={"100%"}
        h={"100vh"}
      >
        <Flex w={"100%"} justifyContent={"center"} position={"fixed"} top={20}>
          <Box>
            <VStack
              as="form"
              onSubmit={handleSubmit}
              justifyContent={"center"}
              spacing={5}
              mt={"2rem"}
              w={"40rem"}
              bg={"#0F0E0E"}
              borderRadius={"lg"}
              p={"2rem"}
            >
              <HStack my={"1rem"}>
                <Heading size="lg" color={"white"}>
                  Sign In
                </Heading>
                <TbHeartHandshake color="white" fontSize={"2rem"} />
              </HStack>
              <FormControl
                id="email"
                isRequired
                isInvalid={!!errors.email}
                color={"white"}
              >
                <FormLabel color={"white"}>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter Your email"
                  _placeholder={{ color: "gray" }}
                  _focus={{
                    bg: "#45474B",
                    outline: "none",
                    _placeholder: { color: "white" },
                  }}
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                />
                <FormHelperText color={"rgba(255,255,255,0.5)"}>
                  Enter your email
                </FormHelperText>
                {errors.email && (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="password"
                isRequired
                isInvalid={!!errors.password}
                color={"white"}
              >
                <FormLabel color={"white"}>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter Your password"
                  value={password}
                  _placeholder={{ color: "gray" }}
                  _focus={{
                    bg: "#45474B",
                    outline: "none",
                    _placeholder: { color: "white" },
                  }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />
                <FormHelperText color={"rgba(255,255,255,0.5)"}>
                  Enter your password
                </FormHelperText>
                {errors.password && (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
              </FormControl>
              {errors.form && (
                <FormControl isInvalid={!!errors.form}>
                  <FormErrorMessage>{errors.form}</FormErrorMessage>
                </FormControl>
              )}
              <HStack>
                <Text color={"white"}>Don't have an account?</Text>
                <Link color={"red"} href="/pages/Register">
                  <Text color={"red"}>Register</Text>
                </Link>
              </HStack>
              <Button
                type="submit"
                colorScheme="red"
                bg={"#950101"}
                size="lg"
                width="full"
                color={"white"}
                _hover={{
                  bg: "#3D0000",
                }}
              >
                Sign In
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
