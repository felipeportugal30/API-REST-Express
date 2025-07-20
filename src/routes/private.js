import express from "express";
//import docController from "../controllers/docController.js";
import userController from "../controllers/userController.js";

const privateRouter = express.Router();

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

export default privateRouter;
