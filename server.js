const express = require("express");
const app = express();
const mongoose = require("mongoose");
import routes from "./routes";

//DataBase
const db = "mongodb://localhost/pizza";

const connection = mongoose
  .connect(db)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.error(err));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);

app.use("/", (req, res) => {
  return res.send("hello");
});



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`);
});