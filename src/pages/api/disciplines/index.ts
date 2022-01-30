import { NextApiRequest, NextApiResponse } from "next";

import { ICreateDisciplineDTO } from "dtos/IDisciplineDTO";
import AppError from "erros/AppError";
import { connectDB } from "lib/mongodb";
import Discipline from "models/Discipline";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { field, order } = req.query;

  switch (method) {
    case "GET":
      try {
        await connectDB();

        const disciplines = await Discipline.find()
          .sort([[field, order]])
          .exec();

        res.status(200).json({ success: true, disciplines });
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

        const requiredFields = {
          name: "nome",
        };

        for (const [key, value] of Object.entries(requiredFields)) {
          if (!req.body.data[key]) {
            if (req.body.data[key] !== true && req.body.data[key] !== false) {
              throw new AppError(`Preencha o campo ${value}.`, 400);
            }
          }
        }

        const { name } = req.body.data;

        const disciplineNameAlreadyExists = await Discipline.findOne({
          name,
        }).exec();

        if (disciplineNameAlreadyExists) {
          throw new AppError("Já existe uma matéria cadastrada com esse nome.");
        }

        const data: ICreateDisciplineDTO = {
          name,
        };

        const discipline = new Discipline(data);

        await discipline.save();

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

    default:
      res
        .status(405)
        .json({ success: false, errorMessage: "Método não suportado." });
      break;
  }
};

export default handler;
