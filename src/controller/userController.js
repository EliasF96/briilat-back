import userModel from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import cartModel from "../models/cartModel.js"
const jwt = jsonwebtoken
const generateJWT = (username) => {
    const payload = { username }
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1 h" })
    return token
}

const registerController = async (req, res) => {
    try {
        const { username, password, rol } = req.body
        const hashPassword = bcrypt.hashSync(password, 10) //el numero indica las veces que hashea o "pica"
        const newUser = new userModel({ username, password: hashPassword, rol })
        !req.body.hasOwnProperty("rol") ? newUser.rol = "cliente" : ""
        await newUser.save()
        return res.status(201).json({ message: "User registered susccessfullly :D" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Server error D:", error: error })
    }
}
const loginController = async (req, res) => {
    const { username, password } = req.body
    try {
        const user = await userModel.findOne({ username })
        if (!user) return res.status(400).json({ ok: false, message: "Wrong Username" })
        const isvalidPassword = bcrypt.compareSync(password, user.password)
        if (!isvalidPassword) return res.status(400).json({ message: "Wrong  password" })
        const token = generateJWT(username)

        res.cookie("access_token", token)
        res.status(200)
            .json({ ok: true, data: user, message: "Iniciaste sesion ;D" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error D:" })
    }
}

const logoutController = (req, res) => {
    console.log("Loged out")
    return res
        .clearCookie("access_token")
        .status(200)
        .json({ message: "You logged out!" })
}
const validateUser = async (req, res) => {
    try {
    const token = req.cookies.access_token
    const user = jwt.verify(token, process.env.SECRET)
    const result = await userModel.findOne({username : user.username})
    return res.json( {rol: result.rol, username: result.username})
} catch (error) {
    console.log(error)       
}
}
export { loginController, logoutController, registerController, validateUser }