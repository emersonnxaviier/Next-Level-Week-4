
import request from 'supertest';
import { app } from '../app';

import creatConnection from '../database';

describe("Users", () => {

    // antes de tudo deve rodar as migrations.
    beforeAll(async () => {
        const connection = await creatConnection();
        await connection.runMigrations();
    });

    // teste para criar novo usuario
    it('Should be able to create a new user', async () => {
        const response = await request(app).post("/users")
            .send({
                email: "user@gmail.com",
                name: 'User Example'
            });

        expect(response.status).toBe(201);
    });

    // teste criar usuario com email ja existente
    it('Should not be able to create a user with exists email', async () => {
        const response = await request(app).post("/users")
            .send({
                email: "user@gmail.com",
                name: 'User Example'
            });

        expect(response.status).toBe(400);
    });


});

