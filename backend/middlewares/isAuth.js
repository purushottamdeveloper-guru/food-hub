import jwt from "jsonwebtoken"

const isAuth = async (req, res, next) => {
    try {
        console.log("COOKIES:", req.cookies)

        const token = req.cookies?.token

        console.log("TOKEN:", token)

        if (!token) {
            return res.status(400).json({
                message: "token not found"
            })
        }

        const decodeToken = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        console.log("DECODE TOKEN:", decodeToken)

        if (!decodeToken) {
            return res.status(400).json({
                message: "token not verify"
            })
        }

        req.userId = decodeToken.userId

        next()

    } catch (error) {
        console.log("AUTH ERROR:", error)

        return res.status(500).json({
            message: "isAuth error"
        })
    }
}

export default isAuth



