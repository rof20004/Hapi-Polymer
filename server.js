'use strict';

const Hapi = require('hapi');
const Config = require('./config');
const Routes = require('./routes');

const server = new Hapi.Server();
server.connection({
  host: Config.server.host,
  port: Config.server.port,
  routes: {
    cors: true
  }
});

var options = {
  storeBlank: false,
  cookieOptions: {
    password: 'the-password-must-be-at-least-32-characters-long',
    isSecure: false
  }
};

server.register([
  require('inert'),
  require('vision'),
  require('hapi-auth-cookie')
], (err) => {

  if (err) {
    throw err;
  }

  server.auth.strategy('session', 'cookie', true, {
    password: 'SessionAuth_Pé_Sword_Hapi_Server_Stats', //Use something more secure in production
    //redirectTo: '/', //If there is no session, redirect here
    ttl: 1 * 60 * 60 * 1000, // Set session to 1 day
    isSecure: false //Should be set to true (which is the default) in production
  });

  server.route({
    method: "GET",
    path: "/{path*}",
    config: {
      auth: false,
      handler: {
        directory: {
          path: "./",
          listing: false,
          index: false
        }
      }
    }
  });

  server.route(Routes.endpoints);

  server.views({
    engines: {
      html: require('handlebars')
    },
    path: './',
    layout: 'index'
  });

  server.ext('onPreResponse', (request, reply) => {
    if (request.response.isBoom) {
      const err = request.response;
      const errName = err.output.payload.error;
      const message = err.output.payload.message;
      const statusCode = err.output.payload.statusCode;
      return reply.view('index', {
          statusCode: statusCode,
          errName: errName,
          message: message,
          isAuthenticated: request.auth.isAuthenticated,
          scopes: request.auth.credentials != null ? request.auth.credentials.scopes : ''
        }).code(statusCode);
    }
    reply.continue();
  });

  // Start the server
  server.start((err) => {
    console.log('Server   started:', server.info.uri);
  });
});
