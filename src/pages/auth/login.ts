import type { NextApiRequest, NextApiResponse } from "next";
import { compare } from "bcrypt";
import { setCookies } from "cookies-next";
import { sign } from "jsonwebtoken";
import { IUserDTO } from "dtos/IUserDTO";
import AppError from "erros/AppError";
import { connectDB } from "lib/mongodb";
import User from "models/User";

interface IResponse {
  success: boolean;
  payload?: {
    id: string;
    name: string;
    level: string;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        await connectDB();

        const requiredFields = {
          email: "e-mail",
          password: "senha",
        };

        for (const [key, value] of Object.entries(requiredFields)) {
          if (!req.body[key]) {
            throw new AppError(`Preencha o campo ${value}.`, 400);
          }
        }

        const { email, password } = req.body;

        if (password.length < 8) {
          throw new AppError(
            "O campo senha precisa ter pelo menos 8 caracteres.",
            400
          );
        }

        const user = (await User.findOne({
          email,
        }).exec()) as IUserDTO;

        if (!user) {
          throw new AppError("Usuário/Senha incorretos.", 401);
        }

        const match = await compare(password, user.password);

        if (!match) {
          throw new AppError("Usuário/Senha incorretos.", 401);
        }

        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
          throw new AppError(
            "Variável de ambiente JWT_SECRET não encontrada.",
            401
          );
        }

        const jwt = sign(
          {
            id: user._id,
            name: user.name,
            level: user.level,
          },
          jwtSecret,
          { expiresIn: "1h" }
        );

        setCookies("tokenBomberQuiz", jwt, {
          req,
          res,
          domain: process.env.DOMAIN,
          path: "/",
          maxAge: 60 * 60, //1 hour
          sameSite: "lax",
        });

        return res.status(200).json({
          success: true,
          payload: { id: user._id, name: user.name, level: user.level },
        });
      } catch (err: any) {
        if (err instanceof AppError) {
          return res
            .status(err.statusCode)
            .json({ success: false, error: err.message });
        } else {
          return res
            .status(500)
            .json({ success: false, error: "Erro na conexão com o servidor." });
        }
      }

    default:
      return res
        .status(405)
        .json({ success: false, error: "Método não suportado." });
  }
}
