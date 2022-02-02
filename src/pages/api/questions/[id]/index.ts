import { NextApiRequest, NextApiResponse } from "next";

import { IQuestionDTO } from "dtos/IQuestionDTO";
import AppError from "erros/AppError";
import { connectDB } from "lib/mongodb";
import Discipline from "models/Discipline";
import Question from "models/Question";
import { IAnswerDTO } from "dtos/IAnswerDTO";
import Answer from "models/Answer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        await connectDB();

        const discipline: IQuestionDTO = await Discipline.findById(id).exec();

        if (!discipline) {
          throw new AppError("Matéria não encontrada.", 404);
        }

        res.status(201).json({ success: true, discipline });
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

    case "PUT":
      try {
        await connectDB();

        console.log(req.body);

        const questionToUpdate: IQuestionDTO = await Question.findById(
          id
        ).exec();

        if (!questionToUpdate) {
          throw new AppError("Questão não encontrada.", 404);
        }

        const requiredFields = {
          statement: "enunciado",
        };

        for (const [key, value] of Object.entries(requiredFields)) {
          if (!req.body[key]) {
            throw new AppError(`Preencha o campo ${value}.`, 400);
          }
        }

        const { discipline, statement, difficult, answers } =
          req.body as IQuestionDTO;

        if (!discipline) {
          throw new AppError("Preencha o campo matéria", 400);
        }

        if (!answers || answers.length < 4) {
          throw new AppError("Preencha todas as respostas", 400);
        }

        const questionStatementAlreadyExists: IQuestionDTO =
          await Question.findOne({
            statement,
          }).exec();

        if (
          questionStatementAlreadyExists &&
          questionStatementAlreadyExists._id !== questionToUpdate._id &&
          questionStatementAlreadyExists.discipline._id ===
            questionToUpdate.discipline._id
        ) {
          throw new AppError(
            "Já existe uma questão cadastrada com esse enunciado."
          );
        }

        let answersUpdated: IAnswerDTO[] = [];

        answers.forEach(async (answer) => {
          const updatedAnswer = await Answer.findByIdAndUpdate(
            answer._id,
            answer,
            { new: true }
          ).exec();
          answersUpdated.push(updatedAnswer);
        });

        const data = {
          discipline,
          statement,
          difficult,
          answers: answersUpdated,
        };

        const question = await Question.findByIdAndUpdate(id, data, {
          new: true,
        }).exec();

        res.status(201).json({ success: true, question });
      } catch (err) {
        if (err instanceof AppError) {
          res
            .status(err.statusCode)
            .json({ success: false, errorMessage: err.message });
        } else {
          console.log(err);
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
