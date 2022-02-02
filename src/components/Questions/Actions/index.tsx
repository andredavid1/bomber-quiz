import { ChangeEvent, useState } from "react";
import { FiXCircle } from "react-icons/fi";

import useQuestion from "hooks/useQuestion";

import { Container, SearchContainer } from "./styles";

interface IQuestionActionsProps {
  show: boolean;
}

const QuestionsActions = ({ show }: IQuestionActionsProps) => {
  const { toggleOperation } = useQuestion();

  const [itemSearch, setItemSearch] = useState<string>("");

  return (
    <Container show={show}>
      <button type="button" onClick={() => toggleOperation("add")}>
        Nova Questão
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

export default QuestionsActions;
