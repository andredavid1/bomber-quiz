import { NextApiRequest, NextApiResponse } from "next";

import { IAnswerDTO } from "dtos/IAnswerDTO";
import { ICreateQuestionDTO } from "dtos/IQuestionDTO";
import AppError from "errors/AppError";
import { connectDB } from "lib/mongodb";
import Answer from "models/Answer";
import Question from "models/Question";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { field, order } = req.query;

  switch (method) {
    case "GET":
      try {
        await connectDB();

        const questions = await Question.find({})
          .populate("discipline")
          .populate({
            path: "answers",
            model: "Answer",
          })
          .sort([[field, order]])
          .exec();

        res.status(200).json({ success: true, questions });
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

    case "POST":
      try {
        await connectDB();

        const { discipline, statement, difficult, answers } = req.body
          .data as ICreateQuestionDTO;

        const requiredFields = {
          statement: "enunciado",
          difficult: "dificuldade",
        };

        for (const [key, value] of Object.entries(requiredFields)) {
          if (!req.body.data[key]) {
            if (req.body.data[key] !== true && req.body.data[key] !== false) {
              throw new AppError(`Preencha o campo ${value}.`, 400);
            }
          }
        }

        if (!discipline) {
          throw new AppError("Preencha o campo matéria", 400);
        }

        if (!answers || answers.length < 4) {
          throw new AppError("Preencha todas as respostas", 400);
        }

        const questionStatementAlreadyExists = await Question.findOne({
          statement,
        }).exec();

        if (questionStatementAlreadyExists) {
          throw new AppError(
            "Já existe uma questão cadastrada com esse enunciado.",
            400
          );
        }

        let answersSaved: IAnswerDTO[] = [];

        answers.forEach(async (answer) => {
          const newAnswer = new Answer({
            value: answer.value,
            correct: answer.correct,
          });
          answersSaved.push(newAnswer);
          await newAnswer.save();
        });

        const data: ICreateQuestionDTO = {
          discipline,
          statement,
          difficult,
          answers: answersSaved,
          qtdAnswers: 0,
          qtdCorrectAnswers: 0,
        };

        const question = new Question(data);

        await question.save();

        res.status(201).json({ success: true, question });
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
