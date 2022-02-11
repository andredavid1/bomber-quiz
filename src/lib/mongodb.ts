import * as mongoose from "mongoose";
import AppError from "errors/AppError";
import { toast } from "react-toastify";

const uri = process.env.MONGODB_URI;

export const connectDB = async () => {
  if (!uri) {
    throw new AppError(
      "A variável de ambiente MONGODB_URI não está declarada.",
      400
    );
  }

  if (mongoose.connections[0].readyState === 1) {
    return;
  }

  try {
    const connection = await mongoose.connect(uri);

    return connection;
  } catch (err: any) {
    if (err instanceof AppError) {
      toast.error(err.message);
    } else {
      toast.error("Erro na conexão com o servidor");
    }
  }
};
