import supertest from 'supertest';
import { expect } from 'chai';
import server from '../src/server.js';

describe('Testing endpoint /', () => {
	it('should respond with 200 OK', async () => {
		const res = await supertest(server.app).get('/');
		expect(res.status).to.equal(200);
	});
});
