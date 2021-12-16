const express = require("express");
const app = express();
const mongoose = require("mongoose");
import routes from "./routes/index";
import {APP_PORT, DB_URL} from "./config";
import errorHandler from "./middlewares/errorHandler";
import {initSocket} from "./services/SocketServer"

//DataBase
const connection = mongoose
  .connect(DB_URL)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch(err => console.log(err));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);

app.use("/", (req, res) => {
  return res.send("Welcome to Our Pizza API");
});

app.use(errorHandler);

const port = process.env.PORT || APP_PORT;
const server  = app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`);
});

//socket implementation 
initSocket(server);

