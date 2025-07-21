import express from "express";
import multer from "multer";
import userController from "../controllers/userController.js";
import datasetController from "../controllers/datasetController.js";
import queryController from "../controllers/queryController.js";

const privateRouter = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /api/delete:
 *   delete:
 *     summary: Deleta o usuário autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *          description: Usuário deletado com sucesso
 *       400:
 *          description: Solicitação inválida
 *       404:
 *          description: Usuário não encontrado
 *       500:
 *          description: Falha de servidor
 */
privateRouter.delete("/delete", userController.deleteUser);

/**
 * @swagger
 * /api/update:
 *   put:
 *     summary: Atualiza nome ou senha do usuário autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: João Silva Sousa
 *               password:
 *                 type: string
 *                 example: 123senha
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *          description: Solicitação inválida
 *       404:
 *          description: Usuário não encontrado
 *       500:
 *          description: Falha de servidor
 */
privateRouter.put("/update", userController.updateUser);

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Retorna as informações do usuário autenticado
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário
 *       400:
 *          description: Solicitação inválida
 *       404:
 *          description: Usuário não encontrado
 *       500:
 *          description: Falha de servidor
 */
privateRouter.get("/me", userController.findUser);

/**
 * @swagger
 * /api/datasets/upload:
 *   post:
 *     summary: Realiza o upload de um novo arquivo do usuário autenticado
 *     tags: [Dataset]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo CSV ou PDF para upload
 *     responses:
 *       201:
 *         description: Arquivo criado com sucesso
 *       400:
 *         description: Arquivo não fornecido
 *       500:
 *         description: Falha de servidor
 */
privateRouter.post(
  "/datasets/upload",
  upload.single("file"),
  datasetController.uploadFile
);

/**
 * @swagger
 * /api/datasets:
 *   get:
 *     summary: Lista os arquivos do usuário autenticado
 *     tags: [Dataset]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Arquivos listados com sucesso
 *       400:
 *         description: Requisição inválida
 *       500:
 *         description: Falha de servidor
 */
privateRouter.get("/datasets", datasetController.listDatasets);

/**
 * @swagger
 * /api/datasets/{id}/records:
 *   get:
 *     summary: Lista os registros daquele dataset
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do dataset
 *     responses:
 *       200:
 *         description: Registros encontrados com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       403:
 *         description: Acesso negado
 *       500:
 *         description: Falha de servidor
 */
privateRouter.get(
  "/datasets/:id/records",
  datasetController.listRecordsFromDataset
);

/**
 * @swagger
 * /api/records/search:
 *   get:
 *     summary: Busca textual por palavra-chave nos registros JSON
 *     tags: [Records]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Palavra-chave para busca textual nos registros
 *         example: Backend
 *     responses:
 *       200:
 *         description: Busca realizada com sucesso
 *       400:
 *         description: Solicitação inválida
 *       500:
 *         description: Falha de servidor
 */
privateRouter.get("/records/search", datasetController.searchRecords);

/**
 * @swagger
 * /api/list-queries:
 *   get:
 *     summary: Lista as queries do usuário
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de queries retornada com sucesso
 *       400:
 *         description: Solicitação inválida
 *       500:
 *         description: Falha de servidor
 */
privateRouter.get("/list-queries", queryController.listQueries);

/**
 * @swagger
 * /api/queries:
 *   post:
 *     summary: Envia uma pergunta vinculada a um dataset (simulação de IA)
 *     tags: [Queries]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - question
 *             properties:
 *               question:
 *                 type: string
 *                 description: Pergunta a ser feita
 *                 example: "Qual a capital do brasil?"
 *     responses:
 *       200:
 *         description: Resposta gerada com sucesso
 *       400:
 *         description: Solicitação inválida
 *       500:
 *         description: Falha de servidor
 */
privateRouter.post("/queries", queryController.createQuery);

export default privateRouter;
