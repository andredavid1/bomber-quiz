import { NextApiRequest, NextApiResponse } from "next";

import AppError from "erros/AppError";
import { connectDB } from "lib/mongodb";
import Quiz from "models/Quiz";
import { IQuizDTO } from "dtos/IQuizDTO";
import Question from "models/Question";
import { IQuestionDTO } from "dtos/IQuestionDTO";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "PATCH":
      try {
        await connectDB();

        const quizToUpdate: IQuizDTO = await Quiz.findById(id)
          .populate("questions")
          .exec();

        if (!quizToUpdate) {
          throw new AppError("Questionário não encontrado.", 404);
        }

        const qtdQuestions = quizToUpdate.questions.length;
        let qtdAnswersCorrects = 0;

        quizToUpdate.questions.map((question) => {
          qtdAnswersCorrects = question.correct
            ? qtdAnswersCorrects + 1
            : qtdAnswersCorrects;
        });

        const average = (qtdAnswersCorrects / qtdQuestions) * 100;

        quizToUpdate.average = average;
        quizToUpdate.finished = true;

        const quiz = await Quiz.findByIdAndUpdate(
          id,
          {
            ...quizToUpdate,
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

    default:
      res
        .status(405)
        .json({ success: false, errorMessage: "Método não suportado." });
      break;
  }
};

export default handler;
