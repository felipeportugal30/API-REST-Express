import { InferenceClient } from "@huggingface/inference";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import errors from "../exception/error.js";

const prisma = new PrismaClient();

dotenv.config();
const HF_TOKEN = process.env.HF_API_TOKEN;

const queryService = {
  async createQuery(userId, datasetId, question) {
    if (!userId) {
      throw errors.INVALID_REQUEST;
    }

    if (!datasetId) {
      throw errors.INVALID_REQUEST;
    }

    const dataset = await prisma.dataset.findFirst({
      where: {
        id: datasetId,
      },
    });

    if (!dataset) {
      throw errors.USER_NOT_FOUND;
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
        dataset: {
          connect: { id: datasetId },
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
