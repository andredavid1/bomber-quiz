import { NextApiRequest, NextApiResponse } from "next";

import { ICreateAnswerDTO } from "dtos/IAnswerDTO";
import AppError from "erros/AppError";
import { connectDB } from "lib/mongodb";
import Answer from "models/Answer";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { field, order } = req.query;

  switch (method) {
    case "GET":
      try {
        await connectDB();

        const answers = await Answer.find()
          .sort([[field, order]])
          .exec();

        res.status(200).json({ success: true, answers });
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

        const { value, correct } = req.body.data;

        const data: ICreateAnswerDTO = {
          value,
          correct,
        };

        const answer = new Answer(data);

        await answer.save();

        res.status(201).json({ success: true, answer });
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
