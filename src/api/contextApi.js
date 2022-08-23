import React, { useContext } from "react";

const AppContext = React.createContext();

export function AppProvider({ children }) {
  const state = useProviderApp();
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

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
      default:
        return state;
    }
  };

  const [state, dispatch] = React.useReducer(reducer, appInitialState);
  return { state, dispatch };
}
