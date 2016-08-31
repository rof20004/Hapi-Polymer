'use strict';

exports.index = {
  auth: {
    mode: 'try'
  },
  handler: function(request, reply) {
    var user = null;
    if (request.yar.get('user') != undefined) {
      user = request.yar.get('user');
    }
    reply.view('index', user);
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};
