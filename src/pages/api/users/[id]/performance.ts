import { IQuizDTO } from "dtos/IQuizDTO";
import { IUserDTO } from "dtos/IUserDTO";
import AppError from "erros/AppError";
import { connectDB } from "lib/mongodb";
import Quiz from "models/Quiz";
import User from "models/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        await connectDB();

        const user: IUserDTO = await User.findById(id).exec();

        if (!user) {
          throw new AppError("Usuário não encontrado.", 404);
        }

        const performance: IQuizDTO[] = await Quiz.find({
          userId: user._id,
        }).exec();

        let quizAnswered = 0;
        let averageSum = 0;
        let qtdQuestionVeryEasy = 0;
        let qtdQuestionVeryEasyRight = 0;
        let qtdQuestionEasy = 0;
        let qtdQuestionEasyRight = 0;
        let qtdQuestionMedium = 0;
        let qtdQuestionMediumRight = 0;
        let qtdQuestionHard = 0;
        let qtdQuestionHardRight = 0;
        let qtdQuestionVeryHard = 0;
        let qtdQuestionVeryHardRight = 0;

        if (performance) {
          performance.map((quiz, index) => {
            quizAnswered = quizAnswered + 1;
            averageSum = averageSum + quiz.average;
          });
        }

        res.status(201).json({
          success: true,
          performance: {
            quizAnswered,
            average: quizAnswered > 0 ? averageSum / quizAnswered : 0,
          },
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
