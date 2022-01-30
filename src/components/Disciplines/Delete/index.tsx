import { FormEvent } from "react";

import useDiscipline from "hooks/useDiscipline";

import { Container, Form, RowForm } from "./styles";

interface IDeleteDisciplineProps {
  show: boolean;
}

const DeleteDiscipline = ({ show }: IDeleteDisciplineProps) => {
  const {
    disciplineSelected,
    handleSelectDiscipline,
    deleteDiscipline,
    toggleOperation,
  } = useDiscipline();

  const handleCancel = () => {
    handleSelectDiscipline(null);
    toggleOperation("list");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await deleteDiscipline();
  };

  return (
    <Container show={show}>
      <Form onSubmit={handleSubmit}>
        <h3>Excluir matéria</h3>
        <RowForm>
          <span>
            Você deseja realmente excluir a matéria:{" "}
            <strong>{disciplineSelected?.name}</strong>?
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

export default DeleteDiscipline;
