

## Se der erro nas variaveis de ambiente no windows.
``` npm install -g win-node-env ```


## PARA CRIAR NOVAS MIGRATIONS:
- yarn typeorm migration:create -n NOME-DA-MIGRATIION

## CRIAR TABELA NO BANCO, APÓS SER CRIADO A MIGRATION:
- yarn typeorm migration:run

## PARA FAZER O ENVIO DE EMAIL:
``` npm install nodemailer``` juntamente com o **Ethereal** que é um serviço de SMTP fake.