import AnswerContext from "contexts/AnswerContext";
import { useContext } from "react";

const useUser = () => {
  return useContext(AnswerContext);
};

export default useUser;
