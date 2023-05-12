import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

import beerRouter from "./routes/beer";

dotenv.config();

// Conectando ao MongoDB
interface MyConnectOptions extends ConnectOptions {
  useNewUrlParser?: boolean;
  useUnifiedTopology?: boolean;
}

const mongoOptions: MyConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set("strictQuery", false);

if (!process.env.MONGO_URL) {
  throw new Error("A variável MONGO_URL não está definida no ambiente.");
}

mongoose.connect(process.env.MONGO_URL, mongoOptions);

//Inciando aplicação
const app: Express = express();
app.use(express.json());

app.use("/beer", beerRouter);

app.listen(3000, () => {
  console.log("Server running");
});
