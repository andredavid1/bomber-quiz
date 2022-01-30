import { IUserDTO } from "dtos/IUserDTO";
import useConfig from "hooks/useConfig";
import useUser from "hooks/useUser";
import router from "next/router";
import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronUp,
  FiDollarSign,
  FiEdit2,
  FiList,
  FiTrash2,
} from "react-icons/fi";
import { Container } from "./styles";

interface IListUserProps {
  show: boolean;
}

const ListUser = ({ show }: IListUserProps) => {
  const { users, order, handleSelectUser, toggleOperation, toggleOrder } =
    useUser();
  const { toggleLoading } = useConfig();

  const [pages, setPages] = useState<number>(0);
  const [pageSelected, setPageSelected] = useState<number>(0);
  const [usersView, setUsersView] = useState<IUserDTO[]>([]);

  const maxRowsPage = 2;

  useEffect(() => {
    toggleLoading(true);
    toggleOperation("list");

    const pages = Math.ceil(users.length / maxRowsPage);

    setPages(pages);
    setPageSelected(1);
    toggleLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSelected, users]);

  const handleOrder = (field: string) => {
    toggleOrder(field);
    setPageSelected(1);
  };

  const pagination = () => {
    const inicio = (pageSelected - 1) * maxRowsPage;
    const final = pageSelected * maxRowsPage;

    setUsersView(users.slice(inicio, final));
  };

  const handleDetails = (user: IUserDTO) => {
    handleSelectUser(user);
    toggleOperation("details");
  };

  const handleSubscribe = (user: IUserDTO) => {
    handleSelectUser(user);
    router.push(`/usuarios/${user._id}/subscribe`);
  };

  const handleEdit = (user: IUserDTO) => {
    handleSelectUser(user);
    toggleOperation("edit");
  };

  const handleDelete = (user: IUserDTO) => {
    handleSelectUser(user);
    toggleOperation("delete");
  };

  return (
    <Container show={show}>
      <table>
        <thead>
          <tr>
            <th>
              <button
                style={{
                  textDecoration: order.field === "rg" ? "underline" : "none",
                }}
                onClick={() => handleOrder("rg")}
              >
                Rg{" "}
                {order.field === "rg" ? (
                  order.order === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )
                ) : null}
              </button>
            </th>
            <th className="bigger">
              <button
                style={{
                  textDecoration: order.field === "name" ? "underline" : "none",
                }}
                onClick={() => handleOrder("name")}
              >
                Nome{" "}
                {order.field === "name" ? (
                  order.order === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )
                ) : null}
              </button>
            </th>

            <th className="optional">
              <button
                style={{
                  textDecoration:
                    order.field === "level" ? "underline" : "none",
                }}
                onClick={() => handleOrder("level")}
              >
                Nível de acesso{" "}
                {order.field === "level" ? (
                  order.order === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )
                ) : null}
              </button>
            </th>
            <th className="optional">
              <button
                style={{
                  textDecoration:
                    order.field === "registered" ? "underline" : "none",
                }}
                onClick={() => handleOrder("registered")}
              >
                Registrado{" "}
                {order.field === "registered" ? (
                  order.order === "asc" ? (
                    <FiChevronUp />
                  ) : (
                    <FiChevronDown />
                  )
                ) : null}
              </button>
            </th>
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usersView.length > 0 ? (
            usersView.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user.rg}</td>
                  <td className="bigger">{user.name}</td>
                  <td className="optional">
                    {user.level === "admin"
                      ? "administador"
                      : user.level === "partner"
                      ? "parceiro"
                      : "cliente"}
                  </td>
                  <td className="optional center">
                    {user.registered ? "sim" : "não"}
                  </td>
                  <td className="actions">
                    <button onClick={() => handleDetails(user)}>
                      <FiList />
                    </button>
                    <button onClick={() => handleSubscribe(user)}>
                      <FiDollarSign />
                    </button>
                    <button onClick={() => handleEdit(user)}>
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(user)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="center" colSpan={5}>
                Nenhum usuário foi encontrado.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <div>
                <button
                  title="primeira página"
                  disabled={pageSelected === 1}
                  onClick={() => setPageSelected(1)}
                >
                  <FiChevronsLeft />
                </button>
                <button
                  title="página anterior"
                  disabled={pageSelected === 1}
                  onClick={() => setPageSelected(pageSelected - 1)}
                >
                  <FiChevronLeft />
                </button>

                <span title="página atual">{pageSelected}</span>

                <button
                  title="próxima página"
                  disabled={pageSelected === pages}
                  onClick={() => setPageSelected(pageSelected + 1)}
                >
                  <FiChevronRight />
                </button>
                <button
                  title="última página"
                  disabled={pageSelected === pages}
                  onClick={() => setPageSelected(pages)}
                >
                  <FiChevronsRight />
                </button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </Container>
  );
};

export default ListUser;
