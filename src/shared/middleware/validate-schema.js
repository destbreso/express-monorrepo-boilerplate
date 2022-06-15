const Ajv = require("ajv")
const ajv = new Ajv()

const validate = (schema, data) => async (req, res, next) => { 
  const valid = ajv.validate(schema, data)
  if (!valid) {
    return res.status(400).json({
      error: ajv.errorsText()
    })
  }
  next()
}

module.exports = validate