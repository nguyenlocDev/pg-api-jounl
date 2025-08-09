import compression from "compression";
import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import { errorHandlingMiddleware } from "../middlewares/errorHandler";
import userRoutes from "../routes/userRoutes";
import ApiError from "../utils/apiError";
const app = express();
//use pakage
app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//routes

const PORT = process.env.PORT || 3000;

//start-server
app.use("/api", userRoutes);

//error handler 404
app.use((req, res, next) => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error); // đẩy vào errorHandlingMiddleware
});
app.use(errorHandlingMiddleware);
//error handler
app.listen(PORT, () => {
  console.log("Server is running on ", process.env.HOST + ":" + PORT);
});
