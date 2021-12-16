const express = require("express");
const router = express.Router();
import {productsController, registerController, loginController, refreshController, orderController} from "../controllers";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin"

router.post("/register", registerController.register);
router.post("/login", loginController.login);
router.post("/logout",auth, loginController.logout)
router.post("/refresh", refreshController.refresh);

router.get("/getmenu", productsController.getMenu);
router.get("/singleProduct/:id", productsController.getSingleProduct);
router.post("/getProducts", productsController.getProducts);

router.post("/order", auth, orderController.order);
router.get("/myOrders", auth, orderController.myOrders);
router.get("/admin/order",[auth, admin], orderController.adminOrder);
router.post("/admin/order", [auth, admin], orderController.updateStatus);
router.get("/getOrder",auth, orderController.getOrder);

export default router;