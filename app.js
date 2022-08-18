import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";

dotenv.config();

//Connection to DB
conn();

const app = express();
const port = process.env.PORT;

//EJS Template Engine
app.set("view engine", "ejs");

//Static Files Middleware
app.use(express.static("public"));

//Routes
app.use("/", pageRoute);

app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});
