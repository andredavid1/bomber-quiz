import Select, { StylesConfig, CSSObjectWithLabel } from "react-select";

import useUser from "hooks/useUser";
import { formatDate } from "utils/formatDate";
import { Container, Form, RowForm } from "./styles";
import { useEffect, useState } from "react";

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

interface IDetailsUserProps {
  show: boolean;
}

const DetailsUser = ({ show }: IDetailsUserProps) => {
  const { userSelected, handleSelectUser, toggleOperation } = useUser();

  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [rg, setRg] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [level, setLevel] = useState({ value: "customer", label: "cliente" });
  const [registered, setRegistered] = useState({ value: "não", label: "não" });
  const [expiresRegister, setExpiresRegister] = useState<Date>(new Date());

  useEffect(() => {
    if (userSelected) {
      setId(userSelected._id);
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
          <Select
            id="level"
            className="select"
            styles={customStyles}
            isDisabled
            defaultValue={level}
            options={optionsLevel}
          />
        </RowForm>
        <RowForm>
          <label htmlFor="registered">Registrado:</label>
          <Select
            id="registered"
            className="select"
            styles={customStyles}
            isDisabled
            isClearable={false}
            defaultValue={registered}
            options={optionsRegistered}
          />
        </RowForm>
        {registered && (
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
