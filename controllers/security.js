'use strict';

const Boom = require('boom');

exports.authentication = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    const user = request.payload;
    if (user.email.trim() != '' && user.senha.trim() != '') {
      request.cookieAuth.set(user);
      return reply.redirect('/');
    }
    reply(Boom.unauthorized('Usuário ou senha inválidos'));
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
    request.cookieAuth.clear();
    reply.redirect('/');
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
}
