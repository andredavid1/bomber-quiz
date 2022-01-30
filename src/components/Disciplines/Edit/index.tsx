import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import useDiscipline from "hooks/useDiscipline";

import { Container, Form, RowForm } from "./styles";

interface IEditDisciplineProps {
  show: boolean;
}

const EditDiscipline = ({ show }: IEditDisciplineProps) => {
  const {
    disciplineSelected,
    handleSelectDiscipline,
    updateDiscipline,
    toggleOperation,
  } = useDiscipline();

  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (disciplineSelected) {
      setName(disciplineSelected.name);
    }
  }, [disciplineSelected]);

  const handleCancel = () => {
    handleSelectDiscipline(null);
    toggleOperation("list");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const id = disciplineSelected?._id || "";

    await updateDiscipline(id, name);
  };

  return (
    <Container show={show}>
      <Form onSubmit={handleSubmit}>
        <h3>Editar matéria</h3>

        <RowForm>
          <label htmlFor="id">Código:</label>
          <input type="text" id="id" disabled value={disciplineSelected?._id} />
        </RowForm>

        <RowForm>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            required
            value={name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
        </RowForm>

        <RowForm>
          <button className="cancel" type="button" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="success" type="submit">
            Salvar
          </button>
        </RowForm>
      </Form>
    </Container>
  );
};

export default EditDiscipline;
