'use strict';

const Boom = require('boom');
const Joi = require('joi');
const Contato = require('../models/contato');

exports.list = {
  handler: function(request, reply) {
    Contato.find({upline: request.auth.credentials[0].email}, (err, contatos) => {
      if (err) {
        return reply(Boom.badData('Internal MongoDB error', err));
      }
      reply(contatos);
    });
  }
}

exports.add = {
  handler: function(request, reply) {
    const contato = new Contato(request.payload);
    contato.upline = request.auth.credentials[0].email;
    contato.save((err, contato) => {
      if (err) {
        if (err.code === '11000') {
          return reply(Boom.badData('Já existe um contato cadastrado com o mesmo e-mail', err));
        }
        return reply(Boom.badData('Internal MongoDB error', err));
      }
      reply('Contato cadastrado com sucesso');
    });
  },
  validate: {
    payload: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      telefone: Joi.string().regex(/^\([1-9]{2}\) [2-9][0-9]{3,4}\-[0-9]{4}$/)
    }
  }
}

exports.update = {
  handler: function(request, reply) {
    Contato.findOne({
      '_id': request.params.contatoId
    }, function(err, contato) {
      if (!err) {
        contato.cadastrado = request.payload.cadastrado;
        contato.empreendedor = request.payload.empreendedor;
        contato.save(function(err, contato) {
          if (!err) {
            reply('Contato atualizado com sucesso');
          } else {
            reply(Boom.badImplementation('Erro na gravação das informações'));
          }
        });
      } else {
        reply(Boom.badImplementation('Erro na gravação das informações'));
      }
    });
  }
}
