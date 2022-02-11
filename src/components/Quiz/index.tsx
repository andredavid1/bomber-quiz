import useQuiz from "hooks/useQuiz";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AnswerQuizContainer,
  AnswerRow,
  AnswersContainer,
  Container,
  Discipline,
  QuestionContainer,
  QuizActions,
  Statement,
} from "./styles";
import { IQuizDTO } from "dtos/IQuizDTO";
import Questions from "pages/questoes";
import { FiCheck, FiX } from "react-icons/fi";

const QuizContent = () => {
  const router = useRouter();
  const { quiz, finishQuiz } = useQuiz();

  const [quizSelected, setQuizSelected] = useState<IQuizDTO | null>(null);
  const [questionOrder, setQuestionOrder] = useState<number>(0);
  const [selectedAnswerOption, setSelectedAnswerOption] = useState<string>("");

  useEffect(() => {
    if (quiz) {
      setQuizSelected(quiz);
    }
  }, [quiz]);

  const toggleOrder = (questionOrder: number, answerSelected: string) => {
    setSelectedAnswerOption(answerSelected);
    setQuestionOrder(questionOrder);
  };

  const toggleToPreviousQuestion = () => {
    if (quizSelected) {
      toggleOrder(
        questionOrder - 1,
        quizSelected.complementQuestionsQuiz[questionOrder - 1]
          .selectedAnswerOption
      );
    }
  };

  const toggleToNextQuestion = () => {
    if (quizSelected) {
      toggleOrder(
        questionOrder + 1,
        quizSelected.complementQuestionsQuiz[questionOrder + 1]
          .selectedAnswerOption
      );
    }
  };

  const handleSelectAnswer = (optionSelected: string, answerId: string) => {
    let quizToUpdate: IQuizDTO | null = quizSelected;

    if (quizToUpdate) {
      const checkAnswer = quizToUpdate.questions[questionOrder].answers.find(
        (answer) => answer._id === answerId
      );

      quizToUpdate.complementQuestionsQuiz[questionOrder] = {
        ...quizToUpdate.complementQuestionsQuiz[questionOrder],
        selectedAnswerOption: optionSelected,
        questionRight: checkAnswer && checkAnswer.correct ? true : false,
      };
    }

    setSelectedAnswerOption(optionSelected);
    setQuizSelected(quizToUpdate);
  };

  const handleFinishQuiz = async () => {
    if (quizSelected) {
      const qtdQuestions = quizSelected.questions.length;
      let qtdAnswersCorrects = 0;

      quizSelected.complementQuestionsQuiz.map((question) => {
        qtdAnswersCorrects = question.questionRight
          ? qtdAnswersCorrects + 1
          : qtdAnswersCorrects;
      });

      const average = (qtdAnswersCorrects / qtdQuestions) * 10;

      const quizToUpdate = {
        ...quizSelected,
        finished: true,
        average,
      };

      await finishQuiz(quizToUpdate);
      setQuizSelected(quizToUpdate);
      setQuestionOrder(0);
      setSelectedAnswerOption(
        quizSelected?.complementQuestionsQuiz[0].selectedAnswerOption
      );
    }
  };

  const handleExit = () => {
    //setar quiz no contexto como null
    router.push("/");
  };

  return (
    <Container>
      <QuestionContainer>
        <Discipline>
          {quizSelected?.questions[questionOrder].discipline.name}
        </Discipline>
        <Statement>
          {quizSelected?.questions[questionOrder].statement}
        </Statement>
        {quizSelected && (
          <AnswersContainer>
            <AnswerRow
              disabled={quizSelected.finished}
              className={`${
                !quizSelected.finished && selectedAnswerOption === "A"
                  ? "selected"
                  : quizSelected.finished &&
                    quizSelected.questions[questionOrder].answers[0].correct
                  ? "success"
                  : quizSelected.finished &&
                    !quizSelected.questions[questionOrder].answers[0].correct &&
                    selectedAnswerOption === "A"
                  ? "danger"
                  : null
              }`}
              onClick={() =>
                handleSelectAnswer(
                  "A",
                  quizSelected.questions[questionOrder].answers[0]._id
                )
              }
            >
              <span
                className={`option ${
                  !quizSelected.finished && selectedAnswerOption === "A"
                    ? "selected"
                    : quizSelected.finished &&
                      quizSelected.questions[questionOrder].answers[0].correct
                    ? "success"
                    : quizSelected.finished &&
                      !quizSelected.questions[questionOrder].answers[0]
                        .correct &&
                      selectedAnswerOption === "A"
                    ? "danger"
                    : null
                }`}
              >
                A
              </span>
              <span className={`value ${quizSelected.finished && "finished"}`}>
                {quizSelected.questions[questionOrder].answers[0].value}
                {quizSelected.questions[questionOrder].answers[0].correct ? (
                  <FiCheck className="success" />
                ) : (
                  <FiX className="danger" />
                )}
              </span>
            </AnswerRow>
            <AnswerRow
              disabled={quizSelected.finished}
              className={`${
                !quizSelected.finished && selectedAnswerOption === "B"
                  ? "selected"
                  : quizSelected.finished &&
                    quizSelected.questions[questionOrder].answers[1].correct
                  ? "success"
                  : quizSelected.finished &&
                    !quizSelected.questions[questionOrder].answers[1].correct &&
                    selectedAnswerOption === "B"
                  ? "danger"
                  : null
              }`}
              onClick={() =>
                handleSelectAnswer(
                  "B",
                  quizSelected.questions[questionOrder].answers[1]._id
                )
              }
            >
              <span
                className={`option ${
                  !quizSelected.finished && selectedAnswerOption === "B"
                    ? "selected"
                    : quizSelected.finished &&
                      quizSelected.questions[questionOrder].answers[1].correct
                    ? "success"
                    : quizSelected.finished &&
                      !quizSelected.questions[questionOrder].answers[1]
                        .correct &&
                      selectedAnswerOption === "B"
                    ? "danger"
                    : null
                }`}
              >
                B
              </span>
              <span className={`value ${quizSelected.finished && "finished"}`}>
                {quizSelected.questions[questionOrder].answers[1].value}
                {quizSelected.questions[questionOrder].answers[1].correct ? (
                  <FiCheck className="success" />
                ) : (
                  <FiX className="danger" />
                )}
              </span>
            </AnswerRow>
            <AnswerRow
              disabled={quizSelected.finished}
              className={`${
                !quizSelected.finished && selectedAnswerOption === "C"
                  ? "selected"
                  : quizSelected.finished &&
                    quizSelected.questions[questionOrder].answers[2].correct
                  ? "success"
                  : quizSelected.finished &&
                    !quizSelected.questions[questionOrder].answers[2].correct &&
                    selectedAnswerOption === "C"
                  ? "danger"
                  : null
              }`}
              onClick={() =>
                handleSelectAnswer(
                  "C",
                  quizSelected.questions[questionOrder].answers[2]._id
                )
              }
            >
              <span
                className={`option ${
                  !quizSelected.finished && selectedAnswerOption === "C"
                    ? "selected"
                    : quizSelected.finished &&
                      quizSelected.questions[questionOrder].answers[2].correct
                    ? "success"
                    : quizSelected.finished &&
                      !quizSelected.questions[questionOrder].answers[2]
                        .correct &&
                      selectedAnswerOption === "C"
                    ? "danger"
                    : null
                }`}
              >
                C
              </span>
              <span className={`value ${quizSelected.finished && "finished"}`}>
                {quizSelected.questions[questionOrder].answers[2].value}
                {quizSelected.questions[questionOrder].answers[2].correct ? (
                  <FiCheck className="success" />
                ) : (
                  <FiX className="danger" />
                )}
              </span>
            </AnswerRow>
            <AnswerRow
              disabled={quizSelected.finished}
              className={`${
                !quizSelected.finished && selectedAnswerOption === "D"
                  ? "selected"
                  : quizSelected.finished &&
                    quizSelected.questions[questionOrder].answers[3].correct
                  ? "success"
                  : quizSelected.finished &&
                    !quizSelected.questions[questionOrder].answers[3].correct &&
                    selectedAnswerOption === "D"
                  ? "danger"
                  : null
              }`}
              onClick={() =>
                handleSelectAnswer(
                  "D",
                  quizSelected.questions[questionOrder].answers[3]._id
                )
              }
            >
              <span
                className={`option ${
                  !quizSelected.finished && selectedAnswerOption === "D"
                    ? "selected"
                    : quizSelected.finished &&
                      quizSelected.questions[questionOrder].answers[3].correct
                    ? "success"
                    : quizSelected.finished &&
                      !quizSelected.questions[questionOrder].answers[3]
                        .correct &&
                      selectedAnswerOption === "D"
                    ? "danger"
                    : null
                }`}
              >
                D
              </span>
              <span className={`value ${quizSelected.finished && "finished"}`}>
                {quizSelected.questions[questionOrder].answers[3].value}
                {quizSelected.questions[questionOrder].answers[3].correct ? (
                  <FiCheck className="success" />
                ) : (
                  <FiX className="danger" />
                )}
              </span>
            </AnswerRow>
          </AnswersContainer>
        )}
        <QuizActions>
          <button
            type="button"
            disabled={questionOrder <= 0}
            onClick={() => toggleToPreviousQuestion()}
          >
            Anterior
          </button>
          {!quizSelected?.finished ? (
            <button type="button" onClick={() => handleFinishQuiz()}>
              Finalizar
            </button>
          ) : (
            <button
              className="success"
              type="button"
              onClick={() => handleExit()}
            >
              Sair
            </button>
          )}
          <button
            type="button"
            disabled={
              quizSelected
                ? questionOrder >= quizSelected.questions.length - 1
                : questionOrder >= 49
            }
            onClick={() => toggleToNextQuestion()}
          >
            Próxima
          </button>
        </QuizActions>
      </QuestionContainer>
      <AnswerQuizContainer>
        <div className="header">
          <div className="headerNumber">&nbsp;</div>
          <div className="headerOption">A</div>
          <div className="headerOption">B</div>
          <div className="headerOption">C</div>
          <div className="headerOption">D</div>
        </div>
        {quizSelected &&
          quizSelected.questions.map((question, index) => (
            <div
              className="row"
              key={question._id}
              onClick={() =>
                toggleOrder(
                  index,
                  quizSelected.complementQuestionsQuiz[index]
                    .selectedAnswerOption
                )
              }
            >
              <div
                className={`number ${questionOrder === index && "selected"}`}
              >
                {index + 1}
              </div>
              <div
                className={`option ${
                  !quizSelected.finished &&
                  quizSelected.complementQuestionsQuiz[index]
                    .selectedAnswerOption === "A"
                    ? "selected"
                    : quizSelected.finished
                    ? quizSelected.complementQuestionsQuiz[index]
                        .selectedAnswerOption === "A" &&
                      quizSelected.questions[index].answers[0].correct
                      ? "success"
                      : quizSelected.complementQuestionsQuiz[index]
                          .selectedAnswerOption === "A" &&
                        !quizSelected.questions[index].answers[0].correct
                      ? "danger"
                      : null
                    : null
                }`}
              ></div>
              <div
                className={`option ${
                  !quizSelected.finished &&
                  quizSelected.complementQuestionsQuiz[index]
                    .selectedAnswerOption === "B"
                    ? "selected"
                    : quizSelected.finished
                    ? quizSelected.complementQuestionsQuiz[index]
                        .selectedAnswerOption === "B" &&
                      quizSelected.questions[index].answers[1].correct
                      ? "success"
                      : quizSelected.complementQuestionsQuiz[index]
                          .selectedAnswerOption === "B" &&
                        !quizSelected.questions[index].answers[1].correct
                      ? "danger"
                      : null
                    : null
                }`}
              ></div>
              <div
                className={`option ${
                  !quizSelected.finished &&
                  quizSelected.complementQuestionsQuiz[index]
                    .selectedAnswerOption === "C"
                    ? "selected"
                    : quizSelected.finished
                    ? quizSelected.complementQuestionsQuiz[index]
                        .selectedAnswerOption === "C" &&
                      quizSelected.questions[index].answers[2].correct
                      ? "success"
                      : quizSelected.complementQuestionsQuiz[index]
                          .selectedAnswerOption === "C" &&
                        !quizSelected.questions[index].answers[2].correct
                      ? "danger"
                      : null
                    : null
                }`}
              ></div>
              <div
                className={`option ${
                  !quizSelected.finished &&
                  quizSelected.complementQuestionsQuiz[index]
                    .selectedAnswerOption === "D"
                    ? "selected"
                    : quizSelected.finished
                    ? quizSelected.complementQuestionsQuiz[index]
                        .selectedAnswerOption === "D" &&
                      quizSelected.questions[index].answers[3].correct
                      ? "success"
                      : quizSelected.complementQuestionsQuiz[index]
                          .selectedAnswerOption === "D" &&
                        !quizSelected.questions[index].answers[3].correct
                      ? "danger"
                      : null
                    : null
                }`}
              ></div>
            </div>
          ))}
      </AnswerQuizContainer>
    </Container>
  );
};

export default QuizContent;
