import React from "react";
import { AppProvider } from "./src/api/contextApi";
export const wrapRootElement = ({ element }) => (
  <AppProvider>{element}</AppProvider>
);
