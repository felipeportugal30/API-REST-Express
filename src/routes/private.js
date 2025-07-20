import express from "express";
import multer from "multer";
import userController from "../controllers/userController.js";
import datasetController from "../controllers/datasetController.js";

const privateRouter = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /delete:
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
 * /update:
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
 *               password:
 *                 type: string
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
 * /me:
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
 * /datasets/upload:
 *   post:
 *     summary: Realiza o upload de um novo arquivo do usuário autenticado
 *     tags: [Dataset]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Arquivo criado com sucesso
 *       400:
 *          description: Arquivo não fornecido
 *       500:
 *          description: Falha de servidor
 */
privateRouter.post(
  "/datasets/upload",
  upload.single("file"),
  datasetController.uploadFile
);

/**
 * @swagger
 * /datasets:
 *   get:
 *     summary: Lista  os arquivos do usuário autenticado
 *     tags: [Dataset]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Arquivo listados com sucesso
 *       400:
 *          description: Requisição inválida
 *       500:
 *          description: Falha de servidor
 */
privateRouter.get("/datasets", datasetController.listDatasets);

/**
 * @swagger
 * /datasets/:id/records:
 *   get:
 *     summary: Lista os registros daquele dataset
 *     tags: [Dataset]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Records encontrados
 *       403:
 *          description: Acesso negado
 *       40!:
 *          description: Credenciais inválidas
 *       500:
 *          description: Falha de servidor
 */
privateRouter.get(
  "/datasets/:id/records",
  datasetController.listRecordsFromDataset
);

/**
 * @swagger
 * /records/search:
 *   get:
 *     summary: Busca textual por palavra-chave no JSON (/records/search?query=...)
 *     tags: [Dataset]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso
 *       400:
 *          description: Solicitação inválida
 *       500:
 *          description: Falha de servidor
 */
privateRouter.get("/records/search", datasetController.searchRecords);

privateRouter.post("/queries", datasetController.createQuery);

export default privateRouter;
