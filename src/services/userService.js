import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const userService = {
  async createUser(userData) {
    const salt = await bcrypt.genSalt(10); // Password crypt
    const hashPassword = await bcrypt.hash(userData.password, salt);

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

    return createdUser;
  },

  updateUser: async (userId, dataToUpdate) => {
    return await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });
  },

  async findUserByEmailAndPw(userData) {
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
      throw {
        message: "Invalid credentials",
        status: 401,
      };
    }

    const isMatch = await bcrypt.compare(userData.password, userDb.password);
    if (!isMatch) {
      throw {
        message: "Invalid credentials",
        status: 401,
      };
    }

    const token = jwt.sign({ id: userDb.id }, process.env.JWT_SECRET, {
      expiresIn: "5m",
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

  async deleteUser(userData) {
    const userDb = await prisma.user.findUnique({
      where: { id: userData.id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    if (!userDb) {
      throw {
        message: "User not found",
        status: 404,
      };
    }

    await prisma.user.delete({ where: { id: userDb.id } });

    return {
      message: `User ${userDb.name} was deleted successfully`,
      data: userDb,
    };
  },
};

export default userService;
