// src/Context/sideBarContext.ts

import { createContext } from "react";

type chatbotModeContext = {
  chatbotMode: string;
  setChatbotMode: (mode: string) => void;
};

export const chatbotModeContext = createContext<chatbotModeContext | undefined>(
  undefined
);
