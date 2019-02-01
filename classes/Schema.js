// schema:
//   $ref: '#/components/schemas/User'
// components:
//   schemas:

export default class Schema {
  constructor({
    name,
    mediaType = 'application/json',
    model = {},
  }) {
    // set initial properties
    this._name = name;
    this._mediaType = mediaType;
    this._model = model;

    // component reference
    this._ref = `'#/components/schemas/${name}`;
  }

  /** @returns {string} reference name of schema */
  get name() { return this._name; }
  
  /** @returns {string} mediatype schema belongs to */
  get mediaType() { return this._mediaType; }

  /** @returns {Object} json object describing model */
  get model() { return this._model; }

  /** @returns {string} component reference to schema */
  get ref() { return this._ref; }
}
