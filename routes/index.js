const express = require("express");
const router = express.Router();
import {productsController, registerController, loginController, refreshController} from "../controllers";
import auth from "../middlewares/auth";

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.post("/logout",auth, loginController.logout)
router.post("/refresh", refreshController.refresh);

router.get("/getmenu", productsController.getMenu);
router.get("/singleProduct/:id", productsController.getSingleProduct);
router.post("/getProducts", productsController.getProducts);



export default router;