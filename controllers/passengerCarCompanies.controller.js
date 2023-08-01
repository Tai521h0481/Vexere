const {passengerCarCompanies, users, sequelize} = require("../models");
const gravatar = require('gravatar');
const {checkLogIn_ResToken} = require("./users.controller");

const createCompany = async (req, res) => {
    const {name} = req.body;
    const {data} = req.user;
    const image = gravatar.url(data.email, {s: '100', r: 'x', d: 'retro'}, true);
    try {
        if(data.type === "CLIENT"){
            const newCompany = await passengerCarCompanies.create({
                name,
                image,
                users_id: data.id
            });
            await users.update({type: "CarCompany"}, {where: {id: data.id}});
            const newToken = await checkLogIn_ResToken(data.email, data.password);
            console.log(data.email, data.password);
            res.status(201).send({users, newCompany, newToken});
        }else{
            res.status(400).send("Only an account for a company");
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const setImgforCarCompany = async (req, res) => {
    const {file} = req;
    const url = `http://localhost:3000/${file.path}`;
    const {data} = req.user;
    try {
        const company = await passengerCarCompanies.findOne({where: {users_id: data.id}});
        company.image = url;
        await company.save();
        res.status(200).send(company);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const getAllCompanies = async (req, res) => {
    try {
        const [results] = await sequelize.query(`SELECT * FROM passengerCarCompanies`);
        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getCompanyById = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    try {
        const company = await passengerCarCompanies.findOne({where: {id}});
        res.status(200).send(company);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteCompany = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    const {data} = req.user;
    try {
        await passengerCarCompanies.destroy({where: {id}});
        await users.update({type: "CLIENT"}, {where: {id: data.id}});
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateCompany = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    const {name} = req.body;
    try {
        await passengerCarCompanies.update({name}, {where: {id}});
        const company = await passengerCarCompanies.findOne({where: {id}});
        res.status(200).send(company);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    createCompany,
    setImgforCarCompany,
    getAllCompanies,
    getCompanyById,
    deleteCompany,
    updateCompany
}