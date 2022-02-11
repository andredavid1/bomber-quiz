import axios from "axios";
import router from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { IQuizDTO } from "dtos/IQuizDTO";
import useConfig from "hooks/useConfig";
import useAuth from "hooks/useAuth";

interface IQuizContextProps {
  quiz: IQuizDTO | null;
  createQuiz: () => Promise<void>;
  handleSelectQuiz: (quizId: string) => Promise<void>;
  finishQuiz: (quiz: IQuizDTO) => Promise<void>;
}

const QuizContext = createContext({} as IQuizContextProps);

interface IQuizProviderProps {
  children: ReactNode;
}

export const QuizProvider = ({ children }: IQuizProviderProps) => {
  const { userLogged } = useAuth();
  const { toggleLoading } = useConfig();
  const [quiz, setQuiz] = useState<IQuizDTO | null>(null);

  const createQuiz = async (): Promise<void> => {
    toggleLoading(true);

    await axios
      .post(`/api/quiz/${userLogged?.id}/create`)
      .then((response) => {
        setQuiz(response.data.quiz);
        router.push(`/quiz/${response.data.quiz._id}`);
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(() => {
        toggleLoading(false);
      });
  };

  const handleSelectQuiz = async (quizId: string) => {
    toggleLoading(true);

    await axios
      .get(`/api/quiz/${quizId}`)
      .then((response) => {
        setQuiz(response.data.quiz);
      })
      .catch((err) => {
        toast.error(err.response.data.errorMessage);
      })
      .finally(async () => {
        toggleLoading(false);
      });
  };

  const finishQuiz = async (quizFinished: IQuizDTO) => {
    toggleLoading(true);

    await axios
      .patch(`/api/quiz/${quizFinished._id}/finish`, quizFinished)
      .then((response) => {
        const average = response.data.quiz.average;

        if (average < 5) {
          toast.error(
            `O seu desempenho foi nota: ${average}. Estude um pouco mais e tente novamente.`
          );
        }

        if (average >= 5 && average < 8) {
          toast.success(
            `O seu desempenho foi nota: ${average}. Você está no caminho certo. Continue estudando.`
          );
        }

        if (average >= 8) {
          toast.success(
            `Parabéns! O seu desempenho foi nota: ${average}. Continue assim.`
          );
        }
        setQuiz(response.data.quiz);
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
        quiz,
        createQuiz,
        handleSelectQuiz,
        finishQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContext;
