const express = require("express");
const passengerCarCompaniesRouter = express.Router();
const {validateInput} = require("../middlewares/validation/isEmpty");
const {authentication} = require("../middlewares/authenticate/authentication");
const {authorization} = require("../middlewares/authorize/authorization");
const {createCompany, setImgforCarCompany, getAllCompanies, 
    getCompanyById, deleteCompany, updateCompany} = require("../controllers/passengerCarCompanies.controller");
const {uploadImg} = require("../middlewares/upload/upload-img");
const {checkId} = require("../middlewares/validation/findById");
const {passengerCarCompanies} = require("../models");

// người dùng muốn đki tài khoản làm company, nếu admin muốn tạo thì cấp quyền trong database (chức năng khác đang phát triển)
passengerCarCompaniesRouter.post("/",authentication,validateInput(["name"]) , authorization(["CLIENT"]), createCompany);
passengerCarCompaniesRouter.post("/setImg", authentication, authorization(["CarCompany"]), uploadImg("carCompany"), setImgforCarCompany);
passengerCarCompaniesRouter.get("/", getAllCompanies);
passengerCarCompaniesRouter.put("/:id", authentication, checkId(passengerCarCompanies),validateInput(["name"]) , authorization(["CarCompany"]), updateCompany);
passengerCarCompaniesRouter.delete("/:id", authentication, checkId(passengerCarCompanies), authorization(["CarCompany"]), deleteCompany);

module.exports = {
    passengerCarCompaniesRouter
}