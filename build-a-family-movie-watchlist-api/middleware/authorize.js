
export function authorizeModification(req, res, next){
    const userId = req.user.id;
    const role = req.user.role;
    
    if (role !== "parent" && role !== "child"){
        return res.status(403).json({error: "Access denied"})
    }
    if (role !== "parent" && req.params.userId != userId){
        return res.status(403).json({error: "Access denied"})
    }

    next()
}

