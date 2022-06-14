/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useReducer } from "react";
import { intialState, reducer } from "./redux.context";

export const ReduxContext = createContext();
export const ReduxContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const login = (user) => {
    dispatch({ type: "LOGIN", payload: user.accessToken });
  }

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  }

  const data = React.useMemo(() => ({
    ...state,
    login,
    logout,
    dispatch,
  }), [state, login, logout, dispatch]);

  return <ReduxContext.Provider value={data}>{children}</ReduxContext.Provider>;
}

export const useAuthContext = () => {
  const context = React.useContext(ReduxContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}
