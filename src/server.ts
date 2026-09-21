import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
  ======================================================
  🚀 DevShowcase API - Servidor iniciado com sucesso!
  ======================================================
  🌐 Endereço:       http://localhost:${PORT}
  📖 Swagger UI:     http://localhost:${PORT}/docs
  📋 Rota de Status: http://localhost:${PORT}/api
  🛠️  Ambiente:      ${process.env.NODE_ENV || 'development'}
  ------------------------------------------------------
  Endpoints Disponíveis:
  - GET  /docs                    (Swagger UI Interativo)
  - POST /api/database/reset      (Botão de Reset/Seed do Banco)
  - POST /api/profiles            (Cadastro de perfil)
  - GET  /api/profiles/:id        (Buscar perfil por ID)
  - POST /api/technologies        (Cadastro de tecnologia)
  - GET  /api/technologies        (Listagem de tecnologias)
  - POST /api/projects            (Cadastro de projeto)
  - GET  /api/projects            (Listagem de projetos)
  - POST /api/feedbacks           (Cadastro de feedback)
  - GET  /api/feedbacks/project/:id (Feedbacks por projeto)
  ======================================================
  `);
});
