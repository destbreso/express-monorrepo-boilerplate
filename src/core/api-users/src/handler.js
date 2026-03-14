/**
 * CRUD express handler
 */

const debug = require('debug')('users-api:handler');

const handleRequest = (fn,...params) => async (req, res) => {
  try {
    debug(`handle ${fn.name} ${params}`);
    const handler = typeof fn === 'function' ? fn : null
    if (!handler) {
      debug(`${fn.name} is not a function`);
      return res.status(500).send({ message: 'not implemented' });
    }
    let result = await handler(...params)
    return res.status(200).send({ data: result })

  } catch (e) {
    console.log(e)
    debug('Error notification', e) // notify error in some way
    // if (e instanceof MissingArgumentError) { 
    //   debug(`${fn.name} expected params`);
    //   return res.status(400).send({ message: 'expected params' })
    // }
    
    return res.status(500).send() // not pass error trace to client
  }
}


module.exports = (controller) => {
  return {
    create: async (req,res) => handleRequest(controller.create, req.body)(req,res),
    getById: async (req,res) => handleRequest(controller.getById, req.params.id)(req,res),
    search: async (req, res) => handleRequest(controller.search,req.query)(req,res),
    update: async (req,res) => handleRequest(controller.update, req.params.id, req.body)(req,res),
    delete: async (req,res) => handleRequest(controller.delete, req.params.id)(req,res),
  }
}