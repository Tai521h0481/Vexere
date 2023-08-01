const express = require("express");
const tripsRouter = express.Router();
const {createTrip, getAllTrips, getTripById, updateTrip, deleteTrip} = require("../controllers/trips.controller.js");
const {validateInput} = require("../middlewares/validation/isEmpty");
const {checkId, checkFrom_To} = require("../middlewares/validation/findById");
const {trips, stations} = require("../models");
const {authentication} = require("../middlewares/authenticate/authentication");
const {authorization} = require("../middlewares/authorize/authorization");
const {checkForeign} = require("../middlewares/validation/findById");

// có thể chỉ super-admin mới được phép thêm, sửa, xóa
tripsRouter.get("/", getAllTrips);
tripsRouter.get("/:id", checkId(trips), getTripById);
tripsRouter.post("/", authentication, authorization(["ADMIN", "CarCompany"]), 
    validateInput(["fromStation", "toStation", "startTime", "price"]), 
    checkFrom_To(stations),
    checkForeign(stations, "fromStation"), 
    checkForeign(stations, "toStation"),
    createTrip);
tripsRouter.put("/:id", checkId(trips), updateTrip);
tripsRouter.delete("/:id", checkId(trips), deleteTrip);

module.exports = {
    tripsRouter
}