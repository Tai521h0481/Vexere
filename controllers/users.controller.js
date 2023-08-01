const {users} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const SECRET_KEY = "JWT_SECRET";
const tokenTime = "1000h";
const gravatar = require('gravatar');

const getAllUsers = async (req, res) => {
    res.status(200).send(await users.findAll());
}

const getUserById = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    try {
       res.status(200).send(await users.findOne({where: {id}}));
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    const {name, email, password, type} = req.body;
    try {
        const user = await users.findByPk(id);
        const hash = bcrypt.hashSync(password, 10);
        Object.assign(user, { name, email, password:hash, type });
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    try {
        await users.destroy({where: {id}});
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const createUser = async (req, res) => {
    const {name, email, password} = req.body;
    const secureUrl = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, true);
    try {
        const hash = bcrypt.hashSync(password, 10);
        const newUser = await users.create({name, email, password:hash, avatar: secureUrl});
        res.status(201).send(newUser);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const checkLogIn_ResToken = async (email, password) => {
    try {
        const user = await users.findOne({where: {email}});
        if(user){
            const isMatch = bcrypt.compareSync(password, user.password) || password === user.password;
            if(isMatch){
                const token = jwt.sign({data: user}, SECRET_KEY, {expiresIn: tokenTime});
                return {id:user.id, token: token};
            }else{
               return "Wrong password";
            }
        }else{
            return "User not found";
        }
    } catch (error) {
        return (error.message);
    }
};

const logIn = async (req, res) => {
    const {email, password} = req.body;
    const result = await checkLogIn_ResToken(email, password);
    if(result.token){
        res.status(200).send(result);
    }else{
        res.status(400).send(result);
    }
}

const upLoadAvatar = async (req, res) => {
    const {file} = req;
    const urlImg = `http://localhost:3000/${file.path}`;
    const {data} = req.user;
    try {
        const user = await users.findByPk(data.id);
        user.avatar = urlImg;
        await user.save();
        res.status(200).send(user);
    }
    catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser,
    logIn,
    SECRET_KEY,
    upLoadAvatar,
    checkLogIn_ResToken
}