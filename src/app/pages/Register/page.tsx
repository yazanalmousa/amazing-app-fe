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
} from "@chakra-ui/react";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FaHandsHelping } from "react-icons/fa";
import { handleToken, getToken } from "@/middleware/handleToken";
import { useRouter } from "next/navigation";
interface Errors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  form?: string; // Add form to the Errors interface
}

const Page: React.FC = () => {
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newErrors: Errors = {};

    if (!firstName) newErrors.firstName = "First name is required";
    if (!lastName) newErrors.lastName = "Last name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Clear the form
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setErrors({});
          console.log("register response:", data);
          handleToken(data.data.token);
          const token = getToken();
          if (token) {
            router.push("/pages/main");
          }
        } else {
          setErrors({ form: data.data || data.msg });
        }
      } catch (e) {
        console.log(e);
        setErrors({ form: "An error occurred. Please try again." });
      }
    }
  };

  return (
    <Box h={"100vh"} bg={"#040303"}>
      <Flex
        flexDir={"column"}
        w={"100%"}
        h={"100%"}
        justifyContent={"space-evenly"}
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
              <HStack>
                <Heading size="lg" color={"white"}>
                  Register to our services
                </Heading>
                <FaHandsHelping color="white" fontSize={"2rem"} />
              </HStack>
              <FormControl
                id="first-name"
                isRequired
                isInvalid={!!errors.firstName}
                color={"white"}
              >
                <FormLabel color={"white"}>First Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Your first name"
                  _placeholder={{ color: "gray" }}
                  _focus={{
                    bg: "#45474B",
                    outline: "none",
                    _placeholder: { color: "white" },
                  }}
                  value={firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFirstName(e.target.value)
                  }
                />
                <FormHelperText color={"rgba(255,255,255,0.5)"}>
                  Enter your first name
                </FormHelperText>
                {errors.firstName && (
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl
                id="last-name"
                isRequired
                isInvalid={!!errors.lastName}
                color={"white"}
              >
                <FormLabel color={"white"}>Last Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter Your last name"
                  _placeholder={{ color: "gray" }}
                  _focus={{
                    bg: "#45474B",
                    outline: "none",
                    _placeholder: { color: "white" },
                  }}
                  value={lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLastName(e.target.value)
                  }
                />
                <FormHelperText color={"rgba(255,255,255,0.5)"}>
                  Enter your last name
                </FormHelperText>
                {errors.lastName && (
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                )}
              </FormControl>
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
                  _placeholder={{ color: "gray" }}
                  _focus={{
                    bg: "#45474B",
                    outline: "none",
                    _placeholder: { color: "white" },
                  }}
                  value={password}
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
              <Button
                type="submit"
                colorScheme="red"
                bg={"#950101"}
                color={"white"}
                _hover={{
                  bg: "#3D0000",
                }}
                w={"20%"}
              >
                Register
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Page;
