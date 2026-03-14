const YAML = require('yamljs');
const YAMLParser = require('json2yaml')
const swaggerJsondoc = require("swagger-jsdoc");
const path = require('path');
const fs = require('fs');

const outFileName = '_swagger.json';
const swaggerComponentsFileName = '_swagger-components.json';

const params = process.argv.slice(2);
const swaggerDefinitionPath = params[0];

if (!swaggerDefinitionPath) {
  console.log('Usage: node gen-swagger-file.js swagger-definition-path <swagger-output-path>');
}

const basePath = path.dirname(swaggerDefinitionPath)
const specExtension = path.extname(swaggerDefinitionPath).slice(1)

let loader
if (specExtension === 'json') loader = require
else if (specExtension === 'yaml') loader = YAML.load
else {
  console.log('Unsupported spec file extension: ' + specExtension);
}

if (loader) {
  const swaggerConf = loader(swaggerDefinitionPath);
  const openapiSpecification = swaggerJsondoc(swaggerConf);

  const swaggerComponents = loader(path.join(basePath, swaggerComponentsFileName));
  openapiSpecification.components = swaggerComponents;

  const outputFile = path.join(basePath, outFileName);
  fs.writeFileSync(outputFile, JSON.stringify(openapiSpecification));
}




