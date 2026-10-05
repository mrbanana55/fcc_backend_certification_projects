import jwt from "jsonwebtoken"

function validateJWT(token){
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch(err){
        return null
    }
}

export function authenticate(req, res, next){
    const authorization = req.headers.authorization
    if (!authorization || authorization.split(" ")[0] !== "Bearer"){
        return res.status(401).json({error: "No token provided."})
    }
    const token = authorization.split(" ")[1]
    const validToken  = validateJWT(token)
    if (!validToken){
        return res.status(401).json({error: "Invalid or expired token."})
    }
    req.user = validToken
    next()
}