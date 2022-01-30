import { compare, hash } from "bcrypt";
import { addMonths, addYears } from "date-fns";
import { ICreateUserDTO, IUserDTO } from "dtos/IUserDTO";
import AppError from "erros/AppError";
import { connectDB } from "lib/mongodb";
import User from "models/User";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "PATCH":
      try {
        await connectDB();

        const userToUpdate: IUserDTO = await User.findById(id).exec();

        if (!userToUpdate) {
          throw new AppError("Usuário não encontrado.", 400);
        }

        const requiredFields = {
          plan: "plano",
          condition: "condição",
        };

        for (const [key, value] of Object.entries(requiredFields)) {
          if (!req.body[key]) {
            throw new AppError(`Preencha o campo ${value}.`, 400);
          }
        }

        const { plan, condition, discount, amount } = req.body;

        let expiresRegister: Date = new Date();

        if (plan === "quarterly") {
          expiresRegister = addMonths(new Date(Date.now()), 3);
        }

        if (plan === "semiannual") {
          expiresRegister = addMonths(new Date(Date.now()), 6);
        }

        if (plan === "yearly") {
          expiresRegister = addYears(new Date(Date.now()), 1);
        }

        const user = await User.findByIdAndUpdate(
          id,
          {
            registered: true,
            expiresRegister,
          },
          { new: true }
        ).exec();

        //TODO: Registrar assinatura em collection própria

        res.status(201).json({ success: true, user });
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
