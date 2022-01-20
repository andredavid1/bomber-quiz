import axios from "axios";
import { createContext, ReactNode, useState } from "react";
import useConfig from "hooks/useConfig";
import { toast } from "react-toastify";
import { ICreateUserDTO, IUserDTO } from "dtos/IUserDTO";

interface IUserContextProps {
  users: IUserDTO[];
  userSelected: IUserDTO | null;
  addUser: (data: ICreateUserDTO) => Promise<void>;
  listUsers: () => Promise<void>;
  showDetailsUser: () => Promise<void>;
  updateUser: (data: IUserDTO) => Promise<void>;
  deleteUser: () => Promise<void>;
  handleSelectUser: (user: IUserDTO) => void;
}

const UserContext = createContext({
  users: [] as IUserDTO[],
  userSelected: null,
} as IUserContextProps);

interface IUserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: IUserProviderProps) => {
  const { toggleLoading } = useConfig();
  const [users, setUsers] = useState<IUserDTO[]>([] as IUserDTO[]);
  const [userSelected, setUserSelected] = useState<IUserDTO | null>(null);

  const addUser = async (data: ICreateUserDTO): Promise<void> => {
    toggleLoading(true);

    console.log("context user data", data);

    await axios
      .post("/api/users", { data })
      .then((_response) => {
        listUsers();
        toast.success("Usuário cadastrado com sucesso.");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const listUsers = async (): Promise<void> => {
    toggleLoading(true);

    await axios
      .get("/api/users")
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
        listUsers();
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

  const handleSelectUser = (user: IUserDTO): void => {
    setUserSelected(user);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        userSelected,
        addUser,
        listUsers,
        showDetailsUser,
        updateUser,
        deleteUser,
        handleSelectUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
