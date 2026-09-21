export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'DevShowcase API - Documentação Interativa Swagger',
    version: '1.0.0',
    description: `
**API RESTful desenvolvida com Node.js, Express, TypeScript, Prisma ORM e SQLite.**

Esta interface interativa permite testar todos os endpoints da aplicação diretamente pelo navegador, incluindo o **botão de reset/povoamento do banco de dados**.

### Funcionalidades:
- **Perfis (Profiles)**: 1 : N com Projetos
- **Tecnologias (Technologies)**: N : N com Projetos
- **Projetos (Projects)**: 1 : N com Perfis, N : N com Tecnologias, 1 : N com Feedbacks
- **Feedbacks (Opiniões)**: 1 : N com Projetos
- **Manutenção do Banco**: Reset e repovoamento com 1 clique (Try it out -> Execute).
    `,
    contact: {
      name: 'Guilherme Barbosa',
      url: 'https://github.com/GuilhermeBarbosa556',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor Local de Desenvolvimento',
    },
  ],
  tags: [
    {
      name: '🔧 Manutenção do Banco (Reset & Seed)',
      description: 'Endpoints para resetar e repovoar os dados do banco SQLite com um clique',
    },
    {
      name: 'Perfis (Profiles)',
      description: 'Gerenciamento de perfis de desenvolvedores',
    },
    {
      name: 'Tecnologias (Technologies)',
      description: 'Cadastro e listagem de tecnologias',
    },
    {
      name: 'Projetos (Projects)',
      description: 'Gerenciamento de projetos com relacionamentos',
    },
    {
      name: 'Feedbacks (Opiniões)',
      description: 'Avaliações associadas a projetos',
    },
  ],
  paths: {
    '/api/database/reset': {
      post: {
        tags: ['🔧 Manutenção do Banco (Reset & Seed)'],
        summary: '🔄 Resetar e Repovoar Banco de Dados (Seed Completo)',
        description: 'Limpa todas as tabelas e recria os dados de exemplo (perfis, tecnologias, projetos e feedbacks). Basta clicar em **Try it out** e depois em **Execute**!',
        responses: {
          200: {
            description: 'Banco de dados resetado e repovoado com sucesso',
            content: {
              'application/json': {
                example: {
                  status: 'success',
                  statusCode: 200,
                  message: 'Banco de dados SQLite resetado e repovoado com dados iniciais com sucesso!',
                  seeded: {
                    profilesCount: 2,
                    technologiesCount: 7,
                    projectsCount: 2,
                    feedbacksCount: 2,
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/database/clean': {
      post: {
        tags: ['🔧 Manutenção do Banco (Reset & Seed)'],
        summary: '🧹 Limpar Todas as Tabelas do Banco de Dados',
        description: 'Exclui todos os registros de todas as tabelas deixando o banco 100% vazio.',
        responses: {
          200: {
            description: 'Banco de dados limpo com sucesso',
            content: {
              'application/json': {
                example: {
                  status: 'success',
                  statusCode: 200,
                  message: 'Todas as tabelas do banco de dados foram limpas com sucesso!',
                },
              },
            },
          },
        },
      },
    },
    '/api/technologies': {
      post: {
        tags: ['Tecnologias (Technologies)'],
        summary: 'Cadastrar nova tecnologia',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name'],
                properties: {
                  name: { type: 'string', example: 'GraphQL' },
                  category: { type: 'string', example: 'API / Query' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Tecnologia cadastrada com sucesso' },
          400: { description: 'Erro de validação (nome vazio)' },
          409: { description: 'Tecnologia com nome já existente' },
        },
      },
      get: {
        tags: ['Tecnologias (Technologies)'],
        summary: 'Listar todas as tecnologias',
        responses: {
          200: { description: 'Lista de tecnologias cadastradas' },
        },
      },
    },
    '/api/profiles': {
      post: {
        tags: ['Perfis (Profiles)'],
        summary: 'Cadastrar perfil de desenvolvedor',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['name', 'email'],
                properties: {
                  name: { type: 'string', example: 'Ana Clara' },
                  email: { type: 'string', example: 'ana.clara@example.com' },
                  bio: { type: 'string', example: 'Engenheira de Dados e Cloud' },
                  githubUrl: { type: 'string', example: 'https://github.com/anaclara' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Perfil cadastrado com sucesso' },
          400: { description: 'Erro de validação (e-mail ou URL inválida)' },
          409: { description: 'E-mail já cadastrado' },
        },
      },
      get: {
        tags: ['Perfis (Profiles)'],
        summary: 'Listar todos os perfis',
        responses: {
          200: { description: 'Lista de todos os perfis com seus projetos' },
        },
      },
    },
    '/api/profiles/{id}': {
      get: {
        tags: ['Perfis (Profiles)'],
        summary: 'Buscar perfil por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'UUID do perfil',
          },
        ],
        responses: {
          200: { description: 'Perfil encontrado' },
          404: { description: 'Perfil não encontrado' },
        },
      },
    },
    '/api/projects': {
      post: {
        tags: ['Projetos (Projects)'],
        summary: 'Cadastrar projeto com relacionamentos',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title', 'description', 'profileId'],
                properties: {
                  title: { type: 'string', example: 'Fintech Mobile App' },
                  description: { type: 'string', example: 'Aplicativo financeiro com carteira digital' },
                  repositoryUrl: { type: 'string', example: 'https://github.com/usuario/fintech-app' },
                  liveUrl: { type: 'string', example: 'https://fintech.app.br' },
                  profileId: { type: 'string', description: 'UUID de um perfil existente' },
                  technologyIds: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Lista de UUIDs das tecnologias a vincular (N:N)',
                  },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Projeto cadastrado com sucesso' },
          400: { description: 'Validação inválida (título vazio ou URL incorreta)' },
          404: { description: 'Perfil ou tecnologia informada não encontrada' },
        },
      },
      get: {
        tags: ['Projetos (Projects)'],
        summary: 'Listar projetos',
        parameters: [
          {
            name: 'profileId',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filtrar projetos por ID do perfil do autor',
          },
        ],
        responses: {
          200: { description: 'Lista de projetos com autores e tecnologias' },
        },
      },
    },
    '/api/projects/{id}': {
      get: {
        tags: ['Projetos (Projects)'],
        summary: 'Buscar projeto por ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'UUID do projeto',
          },
        ],
        responses: {
          200: { description: 'Projeto encontrado com relacionamentos' },
          404: { description: 'Projeto não encontrado' },
        },
      },
    },
    '/api/feedbacks': {
      post: {
        tags: ['Feedbacks (Opiniões)'],
        summary: 'Registrar feedback para um projeto',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['author', 'content', 'rating', 'projectId'],
                properties: {
                  author: { type: 'string', example: 'Tech Recruiter' },
                  content: { type: 'string', example: 'Código muito bem estruturado e documentado!' },
                  rating: { type: 'integer', minimum: 1, maximum: 5, example: 5 },
                  projectId: { type: 'string', description: 'UUID do projeto avaliado' },
                },
              },
            },
          },
        },
        responses: {
          201: { description: 'Feedback registrado com sucesso' },
          400: { description: 'Nota inválida (fora do intervalo 1 a 5)' },
          404: { description: 'Projeto não encontrado' },
        },
      },
      get: {
        tags: ['Feedbacks (Opiniões)'],
        summary: 'Listar todos os feedbacks',
        responses: {
          200: { description: 'Lista de todos os feedbacks' },
        },
      },
    },
    '/api/feedbacks/project/{projectId}': {
      get: {
        tags: ['Feedbacks (Opiniões)'],
        summary: 'Listar feedbacks de um projeto',
        parameters: [
          {
            name: 'projectId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
            description: 'UUID do projeto',
          },
        ],
        responses: {
          200: { description: 'Lista de feedbacks do projeto' },
        },
      },
    },
  },
};
