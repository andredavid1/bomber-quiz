import { useContext } from "react";

import DisciplineContext from "contexts/DisciplineContext";

const useDiscipline = () => {
  return useContext(DisciplineContext);
};

export default useDiscipline;
