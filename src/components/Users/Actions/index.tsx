import useConfig from "hooks/useConfig";
import { ChangeEvent, useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { Container, SearchContainer } from "./styles";

interface IUserActionsProps {
  show: boolean;
}

const UsersActions = ({ show }: IUserActionsProps) => {
  const { toggleOperation } = useConfig();

  const [itemSearch, setItemSearch] = useState<string>("");

  return (
    <Container show={show}>
      <button type="button" onClick={() => toggleOperation("add")}>
        Novo Usuário
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

export default UsersActions;
