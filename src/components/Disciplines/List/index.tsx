import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiList,
  FiTrash2,
} from "react-icons/fi";

import Pagination from "components/Pagination";
import { IDisciplineDTO } from "dtos/IDisciplineDTO";
import useConfig from "hooks/useConfig";
import useDiscipline from "hooks/useDiscipline";

import { Container } from "./styles";
import { toast } from "react-toastify";

interface IListDisciplineProps {
  show: boolean;
}

const ListDiscipline = ({ show }: IListDisciplineProps) => {
  const { toggleLoading } = useConfig();
  const {
    disciplines,
    order,
    handleSelectDiscipline,
    toggleOperation,
    toggleOrder,
  } = useDiscipline();

  const [pages, setPages] = useState<number>(0);
  const [pageSelected, setPageSelected] = useState<number>(1);
  const [disciplinesView, setDisciplinesView] = useState<
    IDisciplineDTO[] | null
  >(null);

  const maxRowsPerPage = process.env.NEXT_PUBLIC_MAX_ROW_PER_PAGES
    ? parseInt(process.env.NEXT_PUBLIC_MAX_ROW_PER_PAGES.toString())
    : 10;

  useEffect(() => {
    const pages = Math.ceil(
      disciplines ? disciplines.length / maxRowsPerPage : 1
    );

    setPages(pages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSelected]);

  useEffect(() => {
    toggleLoading(true);
    const inicio = (pageSelected - 1) * maxRowsPerPage;
    const final = pageSelected * maxRowsPerPage;

    setDisciplinesView(disciplines ? disciplines.slice(inicio, final) : null);

    toggleLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSelected, disciplines]);

  const handleOrder = (field: string) => {
    toggleOrder(field);
    setPageSelected(1);
  };

  const handlePageSelected = (page: number) => {
    setPageSelected(page);
  };

  const handleDetails = (discipline: IDisciplineDTO) => {
    handleSelectDiscipline(discipline);
    toggleOperation("details");
  };

  const handleEdit = (discipline: IDisciplineDTO) => {
    handleSelectDiscipline(discipline);
    toggleOperation("edit");
  };

  const handleDelete = (discipline: IDisciplineDTO) => {
    handleSelectDiscipline(discipline);
    toggleOperation("delete");
  };

  return (
    <Container show={show}>
      <table>
        <thead>
          <tr>
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

            <th className="actions">Ações</th>
          </tr>
        </thead>
        <tbody>
          {disciplinesView && disciplinesView.length > 0 ? (
            disciplinesView.map((discipline) => {
              return (
                <tr key={discipline._id}>
                  <td className="bigger">{discipline.name}</td>

                  <td className="actions">
                    <button onClick={() => handleDetails(discipline)}>
                      <FiList />
                    </button>
                    <button onClick={() => handleEdit(discipline)}>
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(discipline)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="center" colSpan={2}>
                Nenhuma matéria foi encontrada.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={2}>
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

export default ListDiscipline;
