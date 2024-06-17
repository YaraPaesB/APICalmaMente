/*
* Testes na API de Prestadores
* Tecnologias utilizadas:
* Supertest: Biblioteca para testes na API Rest do NodeJS
* dotenv: Biblioteca para gerenciar variáveis de ambiente
*/
const request = require('supertest')
const dotenv = require('dotenv')
dotenv.config() //carrega as variáveis do .env

const baseURL = 'http://localhost:8080/api'

describe('Testes de Registro de Usuario', () => {
    let token
    it('Faz o cadastro de um novo usuario no banco', async () => {
        const senha = process.env.SENHA_USUARIO
        const response = await request(baseURL)
        .post('/auth')
        .set('Content-Type', 'application/json')
        .send({name:"User", email:"user@teste.com", birthday:"05/03/2001", password: senha})
        .expect(201) // Created
    })

    it('Faz Login e gera token jwt', async () => {
        const senha = process.env.SENHA_USUARIO
        const reponse = await request(baseURL)
        .post('/auth/login')
        .set('Content-Type', 'application/json')
        .send({email:"yara@teste.com", password: senha})
        .expect(200); //OK

        token = reponse.body.token
        expect(token).toBeDefined() //verificação de recebimento de token
    })

    it('Verificação de email duplicado', async () => {
        const senha = process.env.SENHA_USUARIO
        await request(baseURL)
          .post('/auth')
          .set('Content-Type','application/json')
          .send({ email: 'test@example.com', name: 'Teste', password: senha });
    
        const response = await request(baseURL)
          .post('/auth')
          .set('Content-Type','application/json')
          .send({ email: 'test@example.com', name: 'Outro Teste', password: senha });
          
        expect(400)
    })

    it('Deve retornar status 403 ao acessar rota protegida com token inválido', async () => {
      const invalidToken = "invalidToken123";

      const response = await request(baseURL)
          .get('/clinics')
          .set('Authorization', `Bearer ${invalidToken}`)
          .set('Content-Type', 'application/json')
          .expect(401); // Forbidden
  });
})