import supertest from 'supertest';
import { expect } from 'chai';
import app from '../index.js';

describe('Testing endpoint /', () => {
	it('should respond with 200 OK', async () => {
		const res = await supertest(app).get('/');
		expect(res.status).to.equal(200);
	});
});
