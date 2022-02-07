import QuizContext from "contexts/QuizContext";
import { useContext } from "react";

const useQuiz = () => {
  return useContext(QuizContext);
};

export default useQuiz;
