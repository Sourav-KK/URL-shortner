import express from "express";
import cors from "cors";
import { PORT_NO, MONGODB_URL, SelectionTimeoutMS } from "./Configs/Secrets";
import router from "./Routes";
import dbConfig from "./Configs/db";
import errMiddleWare from "./Middlewares/errHandling";
import startServer from "./Configs/server";

(async function () {
  const app = express();

  (await dbConfig(MONGODB_URL, SelectionTimeoutMS)).connect();

  startServer(PORT_NO, app);

  app.use(errMiddleWare);
  app.use(express.json());
  app.use(cors());

  app.use("/url", router);
})();
