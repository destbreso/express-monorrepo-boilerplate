const express = require('express');
const controller = require('./../../../connectors/jsonplayholder').users;
const handle = require('./handler')(controller);

const app = express()
const router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     tags:
 *      - users
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UserSearch'
 */
router.get('/',  handle.search);


 /**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *      - users
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *          type: integer
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UserGetById'
*/
router.get('/:id', handle.getById);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a JSONPlaceholder user.
 *     description: Create a JSONPlaceholder user. Can be used to create a new user when prototyping or testing an API.
 *     operationId: createUser
 *     tags:
 *      - users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewUser'
 *     responses:
 *       201:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UserCreate'
*/
router.post('/', handle.create);

/**
 * @openapi
 * /users/{id}:
 *  put:
 *    summary: Update a user by ID
 *    description: Update a user by ID
 *    tags:
 *      - users
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *          type: integer
 *    responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UserUpdate'
 */
router.put('/:id', handle.update);

/**
 * @openapi
 * /users/{id}:
 *  delete:
 *    summary: Delete a user by ID
 *    description: Delete a user by ID
 *    tags:
 *      - users
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *        schema:
 *          type: integer
 *    responses:
 *      204:
 *        description: No content.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/responses/UserDelete'
 */
router.delete('/:id', handle.delete);


app.use('/', router);
app.use('/v1', router);

module.exports = app;
