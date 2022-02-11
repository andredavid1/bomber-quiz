import { NextApiRequest, NextApiResponse } from "next";

import { IQuizDTO } from "dtos/IQuizDTO";
import AppError from "errors/AppError";
import { connectDB } from "lib/mongodb";
import Quiz from "models/Quiz";

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

        const quiz = await Quiz.findByIdAndUpdate(id, req.body, {
          new: true,
        })
          .populate({ path: "questions", model: "Question" })
          .populate({ path: "questions.answers", model: "Answer" })
          .exec();

        if (!quiz) {
          throw new AppError("Não foi possível finalizar o quiz.");
        }

        res.status(201).json({
          success: true,
          quiz,
        });
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
