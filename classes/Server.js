// servers:
//   - url: http://api.example.com/v1
//     description: Optional server description, e.g. Main (production) server

export default class Server {
  constructor({
    url,
    description
  }) {
    this._url = url;
    this._description = description;
  }

  /** @returns {string} server url */
  get url() { return this._url; }

  /** @returns {string} server description */
  get description() { return this._description; }

  toJSON() {
    const { url, description } = this;

    return {
      url,
      description
    };
  }
}
