import express from "express";
import userController from "../controllers/userController.js";

const publicRouter = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *          description: Solicitação inválida
 *       500:
 *          description: Falha de servidor
 */
publicRouter.post("/auth/register", userController.createUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica o usuário e retorna um token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais invalidas
 *       400:
 *          description: Solicitação inválida
 *       404:
 *          description: Usuário não encontrado
 *       500:
 *          description: Falha de servidor
 */
publicRouter.post("/auth/login", userController.loginUser);

export default publicRouter;
