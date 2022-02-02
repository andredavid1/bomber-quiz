import axios from "axios";
import { getCookie } from "cookies-next";
import useAuth from "hooks/useAuth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import dark from "styles/themes/dark";
import light from "styles/themes/light";
import { AnswerProvider } from "./AnswerContext";
import { AuthProvider } from "./AuthContext";
import { DisciplineProvider } from "./DisciplineContext";
import { QuestionProvider } from "./QuestionContext";
import { UserProvider } from "./UserContext";

interface IConfigContextProps {
  loading: boolean;
  theme: DefaultTheme;
  toggleLoading: (show: boolean) => Promise<void>;
  toggleTheme: () => void;
}

const ConfigContext = createContext({
  loading: false,
} as IConfigContextProps);

interface IConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider = ({ children }: IConfigProviderProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [theme, setTheme] = useState<DefaultTheme>(light);

  useEffect(() => {
    const themeSelected = localStorage.getItem("bomberQuizTheme");
    setTheme(themeSelected ? JSON.parse(themeSelected) : light);
  }, []);

  const toggleLoading = async (show: boolean): Promise<void> => {
    await setLoading(show);
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

  return (
    <ConfigContext.Provider
      value={{
        loading,
        theme,
        toggleLoading,
        toggleTheme,
      }}
    >
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <UserProvider>
            <DisciplineProvider>
              <AnswerProvider>
                <QuestionProvider>{children}</QuestionProvider>
              </AnswerProvider>
            </DisciplineProvider>
          </UserProvider>
        </AuthProvider>
      </ThemeProvider>
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
