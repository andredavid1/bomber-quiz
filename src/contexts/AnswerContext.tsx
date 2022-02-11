import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ICreateAnswerDTO, IAnswerDTO } from "dtos/IAnswerDTO";
import useConfig from "hooks/useConfig";

interface IOrderProps {
  field?: string;
  order?: string;
}

interface IAnswerContextProps {
  answers: IAnswerDTO[] | null;
  answerSelected: IAnswerDTO | null;
  operation: string;
  order: IOrderProps;
  addAnswer: (data: ICreateAnswerDTO) => Promise<IAnswerDTO>;
  listAnswers: (orderSelected: IOrderProps) => Promise<void>;
  updateAnswer: (id: string, data: IAnswerDTO) => Promise<void>;
  deleteAnswer: () => Promise<void>;
  handleSelectAnswer: (answer: IAnswerDTO | null) => void;
  toggleOperation: (operation: string) => Promise<void>;
  toggleOrder: (field: string) => void;
}

const AnswerContext = createContext({
  answers: null,
  answerSelected: null,
  operation: "list",
  order: { field: "createdAt", order: "desc" },
} as IAnswerContextProps);

interface IAnswerProviderProps {
  children: ReactNode;
}

export const AnswerProvider = ({ children }: IAnswerProviderProps) => {
  const { toggleLoading } = useConfig();

  const [answers, setAnswers] = useState<IAnswerDTO[] | null>(null);
  const [answerSelected, setAnswerSelected] = useState<IAnswerDTO | null>(null);
  const [operation, setOperation] = useState<string>("list");
  const [order, setOrder] = useState<IOrderProps>({
    field: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    toggleOperation("list");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addAnswer = async (data: ICreateAnswerDTO): Promise<IAnswerDTO> => {
    toggleLoading(true);

    let answerAdded: IAnswerDTO = { _id: "", value: "", correct: false };

    await axios
      .post("/api/answers", { data })
      .then((response) => {
        answerAdded = response.data.answer;
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
        toast.error("err answer add");
      })
      .finally(async () => {
        toggleLoading(false);
      });

    return answerAdded;
  };

  const listAnswers = async ({
    field = "createdAt",
    order = "desc",
  }: IOrderProps): Promise<void> => {
    toggleLoading(true);

    await axios
      .get("/api/answers", {
        params: {
          field,
          order,
        },
      })
      .then((response) => {
        setAnswers(response.data.answers);
      })
      .catch((err) => {
        toast.error("err answer list");

        setAnswers(null);
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });

    toggleLoading(false);
  };

  const updateAnswer = async (id: string, data: IAnswerDTO): Promise<void> => {
    toggleLoading(true);

    await axios
      .put(`/api/answers/${id}`, data)
      .then((_response) => {
        toggleOperation("list");
        toast.success("Resposta atualizada com sucesso.");
      })
      .catch((err) => {
        toast.error("err answer update");

        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const deleteAnswer = async (): Promise<void> => {
    toggleLoading(true);

    await axios
      .delete(`/api/answers/${answerSelected?._id}`)
      .then((_response) => {
        setAnswerSelected(null);
        listAnswers(order);
        toggleOperation("list");
        toast.success("Resposta excluída com sucesso.");
      })
      .catch((err) => {
        toast.error("err answer delete");

        toggleOperation("list");
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const handleSelectAnswer = (answer: IAnswerDTO | null): void => {
    setAnswerSelected(answer);
  };

  const toggleOperation = async (operation: string): Promise<void> => {
    await toggleLoading(true);
    setOperation(operation);
    await listAnswers(order);
    await toggleLoading(false);
  };

  const toggleOrder = (field: string): void => {
    if (order.field !== field) {
      setOrder({ field, order: "asc" });
      listAnswers({ field, order: "asc" });
    } else {
      if (order.order === "asc") {
        setOrder({ field, order: "desc" });
        listAnswers({ field, order: "desc" });
      } else {
        setOrder({ field, order: "asc" });
        listAnswers({ field, order: "asc" });
      }
    }
  };

  return (
    <AnswerContext.Provider
      value={{
        answers,
        answerSelected,
        operation,
        order,
        addAnswer,
        listAnswers,
        updateAnswer,
        deleteAnswer,
        handleSelectAnswer,
        toggleOperation,
        toggleOrder,
      }}
    >
      {children}
    </AnswerContext.Provider>
  );
};

export default AnswerContext;
