import DisciplineContext from "contexts/DisciplineContext";
import { useContext } from "react";

const useDiscipline = () => {
  return useContext(DisciplineContext);
};

export default useDiscipline;
