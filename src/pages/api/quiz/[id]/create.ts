import { NextApiRequest, NextApiResponse } from "next";

import { IAnswerDTO } from "dtos/IAnswerDTO";
import { IQuestionDTO } from "dtos/IQuestionDTO";
import { IQuizQuestion } from "dtos/IQuizDTO";
import { IUserDTO } from "dtos/IUserDTO";
import AppError from "errors/AppError";
import { connectDB } from "lib/mongodb";
import Question from "models/Question";
import Quiz from "models/Quiz";
import User from "models/User";

function orderAnswers(array: IAnswerDTO[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "POST":
      try {
        await connectDB();

        const user: IUserDTO = await User.findById(id).exec();

        if (!user) {
          throw new AppError("Usuário não encontrado.");
        }

        if (!user.registered) {
          const qtdQuizAnswered = await Quiz.find({
            userId: id,
          }).exec();

          if (qtdQuizAnswered.length >= 2) {
            throw new AppError(
              "Você já utilizou seus dois testes de cortesia. Registre-se e teste os seus conhecimentos."
            );
          }
        }

        const questionsDrawn: IQuestionDTO[] = await Question.aggregate([
          { $sample: { size: 5 } },
        ]);

        const questions: IQuestionDTO[] = await Question.find()
          .populate("discipline")
          .populate({
            path: "answers",
            model: "Answer",
            select: "_id value correct",
          })
          .exec();

        let questionsOrdered: IQuestionDTO[] = [];
        let questionsComplement: IQuizQuestion[] = [];

        questionsDrawn.map((questionDrawn) => {
          questions.map((question) => {
            if (questionDrawn._id.toString() === question._id.toString()) {
              questionsComplement.push({
                levelQuestion: question.difficult,
                questionRight: false,
                selectedAnswerOption: "",
              });

              question.answers = orderAnswers(question.answers);

              questionsOrdered.push(question);
            }
          });
        });

        const data = {
          userId: id.toString(),
          questions: questionsOrdered,
          complementQuestionsQuiz: questionsComplement,
          finished: false,
          average: 0,
        };

        const quiz = new Quiz(data);

        await quiz.save();

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
