import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import errors from "../exception/error.js";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const userService = {
  async createUser(userData) {
    if (!userData.name || !userData.email || !userData.password) {
      throw errors.INVALID_REQUEST;
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      throw {
        status: 400,
        message: "Email já cadastrado",
      };
    }

    const createdUser = await prisma.user.create({
      data: {
        email: userData.email,
        name: userData.name,
        password: hashPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!createdUser) {
      throw errors.INVALID_REQUEST;
    }

    const token = jwt.sign(
      { id: createdUser.id, email: createdUser.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      newUser: {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
      },
      token,
    };
  },

  updateUser: async (userId, dataToUpdate) => {
    if (!userId) {
      throw errors.INVALID_REQUEST;
    }
    if (Object.keys(dataToUpdate).length === 0) {
      throw errors.INVALID_REQUEST;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    if (!updatedUser) {
      throw errors.USER_NOT_FOUND;
    }

    return updatedUser;
  },

  async loginUser(userData) {
    if (!userData.email || !userData.password) {
      throw errors.INVALID_REQUEST;
    }
    const userDb = await prisma.user.findUnique({
      where: { email: userData.email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    if (!userDb) {
      throw errors.INVALID_CREDENTIALS;
    }

    const isMatch = await bcrypt.compare(userData.password, userDb.password);
    if (!isMatch) {
      throw errors.INVALID_CREDENTIALS;
    }

    const token = jwt.sign({ id: userDb.id, email: userDb.email }, JWT_SECRET, {
      expiresIn: "1d",
    });

    return {
      userInfo: {
        id: userDb.id,
        name: userDb.name,
        email: userDb.email,
      },
      token,
    };
  },

  async findUser(userId) {
    if (!userId) {
      throw errors.INVALID_REQUEST;
    }
    const userDb = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    if (!userDb) {
      throw errors.USER_NOT_FOUND;
    }

    return {
      userInfo: {
        id: userDb.id,
        name: userDb.name,
        email: userDb.email,
      },
    };
  },

  async deleteUser(userData) {
    if (!userData.id) {
      throw errors.INVALID_REQUEST;
    }

    const userDb = await prisma.user.findUnique({
      where: { id: userData.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!userDb) {
      throw errors.USER_NOT_FOUND;
    }

    await prisma.user.delete({ where: { id: userDb.id } });

    return {
      message: `Usuário ${userDb.name} deletado com sucesso`,
      data: userDb,
    };
  },
};

export default userService;
