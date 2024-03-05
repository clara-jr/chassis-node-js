import supertest from 'supertest';
import { expect } from 'chai';
import { ObjectId } from 'mongodb';

import server from '../src/server.js';

import Model from '../src/models/model.js';
import JWTService from '../src/services/jwt.service.js';

describe('Test', () => {
	let token;

	before(async () => {
		token = await JWTService.createToken({ userName: 'test' });
	});

	after(async () => {
		await JWTService.clearSessionData(token);
	});

	afterEach(async () => {
		await Model.deleteMany({});
	});

	describe('GET /', () => {
		describe('when token is invalid', () => {
			it('should respond with 401 UNAUTHORIZED when token is invalid', async () => {
				const res = await supertest(server.app).get('/');
				expect(res.status).to.equal(401);
				expect(res.error).to.exist;
				expect(res.body.errorCode).to.equal('UNAUTHORIZED');
			});
		});
		describe('when token is valid', () => {
			const model = { index: new ObjectId('123456789123456789123456') };
			beforeEach(async () => {
				await Model.create(model);
			});
			it('should respond with 200 OK', async () => {
				const res = await supertest(server.app).get('/').set('X-Auth-Token', `${token}`);
				expect(res.status).to.equal(200);
				expect(res.body).to.have.length(1);
				expect(res.body[0].index.toString()).to.equal(model.index.toString());
				expect(res.body[0].default).to.equal('default');
			});
		});
	});
});
