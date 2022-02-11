import { useEffect, useState } from "react";

import useUser from "hooks/useUser";

import { Container, Form, RowForm } from "./styles";

interface IDetailsUserProps {
  show: boolean;
}

const DetailsUser = ({ show }: IDetailsUserProps) => {
  const { userSelected, handleSelectUser, toggleOperation } = useUser();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [level, setLevel] = useState<"admin" | "partner" | "customer">(
    "customer"
  );
  const [registered, setRegistered] = useState<"Sim" | "Não">("Não");
  const [expiresRegister, setExpiresRegister] = useState<Date>(new Date());

  useEffect(() => {
    if (userSelected) {
      setId(userSelected._id);
      setName(userSelected.name);
      setRg(userSelected.rg.toString());
      setEmail(userSelected.email);
      setLevel(userSelected.level);
      setRegistered(userSelected.registered ? "Sim" : "Não");
      setExpiresRegister(userSelected.expiresRegister);
    }
  }, [userSelected]);

  const handleCancel = () => {
    handleSelectUser(null);
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
        <h3>Detalhes do usuário</h3>
        <RowForm>
          <label htmlFor="id">Código:</label>
          <input type="text" id="id" disabled value={id} />
        </RowForm>
        <RowForm>
          <label htmlFor="name">Nome:</label>
          <input type="text" id="name" disabled value={name} />
        </RowForm>
        <RowForm>
          <label htmlFor="rg">
            RG <span>(CBMGO)</span>:
          </label>
          <input type="text" id="rg" disabled value={rg} />
        </RowForm>
        <RowForm>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" disabled value={email} />
        </RowForm>
        <RowForm>
          <label htmlFor="level">Nível de Acesso:</label>
          <select id="level" value={level} disabled>
            <option value="admin">Administrador</option>
            <option value="partner">Parceiro</option>
            <option value="customer">Cliente</option>
          </select>
        </RowForm>
        <RowForm>
          <label htmlFor="registered">Registrado:</label>
          <select id="registered" value={registered} disabled>
            <option value="Sim">Sim</option>
            <option value="Não">Não</option>
          </select>
        </RowForm>
        {registered === "Sim" && (
          <RowForm>
            <label htmlFor="expiresRegister">Vencimento do Registro:</label>
            <input
              id="expiresRegister"
              type="datetime-local"
              disabled
              value={expiresRegister.toString().substring(0, 16)}
            />
          </RowForm>
        )}

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

export default DetailsUser;
