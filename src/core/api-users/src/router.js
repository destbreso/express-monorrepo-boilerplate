const express = require('express');
const controller = require('./../../../connectors/jsonplayholder').users;
const handle = require('./handler')(controller);

const app = express()
const router = express.Router();

/**
 * @openapi
 * tags:
 *  - name: users
 *    description: Users
 *    externalDocs:
 *      url: http://docs.my-business.com/users.htm
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users.
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     tags:
 *      - users
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/UserSearch'
 *       401:
 *         $ref: '#/components/responses/ErrorUnauthorized'
 */
router.get('/',  handle.search);


 /**
 * @openapi
 * /users/{id}:
 *   get:
 *     operationId: getUserById
 *     summary: Retrieve a single JSONPlaceholder user.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *      - users
 *     security:
 *      - bearerAuth: []
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
 *       401:
 *         $ref: '#/components/responses/ErrorUnauthorized'
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
 *     security:
 *      - bearerAuth: []
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
 *       401:
 *         $ref: '#/components/responses/ErrorUnauthorized'
 *     links:
 *        getUserByUserId:
 *          operationId: getUserById
 *          parameters:
 *            id: '$response.body#/id'
 *          description: >
 *            The `id` value returned in the response can be used as
 *            the `{id}` parameter in `GET /users/{id}`.
 *
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
 *    security:
 *      - bearerAuth: []
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
 *       401:
 *         $ref: '#/components/responses/ErrorUnauthorized'
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
 *    security:
 *      - bearerAuth: []
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
 *      401:
 *         $ref: '#/components/responses/ErrorUnauthorized'
 */
router.delete('/:id', handle.delete);

app.use('/', router);

module.exports = app;
