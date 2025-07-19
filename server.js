import express from "express";
import publicRoutes from "./src/routes/public.js";
import privateRoutes from "./src/routes/private.js";
import authMiddleware from "./src/middleware/authMiddleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/crud/public", publicRoutes);
app.use("/crud/private", authMiddleware, privateRoutes);

app.listen(PORT, () => {
  console.log(`Server running in port http://localhost:${PORT}`);
});
