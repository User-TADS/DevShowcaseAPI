export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'DevShowcase API - Documentação Interativa Swagger',
    version: '1.0.0',
    description: `
**API RESTful desenvolvida com Node.js, Express, TypeScript, Prisma ORM e persistência relacional SQLite.**

Sistema para gerenciamento de perfis de desenvolvedores, catálogo de projetos, tecnologias associadas e avaliações de projetos.

### Recursos (Cardinalidades):
- **Perfis (Profiles)**: 1 : N com Projetos
- **Projetos (Projects)**: N : 1 com Perfis | N : N com Tecnologias | 1 : N com Feedbacks
- **Tecnologias (Technologies)**: N : N com Projetos
- **Feedbacks (Opiniões)**: N : 1 com Projetos

<div style="margin-top: 14px; margin-bottom: 14px;">
  <a href="/docs/schema-prisma.svg" target="_blank" title="Clique para abrir o diagrama em tamanho real">
    <img src="/docs/schema-prisma.svg" alt="Diagrama do Schema Prisma" style="width: 100%; max-width: 880px; border-radius: 10px; border: 1px solid #cbd5e1; box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12); display: block; margin: 10px 0;" />
  </a>
  <small style="color: #64748b; font-size: 12px; display: block; margin-top: 4px;">🔍 <em>Dica: Clique na imagem para abrir em resolução máxima.</em></small>
</div>
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
      name: '🔧 Manutenção do Banco (Zerar Tabelas)',
      description: 'Endpoint para limpar e zerar todas as tabelas do banco de dados SQLite',
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
        tags: ['🔧 Manutenção do Banco (Zerar Tabelas)'],
        summary: '🧹 Limpar e Zerar Todas as Tabelas do Banco',
        description: 'Exclui todos os registros de todas as tabelas (feedbacks, projetos, tecnologias e perfis), deixando o banco 100% vazio e zerado. Basta clicar em **Try it out** e depois em **Execute**.',
        responses: {
          200: {
            description: 'Banco de dados zerado com sucesso',
            content: {
              'application/json': {
                example: {
                  status: 'success',
                  statusCode: 200,
                  message: 'Todas as tabelas foram limpas com sucesso. O banco de dados está completamente zerado.',
                  data: {
                    profiles: 0,
                    projects: 0,
                    technologies: 0,
                    feedbacks: 0,
                  },
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
                  name: { type: 'string', example: 'Node.js' },
                  category: { type: 'string', example: 'Backend' },
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
                  name: { type: 'string', example: 'Guilherme Barbosa' },
                  email: { type: 'string', example: 'guilherme@example.com' },
                  bio: { type: 'string', example: 'Desenvolvedor Full Stack' },
                  githubUrl: { type: 'string', example: 'https://github.com/guilherme' },
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
                  title: { type: 'string', example: 'DevShowcase Platform' },
                  description: { type: 'string', example: 'Plataforma para compartilhamento de portfólios' },
                  repositoryUrl: { type: 'string', example: 'https://github.com/usuario/projeto' },
                  liveUrl: { type: 'string', example: 'https://meuprojeto.com' },
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
                  author: { type: 'string', example: 'Prof. Avaliador' },
                  content: { type: 'string', example: 'Excelente arquitetura e persistência relacional!' },
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
