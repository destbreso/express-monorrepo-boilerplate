
const RefParser = require('json-schema-ref-parser')

const schema = {
  "$schema": "http://json-schema.org/draft-04/schema#",
  "type": "object",
  "allOff": [
    {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "description": "The user's id",
          "minLength": 1,
          "example": 10
        }
      }
    },
    {
      "$ref": "new-user.json"
    }
  ]
}

RefParser.dereference(schema, (err, schema) => {
  if (err) {
    console.error(err);
  }
  else {
    // `schema` is just a normal JavaScript object that contains your entire JSON Schema,
    // including referenced files, combined into a single object
    console.log(schema);
  }
})