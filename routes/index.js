const express = require("express");
const router = express.Router();

import { productsController } from "../controllers/productsController";

router.get("/getmenu", productsController.getMenu);

export default router;