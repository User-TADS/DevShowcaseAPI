/**
 * Estilização e scripts customizados para injetar o botão de zerar o banco de dados
 * de forma limpa, direta e sem bloqueios de diálogo na interface do Swagger UI.
 */

export const swaggerCustomCss = `
  .swagger-ui .topbar {
    display: none;
  }

  /* Barra de ação minimalista acima dos endpoints */
  #db-control-container {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 18px 0 14px 0;
    padding: 0;
    flex-wrap: wrap;
  }

  #db-control-container .btn-reset-db {
    background: #dc2626;
    color: #ffffff;
    border: none;
    padding: 9px 16px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-family: inherit;
    user-select: none;
  }

  #db-control-container .btn-reset-db:hover {
    background: #b91c1c;
    box-shadow: 0 3px 8px rgba(220, 38, 38, 0.28);
  }

  #db-control-container .btn-reset-db:active {
    transform: translateY(1px);
  }

  #db-control-container .btn-reset-db:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: none;
  }

  #db-control-container .db-status-bar {
    padding: 7px 14px;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    display: none;
    animation: fadeIn 0.2s ease;
  }

  #db-control-container .db-status-success {
    background: #ecfdf5;
    border: 1px solid #a7f3d0;
    color: #065f46;
  }

  #db-control-container .db-status-error {
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const swaggerCustomJs = `
  // Função global acessível diretamente pelo atributo onclick do botão
  window.__resetDatabase = async function() {
    var resetBtn = document.getElementById('btn-trigger-reset-db');
    var statusDiv = document.getElementById('db-reset-status');

    if (!resetBtn || !statusDiv) return;

    resetBtn.disabled = true;
    var originalContent = resetBtn.innerHTML;
    resetBtn.innerHTML = '⏳ Limpando banco de dados...';

    statusDiv.style.display = 'none';
    statusDiv.className = 'db-status-bar';

    try {
      var response = await fetch('/api/database/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      var data = await response.json();

      if (response.ok) {
        statusDiv.className = 'db-status-bar db-status-success';
        statusDiv.innerHTML = '✅ ' + (data.message || 'Todas as tabelas foram limpas com sucesso. O banco está zerado.');
        statusDiv.style.display = 'inline-block';
      } else {
        statusDiv.className = 'db-status-bar db-status-error';
        statusDiv.innerHTML = '❌ ' + (data.message || 'Falha ao tentar limpar o banco de dados.');
        statusDiv.style.display = 'inline-block';
      }
    } catch (err) {
      statusDiv.className = 'db-status-bar db-status-error';
      statusDiv.innerHTML = '❌ Erro de comunicação com a API em /api/database/reset.';
      statusDiv.style.display = 'inline-block';
    } finally {
      resetBtn.disabled = false;
      resetBtn.innerHTML = originalContent;
    }
  };

  (function() {
    function injectDatabaseControl() {
      if (document.getElementById('db-control-container')) return;

      var operationsWrapper = document.querySelector('#operations > .wrapper') || 
                              document.querySelector('#operations') ||
                              document.querySelector('.swagger-ui .wrapper:not(.information-container)');

      if (!operationsWrapper) return;

      var container = document.createElement('div');
      container.id = 'db-control-container';
      container.innerHTML = [
        '<button id="btn-trigger-reset-db" class="btn-reset-db" type="button" onclick="window.__resetDatabase()">',
        '  <span>🧹 Zerar e Limpar Dados</span>',
        '</button>',
        '<div id="db-reset-status" class="db-status-bar"></div>'
      ].join('');

      operationsWrapper.insertBefore(container, operationsWrapper.firstChild);
    }

    var attempts = 0;
    var interval = setInterval(function() {
      attempts++;
      injectDatabaseControl();
      if (document.getElementById('db-control-container') || attempts > 50) {
        clearInterval(interval);
      }
    }, 150);
  })();
`;
