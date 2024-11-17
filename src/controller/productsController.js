import * as productService from "../service/productService.js"

const getProductsController = async (request, response) => {
    try {
        const products = await productService.getProductsService()
        if (products.length === 0) {
            return response.status(404).json({ message: "Products not found" })
        }
        response.json(products)
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}
const getProductsCatalogController = async (request, response) => {
    try {
        const id = request.params.id
        const productSelected = await productService.getProductsService(id)
        if (!productSelected) return response.status(404).json({ message: "Products not found" })
        response.json(productSelected)
    } catch (error) {
        console.error(error)
    }
}
const getProductByNameController = async (request, response) => {
    try {
        const productSelected = await productService.getProductByNameService(request)
        response.json(productSelected)
    } catch (error) {
        console.error(error)
    }
}
const postProductController = async (request, response) => {

    const createProduct = await productService.createProductService(request)
    response.json(createProduct)
}

const updateProductController = async (req, res) => {
    
        const updateProduct = await productService.updateProductService(req)
        res.json(updateProduct)
}
const deleteProductController = async (request, response) => {
    const deletedProduct = await productService.deleteProductService(request)
    response.json(deletedProduct)
}
export {
    getProductsController,
    getProductsCatalogController,
    postProductController,
    updateProductController,
    deleteProductController,
    getProductByNameController,
}