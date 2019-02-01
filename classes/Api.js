// openapi: 3.0.0
// info:
//   title: Sample API
//   description: Optional multiline or single-line description in [CommonMark](http://commonmark.org/help/) or HTML.
//   version: 0.1.9
// servers:
//   - url: http://api.example.com/v1
//     description: Optional server description, e.g. Main (production) server
//   - url: http://staging-api.example.com
//     description: Optional server description, e.g. Internal staging server for testing

import { merge } from 'lodash/object';
import Server from './Server';
import Endpoint from './Endpoint';

export default class Api {
  constructor({
    openapi = '3.0.0',
    title,
    description,
    version
  }) {
    // set initial variables
    this._openapi = openapi;
    this._title = title;
    this._description = description;
    this._version = version;

    // set empty servers
    this._servers = new Set();

    // set empty endpoints
    this._endpoints = new Set();
  }

  /** @returns {string} openapi version */
  get openapi() { return this._openapi; }

  /** @returns {string} api title */
  get title() { return this._title; }

  /** @returns {string} api description */
  get description() { return this._description; }

  /** @returns {string} api version */
  get version() { return this._version; }

  /** @returns {<Server>[]} array of Server instances*/
  get servers() { return this._servers; }

  /** @returns {<Endpoint>[]} array of Endpoint instances */
  get endpoints() { return this._endpoints; }

  addServer({ ...args }) {
    // create new server and add to set
    const server = new Server({ ...args });
    this._servers.add(server);

    return this;
  }

  addEndpoint({ ...args }) {
    // create new endpoint and add to set
    const endpoint = new Endpoint({ ...args });
    this._endpoints.add(endpoint);

    return endpoint;
  }

  getAllPaths() {
    // empty object
    const paths = {};

    [...this.endpoints].forEach(
      // merge each endpoint path with growing set of endpoints
      endpoint => merge(paths, endpoint.toJSON())
    );

    return paths;
  }

  toJSON() {
    const {
      openapi,
      title,
      description,
      version,
      servers,
      endpoints,
    } = this;

    return {
      openapi,
      info: {
        title,
        description,
        version,
      },
      servers: [...servers].map(server => server.toJSON()),
      paths: this.getAllPaths(),
    };
  }
}
