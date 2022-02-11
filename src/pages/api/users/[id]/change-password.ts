import { compare, hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

import { IUserDTO } from "dtos/IUserDTO";
import AppError from "errors/AppError";
import { connectDB } from "lib/mongodb";
import User from "models/User";

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
          activePassword: "senha atual",
          newPassword: "nova senha",
        };

        for (const [key, value] of Object.entries(requiredFields)) {
          if (!req.body[key]) {
            throw new AppError(`Preencha o campo ${value}.`, 400);
          }
        }

        const { activePassword, newPassword } = req.body;

        const matchPasswords = await compare(
          activePassword,
          userToUpdate.password
        );

        if (!matchPasswords) {
          throw new AppError("Senha atual incorreta.", 401);
        }

        const hashedPassword = await hash(newPassword, 8);

        const user = await User.findByIdAndUpdate(
          id,
          {
            password: hashedPassword,
          },
          { new: true }
        ).exec();

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
