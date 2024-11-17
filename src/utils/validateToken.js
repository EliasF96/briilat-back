
import jsonwebtoken from "jsonwebtoken"
const jwt = jsonwebtoken
const validateToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return res.status(403).json({ message: "Unauthirized" })
    try {
        const { username } = jwt.verify(token, process.env.SECRET)
        req.username = username
        if (!username) return res.status(401).json({ message: "Unauthirized User" })
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Token wrong or expired!" , error: error})
    }
}
export default validateToken