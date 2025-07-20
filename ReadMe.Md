🚀 Desafio Técnico - Plataforma Centralizada Nuven

Este projeto é uma API RESTful desenvolvida em Node.js com Express, que simula o backend de uma plataforma centralizada para ingestão, consulta e gerenciamento de documentos (datasets), com autenticação, controle de acesso e persistência de dados em banco relacional.
✅ Funcionalidades
🔐 Autenticação e Controle de Acesso

    POST /api/auth/register: Registro de usuário

    POST /api/auth/login: Autenticação de usuário com JWT

    GET /api/me: Informações do usuário autenticado

    Middleware de proteção de rotas via JWT

📥 Upload e Ingestão de Arquivos

    POST /api/datasets/upload: Upload de arquivos .csv ou .pdf

    Armazenamento local

    Registro automático de metadados:

        Nome do arquivo

        Tamanho

        Data de envio

        Usuário responsável

    Criação de registros (records) com conteúdo armazenado em campo JSON

📊 Listagem e Consulta de Dados

    GET /api/datasets: Lista todos os datasets do usuário autenticado

    GET /api/datasets/:id/records: Lista registros de um dataset específico

    GET /api/records/search?query=palavra: Busca textual em registros via JSON

🤖 Simulação de Consulta por IA

    POST /api/queries: Envia uma pergunta vinculada a um dataset (simula resposta IA)

    GET /api/queries: Lista de perguntas e respostas anteriores do usuário

🧱 Modelagem de Dados
Tabela	Campos
users	id, nome, email, senha_hash
datasets	id, nome, usuario_id, criado_em
records	id, dataset_id, dados_json, criado_em
queries	id, usuario_id, pergunta, resposta, criado_em
🛠️ Tecnologias Utilizadas

    Node.js + Express

    PostgreSQL com Prisma ORM

    JWT para autenticação

    Multer para upload de arquivos

    Swagger UI para documentação interativa

    Docker e docker-compose para orquestração de containers

🐳 Como Rodar com Docker

    Clone o repositório:

git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto

Configure o .env com as variáveis adequadas (exemplo incluso no repositório)

Suba os containers:

    docker-compose up --build

    Acesse:

        API: http://localhost:3000

        Swagger UI: http://localhost:3000/api/docs

        PgAdmin: http://localhost:5050

📄 Documentação (Swagger)

Acesse http://localhost:3000/api/docs para testar os endpoints de forma visual com Swagger UI.
🌐 Fluxo da Aplicação


Explicação visual sobre o funcionamento da API, desde autenticação até ingestão e consulta de dados.
🚀 Diferenciais Implementados

✅ Documentação Swagger
✅ Endpoint /me
✅ Upload .csv e .pdf
✅ Fluxograma explicativo
✅ Simulação de IA básica via /queries
❌ Interface Web
❌ Testes automatizados
❌ Integração com IA externa
📬 Contato

Desenvolvido por Felipe Portugal
📧 felipe-portugal@email.com
🔗 LinkedIn
