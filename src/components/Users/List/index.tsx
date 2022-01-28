import { IUserDTO } from "dtos/IUserDTO";
import useUser from "hooks/useUser";
import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiChevronUp,
  FiEdit2,
  FiList,
  FiTrash2,
} from "react-icons/fi";
import { Container } from "./styles";

interface IListUserProps {
  show: boolean;
}

const ListUser = ({ show }: IListUserProps) => {
  const {
    users,
    order,
    listUsers,
    handleSelectUser,
    toggleOperation,
    toggleOrder,
  } = useUser();
  const [usersView, setUsersView] = useState<IUserDTO[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [pageSelected, setPageSelected] = useState<number>(0);

  const maxRowsPage = 2;

  useEffect(() => {
    toggleOperation("list");

    const pages = Math.ceil(users.length / maxRowsPage);

    setPages(pages);
    setPageSelected(1);
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
                    order.field === "email" ? "underline" : "none",
                }}
                onClick={() => handleOrder("email")}
              >
                E-mail{" "}
                {order.field === "email" ? (
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
            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usersView.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.rg}</td>
                <td className="bigger">{user.name}</td>
                <td className="optional">{user.email}</td>
                <td className="optional">
                  {user.level === "admin"
                    ? "administador"
                    : user.level === "partner"
                    ? "parceiro"
                    : "cliente"}
                </td>
                <td className="actions">
                  <button onClick={() => handleDetails(user)}>
                    <FiList />
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
          })}
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
