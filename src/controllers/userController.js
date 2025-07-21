import userService from "../services/userService.js";
import bcrypt from "bcrypt";

const userController = {
  createUser: async (req, res) => {
    try {
      const { newUser, token } = await userService.createUser(req.body);
      res.status(201).json({
        success: true,
        message: `Usuário ${newUser.name} criado com sucesso`,
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
        token: token,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Falha no servidor",
        error: process.env.NODE_ENV === "desenvolvimento" ? err : undefined,
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { userInfo, token } = await userService.loginUser(req.body);
      res.status(200).json({
        success: true,
        message: `Usuário ${userInfo.email} encontrado com sucesso`,
        data: {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          token: token,
        },
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Falha no servidor",
        error: process.env.NODE_ENV === "desenvolvimento" ? err : undefined,
      });
    }
  },

  findUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const userInfo = await userService.findUser(userId);
      res.status(200).json({
        success: true,
        message: `Usuário ${userInfo.name} encontado com sucesso`,
        data: userInfo,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Falha no servidor",
        error: process.env.NODE_ENV === "desenvolvimento" ? err : undefined,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await userService.deleteUser(req.user);

      res.status(200).json({
        success: true,
        message: `Usuário deletado com sucesso`,
        data: deletedUser.data,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Falha no servidor",
        error: process.env.NODE_ENV === "desenvolvimento" ? err : undefined,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, password } = req.body;

      if (!name && !password) {
        return res.status(400).json({
          success: false,
          message: "Credenciais invalidas",
        });
      }

      const dataToUpdate = {};

      if (name && typeof name === "string") {
        dataToUpdate.name = name;
      }

      if (password && typeof password === "string") {
        dataToUpdate.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await userService.updateUser(userId, dataToUpdate);

      res.status(200).json({
        success: true,
        message: `Usuário ${updatedUser.name} atualizado com sucesso`,
        data: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Falha no servidor",
        error: process.env.NODE_ENV === "desenvolvimento" ? err : undefined,
      });
    }
  },
};

export default userController;
