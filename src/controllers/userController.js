import userService from "../services/userService.js";

const userController = {
  createUser: async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.status(201).json({
        success: true,
        message: `User ${newUser.name} created successfully`,
        data: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Failed to create user",
        error: process.env.NODE_ENV === "development" ? err : undefined,
      });
    }
  },

  findOneByEmailAndPw: async (req, res) => {
    try {
      const { userInfo, token } = await userService.findUserByEmailAndPw(
        req.body
      );
      res.status(200).json({
        success: true,
        message: `User ${userInfo.email} find successfully`,
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
        message: err.message || "Failed to find user",
        error: process.env.NODE_ENV === "development" ? err : undefined,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await userService.deleteUser(req.user);

      res.status(200).json({
        success: true,
        message: deletedUser.message,
        data: deletedUser.data,
      });
    } catch (err) {
      res.status(err.status || 500).json({
        success: false,
        message: err.message || "Failed to delete user",
        error: process.env.NODE_ENV === "development" ? err : undefined,
      });
    }
  },
};

export default userController;
