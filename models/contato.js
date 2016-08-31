'use strict';

var Mongoose = require('../database').Mongoose;

var contatoSchema = new Mongoose.Schema({
	nome: {
    type: String,
    required: true
  },
	email: {
    type: String,
    required: true,
    index: {unique: true}
  },
	telefone: {
    type: String,
    required: true
  },
  cadastrado: {
    type: Boolean,
    default: false
  },
  empreendedor: {
    type: Boolean,
    default: false
  },
	creationDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  upline: {
    type: String,
    required: true
  }
});

module.exports = Mongoose.model('Contato', contatoSchema, 'contato');
