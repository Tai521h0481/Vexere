const {users} = require("../../models")

const isCreated = async (req, res, next) => {
    const {email} = req.body;
    try {
        const user = await users.findOne({where: {email}});
        if(user){
            res.status(409).send("User already exists");
        }else{
            next();
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    isCreated
}