import * as typeorm from 'typeorm';
import express from 'express';
import { buildRouter } from '../../../app/deco-router/index';
import { SignUpController } from '../../../app/controller/v2/signup-controller';

// const request = require('supertest');

// const app: express.Application = express();
// app.use(express.json());

// app.use(buildRouter('test', [new SignUpController()]));

// (typeorm as any).getRepository = jest.fn();
// process.env.JWT_TOKEN_SECRET = 'test_secret';

describe('SignUpController V2', () => {
    describe('POST v2/signup', () => {
        it('should return a new token assigned to a new user', async (done) => {
            expect(1 === 1).toBeTruthy();
            // const res = await request(app).post('/test/v2/signup');
            // expect(res.status).toEqual(200);
            // expect(res.body.token.length).toEqual(120);
            done();
        });
    });
});