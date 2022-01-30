import { hash } from "bcrypt";
import { ICreateUserDTO, IUserDTO } from "dtos/IUserDTO";
import AppError from "erros/AppError";
import { connectDB } from "lib/mongodb";
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
          throw new AppError("Usuário não encontrado.", 400);
        }

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

    case "PUT":
      try {
        await connectDB();

        const userToUpdate: IUserDTO = await User.findById(id).exec();

        if (!userToUpdate) {
          throw new AppError("Usuário não encontrado.", 400);
        }

        const requiredFields = {
          name: "nome",
          rg: "rg",
          email: "e-mail",
          level: "nível de acesso",
        };

        for (const [key, value] of Object.entries(requiredFields)) {
          if (!req.body[key]) {
            throw new AppError(`Preencha o campo ${value}.`, 400);
          }
        }

        const { name, rg, email, level } = req.body;

        const rgAlreadyExists: IUserDTO = await User.findOne({
          rg,
        }).exec();

        if (rgAlreadyExists && rgAlreadyExists._id.toString() !== id) {
          throw new AppError("Já existe um usuário cadastrado com esse RG.");
        }

        const emailAlreadyExists: IUserDTO = await User.findOne({
          email,
        }).exec();

        if (emailAlreadyExists && emailAlreadyExists._id.toString() !== id) {
          throw new AppError(
            "Já existe um usuário cadastrado com esse e-mail."
          );
        }

        const user = await User.findByIdAndUpdate(
          id,
          {
            name,
            rg,
            email,
            password: userToUpdate.password,
            level,
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

    case "DELETE":
      try {
        await connectDB();

        const user = await User.findByIdAndDelete(id);

        if (!user) {
          throw new AppError("Usuário não encontrado.", 404);
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
