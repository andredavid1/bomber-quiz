import { NextApiRequest, NextApiResponse } from "next";

import { IAnswerDTO } from "dtos/IAnswerDTO";
import AppError from "erros/AppError";
import { connectDB } from "lib/mongodb";
import Answer from "models/Discipline";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        await connectDB();

        const answer: IAnswerDTO = await Answer.findById(id).exec();

        if (!answer) {
          throw new AppError("Resposta não encontrada.", 404);
        }

        res.status(201).json({ success: true, answer });
      } catch (err) {
        console.log("err answers id get", err);

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

        const answerToUpdate: IAnswerDTO = await Answer.findById(id).exec();

        if (!answerToUpdate) {
          throw new AppError("Resposta não encontrada.", 404);
        }

        const { value, correct } = req.body;

        const discipline = await Answer.findByIdAndUpdate(
          id,
          {
            value,
            correct,
          },
          { new: true }
        ).exec();

        res.status(201).json({ success: true, discipline });
      } catch (err) {
        console.log("err answers id put", err);

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

        const answer = await Answer.findByIdAndDelete(id).exec();

        if (!answer) {
          throw new AppError("Resposta não encontrada.", 404);
        }

        res.status(200).json({ success: true });
      } catch (err: any) {
        console.log("err answers id delete", err);

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
