import env from "dotenv"
env.config();
import express from "express";
import mainRouter from "./router/index.js";
import connectDB from "./config/db.js";
const app = express();

//console.log(process.env.JWT_SECRET)


// connecting db
connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  return res.json({ message: "Hello world!" });
});

app.use(mainRouter);
app.listen(3300, () => {
  console.log("listening on 3300");
});
