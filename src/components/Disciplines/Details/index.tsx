import useDiscipline from "hooks/useDiscipline";
import { Container, Form, RowForm } from "./styles";
import { useEffect, useState } from "react";

interface IDetailsDisciplineProps {
  show: boolean;
}

const DetailsDiscipline = ({ show }: IDetailsDisciplineProps) => {
  const { disciplineSelected, handleSelectDiscipline, toggleOperation } =
    useDiscipline();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (disciplineSelected) {
      setId(disciplineSelected._id);
      setName(disciplineSelected.name);
    }
  }, [disciplineSelected]);

  const handleCancel = () => {
    handleSelectDiscipline(null);
    toggleOperation("list");
  };

  const handleEdit = () => {
    toggleOperation("edit");
  };

  const handleDelete = () => {
    toggleOperation("delete");
  };

  return (
    <Container show={show}>
      <Form>
        <h3>Detalhes da matéria</h3>

        <RowForm>
          <label htmlFor="id">Código:</label>
          <input type="text" id="id" disabled value={id} />
        </RowForm>

        <RowForm>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" disabled value={name} />
        </RowForm>

        <RowForm>
          <button className="cancel" type="button" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="action" type="button" onClick={handleEdit}>
            Editar
          </button>
          <button className="action" type="button" onClick={handleDelete}>
            Excluir
          </button>
        </RowForm>
      </Form>
    </Container>
  );
};

export default DetailsDiscipline;
