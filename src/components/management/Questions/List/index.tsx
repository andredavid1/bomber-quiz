import { useEffect, useState } from "react";
import {
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiList,
  FiTrash2,
} from "react-icons/fi";

import Pagination from "components/Pagination";
import { IQuestionDTO } from "dtos/IQuestionDTO";
import useConfig from "hooks/useConfig";
import useQuestion from "hooks/useQuestion";

import { Container } from "./styles";
import QuestionsActions from "../Actions";

interface IListQuestionsProps {
  show: boolean;
}

const ListQuestions = ({ show }: IListQuestionsProps) => {
  const { toggleLoading } = useConfig();
  const {
    questions,
    operation,
    order,
    handleSelectQuestion,
    toggleOperation,
    toggleOrder,
  } = useQuestion();

  const [pages, setPages] = useState<number>(0);
  const [pageSelected, setPageSelected] = useState<number>(1);
  const [questionsView, setQuestionsView] = useState<IQuestionDTO[] | null>(
    null
  );

  const maxRowsPerPage = process.env.NEXT_PUBLIC_MAX_ROW_PER_PAGES
    ? parseInt(process.env.NEXT_PUBLIC_MAX_ROW_PER_PAGES.toString())
    : 10;

  useEffect(() => {
    const pages = Math.ceil(questions ? questions.length / maxRowsPerPage : 1);

    setPages(pages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSelected]);

  useEffect(() => {
    toggleLoading(true);
    const inicio = (pageSelected - 1) * maxRowsPerPage;
    const final = pageSelected * maxRowsPerPage;

    setQuestionsView(questions ? questions.slice(inicio, final) : null);

    toggleLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSelected, questions]);

  const handleOrder = (field: string) => {
    toggleOrder(field);
    setPageSelected(1);
  };

  const handlePageSelected = (page: number) => {
    setPageSelected(page);
  };

  const handleDetails = (question: IQuestionDTO) => {
    handleSelectQuestion(question);
    toggleOperation("details");
  };

  const handleEdit = (question: IQuestionDTO) => {
    handleSelectQuestion(question);
    toggleOperation("edit");
  };

  const handleDelete = (question: IQuestionDTO) => {
    handleSelectQuestion(question);
    toggleOperation("delete");
  };

  return (
    <Container show={show}>
      <QuestionsActions show={operation === "list"} />
      <table>
        <thead>
          <tr>
            <th>
              <button
                style={{
                  textDecoration:
                    order.field === "discipline.name" ? "underline" : "none",
                }}
                onClick={() => handleOrder("discipline.name")}
              >
                Nome{" "}
                {order.field === "discipline.name" ? (
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
                  textDecoration:
                    order.field === "statement" ? "underline" : "none",
                }}
                onClick={() => handleOrder("statement")}
              >
                Nome{" "}
                {order.field === "statement" ? (
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
          {questionsView && questionsView.length > 0 ? (
            questionsView.map((question) => {
              return (
                <tr key={question._id}>
                  <td>{question.discipline.name}</td>

                  <td className="bigger">{question.statement}</td>

                  <td className="actions">
                    <button onClick={() => handleDetails(question)}>
                      <FiList />
                    </button>
                    <button onClick={() => handleEdit(question)}>
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(question)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td className="center" colSpan={3}>
                Nenhuma questão foi encontrada.
              </td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
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

export default ListQuestions;
