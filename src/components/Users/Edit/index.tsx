import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";

import useUser from "hooks/useUser";

import { Container, Form, RowForm } from "./styles";

type IMyOptionsSelectType = {
  label: string;
  value: string;
};

type IsMulti = false;

const customStyles: StylesConfig<IMyOptionsSelectType, IsMulti> = {
  control: (provided, state) => {
    return {
      ...provided,
      backgroundColor: state.isDisabled ? "#dddddd" : "#ffffff",
      color: state.isDisabled ? "#333333" : "000000",
      fontSize: "small",
    };
  },
  option: (provided, state) => {
    return {
      ...provided,
      backgroundColor: state.isDisabled ? "#dddddd" : "#ffffff",
      color: state.isDisabled ? "#333333" : "000000",
      fontSize: "small",
    };
  },
  singleValue: (provided, state) => {
    return {
      ...provided,
      backgroundColor: state.isDisabled ? "#dddddd" : "#ffffff",
      color: state.isDisabled ? "#333333" : "000000",
      fontSize: "small",
    };
  },
};

const optionsLevel: IMyOptionsSelectType[] = [
  { value: "admin", label: "Administrador" },
  { value: "partner", label: "Parceiro" },
  { value: "customer", label: "Cliente" },
];

const optionsRegistered: IMyOptionsSelectType[] = [
  { value: "sim", label: "sim" },
  { value: "não", label: "não" },
];

interface IEditUserProps {
  show: boolean;
}

const EditUser = ({ show }: IEditUserProps) => {
  const { userSelected, handleSelectUser, toggleOperation } = useUser();

  const [name, setName] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [level, setLevel] = useState({ value: "customer", label: "cliente" });
  const [registered, setRegistered] = useState({ value: "não", label: "não" });
  const [expiresRegister, setExpiresRegister] = useState<Date>(new Date());

  useEffect(() => {
    if (userSelected) {
      setName(userSelected.name);
      setRg(userSelected.rg.toString());
      setEmail(userSelected.email);
      setLevel({
        value: userSelected.level,
        label:
          userSelected.level === "customer"
            ? "cliente"
            : userSelected.level === "partner"
            ? "parceiro"
            : "administrador",
      });
      setRegistered({
        value: userSelected.registered ? "sim" : "não",
        label: userSelected.registered ? "sim" : "não",
      });
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

  const handleChangeLevel = (event: any) => {
    setLevel(event);
  };

  const handleChangeRegistered = (event: any) => {
    console.log("passou no change registered", event);
    setRegistered(event);
  };

  const handleChangeExpiresRegister = (e: any) => {
    setExpiresRegister(new Date(e.target.value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("valor do level", level);
  };

  return (
    <Container show={show}>
      <Form onSubmit={handleSubmit}>
        <h3>Detalhes do usuário</h3>
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
          <Select
            id="level"
            className="select"
            styles={customStyles}
            defaultValue={level}
            options={optionsLevel}
            onChange={handleChangeLevel}
          />
        </RowForm>
        <RowForm>
          <label htmlFor="registered">Registrado:</label>
          <Select
            id="registered"
            className="select"
            styles={customStyles}
            isClearable={false}
            defaultValue={registered}
            options={optionsRegistered}
            onChange={handleChangeRegistered}
          />
        </RowForm>
        {registered && (
          <RowForm>
            <label htmlFor="expiresRegister">Vencimento do Registro:</label>
            <input
              id="expiresRegister"
              type="datetime-local"
              value={expiresRegister.toString().substring(0, 16)}
              onChange={(e) => handleChangeExpiresRegister(e)}
            />
          </RowForm>
        )}

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
