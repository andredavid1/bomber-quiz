import axios from "axios";
import { createContext, ReactNode, useState } from "react";

import { ICreateDisciplineDTO, IDisciplineDTO } from "dtos/IDisciplineDTO";
import useConfig from "hooks/useConfig";
import { toast } from "react-toastify";

interface IOrderProps {
  field?: string;
  order?: string;
}

interface IDisciplineContextProps {
  disciplines: IDisciplineDTO[];
  disciplineSelected: IDisciplineDTO | null;
  operation: string;
  order: IOrderProps;
  addDiscipline: (data: ICreateDisciplineDTO) => Promise<string>;
  listDisciplines: (orderSelected: IOrderProps) => Promise<void>;
  updateDiscipline: (id: string, name: string) => Promise<void>;
  deleteDiscipline: () => Promise<void>;
  handleSelectDiscipline: (discipline: IDisciplineDTO | null) => void;
  toggleOperation: (operation: string) => Promise<void>;
  toggleOrder: (field: string) => void;
}

const DisciplineContext = createContext({
  disciplines: [] as IDisciplineDTO[],
  disciplineSelected: null,
  operation: "list",
  order: { field: "createdAt", order: "desc" },
} as IDisciplineContextProps);

interface IDisciplineProviderProps {
  children: ReactNode;
}

export const DisciplineProvider = ({ children }: IDisciplineProviderProps) => {
  const { toggleLoading } = useConfig();
  const [disciplines, setDisciplines] = useState<IDisciplineDTO[]>([]);
  const [disciplineSelected, setdisciplineSelected] =
    useState<IDisciplineDTO | null>(null);
  const [operation, setOperation] = useState<string>("list");
  const [order, setOrder] = useState<IOrderProps>({
    field: "createdAt",
    order: "desc",
  });

  const addDiscipline = async (data: ICreateDisciplineDTO): Promise<string> => {
    toggleLoading(true);
    let response: string = "";

    await axios
      .post("/api/disciplines", { data })
      .then((_response) => {
        listDisciplines(order);
        toast.success("Matéria cadastrada com sucesso.");
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

  const listDisciplines = async ({
    field = "createdAt",
    order = "desc",
  }: IOrderProps): Promise<void> => {
    toggleLoading(true);

    await axios
      .get("/api/disciplines", {
        params: {
          field,
          order,
        },
      })
      .then((response) => {
        setDisciplines(response.data.disciplines);
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });

    toggleLoading(false);
  };

  const updateDiscipline = async (id: string, name: string): Promise<void> => {
    toggleLoading(true);

    await axios
      .put(`/api/disciplines/${id}`, { name })
      .then((_response) => {
        toggleOperation("list");
        toast.success("Matéria atualizada com sucesso.");
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const deleteDiscipline = async (): Promise<void> => {
    toggleLoading(true);

    await axios
      .delete(`/api/disciplines/${disciplineSelected?._id}`)
      .then((_response) => {
        setdisciplineSelected(null);
        listDisciplines(order);
        toggleOperation("list");
        toast.success("Matéria excluída com sucesso.");
      })
      .catch((err) => {
        toggleOperation("list");
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const handleSelectDiscipline = (discipline: IDisciplineDTO | null): void => {
    setdisciplineSelected(discipline);
  };

  const toggleOperation = async (operation: string): Promise<void> => {
    setOperation(operation);
    listDisciplines(order);
  };

  const toggleOrder = (field: string): void => {
    if (order.field !== field) {
      setOrder({ field, order: "asc" });
      listDisciplines({ field, order: "asc" });
    } else {
      if (order.order === "asc") {
        setOrder({ field, order: "desc" });
        listDisciplines({ field, order: "desc" });
      } else {
        setOrder({ field, order: "asc" });
        listDisciplines({ field, order: "asc" });
      }
    }
  };

  return (
    <DisciplineContext.Provider
      value={{
        disciplines,
        disciplineSelected,
        operation,
        order,
        addDiscipline,
        listDisciplines,
        updateDiscipline,
        deleteDiscipline,
        handleSelectDiscipline,
        toggleOperation,
        toggleOrder,
      }}
    >
      {children}
    </DisciplineContext.Provider>
  );
};

export default DisciplineContext;
