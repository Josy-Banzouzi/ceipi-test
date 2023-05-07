const Db = require('../models/index');
const jwt = require('jsonwebtoken');
const User = Db.User;

auhorize = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send({message: "Unauthorized"})
    }

    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, "CEIPI-TEST", (error, decoded)=> {
        if(error){
            return res.status(401).json({message: error.message});
        }
        req.id = decoded;
        User.findByPk(decoded.id)
            .then((user) => {
                if(!user){
                    return res.status(401).send({message: "User not found"});
                }
                next();
            })
    })

}

module.exports = auhorize;