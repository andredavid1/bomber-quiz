import { connectDB } from "lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import upload from "utils/upload";

const handler = nc()
  .use(upload.single("file"))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, rg, email, password, file } = req.body;

    await connectDB();

    res.json({ hello: "world" });
  })
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    throw new Error("Throws me around! Error can be caught and handled.");
  });

export default handler;
