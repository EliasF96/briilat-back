import cartModel from "../models/cartModel.js"
import userModel from "../models/userModel.js"
import * as mongoose from "mongoose"
import jsonwebtoken from "jsonwebtoken"
const jwt = jsonwebtoken

const getProductsCartService = async () => {
    try {
        const productsList = await userModel.find() //REEMPLAZAMOS EL readDataBase()
        return productsList
    } catch (error) {
        console.log("A error appears" + error)
        //HAY MILES DE FORMAS DE TRATAR CON  ERRORES, LIBRERIAS Y FRAMEWORKS
        throw new Error("Internal error Server?")
    }
}

const getCartByUserService = async(req)=>{
    const token = req.cookies.access_token
    const user = jwt.verify(token, process.env.SECRET)
    try {
        const userCartList = await cartModel.find({ username: user.username })
        return userCartList
    } catch (error) {
        console.log("A error appears" + error)
        return {error: error }
    }
}
const createProductCartService = async (req) => {
    const token = req.header("Authorization") || req.cookies.access_token
    const userdata = jwt.verify(token, process.env.SECRET)
    try {
        const userCartList = await cartModel.find({ username: userdata.username })
        let reqBodyList = req.body
        for (let i = 0; i < userCartList.length; i++) {
            for (let j = 0; j < reqBodyList.length; j++) {

                if (reqBodyList[j].id == userCartList[i].productId) {
                    console.log(`${reqBodyList[j].name} Tiene coincidencias`)
                    const newAmount = Number(reqBodyList[j].amount) + Number(userCartList[i].amount)
                    await cartModel.findOneAndUpdate({ productId: reqBodyList[j]["_id"], username: userdata.username }, { amount: newAmount })
                    reqBodyList.splice(j, 1)
                }
            }
        }

        for (const i in reqBodyList) {
            const generatedId = new mongoose.Types.ObjectId();
            const newCartItem = reqBodyList[i]
            const newCartItemBD = new cartModel({
                _id: generatedId,
                img: newCartItem.img,
                name: newCartItem.name,
                price: newCartItem.price,
                amount: newCartItem.amount,
                productId: newCartItem["_id"],
                username: userdata.username
            })
            console.log("Item añadido al carro")
            await newCartItemBD.save()
        }
        return { message: "Item added to cart" }
    } catch (error) {
        console.log(error)
        return { error: error }
    }
}
const deleteProductCartService = async (req) => {
    try {
        const id = req.params.id
        const deleteProduct = await cartModel.deleteOne({ _id: id })
        console.log("Eliminaste el producto")
        return deleteProduct
    } catch (error) {
        console.log(error)
    }
}

const deleteProductCartAllService = async (req) => {
    const token = req.header("Authorization") || req.cookies.access_token
    const userdata = jwt.verify(token, process.env.SECRET)
    console.log(userdata)
    try {
        const deleteProduct = await cartModel.deleteMany({ username: userdata.username })
        return deleteProduct
    } catch (error) {
        console.log(error)
    }
}
export {
    getProductsCartService,
    createProductCartService,
    deleteProductCartService,
    deleteProductCartAllService,
    getCartByUserService
}
//EL DATABASE LOCAL TAMBIEN SE ACTUALIZA SI TIENE LA EXTENSION JSON EN VEZ DE TXT.