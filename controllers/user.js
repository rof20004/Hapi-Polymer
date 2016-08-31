'use strict';

const Boom = require('boom');
const Joi = require('joi');
const User = require('../models/user');
const Bcrypt = require('bcrypt');

exports.login = {
  auth: {mode: 'try'},
  handler: function(request, reply) {
    User.find({email: request.payload.email}, (err, user) => {
      if (err) {
        return reply(Boom.badData('Internal MongoDB error', err));
      }

      if (user.length > 0) {
        if (Bcrypt.compareSync(request.payload.password, user[0].password)) {
          request.cookieAuth.set(user);
          return reply('/');
        } else {
          return reply(Boom.unauthorized('Usuário ou senha inválidos', err));
        }
      } else if (user.length == 0) {
        return reply(Boom.unauthorized('Usuário não encontrado', err));
      }

      reply('/login');
    });
  },
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
  plugins: {
    'hapi-auth-cookie': {
      redirectTo: false
    }
  }
};

exports.logout = {
  handler: function(request, reply) {
    request.cookieAuth.clear();
    reply.redirect('/login');
  }
}

exports.register = {
  auth: false,
  handler: function(request, reply) {
    request.payload.password = Bcrypt.hashSync(request.payload.password, 10);
    request.payload.scope = 'Customer';

    const user = new User(request.payload);
    user.save((err, user) => {
      if (err) {
        return reply(Boom.badData('Ocorreu um erro ao cadastrar o usuário, tente novamente mais tarde.', err));
      }
      reply('Usuário cadastrado com sucesso');
    });
  },
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
}

exports.resetPassword = {
  auth: false,
  handler: function(request, reply) {
    request.payload.password = Bcrypt.hashSync(request.payload.password, 10);
    request.payload.scope = 'Customer';

    const user = new User(request.payload);
    user.save((err, user) => {
      if (err) {
        return reply(Boom.badData('Ocorreu um erro ao cadastrar o usuário, tente novamente mais tarde.', err));
      }
      reply('Usuário cadastrado com sucesso');
    });
  },
  validate: {
    payload: {
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }
  },
}
