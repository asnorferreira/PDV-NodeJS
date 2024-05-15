import express from "express";
import controller from "../controller/index.js";
import middleware from "../middleware/index.js";
import multer from "../configs/multer.js";

export const router = express();

router.get("/categoria", controller.getCategories);

router.post("/usuario", middleware.validateUser, controller.postUser);
router.post("/login", middleware.validateLogin, controller.postLogin);

router.use(middleware.verifyAuth);

//----------------------------ENDPOINTS COM VALIDAÇÃO DE TOKEN----------------------------//
router.get("/usuario", controller.getUser);
router.get("/cliente", controller.getClient);
router.get("/cliente/:id", middleware.validateClient, controller.getClientID);
router.get("/produto", controller.getProduct);
router.get("/produto/:id", middleware.validateProduct, controller.getProductID);
router.get("/pedido", controller.getOrder);

router.post("/cliente", middleware.validateClient, controller.postClient);
router.post("/pedido", middleware.validateOrder, controller.postOrder);

router.put("/usuario", middleware.validateUser, controller.putUpdate);
router.put("/cliente/:id", middleware.validateClient, controller.putClient);

router.delete("/produto/:id", middleware.validateProduct, controller.deleteProductID);

//----------------------------ENDPOINTS COM UPLOAD DE ARQUIVOS----------------------------//
router.use(multer.single(process.env.UP_FILE));

router.post("/produto", middleware.validateProduct, controller.postProduct);
router.put("/produto/:id", middleware.validateProduct, controller.putProduct);
