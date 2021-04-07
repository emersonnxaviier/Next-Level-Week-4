import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { UsersRepository } from '../repositories/UserRepository';
import SendMailService from '../services/SendMailService';

class SendMailController {

    async execute(request: Request, response: Response) {

        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        // SELECT * FROM USERS WHERE EMAIL = "EMAIL"
        const userAlreadyExists = await usersRepository.findOne({ email });

        if (!userAlreadyExists) {
            return response.status(400).json({
                error: 'User does not exists',
            });
        }



        // SELECT * FROM SURVEYS WHERE ID = "SURVEY_ID"
        const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id });

        if (!surveyAlreadyExists) {
            return response.status(400).json({
                error: 'Survey does not exists',
            });
        }


        // SALVAR INFORMAÇÕES NA TABELA SURVEYUSER
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id: survey_id
        });

        await surveysUsersRepository.save(surveyUser);


        // ENVIAR EMAIL PARA USUARIO
        await SendMailService.execute(email, surveyAlreadyExists.title, surveyAlreadyExists.description);
        return response.json(surveyUser);



    }
}

export { SendMailController }