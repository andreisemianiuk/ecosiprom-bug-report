import React, { useContext } from "react";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const state = useProviderApp();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined || context === null) {
    throw new Error(`useAppContext must be called within AppProvider`);
  }
  return context;
};

function useProviderApp() {
  const appInitialState = {
    catalogCurrentItem: "privody",
    projectsCurrentItem: "Автоматизированные системы контроля выбросов",
  };
  const reducer = (state, action) => {
    const { payload, type } = action;
    switch (type) {
      case "CATALOG-MENU":
        const items = ["privody", "gorelki", "nasosy", "datchiki", "ask"];
        if (items.includes(payload)) {
          return {
            ...state,
            catalogCurrentItem: payload,
          };
        } else {
          return {
            ...state,
            catalogCurrentItem: "privody",
          };
        }
      case "PROJECTS-MENU":
        const projects = [
          "Автоматизированные системы контроля выбросов",
          "Производство электрощитовой продукции",
          "Системы газоснабжения и газопотребления",
          "Автоматизация технологических процессов",
          "Система отопления и кондиционирования",
        ];

        if (projects.includes(payload)) {
          return {
            ...state,
            projectsCurrentItem: payload,
          };
        } else {
          return {
            ...state,
            projectsCurrentItem: "Автоматизированные системы контроля выбросов",
          };
        }
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(reducer, appInitialState);
  return { state, dispatch };
}
