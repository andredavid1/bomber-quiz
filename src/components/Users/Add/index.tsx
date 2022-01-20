/* eslint-disable @next/next/no-img-element */
import { ChangeEvent, FormEvent, InputHTMLAttributes, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";

import { ICreateUserDTO } from "dtos/IUserDTO";
import useConfig from "hooks/useConfig";

import { Container, Form, RowForm } from "./styles";
import useUser from "hooks/useUser";

interface IAddUserProps {
  show: boolean;
}

const AddUser = ({ show }: IAddUserProps) => {
  const { toggleOperation } = useConfig();
  const { addUser } = useUser();

  const [name, setName] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatar, setAvatar] = useState<Blob | string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const initialState = () => {
    setName("");
    setRg("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const validateData = (): boolean => {
    if (!name.trim()) {
      toast.error("Preencha o campo nome.");
      document.getElementById("name")?.focus();
      return false;
    }

    if (!rg.trim()) {
      toast.error("Preencha o campo RG.");
      document.getElementById("rg")?.focus();
      return false;
    }

    if (!validator.isInt(rg.trim())) {
      toast.error("O campo RG precisa ser preenchido com um número.");
      document.getElementById("rg")?.focus();
      return false;
    }

    if (!email.trim()) {
      toast.error("Preencha o campo e-mail.");
      document.getElementById("email")?.focus();
      return false;
    }

    if (!validator.isEmail(email.trim())) {
      toast.error("E-mail inválido.");
      document.getElementById("email")?.focus();
      return false;
    }

    if (!password.trim()) {
      toast.error("Preencha o campo senha.");
      document.getElementById("password")?.focus();
      return false;
    }

    if (!confirmPassword.trim()) {
      toast.error("Preencha o campo confirmar senha.");
      document.getElementById("confirmPassword")?.focus();
      return false;
    }

    if (password.trim().length < 8 || confirmPassword.trim().length < 8) {
      toast.error(
        "Os campos senha e confirmar senha precisam ter pelo menos 8 caracteres válidos."
      );
      document.getElementById("password")?.focus();
      return false;
    }

    if (password.trim() !== confirmPassword.trim()) {
      toast.error("Senha e Confirmar Senha precisam ser iguais");
      document.getElementById("confirmPassword")?.focus();
      return false;
    }

    return true;
  };

  const handleCancel = () => {
    initialState();

    toggleOperation("list");
  };

  const handleChangeFile = (event: any) => {
    setAvatarUrl(URL.createObjectURL(event.target.files[0]));
    setAvatar(event.target.files[0]);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isValid = validateData();

    if (!isValid) {
      return;
    }

    const data: ICreateUserDTO = {
      name: name.trim(),
      rg: parseInt(rg.trim()),
      email: email.trim(),
      avatarUrl,
      password: password.trim(),
      level: "customer",
      registered: false,
      expiresRegister: new Date(Date.now()),
    };

    await addUser(data);

    initialState();
    toggleOperation("list");
  };

  return (
    <Container show={show}>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <h3>Cadastrar novo usuário</h3>
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
        {avatarUrl && (
          <RowForm>
            <img
              src={avatarUrl}
              alt="Avatar Preview"
              width={100}
              height={100}
            />
          </RowForm>
        )}
        <RowForm>
          <label htmlFor="avatar">Avatar (foto):</label>
          <input type="file" id="avatar" onChange={handleChangeFile} />
        </RowForm>
        <RowForm>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            minLength={8}
            required
            value={password}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
          />
        </RowForm>
        <RowForm>
          <label htmlFor="confirmPassword">Confirmar Senha:</label>
          <input
            type="password"
            id="confirmPassword"
            minLength={8}
            required
            value={confirmPassword}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(event.target.value)
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

export default AddUser;
