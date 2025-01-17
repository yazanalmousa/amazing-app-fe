"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ChakraProvider } from "@chakra-ui/react";
const inter = Inter({ subsets: ["latin"] });
import theme from "@/theme";
import NavBar from "./components/navbar";
import SideBar from "./components/sideBar";
import { useState } from "react";
import { SideBarContext } from "@/Context/sideBarContext";
import { chatbotModeContext } from "@/Context/chatbotModeContext";

const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSideOpen, setSideState] = useState<boolean>(false);
  const [chatbotMode, setChatbotMode] = useState<string>("Tech");

  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          <chatbotModeContext.Provider value={{ chatbotMode, setChatbotMode }}>
            <SideBarContext.Provider value={{ isSideOpen, setSideState }}>
              <NavBar />
              {isSideOpen && <SideBar />}
              {children}
            </SideBarContext.Provider>
          </chatbotModeContext.Provider>
        </ChakraProvider>
      </body>
    </html>
  );
}
