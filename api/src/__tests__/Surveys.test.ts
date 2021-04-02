
import request from 'supertest';
import { app } from '../app';

import creatConnection from '../database';

describe("Surveys", () => {

    // antes de tudo deve rodar as migrations.
    beforeAll(async () => {
        const connection = await creatConnection();
        await connection.runMigrations();
    });

    // teste para criar nova pesquisa
    it('Should be able to create a new survey', async () => {
        const response = await request(app).post("/surveys")
            .send({
                title: 'title example',
                description: 'description example'
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
    });


    it('should be able to get all surveys', async () => {
        await request(app).post('/surveys').send({
            title: 'title example 2',
            description: 'description example 2'
        });

        const response = await request(app).get('/surveys');

        expect(response.body.length).toBe(2);

    });
});



// npm install -g win-node-env  --> se der erro nas variaveis de ambiente no windows.