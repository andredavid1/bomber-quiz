import axios from "axios";
import { getCookie } from "cookies-next";
import useAuth from "hooks/useAuth";
import useUser from "hooks/useUser";
import router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  toggleOperation: (operation: string) => void;
}

const ConfigContext = createContext({
  loading: false,
  operation: "list",
} as IConfigContextProps);

interface IConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider = ({ children }: IConfigProviderProps) => {
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

  const verify = async (): Promise<void> => {
    console.log("dentro context verify");
    toggleLoading(true);

    const token = getCookie("tokenBomberQuiz");
    console.log("achou token", token);

    await axios
      .post("/api/auth/verify", { token })
      .catch((_err) => {
        router.push("/login");
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const toggleOperation = async (operation: string) => {
    await verify();
    setOperation(operation);
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
