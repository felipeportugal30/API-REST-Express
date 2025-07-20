import datasetService from "../services/datasetService.js";

const datasetController = {
  uploadFile: async (req, res) => {
    try {
      const userId = req.user.id;
      const dataset = await datasetService.uploadFile(req.file, userId);

      res.status(201).json({
        success: true,
        message: "Arquivo enviado com sucesso",
        data: dataset,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Erro ao enviar arquivo",
      });
    }
  },

  listDatasets: async (req, res) => {
    try {
      const userId = req.user.id;
      const datasets = await datasetService.listDataset(userId);

      res.status(200).json({
        success: true,
        message: "Lista de datasets",
        data: datasets,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Erro de servidor",
      });
    }
  },

  listRecordsFromDataset: async (req, res) => {
    try {
      const userId = req.user.id;
      const datasetId = req.params.id;

      if (!datasetId) {
        return res.status(400).json({
          success: false,
          message: "ID inválido",
        });
      }

      const records = await datasetService.listRecords(userId, datasetId);
      res.status(200).json({
        success: true,
        message: "Registros encontrados com sucesso",
        data: records,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Erro de servidor",
      });
    }
  },

  searchRecords: async (req, res) => {
    try {
      const userId = req.user.id;
      const query = req.query.query;

      const results = await datasetService.searchRecords(userId, query);
      res.json({ success: true, data: results });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Erro de servidor",
      });
    }
  },

  createQuery: async (req, res) => {
    try {
      const userId = req.user.id;
      const { question, datasetId } = req.body;

      if (!question || !datasetId) {
        return res
          .status(400)
          .json({ success: false, message: "Pergunta ou datasetId ausente" });
      }

      const query = await datasetService.createQuery(
        userId,
        question,
        datasetId
      );
      res.json({ success: true, data: query });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Erro de servidor",
      });
    }
  },
};

export default datasetController;
