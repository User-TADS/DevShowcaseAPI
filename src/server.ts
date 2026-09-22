import dotenv from 'dotenv';
dotenv.config();

import { app } from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  const cyan = '\x1b[36m';
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const bold = '\x1b[1m';
  const gray = '\x1b[90m';
  const reset = '\x1b[0m';

  console.log(`
  ${green}${bold}======================================================${reset}
  ${green}${bold}🚀 DevShowcase API - Servidor iniciado com sucesso!${reset}
  ${green}${bold}======================================================${reset}
  ${bold}🌐 Base URL:${reset}       ${cyan}http://localhost:${PORT}${reset}
  ${bold}📖 Swagger UI:${reset}     ${cyan}http://localhost:${PORT}/docs${reset}
  ${bold}📋 Rota de Status:${reset} ${cyan}http://localhost:${PORT}/api${reset}
  ${bold}🛠️  Ambiente:${reset}      ${yellow}${process.env.NODE_ENV || 'development'}${reset}
  ${gray}------------------------------------------------------${reset}
  ${bold}📌 Endpoints Disponíveis:${reset}

  ${gray}[Docs & Status]${reset}
    ${green}GET${reset}  /docs                            ${gray}(Swagger UI Interativo)${reset}
    ${green}GET${reset}  /api                             ${gray}(Status da API e Rotas)${reset}

  ${gray}[Banco de Dados]${reset}
    ${yellow}POST${reset} /api/database/reset              ${gray}(Limpar/Zerar Banco de Dados)${reset}

  ${gray}[Perfis (Profiles)]${reset}
    ${green}GET${reset}  /api/profiles                    ${gray}(Listar todos os perfis)${reset}
    ${green}GET${reset}  /api/profiles/:id                ${gray}(Buscar perfil com projetos)${reset}
    ${yellow}POST${reset} /api/profiles                    ${gray}(Cadastrar perfil de desenvolvedor)${reset}

  ${gray}[Tecnologias]${reset}
    ${green}GET${reset}  /api/technologies                ${gray}(Listar tecnologias)${reset}
    ${yellow}POST${reset} /api/technologies                ${gray}(Cadastrar tecnologia)${reset}

  ${gray}[Projetos]${reset}
    ${green}GET${reset}  /api/projects                    ${gray}(Listar projetos com autor e techs)${reset}
    ${green}GET${reset}  /api/projects/:id                ${gray}(Buscar projeto por ID)${reset}
    ${yellow}POST${reset} /api/projects                    ${gray}(Cadastrar projeto com 1:N e N:N)${reset}

  ${gray}[Feedbacks]${reset}
    ${green}GET${reset}  /api/feedbacks/project/:projectId ${gray}(Listar feedbacks do projeto)${reset}
    ${yellow}POST${reset} /api/feedbacks                   ${gray}(Cadastrar avaliação de 1 a 5)${reset}
  ${green}${bold}======================================================${reset}
  ${gray}Aguardando requisições... (logs de tráfego em tempo real abaixo)${reset}
  `);
});
