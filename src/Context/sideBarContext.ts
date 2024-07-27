// src/Context/sideBarContext.ts

import { createContext } from "react";

type SideBarContextType = {
  isSideOpen: boolean;
  setSideState: (isOpen: boolean) => void;
};

export const SideBarContext = createContext<SideBarContextType | undefined>(
  undefined
);
