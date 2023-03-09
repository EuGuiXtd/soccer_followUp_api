# Soccer Follow-up API:

# Contexto:
O projeto trata-se de uma aplicação na qual o usuário pode visualizar e cadastrar jogos de futebol virtuais, podendo editar os gols da partida conforme necessário. Há também a opção de visualizar a tabela de classificação/ranking em certos endpoints.

# Habilidades pessoais desenvolvidas:
- TypeScript;
- Princípios do POO para criar uma estrutura de simulação de jogos de futebol;
- Utilizar os princípios da arquitetura SOLID para organizar o projeto e deixá-lo com uma manutenibilidade muito maior;
- Backend com um sistema modelagem de dados através do ORM Sequelize;
- CRUD para criação, leitura, atualização e/ou remoção de usuários, times, partidas e tabela (placar do campeonato);
- Organização do código por meio do modelo MSC (Model-Service-Controller), de forma a dividir a responsabilidade do código e das funções/métodos de acordo com  suas propostas;
- Testes de integração utilizando Mocha, Chai e Sinon.

# Tecnologias usadas:
Back-end:
Node.JS, Express, Sequelize, MySQL, TypeScript, Docker, Mocha.

# Rodando a aplicação na sua maquina:
Para testar a aplicação, é necessário ter o [**Docker**](https://www.docker.com/) e o [**Docker Compose**](https://docs.docker.com/compose/) instalado em sua máquina.

Clone o projeto SSH: `git clone git@github.com:EuGuiXtd/soccer_followUp_api.git`

Entre na pasta do projeto: `cd trybe-futebol-clube`

Execute o script para iniciar o Docker Compose: `npm run compose:up`

Quando os contêineres estiverem prontos, você poderá acessar o projeto em: http://localhost:3000

Utilize o script para parar os contêineres: `npm run compose:down`
