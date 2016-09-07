'use strict';

exports.index = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    const user = {
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
