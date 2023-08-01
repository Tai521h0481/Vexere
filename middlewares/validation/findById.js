const { sequelize } = require("../../models");

const checkId = (Model) => async (req, res, next) => {
    const id = req.params.id || req.body.id || req.query.id;
    if (id) {
      const model = await Model.findOne({ where: { id } });
      if (model) {
        return next();
      } else {
        res.status(404).send(`id not found in ${Model.name}`);
      }
    }
  }

const checkForeign = (Model, input) => async (req, res, next) => {
  try{
    const [results] = await sequelize.query(`SELECT * FROM ${Model.name} WHERE id = ${req.body[input]}`);
    if(results.length === 0){
      res.status(404).send(`Foreign_Key: id not found in ${Model.name}`);
    }else{
      return next();
    }
  }catch(error){
    res.status(500).send(error.message);
  }
}

const checkFrom_To = (Model) => async (req, res, next) => { 
  const {fromStation, toStation} = req.body;
  if(fromStation === toStation){
    res.status(400).send("fromStation and toStation must be different");
  }else{
    return next();
  }
}
  
module.exports = {
    checkId,
    checkForeign,
    checkFrom_To
};