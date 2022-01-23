import axios from "axios";
import Router from "next/router";
import { createContext, ReactNode, useState } from "react";
import { getCookie } from "cookies-next";
import useConfig from "hooks/useConfig";
import { toast } from "react-toastify";

interface IUserLogged {
  id: string;
  name: string;
  level: string;
}

interface IAuthContextProps {
  userLogged: IUserLogged | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verify: () => Promise<void>;
}

const AuthContext = createContext({
  userLogged: null,
} as IAuthContextProps);

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
  const { toggleLoading } = useConfig();
  const [userLogged, setUserLogged] = useState<IUserLogged | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    toggleLoading(true);

    await axios
      .post("/api/auth/login", { email, password })
      .then((response) => {
        setUserLogged(response.data.payload);

        Router.push("/");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const logout = async (): Promise<void> => {
    toggleLoading(true);

    await axios
      .post("/api/auth/logout", null)
      .then((_response) => {
        Router.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(async () => {
        toggleLoading(false);
      });

    toggleLoading(false);

    Router.push("/login");
  };

  const verify = async (): Promise<void> => {
    toggleLoading(true);

    const token = getCookie("tokenBomberQuiz");

    await axios
      .post("/api/auth/verify", { token })
      .then((response) => {
        setUserLogged(response.data.payload);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  return (
    <AuthContext.Provider value={{ userLogged, login, logout, verify }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
