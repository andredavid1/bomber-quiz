import { NextApiRequest, NextApiResponse } from "next";

import { IQuestionDTO } from "dtos/IQuestionDTO";
import { IQuizDTO } from "dtos/IQuizDTO";
import AppError from "errors/AppError";
import { connectDB } from "lib/mongodb";
import Discipline from "models/Discipline";
import Question from "models/Question";
import Quiz from "models/Quiz";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        await connectDB();

        const quiz: IQuizDTO = await Quiz.findById(id).exec();

        if (!quiz) {
          throw new AppError("Quiz não encontrado.", 404);
        }

        res.status(201).json({ success: true, quiz });
      } catch (err) {
        if (err instanceof AppError) {
          res
            .status(err.statusCode)
            .json({ success: false, errorMessage: err.message });
        } else {
          res.status(500).json({
            success: false,
            errorMessage: "Erro na conexão com o servidor.",
          });
        }
      }

      break;

    case "PATCH":
      try {
        await connectDB();

        const { quizId, questionOrder, answerId, option } = req.body;

        const quizToUpdate: IQuizDTO = await Quiz.findById(quizId).exec();

        if (!quizToUpdate) {
          throw new AppError("Questionário não encontrado.", 404);
        }

        const question: IQuestionDTO = await Question.findById(
          quizToUpdate.questions[questionOrder]._id
        )
          .populate("answers")
          .exec();

        const checkAnswer = question.answers.find(
          (answer) => answer._id == answerId
        );

        quizToUpdate.complementQuestionsQuiz[questionOrder].questionRight =
          checkAnswer && checkAnswer.correct && option !== "" ? true : false;

        quizToUpdate.complementQuestionsQuiz[
          questionOrder
        ].selectedAnswerOption = option;

        const questionToUpdate: IQuestionDTO = await Question.findById(
          quizToUpdate.questions[questionOrder]._id
        ).exec();

        if (!questionToUpdate) {
          throw new AppError("Questão não encontrada.", 404);
        }

        const quiz = await Quiz.findByIdAndUpdate(
          quizId,
          {
            ...quizToUpdate,
          },
          {
            new: true,
          }
        )
          .populate({ path: "questions", model: "Question" })
          .populate({ path: "questions.answers", model: "Answer" })
          .exec();

        questionToUpdate.qtdAnswers = questionToUpdate.qtdAnswers + 1;

        questionToUpdate.qtdCorrectAnswers = quizToUpdate
          .complementQuestionsQuiz[questionOrder].questionRight
          ? questionToUpdate.qtdCorrectAnswers + 1
          : questionToUpdate.qtdCorrectAnswers;

        if (
          (questionToUpdate.qtdCorrectAnswers / questionToUpdate.qtdAnswers) *
            100 <=
          20
        ) {
          questionToUpdate.difficult = "veryHard";
        } else if (
          (questionToUpdate.qtdCorrectAnswers / questionToUpdate.qtdAnswers) *
            100 >
            20 &&
          (questionToUpdate.qtdCorrectAnswers / questionToUpdate.qtdAnswers) *
            100 <=
            40
        ) {
          questionToUpdate.difficult = "hard";
        } else if (
          (questionToUpdate.qtdCorrectAnswers / questionToUpdate.qtdAnswers) *
            100 >
            40 &&
          (questionToUpdate.qtdCorrectAnswers / questionToUpdate.qtdAnswers) *
            100 <=
            60
        ) {
          questionToUpdate.difficult = "medium";
        } else if (
          (questionToUpdate.qtdCorrectAnswers / questionToUpdate.qtdAnswers) *
            100 >
            60 &&
          (questionToUpdate.qtdCorrectAnswers / questionToUpdate.qtdAnswers) *
            100 <=
            80
        ) {
          questionToUpdate.difficult = "easy";
        } else {
          questionToUpdate.difficult = "veryEasy";
        }

        await Question.findByIdAndUpdate(
          questionToUpdate._id,
          {
            ...questionToUpdate,
          },
          {
            new: true,
          }
        ).exec();

        res.status(201).json({ success: true, quiz });
      } catch (err) {
        if (err instanceof AppError) {
          res
            .status(err.statusCode)
            .json({ success: false, errorMessage: err.message });
        } else {
          res.status(500).json({
            success: false,
            errorMessage: "Erro na conexão com o servidor.",
          });
        }
      }

      break;

    case "DELETE":
      try {
        await connectDB();

        const discipline = await Discipline.findByIdAndDelete(id).exec();

        if (!discipline) {
          throw new AppError("Matéria não encontrada.", 404);
        }

        res.status(200).json({ success: true });
      } catch (err: any) {
        if (err instanceof AppError) {
          res
            .status(err.statusCode)
            .json({ success: false, errorMessage: err.message });
        } else {
          res.status(500).json({
            success: false,
            errorMessage: "Erro na conexão com o servidor.",
          });
        }
      }
      break;

    default:
      res
        .status(405)
        .json({ success: false, errorMessage: "Método não suportado." });
      break;
  }
};

export default handler;
