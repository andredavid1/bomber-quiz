import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { ICreateQuestionDTO, IQuestionDTO } from "dtos/IQuestionDTO";
import useConfig from "hooks/useConfig";

interface IOrderProps {
  field?: string;
  order?: string;
}

interface IResponse {
  success: boolean;
  errorMessage?: string;
}

interface IQuestionContextProps {
  questions: IQuestionDTO[] | null;
  questionSelected: IQuestionDTO | null;
  operation: string;
  order: IOrderProps;
  addQuestion: (data: ICreateQuestionDTO) => Promise<IResponse>;
  listQuestions: (orderSelected: IOrderProps) => Promise<void>;
  updateQuestion: (id: string, data: IQuestionDTO) => Promise<IResponse>;
  deleteQuestion: () => Promise<void>;
  handleSelectQuestion: (question: IQuestionDTO | null) => void;
  handleSelectQuestionById: (id: string | null) => void;
  toggleOperation: (operation: string) => Promise<void>;
  toggleOrder: (field: string) => void;
}

const QuestionContext = createContext({
  questions: null,
  questionSelected: null,
  operation: "list",
  order: { field: "createdAt", order: "desc" },
} as IQuestionContextProps);

interface IQuestionProviderProps {
  children: ReactNode;
}

export const QuestionProvider = ({ children }: IQuestionProviderProps) => {
  const { toggleLoading } = useConfig();

  const [questions, setQuestions] = useState<IQuestionDTO[] | null>(null);
  const [questionSelected, setQuestionSelected] = useState<IQuestionDTO | null>(
    null
  );
  const [operation, setOperation] = useState<string>("list");
  const [order, setOrder] = useState<IOrderProps>({
    field: "createdAt",
    order: "desc",
  });

  useEffect(() => {
    toggleOperation("list");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addQuestion = async (data: ICreateQuestionDTO): Promise<IResponse> => {
    toggleLoading(true);

    let res: IResponse = { success: true, errorMessage: "" };

    await axios
      .post("/api/questions", { data })
      .then((response) => {
        listQuestions(order);
        toast.success("Questão cadastrada com sucesso.");
        res = response.data;
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
        res = err.response.data;
      })
      .finally(async () => {
        toggleLoading(false);
      });

    return res;
  };

  const listQuestions = async ({
    field = "createdAt",
    order = "desc",
  }: IOrderProps): Promise<void> => {
    toggleLoading(true);

    await axios
      .get("/api/questions", {
        params: {
          field,
          order,
        },
      })
      .then((response) => {
        setQuestions(response.data.questions);
      })
      .catch((err) => {
        setQuestions(null);
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });

    toggleLoading(false);
  };

  const updateQuestion = async (
    id: string,
    data: IQuestionDTO
  ): Promise<IResponse> => {
    toggleLoading(true);

    let res: IResponse = { success: true };

    await axios
      .put(`/api/questions/${id}`, data)
      .then((response) => {
        listQuestions(order);
        toast.success("Questão atualizada com sucesso.");
        res = response.data;
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
        res = err.response.data;
      })
      .finally(async () => {
        toggleLoading(false);
      });

    return res;
  };

  const deleteQuestion = async (): Promise<void> => {
    toggleLoading(true);

    await axios
      .delete(`/api/questions/${questionSelected?._id}`)
      .then((_response) => {
        setQuestionSelected(null);
        listQuestions(order);
        toggleOperation("list");
        toast.success("Questão excluída com sucesso.");
      })
      .catch((err) => {
        toggleOperation("list");
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const handleSelectQuestion = (question: IQuestionDTO | null): void => {
    setQuestionSelected(question);
  };

  const handleSelectQuestionById = async (id: string | null): Promise<void> => {
    toggleLoading(true);

    await axios
      .get(`/api/questions/${id}`)
      .then((response) => {
        setQuestionSelected(response.data.question);
      })
      .catch((err) => {
        toggleOperation("list");
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const toggleOperation = async (operation: string): Promise<void> => {
    await toggleLoading(true);
    setOperation(operation);
    await listQuestions(order);
    await toggleLoading(false);
  };

  const toggleOrder = (field: string): void => {
    if (order.field !== field) {
      setOrder({ field, order: "asc" });
      listQuestions({ field, order: "asc" });
    } else {
      if (order.order === "asc") {
        setOrder({ field, order: "desc" });
        listQuestions({ field, order: "desc" });
      } else {
        setOrder({ field, order: "asc" });
        listQuestions({ field, order: "asc" });
      }
    }
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        questionSelected,
        operation,
        order,
        addQuestion,
        listQuestions,
        updateQuestion,
        deleteQuestion,
        handleSelectQuestion,
        handleSelectQuestionById,
        toggleOperation,
        toggleOrder,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export default QuestionContext;
