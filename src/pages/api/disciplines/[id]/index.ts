import { NextApiRequest, NextApiResponse } from "next";

import { IDisciplineDTO } from "dtos/IDisciplineDTO";
import AppError from "errors/AppError";
import { connectDB } from "lib/mongodb";
import Discipline from "models/Discipline";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        await connectDB();

        const discipline: IDisciplineDTO = await Discipline.findById(id).exec();

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

        const disciplineToUpdate: IDisciplineDTO = await Discipline.findById(
          id
        ).exec();

        if (!disciplineToUpdate) {
          throw new AppError("Matéria não encontrada.", 404);
        }

        const requiredFields = {
          name: "nome",
        };

        for (const [key, value] of Object.entries(requiredFields)) {
          if (!req.body[key]) {
            throw new AppError(`Preencha o campo ${value}.`, 400);
          }
        }

        const { name } = req.body;

        const disciplineNameAlreadyExists: IDisciplineDTO =
          await Discipline.findOne({
            name,
          }).exec();

        if (
          disciplineNameAlreadyExists &&
          disciplineNameAlreadyExists._id.toString() !== id
        ) {
          throw new AppError("Já existe uma Matéria cadastrada com esse nome.");
        }

        const discipline = await Discipline.findByIdAndUpdate(
          id,
          {
            name,
          },
          { new: true }
        ).exec();

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
