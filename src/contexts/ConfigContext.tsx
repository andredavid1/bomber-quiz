import { createContext, ReactNode, useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import dark from "styles/themes/dark";
import light from "styles/themes/light";
import { AuthProvider } from "./AuthContext";

interface IConfigContextProps {
  loading: boolean;
  theme: DefaultTheme;
  toggleLoading: (show: boolean) => void;
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

  return (
    <ConfigContext.Provider
      value={{ loading, theme, toggleLoading, toggleTheme }}
    >
      <AuthProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </AuthProvider>
    </ConfigContext.Provider>
  );
};

export default ConfigContext;
