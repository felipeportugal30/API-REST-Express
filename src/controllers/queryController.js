import queryService from "../services/queryService.js";

const queryController = {
  createQuery: async (req, res) => {
    try {
      const userId = req.user.id;
      const question = req.body.question;
      const datasetId = req.body.datasetId;

      if (!question) {
        return res
          .status(400)
          .json({ success: false, message: "Pergunta ausente" });
      }

      const query = await queryService.createQuery(userId, datasetId, question);

      res.status(200).json({
        success: true,
        message: "Query criada com sucesso e dataset encontrado",
        data: query,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Erro de servidor",
      });
    }
  },

  listQueries: async (req, res) => {
    try {
      const userId = req.user.id;
      const queries = await queryService.listQueries(userId);

      res.status(200).json({
        success: true,
        message: "Queries encontrados com sucesso",
        data: queries,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Erro de servidor",
      });
    }
  },
};

export default queryController;
