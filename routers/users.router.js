const express = require("express");
const usersRouter = express.Router();
const {users} = require("../models");
const {checkId} = require("../middlewares/validation/findById");
const {getAllUsers, getUserById, updateUser, deleteUser, createUser, logIn, upLoadAvatar} = require("../controllers/users.controller");
const {validateInput} = require("../middlewares/validation/isEmpty");
const {isCreated} = require("../middlewares/validation/isCreated");
const {uploadImg} = require("../middlewares/upload/upload-img");
const { authentication } = require("../middlewares/authenticate/authentication");

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", checkId(users), getUserById);
usersRouter.post("/", validateInput(["name", "email", "password"]), isCreated, createUser);
usersRouter.put("/:id", checkId(users),validateInput(["name" , "email", "password"]), updateUser);
usersRouter.delete("/:id", checkId(users), deleteUser);

usersRouter.post("/login", validateInput(["email", "password"]), logIn);
usersRouter.post("/upload-avatar", authentication, uploadImg("avatar"), upLoadAvatar);


module.exports = {
    usersRouter
}