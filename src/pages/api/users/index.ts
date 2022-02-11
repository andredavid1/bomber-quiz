import { hash } from "bcrypt";
import { isBefore } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";

import { ICreateUserDTO } from "dtos/IUserDTO";
import AppError from "errors/AppError";
import { connectDB } from "lib/mongodb";
import User from "models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { field, order } = req.query;

  switch (method) {
    case "GET":
      try {
        await connectDB();

        const checkRegister = await User.find().exec();

        checkRegister.map((user) => {
          if (
            //futuramente implementar envio de e-mail falando
            //que a assinatura do usuário expirou

            user.registered &&
            isBefore(user.expiresRegister, new Date(Date.now()))
          ) {
            User.findByIdAndUpdate(
              user._id,
              { registered: false },
              { new: true }
            ).exec();
          }
        });

        const users = await User.find()
          .select(
            "_id name rg email level registered expiresRegister createdAt updatedAt"
          )
          .sort([[field, order]])
          .exec();

        res.status(200).json({ success: true, users });
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
          rg: "rg",
          email: "e-mail",
          password: "senha",
          level: "nível de acesso",
          registered: "registrado",
          expiresRegister: "vencimento do registro",
        };

        for (const [key, value] of Object.entries(requiredFields)) {
          if (!req.body.data[key]) {
            if (req.body.data[key] !== true && req.body.data[key] !== false) {
              throw new AppError(`Preencha o campo ${value}.`, 400);
            }
          }
        }

        const { rg, email, password } = req.body.data;

        if (password.length < 8) {
          throw new AppError(
            "O campo senha precisa ter pelo menos 8 caracteres.",
            400
          );
        }

        const rgAlreadyExists = await User.findOne({
          rg,
        }).exec();

        if (rgAlreadyExists) {
          throw new AppError("Já existe um usuário cadastrado com esse RG.");
        }

        const emailAlreadyExists = await User.findOne({
          email,
        }).exec();

        if (emailAlreadyExists) {
          throw new AppError(
            "Já existe um usuário cadastrado com esse e-mail."
          );
        }

        const hashedPassword = await hash(password, 8);

        const data: ICreateUserDTO = {
          ...req.body.data,
          password: hashedPassword,
        };

        const user = new User(data);

        await user.save();

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
