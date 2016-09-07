'use strict';

const Pages = require('./pages');
const Security = require('./controllers/security');

exports.endpoints = [
	{method: 'GET',    	path: '/',											    config: Pages.index},
	{method: 'GET',    	path: '/home',											config: Pages.home},
	{method: 'POST',    path: '/security/authentication',   config: Security.authentication},
	{method: 'POST',    path: '/security/deauthentication', config: Security.deauthentication}
];
