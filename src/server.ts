import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import server from "./app";

mongoose
  .connect(process.env.MONGO_URL as string)
  .then((data) => {
    console.log("MongoDb connection succeed");
    const PORT = process.env.PORT ?? 3003;
    server.listen(PORT, function () {
      console.log(`The server is running successfully on PORT: ${PORT}`);
      console.info(`Admin project on http://localhost:${PORT}/admin \n`);
    });
  })
  .catch((err) => {
    console.log("ERROR on connection MongoDb", err);
  });
