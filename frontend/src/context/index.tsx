import { createContext, useReducer } from "react";
import type { ReactNode, Reducer } from "react";
import { reducer } from "./reducer";
import { IGlobalContext, IInitialData } from "../types/index";

const data: IInitialData = {
  user: undefined,
  role: null,
  isLogin: null,
  darkTheme: true,
  testing: "this is context api testing",
};

export const GlobalContext = createContext<IGlobalContext>({
  state: data,
  dispatch: () => {},
});

export default function ContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer<Reducer<any, any>>(reducer, data);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}
