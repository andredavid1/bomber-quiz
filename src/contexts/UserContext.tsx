import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import useConfig from "hooks/useConfig";
import { toast } from "react-toastify";
import { ICreateUserDTO, IUserDTO } from "dtos/IUserDTO";
import { getCookie } from "cookies-next";
import router from "next/router";

interface IOrderProps {
  field?: string;
  order?: string;
}

interface IUserContextProps {
  users: IUserDTO[];
  userSelected: IUserDTO | null;
  operation: string;
  order: IOrderProps;
  addUser: (data: ICreateUserDTO) => Promise<string>;
  listUsers: (orderSelected: IOrderProps) => Promise<void>;
  showDetailsUser: () => Promise<void>;
  updateUser: (data: IUserDTO) => Promise<void>;
  deleteUser: () => Promise<void>;
  handleSelectUser: (user: IUserDTO | null) => void;
  toggleOperation: (operation: string) => Promise<void>;
  toggleOrder: (field: string) => void;
}

const UserContext = createContext({
  users: [] as IUserDTO[],
  userSelected: null,
  operation: "list",
  order: { field: "createdAt", order: "desc" },
} as IUserContextProps);

interface IUserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: IUserProviderProps) => {
  const { toggleLoading } = useConfig();
  const [users, setUsers] = useState<IUserDTO[]>([] as IUserDTO[]);
  const [userSelected, setUserSelected] = useState<IUserDTO | null>(null);
  const [operation, setOperation] = useState<string>("list");
  const [order, setOrder] = useState<IOrderProps>({
    field: "createdAt",
    order: "desc",
  });

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
        toast.error(err.response.data.error);
      })
      .finally(async () => {
        toggleLoading(false);
      });

    toggleLoading(false);
  };

  const showDetailsUser = async (): Promise<void> => {
    toggleLoading(true);

    await axios
      .get(`/api/users/${userSelected?._id}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const updateUser = async (data: IUserDTO): Promise<void> => {
    toggleLoading(true);

    const user = {
      name: data.name,
      rg: data.rg,
      email: data.email,
      level: data.level,
      registered: data.registered,
      expiresRegister: data.expiresRegister,
    };

    await axios
      .put(`/api/users/${data._id}`, user)
      .then((_response) => {
        listUsers(order);
        toast.success("Usuário atualizado com sucesso.");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
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
        toast.success("Usuário excluído com sucesso.");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const handleSelectUser = (user: IUserDTO | null): void => {
    setUserSelected(user);
  };

  const toggleOperation = async (operation: string): Promise<void> => {
    setOperation(operation);
    listUsers(order);
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
        showDetailsUser,
        updateUser,
        deleteUser,
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
