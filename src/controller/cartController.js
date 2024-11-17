import * as cartService from "../service/cartService.js"

const getProductsCartController = async (req, res) => {
    const productsCart = await cartService.getProductsCartService(req)
    res.json(productsCart)
}
const getCartByUserController = async (req, res) => {
    const cartListByUser = await cartService.getCartByUserService(req)
    res.json(cartListByUser)
}
const createProductCartController = async (req, res) => {
    const createProduct = await cartService.createProductCartService(req)
    res.json(createProduct)
}
const deleteProductCartController = async (request, response) => {
    const deletedProduct = await cartService.deleteProductCartService(request)
    response.json(deletedProduct)
}

const deleteProductCartAllController = async (request, response) => {
    const deletedProduct = await cartService.deleteProductCartAllService(request)
    response.json(deletedProduct)
}
export {
    getProductsCartController,
    getCartByUserController,
    createProductCartController,
    deleteProductCartController,
    deleteProductCartAllController
}