const validateInput = (requiredFields) => (req, res, next) => {
    for (const field of requiredFields) {
      if (!req.body[field]) {
        res.status(400).send(`Thiếu trường ${field}`);
        return;
      }
      if (typeof req.body[field] === 'string') {
        const value = req.body[field].trim();
        if (value.length === 0) {
          res.status(400).send(`Trường ${field} không được để trống`);
          return;
        }
      }
    }
    next();
}

module.exports = {
    validateInput
};
  