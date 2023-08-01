const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require("../../controllers/users.controller");

const authentication = (req, res, next) => {
    const {token} = req.headers;
    if(token){
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            if(decoded){
                req.user = decoded;
                next();
            }
            else{
                res.status(401).send("invalid token");
            }
        } catch (error) {
            res.status(401).send(error.message);
        }
    }else{
        res.status(401).send("required token");
    }
}

module.exports = {
    authentication
}