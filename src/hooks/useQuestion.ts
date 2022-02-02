import QuestionContext from "contexts/QuestionContext";
import { useContext } from "react";

const useUser = () => {
  return useContext(QuestionContext);
};

export default useUser;
