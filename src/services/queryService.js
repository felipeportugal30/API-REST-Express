import { InferenceClient } from "@huggingface/inference";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import errors from "../exception/error.js";

const prisma = new PrismaClient();

dotenv.config();
const HF_TOKEN = process.env.HF_API_TOKEN;

const queryService = {
  async createQuery(userId, question) {
    if (!userId) {
      throw errors.INVALID_REQUEST;
    }

    const client = new InferenceClient(HF_TOKEN);

    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "moonshotai/Kimi-K2-Instruct",
      messages: [
        {
          role: "user",
          content: question,
        },
      ],
    });

    const answer =
      chatCompletion.choices?.[0]?.message?.content ||
      "Resposta não encontrada.";

    const query = await prisma.query.create({
      data: {
        request: question,
        response: answer,
        user: {
          connect: { id: userId },
        },
      },
    });

    return query;
  },

  async listQueries(userId) {
    if (!userId) {
      throw errors.INVALID_CREDENTIALS;
    }

    const queries = await prisma.query.findMany({
      where: { user_id: userId },
    });

    return queries;
  },
};

export default queryService;
