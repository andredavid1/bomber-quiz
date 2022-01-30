import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import router from "next/router";

import useUser from "hooks/useUser";

import { Container, Form, RowForm } from "./styles";

interface IChangePasswordUserProps {
  id: string;
}

const ChangePasswordUser = ({ id }: IChangePasswordUserProps) => {
  const { userSelected, handleSelectUser, changePassword, toggleOperation } =
    useUser();

  const [activePassword, setActivePassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const handleCancel = () => {
    handleSelectUser(null);
    toggleOperation("list");
    router.push("/usuarios");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!activePassword.trim()) {
      toast.error("Preecha o campo Senha Atual.");
      document.getElementById("activePassword")?.focus();
      return;
    }

    if (!newPassword.trim()) {
      toast.error("Preecha o campo Nova Senha.");
      document.getElementById("newPassword")?.focus();
      return;
    }

    if (!confirmNewPassword.trim()) {
      toast.error("Preecha o campo Confirmar Nova Senha.");
      document.getElementById("confirmNewPassword")?.focus();
      return;
    }

    if (newPassword.trim() !== confirmNewPassword.trim()) {
      toast.error(
        "Os campos Nova Senha e Confirmar Nova Senha precisam ser iguais"
      );
      document.getElementById("comfirmPassword")?.focus();
      return;
    }

    if (activePassword.trim() === newPassword.trim()) {
      toast.error("A nova senha precisar ser diferente da atual.");
      document.getElementById("newPassword")?.focus();
      return;
    }

    if (
      activePassword.trim().length < 8 ||
      newPassword.trim().length < 8 ||
      confirmNewPassword.trim().length < 8
    ) {
      toast.error(
        "Os campos de senha precisam ter pelo menos 8 caracteres. Não utilize espaços."
      );
      return;
    }

    await changePassword(id, activePassword, newPassword);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h3>Alterar Senha</h3>

        <RowForm>
          <label htmlFor="activePassword">Senha Atual:</label>
          <input
            type="password"
            id="activePassword"
            value={activePassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setActivePassword(e.target.value)
            }
          />
        </RowForm>

        <RowForm>
          <label htmlFor="newPassword">Nova Senha:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
          />
        </RowForm>

        <RowForm>
          <label htmlFor="confirmNewPassword">Confirmar Nova Senha:</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmNewPassword(e.target.value)
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

export default ChangePasswordUser;
