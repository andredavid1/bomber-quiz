import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { IAnswerDTO } from "dtos/IAnswerDTO";
import { IDisciplineDTO } from "dtos/IDisciplineDTO";
import { ICreateQuestionDTO } from "dtos/IQuestionDTO";
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

interface IAddQuestionProps {
  show: boolean;
}

const AddQuestion = ({ show }: IAddQuestionProps) => {
  const { disciplines, listDisciplines } = useDiscipline();
  const { addQuestion, toggleOperation } = useQuestion();

  const [discipline, setDiscipline] = useState<IDisciplineDTO | null>(null);
  const [statement, setStatement] = useState<string>("");
  const [difficult, setDifficult] = useState<
    "veryEasy" | "easy" | "medium" | "hard" | "veryHard"
  >("medium");
  const [answer1, setAnswer1] = useState<IAnswerDTO>(clearAnswer);
  const [answer2, setAnswer2] = useState<IAnswerDTO>(clearAnswer);
  const [answer3, setAnswer3] = useState<IAnswerDTO>(clearAnswer);
  const [answer4, setAnswer4] = useState<IAnswerDTO>(clearAnswer);
  const [answers, setAnswers] = useState<IAnswerDTO[] | null>(null);

  useEffect(() => {
    listDisciplines({ field: "name", order: "asc" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initialState = () => {
    setDiscipline(null);
    setStatement("");
    setDifficult("medium");
    setAnswer1(clearAnswer);
    setAnswer2(clearAnswer);
    setAnswer3(clearAnswer);
    setAnswer4(clearAnswer);
    setAnswers(null);
  };

  const validateData = (): boolean => {
    if (!discipline) {
      toast.error("Preencha o campo matéria.");
      return false;
    }

    if (!statement.trim()) {
      toast.error("Preencha o campo enunciado.");
      return false;
    }

    const correctAnswers =
      (answer1.correct ? 1 : 0) +
      (answer2.correct ? 1 : 0) +
      (answer3.correct ? 1 : 0) +
      (answer4.correct ? 1 : 0);

    if (correctAnswers !== 1) {
      toast.error(
        correctAnswers === 0
          ? "Pelo menos uma resposta precisa estar certa."
          : "Apenas uma resposta certa é permitida."
      );
      return false;
    }

    return true;
  };

  const handleChangeDiscipline = (disciplineId: string) => {
    const discipline: IDisciplineDTO | undefined = disciplines?.find(
      (discipline) => discipline._id === disciplineId
    );

    setDiscipline(discipline || null);
  };

  const handleChangeAnswer = (
    answer: string,
    value: string,
    correct: boolean
  ) => {
    let newAnswers: IAnswerDTO[] = [];

    switch (answer) {
      case "answer1":
        setAnswer1({ ...answer1, value, correct });
        newAnswers = [
          { ...answer1, value, correct },
          answer2,
          answer3,
          answer4,
        ];
        break;

      case "answer2":
        setAnswer2({ ...answer2, value, correct });
        newAnswers = [
          answer1,
          { ...answer2, value, correct },
          answer3,
          answer4,
        ];
        break;

      case "answer3":
        setAnswer3({ ...answer3, value, correct });
        newAnswers = [
          answer1,
          answer2,
          { ...answer3, value, correct },
          answer4,
        ];
        break;

      case "answer4":
        setAnswer4({ ...answer4, value, correct });
        newAnswers = [
          answer1,
          answer2,
          answer3,
          { ...answer4, value, correct },
        ];
        break;
    }
    setAnswers(newAnswers);
  };

  const handleCancel = () => {
    initialState();

    toggleOperation("list");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const isValid = validateData();

    if (!isValid || !discipline || !answers) {
      return;
    }

    const data: ICreateQuestionDTO = {
      discipline,
      statement,
      difficult,
      answers,
      qtdAnswers: 0,
      qtdCorrectAnswers: 0,
    };

    const response = await addQuestion(data);

    if (response.success) {
      initialState();
      toggleOperation("list");
    }
  };

  return (
    <Container show={show}>
      <Form onSubmit={handleSubmit}>
        <h3>Cadastrar nova matéria</h3>

        <RowForm>
          <label htmlFor="discipline">Matéria:</label>
          <select
            id="discipline"
            autoFocus
            tabIndex={1}
            required
            value={!discipline ? "" : discipline._id}
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              handleChangeDiscipline(e.target.value)
            }
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
          <input
            type="text"
            id="statement"
            tabIndex={2}
            required
            value={statement}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setStatement(event.target.value)
            }
          />
        </RowForm>

        <AnswersContainer>
          <legend>Respostas</legend>
          <AnswerRow>
            <label htmlFor="answer1">a)</label>
            <input
              id="answer1"
              type="text"
              tabIndex={3}
              required
              value={answer1.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeAnswer("answer1", e.target.value, answer1.correct)
              }
            />
            <select
              id="correct1"
              tabIndex={4}
              required
              value={answer1.correct ? "right" : "wrong"}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeAnswer(
                  "answer1",
                  answer1.value,
                  e.target.value === "right" ? true : false
                )
              }
            >
              <option value="right">Certa</option>
              <option value="wrong">Errada</option>
            </select>
          </AnswerRow>

          <AnswerRow>
            <label htmlFor="answer2">b)</label>
            <input
              id="answer2"
              type="text"
              tabIndex={5}
              required
              value={answer2.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeAnswer("answer2", e.target.value, answer2.correct)
              }
            />
            <select
              id="correct2"
              tabIndex={6}
              required
              value={answer2.correct ? "right" : "wrong"}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeAnswer(
                  "answer2",
                  answer2.value,
                  e.target.value === "right" ? true : false
                )
              }
            >
              <option value="right">Certa</option>
              <option value="wrong">Errada</option>
            </select>
          </AnswerRow>

          <AnswerRow>
            <label htmlFor="answer3">c)</label>
            <input
              id="answer3"
              type="text"
              tabIndex={7}
              required
              value={answer3.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeAnswer("answer3", e.target.value, answer3.correct)
              }
            />
            <select
              id="correct3"
              tabIndex={8}
              required
              value={answer3.correct ? "right" : "wrong"}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeAnswer(
                  "answer3",
                  answer3.value,
                  e.target.value === "right" ? true : false
                )
              }
            >
              <option value="right">Certa</option>
              <option value="wrong">Errada</option>
            </select>
          </AnswerRow>

          <AnswerRow>
            <label htmlFor="answer4">d)</label>
            <input
              id="answer4"
              type="text"
              tabIndex={9}
              required
              value={answer4.value}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                handleChangeAnswer("answer4", e.target.value, answer4.correct)
              }
            />
            <select
              id="correct4"
              tabIndex={10}
              required
              value={answer4.correct ? "right" : "wrong"}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                handleChangeAnswer(
                  "answer4",
                  answer4.value,
                  e.target.value === "right" ? true : false
                )
              }
            >
              <option value="right">Certa</option>
              <option value="wrong">Errada</option>
            </select>
          </AnswerRow>
        </AnswersContainer>

        <RowForm className="buttons">
          <button
            className="cancel"
            type="button"
            tabIndex={11}
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button className="success" type="submit" tabIndex={12}>
            Salvar
          </button>
        </RowForm>
      </Form>
    </Container>
  );
};

export default AddQuestion;
