import axios from "axios";
import { getCookie } from "cookies-next";
import useAuth from "hooks/useAuth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import dark from "styles/themes/dark";
import light from "styles/themes/light";
import { AuthProvider } from "./AuthContext";
import { UserProvider } from "./UserContext";

interface IConfigContextProps {
  loading: boolean;
  theme: DefaultTheme;
  operation: string;
  toggleLoading: (show: boolean) => void;
  toggleTheme: () => void;
  toggleOperation: (operationSelected: string) => void;
}

const ConfigContext = createContext({
  loading: false,
  operation: "list",
} as IConfigContextProps);

interface IConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider = ({ children }: IConfigProviderProps) => {
  const { verify } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<DefaultTheme>(light);
  const [operation, setOperation] = useState<string>("list");

  useEffect(() => {
    const themeSelected = localStorage.getItem("bomberQuizTheme");
    setTheme(themeSelected ? JSON.parse(themeSelected) : light);
  }, []);

  const toggleLoading = (show: boolean) => {
    setLoading(show);
  };

  const toggleTheme = () => {
    if (theme.title === "light") {
      setTheme(dark);
      localStorage.setItem("bomberQuizTheme", JSON.stringify(dark));
    } else {
      setTheme(light);
      localStorage.setItem("bomberQuizTheme", JSON.stringify(light));
    }
  };

  const toggleOperation = async (operationSelected: string): Promise<void> => {
    await verify();
    setOperation(operationSelected);
  };

  return (
    <ConfigContext.Provider
      value={{
        loading,
        theme,
        operation,
        toggleLoading,
        toggleTheme,
        toggleOperation,
      }}
    >
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <UserProvider>{children}</UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
