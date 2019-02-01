// get:
//       tags:
//         - Users
//       summary: Gets a user by ID.
//       description: >
//         A detailed description of the operation.
//         Use markdown for rich text representation,
//         such as **bold**, *italic*, and [links](https://swagger.io).
//       operationId: getUserById
//       parameters:
//         - name: id
//           in: path
//           description: User ID
//           required: true
//           schema:
//             type: integer
//             format: int64
//       responses:

import { merge } from 'lodash/object';
import Response from './Response';

export default class Operation {
  constructor({
    method = 'get',
    summary = '',
    description = '',
    router,
    handler = () => {},
  }) {
    // set initial variables
    this._method = method;
    this._summary = summary;
    this._description = description;
    this._router = router;
    this._handler = handler;

    // create collections
    this._responses = new Set();
  }

  /** @returns {string} operation method */
  get method() { return this._method; }

  /** @returns {string} operation summary */
  get summary() { return this._summary; }

  /** @returns {string} operation description */
  get description() { return this._description; }

  /** @returns {Object} express router from endpoint */
  get router() { return this._router; }

  /** @returns {Function} express request handler */
  get handler() { return this._handler; }

  /** @returns {<Response>[]} */
  get responses() { return this._responses; }

  addResponse({ ...params }){
    const response = new Response({ ...params });
    this._responses.add(response);

    return response;
  }

  getAllResponses(operation) {
    [...this.responses].forEach(
      response => merge(operation, response.toJSON())
    );

    return operation;
  }

  toJSON() {
    const { method, summary, description } = this;

    return {
      [method]: this.getAllResponses({
        summary,
        description,
      })
    }
  }
}
