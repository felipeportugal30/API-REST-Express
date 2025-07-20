import fs from "fs";
import csv from "csv-parser";
import axios from "axios";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import errors from "../exception/error.js";

const prisma = new PrismaClient();

const parseCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", () => resolve(results))
      .on("error", reject);
  });
};

dotenv.config();
const HF_API_URL = "https://transformer.huggingface.co/doc/gpt2-large";
const HF_TOKEN = process.env.HF_API_TOKEN;

const datasetService = {
  async uploadFile(file, userId) {
    if (!file) {
      throw { status: 400, message: "Arquivo não fornecido" };
    }

    const dataset = await prisma.dataset.create({
      data: {
        name: file.originalname,
        size: file.size,
        type: file.mimetype,
        path: file.path,
        user_id: userId,
      },
    });

    if (file.mimetype === "text/csv") {
      const rows = await parseCSV(file.path);
      await prisma.record.createMany({
        data: rows.map((row) => ({
          data_json: row,
          dataset_id: dataset.id,
        })),
      });
    }

    return dataset;
  },

  async listDataset(userId) {
    if (!userId) {
      throw errors.INVALID_CREDENTIALS;
    }

    const datasets = await prisma.dataset.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        name: true,
        size: true,
        created_at: true,
        path: true,
        records: {
          select: { id: true },
        },
      },
      orderBy: { created_at: "desc" },
    });

    return datasets.map((ds) => ({
      id: ds.id,
      name: ds.name,
      size: ds.size,
      created_at: ds.created_at,
      path: ds.path,
      recordCount: ds.records.length,
    }));
  },

  async listRecords(userId, datasetId) {
    const dataset = await prisma.dataset.findUnique({
      where: { id: datasetId },
      include: {
        records: {
          select: { id: true, data_json: true },
        },
      },
    });

    if (!dataset || dataset.user_id !== userId) {
      throw { status: 403, message: "Acesso negado" };
    }

    return dataset.records.map((r) => ({
      id: r.id,
      data_json: r.data_json,
    }));
  },

  async searchRecords(userId, keyword) {
    if (!userId || !keyword) {
      throw errors.INVALID_REQUEST;
    }

    const allRecords = await prisma.record.findMany({
      where: {
        dataset: { user_id: userId },
      },
      select: {
        id: true,
        data_json: true,
        dataset_id: true,
      },
    });

    const keywordLower = keyword.toLowerCase();
    const filtered = allRecords.filter((record) =>
      JSON.stringify(record.data_json).toLowerCase().includes(keywordLower)
    );

    return filtered;
  },

  async createQuery(userId, question, datasetId) {
    if (!userId) {
      throw errors.INVALID_REQUEST;
    }
    const response = await axios.post(
      HF_API_URL,
      { inputs: question },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer =
      response.data[0]?.generated_text || "Resposta não encontrada.";
    if (!answer) {
      throw errors.SERVER_ERROR;
    }

    const query = await prisma.query.create({
      data: {
        user_id: userId,
        dataset_id: datasetId,
        request: question,
        response: answer,
      },
    });

    return query;
  },
};

export default datasetService;
