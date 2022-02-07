import axios from "axios";
import router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { removeCookies } from "cookies-next";
import { ICreateUserDTO, IUserDTO } from "dtos/IUserDTO";
import useConfig from "hooks/useConfig";

interface IOrderProps {
  field?: string;
  order?: string;
}

interface IUpdateData {
  name: string;
  rg: number;
  email: string;
  level: "admin" | "partner" | "customer";
}

interface IUserPerformance {
  quizAnswered: number;
  average: number;
}

interface IUserContextProps {
  users: IUserDTO[] | null;
  userSelected: IUserDTO | null;
  operation: string;
  order: IOrderProps;
  addUser: (data: ICreateUserDTO) => Promise<string>;
  listUsers: (orderSelected: IOrderProps) => Promise<void>;
  updateUser: (id: string, data: IUpdateData) => Promise<void>;
  changePassword: (
    id: string,
    activePassword: string,
    newPassword: string
  ) => Promise<void>;
  subscribeUser: (
    id: string,
    plan: string,
    condition: string,
    discount: number,
    amount: number
  ) => Promise<void>;
  deleteUser: () => Promise<void>;
  getPerformance: (userId: string) => Promise<IUserPerformance>;
  handleSelectUser: (user: IUserDTO | null) => void;
  toggleOperation: (operation: string) => Promise<void>;
  toggleOrder: (field: string) => void;
}

const UserContext = createContext({
  users: null,
  userSelected: null,
  operation: "list",
  order: { field: "createdAt", order: "desc" },
} as IUserContextProps);

interface IUserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: IUserProviderProps) => {
  const { toggleLoading } = useConfig();

  const [users, setUsers] = useState<IUserDTO[] | null>(null);
  const [userSelected, setUserSelected] = useState<IUserDTO | null>(null);
  const [operation, setOperation] = useState<string>("list");
  const [order, setOrder] = useState<IOrderProps>({
    field: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    toggleOperation("list");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addUser = async (data: ICreateUserDTO): Promise<string> => {
    toggleLoading(true);
    let response: string = "";

    await axios
      .post("/api/users", { data })
      .then((_response) => {
        listUsers(order);
        toast.success("Usuário cadastrado com sucesso.");
        response = "sucesso";
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
        response = err.response.data.errorMessage;
      })
      .finally(async () => {
        toggleLoading(false);
      });
    return response;
  };

  const listUsers = async ({
    field = "createdAt",
    order = "desc",
  }: IOrderProps): Promise<void> => {
    toggleLoading(true);

    await axios
      .get("/api/users", {
        params: {
          field,
          order,
        },
      })
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((err) => {
        setUsers(null);
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });

    toggleLoading(false);
  };

  const updateUser = async (id: string, data: IUpdateData): Promise<void> => {
    toggleLoading(true);

    const user = {
      name: data.name,
      rg: data.rg,
      email: data.email,
      level: data.level,
    };

    await axios
      .put(`/api/users/${id}`, user)
      .then((_response) => {
        toggleOperation("list");
        toast.success("Usuário atualizado com sucesso.");
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const changePassword = async (
    id: string,
    activePassword: string,
    newPassword: string
  ): Promise<void> => {
    toggleLoading(true);

    await axios
      .patch(`/api/users/${id}/change-password`, {
        activePassword,
        newPassword,
      })
      .then((_response) => {
        toast.success("Senha alterada com sucesso.");
        toggleOperation("list");
        removeCookies("tokenBomberQuiz");
        router.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const subscribeUser = async (
    id: string,
    plan: string,
    condition: string,
    discount: number,
    amount: number
  ) => {
    toggleLoading(true);

    await axios
      .patch(`/api/users/${id}/subscribe`, {
        plan,
        condition,
        discount,
        amount,
      })
      .then((_response) => {
        setUserSelected(null);
        listUsers(order);
        toggleOperation("list");
        toast.success(
          "Obrigado por acreditar em nosso trabalho. Assinatura concluída com sucesso."
        );
        router.push("/");
      })
      .catch((err) => {
        toggleOperation("list");
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const deleteUser = async (): Promise<void> => {
    toggleLoading(true);

    await axios
      .delete(`/api/users/${userSelected?._id}`)
      .then((_response) => {
        setUserSelected(null);
        listUsers(order);
        toggleOperation("list");
        toast.success("Usuário excluído com sucesso.");
      })
      .catch((err) => {
        toggleOperation("list");
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const getPerformance = async (userId: string): Promise<IUserPerformance> => {
    toggleLoading(true);

    let performance: IUserPerformance = { quizAnswered: 0, average: 0 };

    await axios
      .get(`/api/users/${userId}/performance`)
      .then((response) => {
        performance = response.data.performance;
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });

    return performance;
  };

  const handleSelectUser = (user: IUserDTO | null): void => {
    setUserSelected(user);
  };

  const toggleOperation = async (operation: string): Promise<void> => {
    await toggleLoading(true);
    setOperation(operation);
    await listUsers(order);
    await toggleLoading(false);
  };

  const toggleOrder = (field: string): void => {
    if (order.field !== field) {
      setOrder({ field, order: "asc" });
      listUsers({ field, order: "asc" });
    } else {
      if (order.order === "asc") {
        setOrder({ field, order: "desc" });
        listUsers({ field, order: "desc" });
      } else {
        setOrder({ field, order: "asc" });
        listUsers({ field, order: "asc" });
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        userSelected,
        operation,
        order,
        addUser,
        listUsers,
        updateUser,
        changePassword,
        subscribeUser,
        deleteUser,
        getPerformance,
        handleSelectUser,
        toggleOperation,
        toggleOrder,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
