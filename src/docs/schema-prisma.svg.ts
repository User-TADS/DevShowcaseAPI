/**
 * Representação vetorial SVG do diagrama relacional do schema.prisma.
 */
export const schemaPrismaSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 600" width="100%" height="100%">
  <defs>
    <!-- Filtros de sombra -->
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
    
    <!-- Marcadores de seta para relacionamentos -->
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
    </marker>
    <marker id="arrow-pink" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 10 5 L 0 9 z" fill="#f472b6" />
    </marker>

    <!-- Gradientes -->
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0b0f19" />
      <stop offset="100%" stop-color="#111827" />
    </linearGradient>
    <linearGradient id="profileGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <linearGradient id="projectGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#4f46e5" />
      <stop offset="100%" stop-color="#6366f1" />
    </linearGradient>
    <linearGradient id="feedbackGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#db2777" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
    <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#059669" />
      <stop offset="100%" stop-color="#10b981" />
    </linearGradient>
  </defs>

  <style>
    .title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 700; fill: #ffffff; font-size: 18px; }
    .subtitle { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 400; fill: #94a3b8; font-size: 12px; }
    .table-title { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 700; fill: #ffffff; font-size: 14px; }
    .table-meta { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 500; fill: rgba(255,255,255,0.75); font-size: 11px; }
    .col-name { font-family: "JetBrains Mono", Consolas, "Courier New", monospace; font-size: 11.5px; fill: #f1f5f9; font-weight: 500; }
    .col-type { font-family: "JetBrains Mono", Consolas, "Courier New", monospace; font-size: 11px; fill: #94a3b8; }
    .badge-text { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-weight: 700; font-size: 9px; }
    .rel-label { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 11px; font-weight: 700; fill: #38bdf8; }
  </style>

  <!-- Fundo geral -->
  <rect width="920" height="600" rx="14" fill="url(#bgGrad)" stroke="#1e293b" stroke-width="1.5"/>

  <!-- Barra de título superior -->
  <circle cx="28" cy="26" r="5" fill="#ef4444"/>
  <circle cx="44" cy="26" r="5" fill="#f59e0b"/>
  <circle cx="60" cy="26" r="5" fill="#10b981"/>
  <text x="80" y="30" class="title">DevShowcase API — Modelagem Relacional (Prisma ORM)</text>
  <text x="735" y="30" class="subtitle">SQLite Database • 4 Modelos</text>
  <line x1="16" y1="46" x2="904" y2="46" stroke="#1e293b" stroke-width="1.5"/>

  <!-- ==================== LINHAS DE RELACIONAMENTO ==================== -->
  
  <!-- 1. Profile 1 : N Project -->
  <path d="M 285 185 L 328 185" fill="none" stroke="#38bdf8" stroke-width="2.5" marker-end="url(#arrow)"/>
  <rect x="286" y="165" width="40" height="18" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="1"/>
  <text x="306" y="178" text-anchor="middle" class="rel-label" fill="#38bdf8">1 : N</text>

  <!-- 2. Project 1 : N Feedback -->
  <path d="M 590 185 L 633 185" fill="none" stroke="#f472b6" stroke-width="2.5" marker-end="url(#arrow-pink)"/>
  <rect x="591" y="165" width="40" height="18" rx="4" fill="#0f172a" stroke="#f472b6" stroke-width="1"/>
  <text x="611" y="178" text-anchor="middle" class="rel-label" fill="#f472b6">1 : N</text>

  <!-- 3. Project N : N Technology -->
  <path d="M 460 325 L 460 368" fill="none" stroke="#34d399" stroke-width="2.5" marker-end="url(#arrow-green)"/>
  <rect x="439" y="337" width="42" height="18" rx="4" fill="#0f172a" stroke="#34d399" stroke-width="1"/>
  <text x="460" y="350" text-anchor="middle" class="rel-label" fill="#34d399">N : N</text>

  <!-- ==================== TABELA 1: PROFILE ==================== -->
  <g filter="url(#shadow)">
    <rect x="35" y="70" width="250" height="235" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <rect x="35" y="70" width="250" height="36" rx="8" fill="url(#profileGrad)"/>
    <rect x="35" y="98" width="250" height="8" fill="url(#profileGrad)"/>
    <text x="47" y="93" class="table-title">👤 Profile</text>
    <text x="220" y="93" class="table-meta">profiles</text>
    <line x1="35" y1="106" x2="285" y2="106" stroke="#334155" stroke-width="1"/>

    <!-- Campos Profile -->
    <rect x="45" y="117" width="18" height="12" rx="3" fill="#f59e0b"/>
    <text x="54" y="126" text-anchor="middle" class="badge-text" fill="#000">PK</text>
    <text x="70" y="127" class="col-name">id</text>
    <text x="210" y="127" class="col-type">String (UUID)</text>

    <text x="70" y="148" class="col-name">name</text>
    <text x="210" y="148" class="col-type">String</text>

    <rect x="45" y="160" width="18" height="12" rx="3" fill="#a855f7"/>
    <text x="54" y="169" text-anchor="middle" class="badge-text" fill="#fff">UK</text>
    <text x="70" y="169" class="col-name">email</text>
    <text x="210" y="169" class="col-type">String</text>

    <text x="70" y="190" class="col-name">bio</text>
    <text x="210" y="190" class="col-type">String?</text>

    <text x="70" y="211" class="col-name">githubUrl</text>
    <text x="210" y="211" class="col-type">String?</text>

    <text x="70" y="232" class="col-name">projects[]</text>
    <text x="210" y="232" class="col-type">Project[]</text>

    <text x="70" y="253" class="col-name">createdAt</text>
    <text x="210" y="253" class="col-type">DateTime</text>

    <text x="70" y="274" class="col-name">updatedAt</text>
    <text x="210" y="274" class="col-type">DateTime</text>
  </g>

  <!-- ==================== TABELA 2: PROJECT ==================== -->
  <g filter="url(#shadow)">
    <rect x="330" y="70" width="260" height="255" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <rect x="330" y="70" width="260" height="36" rx="8" fill="url(#projectGrad)"/>
    <rect x="330" y="98" width="260" height="8" fill="url(#projectGrad)"/>
    <text x="342" y="93" class="table-title">📁 Project</text>
    <text x="525" y="93" class="table-meta">projects</text>
    <line x1="330" y1="106" x2="590" y2="106" stroke="#334155" stroke-width="1"/>

    <!-- Campos Project -->
    <rect x="340" y="117" width="18" height="12" rx="3" fill="#f59e0b"/>
    <text x="349" y="126" text-anchor="middle" class="badge-text" fill="#000">PK</text>
    <text x="365" y="127" class="col-name">id</text>
    <text x="515" y="127" class="col-type">String (UUID)</text>

    <text x="365" y="148" class="col-name">title</text>
    <text x="515" y="148" class="col-type">String</text>

    <text x="365" y="169" class="col-name">description</text>
    <text x="515" y="169" class="col-type">String</text>

    <text x="365" y="190" class="col-name">repositoryUrl</text>
    <text x="515" y="190" class="col-type">String?</text>

    <text x="365" y="211" class="col-name">liveUrl</text>
    <text x="515" y="211" class="col-type">String?</text>

    <rect x="340" y="223" width="18" height="12" rx="3" fill="#06b6d4"/>
    <text x="349" y="232" text-anchor="middle" class="badge-text" fill="#000">FK</text>
    <text x="365" y="232" class="col-name">profileId</text>
    <text x="515" y="232" class="col-type">String</text>

    <text x="365" y="253" class="col-name">technologies[]</text>
    <text x="515" y="253" class="col-type">Technology[]</text>

    <text x="365" y="274" class="col-name">feedbacks[]</text>
    <text x="515" y="274" class="col-type">Feedback[]</text>

    <text x="365" y="295" class="col-name">createdAt</text>
    <text x="515" y="295" class="col-type">DateTime</text>
  </g>

  <!-- ==================== TABELA 3: FEEDBACK ==================== -->
  <g filter="url(#shadow)">
    <rect x="635" y="70" width="250" height="215" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <rect x="635" y="70" width="250" height="36" rx="8" fill="url(#feedbackGrad)"/>
    <rect x="635" y="98" width="250" height="8" fill="url(#feedbackGrad)"/>
    <text x="647" y="93" class="table-title">💬 Feedback</text>
    <text x="825" y="93" class="table-meta">feedbacks</text>
    <line x1="635" y1="106" x2="885" y2="106" stroke="#334155" stroke-width="1"/>

    <!-- Campos Feedback -->
    <rect x="645" y="117" width="18" height="12" rx="3" fill="#f59e0b"/>
    <text x="654" y="126" text-anchor="middle" class="badge-text" fill="#000">PK</text>
    <text x="670" y="127" class="col-name">id</text>
    <text x="815" y="127" class="col-type">String (UUID)</text>

    <text x="670" y="148" class="col-name">author</text>
    <text x="815" y="148" class="col-type">String</text>

    <text x="670" y="169" class="col-name">content</text>
    <text x="815" y="169" class="col-type">String</text>

    <text x="670" y="190" class="col-name">rating</text>
    <text x="815" y="190" class="col-type">Int (1 a 5)</text>

    <rect x="645" y="202" width="18" height="12" rx="3" fill="#06b6d4"/>
    <text x="654" y="211" text-anchor="middle" class="badge-text" fill="#000">FK</text>
    <text x="670" y="211" class="col-name">projectId</text>
    <text x="815" y="211" class="col-type">String</text>

    <text x="670" y="232" class="col-name">createdAt</text>
    <text x="815" y="232" class="col-type">DateTime</text>

    <text x="670" y="253" class="col-name">updatedAt</text>
    <text x="815" y="253" class="col-type">DateTime</text>
  </g>

  <!-- ==================== TABELA 4: TECHNOLOGY ==================== -->
  <g filter="url(#shadow)">
    <rect x="330" y="370" width="260" height="185" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <rect x="330" y="370" width="260" height="36" rx="8" fill="url(#techGrad)"/>
    <rect x="330" y="398" width="260" height="8" fill="url(#techGrad)"/>
    <text x="342" y="393" class="table-title">⚡ Technology</text>
    <text x="500" y="393" class="table-meta">technologies</text>
    <line x1="330" y1="406" x2="590" y2="406" stroke="#334155" stroke-width="1"/>

    <!-- Campos Technology -->
    <rect x="340" y="417" width="18" height="12" rx="3" fill="#f59e0b"/>
    <text x="349" y="426" text-anchor="middle" class="badge-text" fill="#000">PK</text>
    <text x="365" y="427" class="col-name">id</text>
    <text x="515" y="427" class="col-type">String (UUID)</text>

    <rect x="340" y="439" width="18" height="12" rx="3" fill="#a855f7"/>
    <text x="349" y="448" text-anchor="middle" class="badge-text" fill="#fff">UK</text>
    <text x="365" y="448" class="col-name">name</text>
    <text x="515" y="448" class="col-type">String</text>

    <text x="365" y="469" class="col-name">category</text>
    <text x="515" y="469" class="col-type">String?</text>

    <text x="365" y="490" class="col-name">projects[]</text>
    <text x="515" y="490" class="col-type">Project[]</text>

    <text x="365" y="511" class="col-name">createdAt</text>
    <text x="515" y="511" class="col-type">DateTime</text>

    <text x="365" y="532" class="col-name">updatedAt</text>
    <text x="515" y="532" class="col-type">DateTime</text>
  </g>

  <!-- Legenda inferior -->
  <g transform="translate(35, 568)">
    <rect x="0" y="0" width="18" height="12" rx="3" fill="#f59e0b"/>
    <text x="9" y="9" text-anchor="middle" class="badge-text" fill="#000">PK</text>
    <text x="24" y="10" class="subtitle" fill="#cbd5e1">Chave Primária</text>

    <rect x="135" y="0" width="18" height="12" rx="3" fill="#06b6d4"/>
    <text x="144" y="9" text-anchor="middle" class="badge-text" fill="#000">FK</text>
    <text x="159" y="10" class="subtitle" fill="#cbd5e1">Chave Estrangeira</text>

    <rect x="290" y="0" width="18" height="12" rx="3" fill="#a855f7"/>
    <text x="299" y="9" text-anchor="middle" class="badge-text" fill="#fff">UK</text>
    <text x="314" y="10" class="subtitle" fill="#cbd5e1">Chave Única</text>

    <text x="850" y="10" text-anchor="end" class="subtitle" fill="#94a3b8">Profile 1:N Project • Project N:N Tech • Project 1:N Feedback</text>
  </g>
</svg>`;
