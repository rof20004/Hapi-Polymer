'use strict';

exports.index = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    if (request.auth.isAuthenticated) {
      return reply.redirect('/home');
    }

    const user = {
      name: request.auth.credentials != null ? request.auth.credentials.email : '',
      isAuthenticated: request.auth.isAuthenticated,
      scopes: request.auth.credentials != null ? request.auth.credentials.scopes : ''
    };

    reply.view('index', user);
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};

exports.home = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    if (!request.auth.isAuthenticated) {
      return reply.redirect('/');
    }

    const user = {
      name: request.auth.credentials != null ? request.auth.credentials.email : '',
      isAuthenticated: request.auth.isAuthenticated,
      scopes: request.auth.credentials != null ? request.auth.credentials.scopes : ''
    };

    reply.view('index', user);
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};
