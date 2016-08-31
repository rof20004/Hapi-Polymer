'use strict';

const Boom = require('boom');

exports.authentication = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    request.yar.set('user', {user: true});
    reply.redirect('/');
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
}

exports.deauthentication = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    request.yar.clear('user');
    reply.redirect('/');
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
}
