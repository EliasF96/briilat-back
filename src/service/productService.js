import productModel from "../models/productModel.js"
import jsonwebtoken from "jsonwebtoken"
import userModel from "../models/userModel.js"
const jwt = jsonwebtoken
const getProductsService = async () => {
    try {
        const productsList = await productModel.find()
        return productsList
    } catch (error) {
        console.log("A error appears" + error)

    }
}

const getProductByNameService = async (request) => {
    try {
        const name = request.params.name
        const productSelected = await productModel.findOne({ name: name })        // const products = await readDataBase()
        // const productSelected = products.find((item) => item.id === id)
        if (!productSelected) return { message: "Product not found" }
        return productSelected
    } catch (error) {
        console.error(error)
        throw new Error("Internal error Server?")
    }
}

const createProductService = async (req, res) => {
    try {
        const newProduct = req.body
        const newProductDB = new productModel({
            id: newProduct.id,
            name: newProduct.name,
            price: newProduct.price,
            stock: newProduct.stock,
            category: newProduct.category,
            description: newProduct.description,
            img: newProduct.img
        })
        await newProductDB.save()
        return { message: "Product added successfully :D" }
    } catch (error) {
        console.log(error)
        return { message: "Error " }
    }
}



const updateProductService = async (req) => {
    const token = req.cookies.access_token
    const userdata = jwt.verify(token, process.env.SECRET)

    try {
        const id = req.params.id
        const updateProduct = req.body
        const user = await userModel.find({ username: userdata.username })
        if (user[0].rol == "admin") {
            const product = await productModel.findOneAndUpdate({ _id: id }, updateProduct)
            if (!product) {
                return { message: "Producto no encontrado" }
            }
            return { message: "Cambios Realizados" }
        } else {
            return { message: "No tienes permisos para realizar esta acción" }
        }
    } catch (error) {
        console.error(error)
        return { message: "Error updating the product" }
    }
}
const deleteProductService = async (request, response) => {
    try {
        const id = request.params.id
        const deleteProduct = await productModel.deleteOne({ _id: id })
        if (deleteProduct.deletedCount == 0) return { message: "Product not found" }
        return { message: "Product Deleted" }
    } catch (error) {
        console.log(error)
    }
}
export {
    getProductsService,
    createProductService,
    updateProductService,
    deleteProductService,
    getProductByNameService,
}
//EL DATABASE LOCAL TAMBIEN SE ACTUALIZA SI TIENE LA EXTENSION JSON EN VEZ DE TXT.