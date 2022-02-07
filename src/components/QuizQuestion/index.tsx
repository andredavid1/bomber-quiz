import { IAnswerDTO } from "dtos/IAnswerDTO";
import useQuestion from "hooks/useQuestion";
import useQuiz from "hooks/useQuiz";
import Answer from "models/Answer";
import router from "next/router";
import { useEffect, useState } from "react";
import {
  AnswerQuizContainer,
  AnswerRow,
  AnswersContainer,
  Container,
  QuestionContainer,
  QuizActions,
  Statement,
} from "./styles";

const QuizQuestion = () => {
  const { quizSelected, toRespond, finishQuiz } = useQuiz();
  const { handleSelectQuestionById, questionSelected } = useQuestion();
  const [questionOrder, setQuestionOrder] = useState<number>(0);
  const [answer, setAnswer] = useState<string>("");

  useEffect(() => {
    if (quizSelected) {
      handleSelectQuestionById(quizSelected.questions[questionOrder].id);
      console.log(questionSelected);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionOrder, quizSelected]);

  const handleAnswerSelect = async (
    optionSelected: string,
    answerId: string
  ) => {
    if (quizSelected) {
      setAnswer(answer === optionSelected ? "" : optionSelected);
      await toRespond(
        quizSelected,
        questionOrder,
        answerId,
        answer === optionSelected ? "" : optionSelected
      );
    }
  };

  const toggleOrder = (questionOrder: number, questionSelected: string) => {
    setAnswer(questionSelected);
    setQuestionOrder(questionOrder);
  };

  const previousQuestion = () => {
    if (quizSelected) {
      toggleOrder(
        questionOrder - 1,
        quizSelected.questions[questionOrder - 1].answered
      );
    }
  };

  const nextQuestion = () => {
    if (quizSelected) {
      toggleOrder(
        questionOrder + 1,
        quizSelected.questions[questionOrder + 1].answered
      );
    }
  };

  const handleFinishQuiz = () => {
    toggleOrder(0, "");
    finishQuiz();
  };

  const handleExit = () => {
    router.push("/");
  };

  return (
    <Container>
      <QuestionContainer>
        <div>{questionSelected?.discipline.name}</div>
        <Statement>{questionSelected?.statement}</Statement>
        {questionSelected && (
          <AnswersContainer>
            <AnswerRow
              className={`${answer === "A" && "selected"}`}
              onClick={() =>
                handleAnswerSelect("A", questionSelected.answers[0]._id)
              }
            >
              <span className={`option ${answer === "A" && "selected"}`}>
                A
              </span>
              <span className="value">
                {questionSelected?.answers[0].value}
              </span>
            </AnswerRow>
            <AnswerRow
              className={`${answer === "B" && "selected"}`}
              onClick={() =>
                handleAnswerSelect("B", questionSelected.answers[1]._id)
              }
            >
              <span className={`option ${answer === "B" && "selected"}`}>
                B
              </span>
              <span className="value">
                {questionSelected?.answers[1].value}
              </span>
            </AnswerRow>
            <AnswerRow
              className={`${answer === "C" && "selected"}`}
              onClick={() =>
                handleAnswerSelect("C", questionSelected.answers[2]._id)
              }
            >
              <span className={`option ${answer === "C" && "selected"}`}>
                C
              </span>
              <span className="value">
                {questionSelected?.answers[2].value}
              </span>
            </AnswerRow>
            <AnswerRow
              className={`${answer === "D" && "selected"}`}
              onClick={() =>
                handleAnswerSelect("D", questionSelected.answers[3]._id)
              }
            >
              <span className={`option ${answer === "D" && "selected"}`}>
                D
              </span>
              <span className="value">
                {questionSelected?.answers[3].value}
              </span>
            </AnswerRow>
          </AnswersContainer>
        )}
        <QuizActions>
          <button
            type="button"
            disabled={questionOrder <= 0}
            onClick={() => previousQuestion()}
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
            onClick={() => nextQuestion()}
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
          quizSelected.questions.map((question) => (
            <div
              className="row"
              key={question.id}
              onClick={() => toggleOrder(question.order - 1, question.answered)}
            >
              <div
                className={`number ${
                  questionOrder + 1 === question.order && "selected"
                }`}
              >
                {question.order}
              </div>
              <div
                className={`option ${question.answered === "A" && "selected"}`}
              ></div>
              <div
                className={`option ${question.answered === "B" && "selected"}`}
              ></div>
              <div
                className={`option ${question.answered === "C" && "selected"}`}
              ></div>
              <div
                className={`option ${question.answered === "D" && "selected"}`}
              ></div>
            </div>
          ))}
      </AnswerQuizContainer>
    </Container>
  );
};

export default QuizQuestion;
