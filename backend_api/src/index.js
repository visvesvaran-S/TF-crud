const express = require("express");
const mongoose = require("mongoose");
let cors = require("cors");

const userRoutes = require("./routes/user.js");

const mongoString =
  "mongodb://travelfica:Visva2001@ac-ou2gj91-shard-00-00.178mhwh.mongodb.net:27017,ac-ou2gj91-shard-00-01.178mhwh.mongodb.net:27017,ac-ou2gj91-shard-00-02.178mhwh.mongodb.net:27017/Travelfica";

mongoose.connect(
  mongoString +
    "?ssl=true&replicaSet=atlas-caj2xv-shard-0&authSource=admin&retryWrites=true&w=majority"
);

let database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("database connected...!");
});

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/", userRoutes);

app.use((req, res, next) => {
  res
    .status(404)
    .send({ status: 404, message: "API URL Not Found", error: true });
});

app.listen(3004, () => {
  console.log(`server listen at ${3004}`);
});


