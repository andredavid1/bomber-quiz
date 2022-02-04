import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import useUser from "hooks/useUser";

import { Container, Form, RowForm } from "./styles";

interface IEditUserProps {
  show: boolean;
}

const EditUser = ({ show }: IEditUserProps) => {
  const { userSelected, handleSelectUser, updateUser, toggleOperation } =
    useUser();

  const [name, setName] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [level, setLevel] = useState<"admin" | "partner" | "customer">(
    "customer"
  );

  useEffect(() => {
    if (userSelected) {
      setName(userSelected.name);
      setRg(userSelected.rg.toString());
      setEmail(userSelected.email);
      setLevel(userSelected.level);
    }
  }, [userSelected]);

  const handleCancel = () => {
    handleSelectUser(null);
    toggleOperation("list");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const id = userSelected?._id || "";

    interface IUpdateData {
      name: string;
      rg: number;
      email: string;
      level: "admin" | "partner" | "customer";
    }

    const data: IUpdateData = {
      name,
      rg: parseInt(rg),
      email,
      level: level,
    };

    await updateUser(id, data);
  };

  return (
    <Container show={show}>
      <Form onSubmit={handleSubmit}>
        <h3>Editar usuário</h3>
        <RowForm>
          <label htmlFor="id">Código:</label>
          <input type="text" id="id" disabled value={userSelected?._id} />
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
          <label htmlFor="rg">
            RG <span>(CBMGO)</span>:
          </label>
          <input
            type="text"
            id="rg"
            required
            value={rg}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setRg(event.target.value)
            }
          />
        </RowForm>
        <RowForm>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
        </RowForm>
        <RowForm>
          <label htmlFor="level">Nível de Acesso:</label>
          <select
            id="level"
            value={level}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setLevel(
                e.target.value === "admin"
                  ? "admin"
                  : e.target.value === "partner"
                  ? "partner"
                  : "customer"
              )
            }
          >
            <option value="admin">Administrador</option>
            <option value="partner">Parceiro</option>
            <option value="customer">Cliente</option>
          </select>
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

export default EditUser;
