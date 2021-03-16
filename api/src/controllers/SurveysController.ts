import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { Survey } from '../models/Survey';
import { SurveysRepository } from '../repositories/SurveysRepository';

class SurveysController {

    // CRIAR
    async create(request: Request, response: Response) {

        const { title, description } = request.body;

        const surveysRepository = getCustomRepository(SurveysRepository);

        const survey = surveysRepository.create({
            title,
            description
        });

        await surveysRepository.save(survey);

        return response.status(201).json(survey);
    }


    // LISTAR TODOS
    async show(request: Request, response: Response) {

        const surveysRepository = getCustomRepository(SurveysRepository);

        const all = await surveysRepository.find();

        return response.json(all);
    }

}

export { SurveysController }