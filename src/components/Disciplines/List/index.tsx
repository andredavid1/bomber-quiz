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

import { IDisciplineDTO } from "dtos/IDisciplineDTO";
import useConfig from "hooks/useConfig";
import useDiscipline from "hooks/useDiscipline";

import { Container } from "./styles";

interface IListDisciplineProps {
  show: boolean;
}

const ListDiscipline = ({ show }: IListDisciplineProps) => {
  const {
    disciplines,
    order,
    handleSelectDiscipline,
    toggleOperation,
    toggleOrder,
  } = useDiscipline();
  const { toggleLoading } = useConfig();

  const [pages, setPages] = useState<number>(0);
  const [pageSelected, setPageSelected] = useState<number>(0);
  const [disciplinesView, setDisciplinesView] = useState<IDisciplineDTO[]>([]);

  const maxRowsPage = 2;

  useEffect(() => {
    toggleLoading(true);
    toggleOperation("list");

    const pages = Math.ceil(disciplines.length / maxRowsPage);

    setPages(pages);
    setPageSelected(1);
    toggleLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    pagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSelected, disciplines]);

  const handleOrder = (field: string) => {
    toggleOrder(field);
    setPageSelected(1);
  };

  const pagination = () => {
    const inicio = (pageSelected - 1) * maxRowsPage;
    const final = pageSelected * maxRowsPage;

    setDisciplinesView(disciplines.slice(inicio, final));
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
          {disciplinesView.length > 0 ? (
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

export default ListDiscipline;
