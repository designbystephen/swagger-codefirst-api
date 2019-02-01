import Api from './classes/Api';

const api = new Api({
  title: 'My API',
  description: 'First API',
  version: '1.0.0',
});

api
.addServer({
  url: 'http://localhost:5000',
  description: 'Local server',
})
.addEndpoint({
  path: '/status',
  summary: 'Status of API',
})
.addOperation({})
.addResponse({ status: '200', description: 'OK' })

console.log(JSON.stringify(api.toJSON(), 2, 1));
