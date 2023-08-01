const {stations} = require("../models");

const getAllStations = async (req, res) => {
    res.status(200).send(await stations.findAll());
}

const getStationById = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    try {
       res.status(200).send(await stations.findOne({where: {id}}));
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateStation = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    const {name, address, province} = req.body;
    try {
        const station = await stations.findByPk(id);
        Object.assign(station, { name, address, province });
        await station.save();
        res.status(200).send(station);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteStation = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    try {
        await stations.destroy({where: {id}});
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const createStation = async (req, res) => {
    const {name, address, province} = req.body;
    try {
        const newStation = await stations.create({name, address, province});
        res.status(200).send(newStation);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllStations,
    getStationById,
    updateStation,
    deleteStation,
    createStation
}