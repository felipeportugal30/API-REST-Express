# 🚀 Desafio Técnico - Plataforma Centralizada Nuven

Este projeto é uma **API RESTful** desenvolvida em **Node.js com Express**, que simula o backend de uma plataforma para **ingestão, consulta e gerenciamento de documentos (datasets)** com autenticação, controle de acesso e persistência em banco de dados relacional.

---

## ✅ Funcionalidades

### 🔐 Autenticação e Controle de Acesso

- `POST /api/auth/register`: Registro de usuário
- `POST /api/auth/login`: Autenticação com JWT
- `GET /api/me`: Retorna dados do usuário autenticado
- Middleware de proteção de rotas via JWT

### 📥 Upload e Ingestão de Arquivos

- `POST /api/datasets/upload`: Upload de arquivos `.csv` ou `.pdf`
- Armazenamento local (será criada uma pasta ./uploads na raiz do projeto)
- Registro automático de metadados:
  - Nome do arquivo
  - Tamanho
  - Data de envio
  - Usuário responsável
- Armazenamento de registros (`records`) com conteúdo em campo JSON

### 📊 Listagem e Consulta de Dados

- `GET /api/datasets`: Lista datasets do usuário autenticado
- `GET /api/datasets/:id/records`: Lista registros de um dataset específico
- `GET /api/records/search?query=palavra`: Busca textual nos registros (JSON)

### 🤖 Simulação de IA

- `POST /api/queries`: Simula resposta de IA para uma pergunta
- `GET /api/queries`: Lista perguntas e respostas anteriores

---

## 🧪 Documentação (Swagger)

Acesse http://localhost:3000/api/docs para testar os endpoints de forma visual.

---

## 🧱 Modelagem de Dados

![Classe UML da API](./imgs/ClasseUML.png)

| Tabela   | Campos                                        |
| -------- | --------------------------------------------- |
| users    | id, nome, email, senha_hash                   |
| datasets | id, nome, usuario_id, criado_em               |
| records  | id, dataset_id, dados_json, criado_em         |
| queries  | id, usuario_id, pergunta, resposta, criado_em |

---

## 🛠️ Tecnologias Utilizadas

- Node.js + Express
- PostgreSQL + Prisma ORM
- JWT (autenticação)
- Multer (upload de arquivos)
- Swagger UI (documentação)
- Docker + Docker Compose (orquestração)

---

## 🐳 Como Rodar com Docker

    git clone https://github.com/felipeportugal30/API-REST-Express.git

    cd API-REST-Express

Crie um arquivo .env com as variáveis necessárias.

    JWT_SECRET = "Token JWT SECRET"

    HF_API_TOKEN = "Token Hugging Face Inference API"

Instale as dependências de desenvolvimento antes do build

    npm install

    npx prisma generate

❗ Para que seu container execute com sucesso, por favor, edite o arquivo "API-REST-EXPRESS/node_modules/pdf-parse/index.js", para:

    const Fs = require('fs');
    const Pdf = require('./lib/pdf-parse.js');
    module.exports = Pdf;
    let isDebugMode = !module.parent;
    //process.env.AUTO_KENT_DEBUG
    //for testing purpose
    /*
    if (isDebugMode) {
        let PDF_FILE = './test/data/05-versions-space.pdf';
        let dataBuffer = Fs.readFileSync(PDF_FILE);
        Pdf(dataBuffer).then(function(data) {
            Fs.writeFileSync(`${PDF_FILE}.txt`, data.text, {
                encoding: 'utf8',
                flag: 'w'
            });
            debugger;
        }).catch(function(err) {
            debugger;
        });
    }*/

Construa e suba os containers:

    docker-compose build
    docker-compose up -d

Acesse:

- API: http://localhost:3000

- Swagger: http://localhost:3000/api-docs

- PgAdmin: http://localhost:5050 (usuario-pgadmin: admin@nuven.com | senha-pgadmin: admin) (usuario-pg: postgres | senha-pg: postgres)

---

## 🧑‍💻 Como Rodar Localmente (sem Docker)

### ✅ Pré-requisitos

- Node.js (v18+)

- PostgreSQL (v15+)

- npm

### 🔧 Passos

Clone o projeto:

    git clone https://github.com/felipeportugal30/API-REST-Express.git
    cd sua_pasta

No arquivo package.json adicione:

    "type": "module",

Instale as dependências:

    npm install

Configure o banco de dados:

Crie um banco PostgreSQL

    CREATE DATABASE db;

Crie o arquivo .env com as variáveis:

    DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db"
    JWT_SECRET="sua-chave-secreta"
    PORT=3000

Gere o cliente Prisma e rode a migração:

    npx prisma generate
    npx prisma migrate dev --name init

Inicie o servidor:

    npm run dev

---

## 🔁 Fluxo da Aplicação

![Fluxograma da API](./imgs/fluxograma.png)

---

## 🚀 Diferenciais Implementados

✅ Documentação Swagger

✅ Endpoint /me

✅ Upload de arquivos .csv e .pdf

✅ Fluxograma explicativo

✅ Simulação de IA com mock via /queries

✅ Interface Web (Swagger UI)

✅ Integração com IA externa

---

## 📬 Contato

Desenvolvido por Felipe Portugal
📧 fsportugal30@gmail.com
🔗 LinkedIn
