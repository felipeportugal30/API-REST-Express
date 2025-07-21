import fs from "fs";
import csv from "csv-parser";
import pdf from "pdf-parse";
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
const readPDF = async (filePath) => {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);

  const pages = data.text.split("\f").filter((page) => page.trim().length > 0);

  return pages.map((pageText, index) => ({
    page: index + 1,
    text: pageText.trim(),
  }));
};

const datasetService = {
  async uploadFile(file, userId) {
    if (!file) {
      throw { status: 400, message: "Arquivo não fornecido" };
    }

    if (
      !file.originalname.endsWith(".csv") &&
      !file.originalname.endsWith(".pdf")
    ) {
      throw { status: 400, message: "Arquivo não aceito" };
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

    if (file.originalname.endsWith(".csv")) {
      const rows = await parseCSV(file.path);
      await prisma.record.createMany({
        data: rows.map((row) => ({
          data_json: row,
          dataset_id: dataset.id,
        })),
      });
    }
    if (file.originalname.endsWith(".pdf")) {
      const pages = await readPDF(file.path);
      await prisma.record.createMany({
        data: pages.map((page) => ({
          data_json: page,
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

  async listRecords(userId) {
    const dataset = await prisma.dataset.findUnique({
      where: { id: userId },
      include: {
        records: {
          select: { id: true, data_json: true },
        },
      },
    });

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
};

export default datasetService;
