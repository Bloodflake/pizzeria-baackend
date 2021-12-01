const express = require("express");
const router = express.Router();
import {productsController} from "../controllers";

router.get("/getmenu", productsController.getMenu);
router.get("/singleProduct/:id", productsController.getSingleProduct);

router.post("/getProducts", productsController.getProducts);



export default router;