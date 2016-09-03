'use strict';

exports.index = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    const user = {
      isAuthenticated: request.auth.isAuthenticated,
      isAdmin: true
    }
    reply.view('index', user);
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};
