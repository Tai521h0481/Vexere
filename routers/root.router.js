const express = require("express");
const rootRouter = express.Router();
const {seatsRouter} = require("./seats.router");
const {stationsRouter} = require("./stations.router");
const {ticketsRouter} = require("./tickets.router");
const {tripsRouter} = require("./trips.router");
const {usersRouter} = require("./users.router");
const {passengerCarCompaniesRouter} = require("./passengerCarCompanies.router");
const {vehicleRouter} = require("./vehicle.router");

rootRouter.use("/stations", stationsRouter);
rootRouter.use("/trips", tripsRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/passengerCarCompanies", passengerCarCompaniesRouter);
rootRouter.use("/vehicle", vehicleRouter);
rootRouter.use("/seats", seatsRouter);
rootRouter.use("/tickets", ticketsRouter);

module.exports = {
    rootRouter
}