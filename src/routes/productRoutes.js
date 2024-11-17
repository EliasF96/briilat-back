import express from "express"
import * as productController from "../controller/productsController.js"
import * as cartController from "../controller/cartController.js"
import dotenv from "dotenv"
import * as userController from "../controller/userController.js"
import validateToken from "../utils/validateToken.js"
dotenv.config()
const router = express.Router()

router.post("/login", userController.loginController)
router.get("/logout", userController.logoutController)
router.post("/register", userController.registerController)
router.get("/userData",validateToken, userController.validateUser)

router.get("/products", validateToken, productController.getProductsController)
router.get("/productsCatalog", productController.getProductsCatalogController)
router.post("/products", productController.postProductController)
router.get('/products-name/:name', productController.getProductByNameController)
router.put('/products/:id',validateToken, productController.updateProductController)
router.delete('/products/:id', productController.deleteProductController)
//CART
router.get('/cart', cartController.getProductsCartController)
router.get('/my-cart', validateToken, cartController.getCartByUserController)
router.post('/cart', cartController.createProductCartController)
router.delete('/cart/:id', cartController.deleteProductCartController)
router.delete('/cart_delete_all',validateToken, cartController.deleteProductCartAllController)

export default router