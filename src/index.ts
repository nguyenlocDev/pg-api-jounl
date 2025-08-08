import compression from "compression";
import helmet from "helmet";
import express from "express";
import morgan from "morgan";
import { errorHandlingMiddleware } from "../middlewares/errorHandler";
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
app.get("/", (req, res) => {
  res.send("lorem ipsum");
});
app.get("/error", (req, res) => {
  if (!req.query.id) {
    throw new ApiError(405, "no id");
  }
  res.status(200).json({ id: req.query.id });
});
//error handler
app.use(errorHandlingMiddleware);
app.listen(PORT, () => {
  console.log("Server is running on ", process.env.HOST + ":" + PORT);
});
