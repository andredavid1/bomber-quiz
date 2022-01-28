import { FormEvent } from "react";

import useUser from "hooks/useUser";

import { Container, Form, RowForm } from "./styles";

interface IDeleteUserProps {
  show: boolean;
}

const DeleteUser = ({ show }: IDeleteUserProps) => {
  const { userSelected, handleSelectUser, deleteUser, toggleOperation } =
    useUser();

  const handleCancel = () => {
    handleSelectUser(null);
    toggleOperation("list");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await deleteUser();
  };

  return (
    <Container show={show}>
      <Form onSubmit={handleSubmit}>
        <h3>Excluir usuário</h3>
        <RowForm>
          <span>
            Você deseja realmente excluir o usuário:{" "}
            <strong>{userSelected?.name}</strong>?
          </span>
        </RowForm>

        <RowForm>
          <button className="cancel" type="button" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="danger" type="submit">
            Confirmar
          </button>
        </RowForm>
      </Form>
    </Container>
  );
};

export default DeleteUser;
