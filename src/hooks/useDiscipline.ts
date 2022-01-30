import DisciplineContext from "contexts/DisciplineContext";
import { useContext } from "react";

const useUser = () => {
  return useContext(DisciplineContext);
};

export default useUser;
