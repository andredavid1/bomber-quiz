import { ChangeEvent, useState } from "react";
import { FiXCircle } from "react-icons/fi";

import useDiscipline from "hooks/useDiscipline";

import { Container, SearchContainer } from "./styles";

interface IDisciplineActionsProps {
  show: boolean;
}

const DisciplinesActions = ({ show }: IDisciplineActionsProps) => {
  const { toggleOperation } = useDiscipline();

  const [itemSearch, setItemSearch] = useState<string>("");

  return (
    <Container show={show}>
      <button type="button" onClick={() => toggleOperation("add")}>
        Nova Matéria
      </button>
      <SearchContainer showButton={itemSearch.trim().length > 0}>
        <input
          type="text"
          placeholder="pesquisar..."
          value={itemSearch}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setItemSearch(event.target.value)
          }
        />
        <button type="button" onClick={() => setItemSearch("")}>
          <FiXCircle />
        </button>
      </SearchContainer>
    </Container>
  );
};

export default DisciplinesActions;
