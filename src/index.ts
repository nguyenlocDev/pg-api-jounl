import compression from "compression";
import helmet from "helmet";
import express from "express";
import morgan from "morgan";
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

app.listen(PORT, () => {
  console.log("Server is running on ", process.env.HOST + ":" + PORT);
});
