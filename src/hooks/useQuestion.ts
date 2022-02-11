import { useContext } from "react";

import QuestionContext from "contexts/QuestionContext";

const useUser = () => {
  return useContext(QuestionContext);
};

export default useUser;
