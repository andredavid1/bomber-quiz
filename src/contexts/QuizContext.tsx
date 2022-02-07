import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

import useConfig from "hooks/useConfig";
import useAuth from "hooks/useAuth";
import { IQuizDTO } from "dtos/IQuizDTO";
import router from "next/router";

interface IOrderProps {
  field?: string;
  order?: string;
}

interface IQuizContextProps {
  quizSelected: IQuizDTO | null;
  createQuiz: () => Promise<void>;
  handleSelectQuiz: (quizId: string) => Promise<void>;
  toRespond: (
    quiz: IQuizDTO,
    questionOrder: number,
    answerId: string,
    option: string
  ) => Promise<void>;
  finishQuiz: () => Promise<void>;
}

const QuizContext = createContext({} as IQuizContextProps);

interface IQuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: IQuizProviderProps) => {
  const { userLogged } = useAuth();
  const { toggleLoading } = useConfig();
  const [quizSelected, setQuizSelected] = useState<IQuizDTO | null>(null);

  const createQuiz = async () => {
    toggleLoading(true);

    await axios
      .post(`/api/quiz/${userLogged?.id}`)
      .then((response) => {
        setQuizSelected(response.data.quiz);
        router.push(`/quiz/${response.data.quiz._id}`);
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const handleSelectQuiz = async (quizId: string) => {
    toggleLoading(true);

    await axios
      .get(`/api/quiz/${quizId}`)
      .then((response) => {
        setQuizSelected(response.data.quiz);
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const toRespond = async (
    quiz: IQuizDTO,
    questionOrder: number,
    answerId: string,
    option: string
  ) => {
    toggleLoading(true);

    const data = {
      quizId: quiz._id,
      questionOrder,
      answerId,
      option,
    };

    await axios
      .patch(`/api/quiz/${userLogged?.id}`, data)
      .then((response) => {
        setQuizSelected(response.data.quiz);
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const finishQuiz = async () => {
    toggleLoading(true);

    await axios
      .patch(`/api/quiz/${quizSelected?._id}/finish`)
      .then((response) => {
        console.log(response.data.quiz);
        setQuizSelected(response.data.quiz);
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  return (
    <QuizContext.Provider
      value={{
        quizSelected,
        createQuiz,
        handleSelectQuiz,
        toRespond,
        finishQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
