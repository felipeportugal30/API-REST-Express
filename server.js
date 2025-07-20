import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/docs/swagger.js";
import publicRoutes from "./src/routes/public.js";
import privateRoutes from "./src/routes/private.js";
import authMiddleware from "./src/middleware/authMiddleware.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api", publicRoutes);
app.use("/api", authMiddleware, privateRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server running in port http://localhost:${PORT}`);
  console.log("Documentation is available at http://localhost:3000/api-docs");
});
