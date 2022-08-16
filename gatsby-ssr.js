import React from "react";
import { ProjectsMenuProvider } from "./src/common/projectsMenu/useProjectsMenu";
export const wrapRootElement = ({ element }) => (
  <ProjectsMenuProvider>{element}</ProjectsMenuProvider>
);
