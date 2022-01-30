import router from "next/router";
import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiDollarSign,
  FiEdit2,
  FiList,
  FiTrash2,
} from "react-icons/fi";

import Pagination from "components/Pagination";
import { IUserDTO } from "dtos/IUserDTO";
import useConfig from "hooks/useConfig";
import useUser from "hooks/useUser";

import { Container } from "./styles";

interface IListUserProps {
  show: boolean;
}

const ListUser = ({ show }: IListUserProps) => {
  const { toggleLoading } = useConfig();
  const { users, order, handleSelectUser, toggleOperation, toggleOrder } =
    useUser();

  const [pages, setPages] = useState<number>(0);
  const [pageSelected, setPageSelected] = useState<number>(1);
  const [usersView, setUsersView] = useState<IUserDTO[] | null>(null);

  const maxRowsPerPage = process.env.NEXT_PUBLIC_MAX_ROW_PER_PAGES
    ? parseInt(process.env.NEXT_PUBLIC_MAX_ROW_PER_PAGES.toString())
    : 10;

  useEffect(() => {
    const pages = Math.ceil(users ? users.length / maxRowsPerPage : 1);

    setPages(pages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    toggleLoading(true);
    const inicio = (pageSelected - 1) * maxRowsPerPage;
    const final = pageSelected * maxRowsPerPage;

    setUsersView(users ? users.slice(inicio, final) : null);

    toggleLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSelected, users]);

  const handleOrder = (field: string) => {
    toggleOrder(field);
    setPageSelected(1);
  };

  const handlePageSelected = (page: number) => {
    setPageSelected(page);
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
          {usersView && usersView.length > 0 ? (
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
              <Pagination
                pages={pages}
                pageSelected={pageSelected}
                handlePageSelected={handlePageSelected}
              />
            </td>
          </tr>
        </tfoot>
      </table>
    </Container>
  );
};

export default ListUser;
