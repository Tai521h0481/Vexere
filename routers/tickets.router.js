const express = require("express");
const ticketsRouter = express.Router();
const {getAllTripsforClient,
    createTripforClient,
    getTripByIdforClient,
    deleteTripforClient,
    updateTripforClient} = require("../controllers/tickets.controller");
const {authentication} = require("../middlewares/authenticate/authentication");
const {checkId, checkForeign} = require("../middlewares/validation/findById");
const {tickets, trips} = require("../models");
// const {authorization} = require("../middlewares/authorize/authorization");

ticketsRouter.get("/", authentication, getAllTripsforClient);
ticketsRouter.post("/", authentication, checkForeign(trips, "trip_id"), createTripforClient);
ticketsRouter.get("/:id", authentication, checkId(tickets), getTripByIdforClient);
ticketsRouter.delete("/:id", authentication, checkId(tickets),deleteTripforClient);
ticketsRouter.put("/:id", authentication, checkId(tickets), checkForeign(trips, "trip_id"), updateTripforClient);

module.exports = {
    ticketsRouter
}