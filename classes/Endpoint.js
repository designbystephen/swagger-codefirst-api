// /users/{id}:
//     summary: Represents a user
//     description: >
//       This resource represents an individual user in the system.
//       Each user is identified by a numeric `id`.
//     get:

import express from 'express';
import { merge } from 'lodash/object';
import Operation from './Operation';

export default class Endpoint {
  constructor({
    path,
    summary = '',
    description = '',
  }) {
    // set initial variables
    this._path = path;
    this._summary = summary;
    this._description = description;

    // create collection of operations
    this._operations = new Set();

    // create router
    this._router = express.Router();
  }

  /** @returns {string} endpoint path */
  get path() { return this._path; }

  /** @returns {string} endpoint summary */
  get summary() { return this._summary; }
  
  /** @returns {string} endpoint description */
  get description() { return this._description; }

  /** @returns {<Operation>[]} endpoint path */
  get operations() { return this._operations; }

  /** @returns {Object} express router */
  get router() { return this._router; }

  addOperation({ ...args }) {
    const operation = new Operation({router: this.router, ...args});
    this._operations.add(operation);

    return operation;
  }

  getAllOperations(path) {
    [...this.operations].forEach(
      operation => merge(path, operation.toJSON())
    );

    return path;
  }

  toJSON() {
    const { path, summary, description } = this;

    return {
      [path]: this.getAllOperations({
        summary,
        description,
      })
    };
  }
}
