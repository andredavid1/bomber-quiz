import { useEffect, useState } from "react";

import { IAnswerDTO } from "dtos/IAnswerDTO";
import { IDisciplineDTO } from "dtos/IDisciplineDTO";
import useDiscipline from "hooks/useDiscipline";
import useQuestion from "hooks/useQuestion";

import {
  AnswerRow,
  AnswersContainer,
  Container,
  Form,
  RowForm,
} from "./styles";

const clearAnswer: IAnswerDTO = { _id: "", value: "", correct: false };

interface IDetailsQuestionProps {
  show: boolean;
}

const DetailsQuestion = ({ show }: IDetailsQuestionProps) => {
  const { disciplines, listDisciplines } = useDiscipline();
  const { questionSelected, handleSelectQuestion, toggleOperation } =
    useQuestion();

  const [discipline, setDiscipline] = useState<IDisciplineDTO | null>(null);
  const [statement, setStatement] = useState<string>("");
  const [answer1, setAnswer1] = useState<IAnswerDTO>(clearAnswer);
  const [answer2, setAnswer2] = useState<IAnswerDTO>(clearAnswer);
  const [answer3, setAnswer3] = useState<IAnswerDTO>(clearAnswer);
  const [answer4, setAnswer4] = useState<IAnswerDTO>(clearAnswer);

  useEffect(() => {
    listDisciplines({ field: "name", order: "asc" });

    if (questionSelected) {
      setDiscipline(questionSelected.discipline);
      setStatement(questionSelected.statement);
      setAnswer1(questionSelected.answers[0]);
      setAnswer2(questionSelected.answers[1]);
      setAnswer3(questionSelected.answers[2]);
      setAnswer4(questionSelected.answers[3]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionSelected]);

  const handleCancel = () => {
    handleSelectQuestion(null);
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
        <h3>Detalhes da questão</h3>

        <RowForm>
          <label htmlFor="id">Código:</label>
          <input type="text" id="id" disabled value={questionSelected?._id} />
        </RowForm>

        <RowForm>
          <label htmlFor="discipline">Matéria:</label>
          <select
            id="discipline"
            disabled
            value={!discipline ? "" : discipline._id}
          >
            <option value="">Selecione a matéria</option>
            {disciplines?.map((discipline) => (
              <option key={discipline._id} value={discipline._id}>
                {discipline.name}
              </option>
            ))}
          </select>
        </RowForm>

        <RowForm>
          <label htmlFor="statement">Enunciado:</label>
          <input type="text" id="statement" disabled value={statement} />
        </RowForm>

        <AnswersContainer>
          <legend>Respostas</legend>
          <AnswerRow>
            <label htmlFor="answer1">a)</label>
            <input id="answer1" type="text" disabled value={answer1.value} />
            <select
              id="correct1"
              disabled
              value={answer1.correct ? "right" : "wrong"}
            >
              <option value="right">Certa</option>
              <option value="wrong">Errada</option>
            </select>
          </AnswerRow>

          <AnswerRow>
            <label htmlFor="answer2">b)</label>
            <input id="answer2" type="text" disabled value={answer2.value} />
            <select
              id="correct2"
              disabled
              value={answer2.correct ? "right" : "wrong"}
            >
              <option value="right">Certa</option>
              <option value="wrong">Errada</option>
            </select>
          </AnswerRow>

          <AnswerRow>
            <label htmlFor="answer3">c)</label>
            <input id="answer3" type="text" disabled value={answer3.value} />
            <select
              id="correct3"
              disabled
              value={answer3.correct ? "right" : "wrong"}
            >
              <option value="right">Certa</option>
              <option value="wrong">Errada</option>
            </select>
          </AnswerRow>

          <AnswerRow>
            <label htmlFor="answer4">d)</label>
            <input id="answer4" type="text" disabled value={answer4.value} />
            <select
              id="correct4"
              disabled
              value={answer4.correct ? "right" : "wrong"}
            >
              <option value="right">Certa</option>
              <option value="wrong">Errada</option>
            </select>
          </AnswerRow>
        </AnswersContainer>

        <RowForm className="buttons">
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

export default DetailsQuestion;
