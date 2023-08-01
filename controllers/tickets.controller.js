const {tickets, sequelize} = require("../models");

const getAllTripsforClient = async (req, res) => {
    const {data} = req.user;
    try {
        // lấy chuyến đi client đã đặt vé
        const q = `SELECT tickets.id, users.email, stations.name as "from", stations2.name as "to", trips.startTime as "start", trips.price
        FROM trips
        JOIN tickets ON trips.id = tickets.trip_id
        JOIN users ON tickets.user_id = users.id
        JOIN stations ON stations.id = trips.fromStation
        JOIN stations AS stations2 ON  stations2.id = trips.toStation
        `;
        if(data.type ===  "CLIENT"){
            let [results] = await sequelize.query(q + ` Where users.type = "CLIENT" and users.id = ${data.id}`);
            if(results.length === 0){
                res.status(404).send("Not found! You haven't booked any trips yet");
            }
            else{
                res.status(200).send(results);
            }
        }
        else{
            [results] = await sequelize.query(q);
            res.status(200).send(results);
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const createTripforClient = async (req, res) => {
    const {data} = req.user;
    const {trip_id} = req.body;
    try {
        const newTicket = await tickets.create({user_id: data.id, trip_id});
        res.status(201).send(newTicket);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getTripByIdforClient = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    try {
        const ticket = await tickets.findOne({where: {id}});
        res.status(200).send(ticket);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteTripforClient = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    try {
        await tickets.destroy({where: {id}});
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const updateTripforClient = async (req, res) => {
    const id = req.params.id || req.body.id || req.query.id;
    const {trip_id} = req.body;
    try {
        await tickets.update({trip_id}, {where: {id}});
        const ticket = await tickets.findOne({where: {id}});
        res.status(200).send(ticket);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

module.exports = {
    getAllTripsforClient,
    createTripforClient,
    getTripByIdforClient,
    deleteTripforClient,
    updateTripforClient
}