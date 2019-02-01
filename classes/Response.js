// responses:
//         '200':
//           description: A list of users
//           content:
//             application/json:
//               schema:

export default class Response {
  constructor({
    status = '200',
    description = '',
  }) {
    // set intitial properties
    this._status = status;
    this._description = description;

    // create initial schema set
    this._schemas = new Set();
  }

  /** @returns {string} response status code */
  get status() { return this._status; }

  /** @returns {string} response description */
  get description() { return this._description; }

  /** @returns {<Schemas>[]} array of Schema instances */
  get schemas() { return this._schemas; }

  addSchema({ ...args }) {
    const schema = new Schema({ ...args });
    this._schemas.add(schema);

    return schema;
  }

  toJSON() {
    const { status, description } = this;

    return {
      [status]: {
        description,
      },
    };
  }
}
