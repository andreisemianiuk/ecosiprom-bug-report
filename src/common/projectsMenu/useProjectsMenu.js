import React, { useContext } from "react";

const ProjectsMenuContext = React.createContext();

export function ProjectsMenuProvider({ children }) {
  const menu = useProviderProjectsMenu();
  return (
    <ProjectsMenuContext.Provider value={menu}>
      {children}
    </ProjectsMenuContext.Provider>
  );
}

export const useProjectsMenu = () => {
  return useContext(ProjectsMenuContext);
};

function useProviderProjectsMenu() {
  const menuInitialState = {
    currentItem: 0,
  };
  const reducer = (state, action) => {
    const { payload } = action;
    return {
      currentItem: payload.currentItem,
    };
  };

  const [state, dispatch] = React.useReducer(reducer, menuInitialState);
  return { state, dispatch };
}
