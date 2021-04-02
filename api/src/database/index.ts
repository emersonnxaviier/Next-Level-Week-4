import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {

    const defaultOptions = await getConnectionOptions(); //pega a conexão padrão do arquivo ormconfig.json

    return createConnection(
        Object.assign(defaultOptions, { // sobrescreve a conexão padrão alterando o banco de dados se o processo for de teste.
            database: process.env.NODE_ENV === 'test' ? "./src/database/database.test.sqlite" : defaultOptions.database
        })
    )
}