import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

import beerRouter from "./routes/beer";
import partyRouter from "./routes/party";

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
mongoose.connect(process.env.MONGO_URL as string, mongoOptions);

//Inciando aplicação
const app: Express = express();
app.use(express.json());

app.use("/beer", beerRouter);
app.use("/party", partyRouter);

app.listen(3000, () => {
  console.log("Server running");
});
