import { useContext } from "react";

import AnswerContext from "contexts/AnswerContext";

const useUser = () => {
  return useContext(AnswerContext);
};

export default useUser;
