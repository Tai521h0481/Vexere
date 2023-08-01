const {trips, tickets} = require("../models") ;
const createTrip = async (req, res) => {
    const {fromStation, toStation, startTime, price} = req.body;
    const {data} = req.user;
    try {
        const trip = await trips.create({fromStation, toStation, startTime, price});
        await tickets.create({user_id: data.id, trip_id: trip.id});
        res.status(201).send(trip);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteTrip = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    try {
        await trips.destroy({where: {id}});
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateTrip = async (req, res) => {
    const {id} = req.params.id || req.body.id || req.query.id;
    const {fromStation, toStation, startTime, price} = req.body;
    try {
        const trip = await trips.update({fromStation, toStation, startTime, price}, {where: {id}});
        res.status(200).send(trip);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getAllTrips = async (req, res) => {
    res.status(200).send(await trips.findAll());
}

const getTripById = async (req, res) => {
    const {id} = req.params.id || req.body.id || req.query.id;
    try {
        const trip = await trips.findOne({where: {id}});
        res.status(200).send(trip);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createTrip,
    deleteTrip,
    updateTrip,
    getAllTrips,
    getTripById
}