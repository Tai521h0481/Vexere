const express = require("express");
const stationsRouter = express.Router();
const{stations} = require("../models");
const {checkId} = require("../middlewares/validation/findById");
const {getAllStations, getStationById, updateStation, deleteStation, createStation} = require("../controllers/stations.controller");
const {validateInput} = require("../middlewares/validation/isEmpty");
const {authentication} = require("../middlewares/authenticate/authentication");
const {authorization} = require("../middlewares/authorize/authorization");

stationsRouter.get("/", getAllStations);
stationsRouter.get("/:id", checkId(stations), getStationById);
stationsRouter.post("/", authentication, authorization(["ADMIN"]),validateInput(["name" , "address", "province"]), createStation);
stationsRouter.put("/:id", checkId(stations), validateInput(["name" , "address", "province"]), updateStation);
stationsRouter.delete("/:id", checkId(stations), deleteStation);

module.exports = {
    stationsRouter
}