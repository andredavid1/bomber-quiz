/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

import { ICreateDisciplineDTO } from "dtos/IDisciplineDTO";
import useDiscipline from "hooks/useDiscipline";

import { Container, Form, RowForm } from "./styles";

interface IAddDisciplineProps {
  show: boolean;
}

const AddDiscipline = ({ show }: IAddDisciplineProps) => {
  const { addDiscipline, toggleOperation } = useDiscipline();

  const [name, setName] = useState<string>("");

  const initialState = () => {
    setName("");
  };

  const validateData = (): boolean => {
    let isValid: boolean = true;

    if (!name.trim()) {
      toast.error("Preencha o campo nome.");
      document.getElementById("name")?.focus();
      isValid = false;
    }

    return isValid;
  };

  const handleCancel = () => {
    initialState();

    toggleOperation("list");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isValid = validateData();

    if (!isValid) {
      return;
    }

    const data: ICreateDisciplineDTO = {
      name: name.trim(),
    };

    const result = await addDiscipline(data);

    if (result === "sucesso") {
      initialState();
      toggleOperation("list");
    } else {
      if (result === "Já existe uma matéria cadastrada com esse nome.") {
        document.getElementById("name")?.focus();
      }
    }
  };

  return (
    <Container show={show}>
      <Form onSubmit={handleSubmit}>
        <h3>Cadastrar nova matéria</h3>

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

export default AddDiscipline;
