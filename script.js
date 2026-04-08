/* ===========================
   CONFIGURAÇÃO GOOGLE SHEETS
   ===========================
   Para sincronizar os presentes entre todos os usuários:

   1. Crie uma planilha no Google Sheets com uma aba chamada "Presentes"
      Na primeira linha coloque os cabeçalhos: ID | Nome | Data

   2. Na planilha, clique em Extensões > Apps Script

   3. Substitua todo o código pelo seguinte:

   ── INÍCIO DO CÓDIGO APPS SCRIPT ──

   const NOME_ABA = 'Presentes';

   function doGet(e) {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA);
     const data = sheet.getDataRange().getValues();
     const result = {};
     for (let i = 1; i < data.length; i++) {
       if (data[i][0] !== '') result[String(data[i][0])] = String(data[i][1]);
     }
     return ContentService.createTextOutput(JSON.stringify(result))
       .setMimeType(ContentService.MimeType.JSON);
   }

   function doPost(e) {
     const body = JSON.parse(e.postData.contents);
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOME_ABA);
     const data = sheet.getDataRange().getValues();
     for (let i = 1; i < data.length; i++) {
       if (String(data[i][0]) === String(body.id)) {
         return ContentService.createTextOutput(
           JSON.stringify({ error: 'taken', buyer: String(data[i][1]) })
         ).setMimeType(ContentService.MimeType.JSON);
       }
     }
     sheet.appendRow([body.id, body.name, new Date().toLocaleString('pt-BR')]);
     return ContentService.createTextOutput(JSON.stringify({ ok: true }))
       .setMimeType(ContentService.MimeType.JSON);
   }

   ── FIM DO CÓDIGO APPS SCRIPT ──

   4. Clique em Implantar > Nova implantação
      - Tipo: App da Web
      - Executar como: Eu (sua conta Google)
      - Quem tem acesso: Qualquer pessoa
      - Autorize as permissões quando solicitado

   5. Copie a URL da implantação (começa com https://script.google.com/...)
      e cole abaixo substituindo 'COLE_SUA_URL_AQUI'
   =========================== */

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbymaF7-9etkwfQoUT5cXTSpKygskz0I9L_0nSVjaLFWevW3mlFJWHvO5AKcO7IplHZx/exec';

/* ===========================
   LISTA DE PRESENTES
   =========================== */
const STORAGE_KEY = 'cha_panela_gifts_v1';

const gifts = [
  { id: 1,  name: 'Medidor',                                   cat: '🍳 Utensílios' },
  { id: 2,  name: 'Bandejas',                                   cat: '🍳 Utensílios' },
  { id: 3,  name: 'Rodo',                                       cat: '🧹 Limpeza'    },
  { id: 4,  name: 'Sanduicheira',                               cat: '🍳 Utensílios' },
  { id: 5,  name: 'Funil',                                      cat: '🍳 Utensílios' },
  { id: 6,  name: 'Cortador de pizza',                          cat: '🍳 Utensílios' },
  { id: 7,  name: 'Prendedor de pacotes',                       cat: '🍳 Utensílios' },
  { id: 8,  name: 'Espremedor de limão',                        cat: '🍳 Utensílios' },
  { id: 9,  name: 'Escorredor de macarrão',                     cat: '🍳 Utensílios' },
  { id: 10, name: 'Forma de cupcake',                           cat: '🍰 Formas'     },
  { id: 11, name: 'Amassador de batata',                        cat: '🍳 Utensílios' },
  { id: 12, name: 'Concha',                                     cat: '🍽️ Louças'     },
  { id: 13, name: 'Espátula',                                   cat: '🍳 Utensílios' },
  { id: 14, name: 'Rolador',                                    cat: '🍳 Utensílios' },
  { id: 15, name: 'Saleiro (preto)',                            cat: '🍳 Utensílios' },
  { id: 16, name: 'Triturador de alho',                         cat: '🍳 Utensílios' },
  { id: 17, name: 'Peneira',                                    cat: '🍳 Utensílios' },
  { id: 18, name: 'Travessa de vidro',                          cat: '🍰 Formas'     },
  { id: 19, name: 'Forma de pão',                               cat: '🍰 Formas'     },
  { id: 20, name: 'Forma de bolo quadrada',                     cat: '🍰 Formas'     },
  { id: 21, name: 'Forma de bolo redonda',                      cat: '🍰 Formas'     },
  { id: 22, name: 'Forma de pudim',                             cat: '🍰 Formas'     },
  { id: 23, name: 'Forma de pizza',                             cat: '🍰 Formas'     },
  { id: 24, name: 'Forma de gelo (silicone)',                   cat: '🍰 Formas'     },
  { id: 25, name: 'Xícaras',                                   cat: '🍽️ Louças'     },
  { id: 26, name: 'Kit facas',                                  cat: '🍽️ Louças'     },
  { id: 27, name: 'Kit talheres (cinza ou preto)',              cat: '🍽️ Louças'     },
  { id: 28, name: 'Kit colher de pau',                          cat: '🍽️ Louças'     },
  { id: 29, name: 'Colher de pau',                              cat: '🍽️ Louças'     },
  { id: 30, name: 'Pegador de macarrão',                        cat: '🍽️ Louças'     },
  { id: 31, name: 'Pá de lixo',                                cat: '🧹 Limpeza'    },
  { id: 32, name: 'Balde',                                      cat: '🧹 Limpeza'    },
  { id: 33, name: 'Grampo de roupa',                            cat: '🧹 Limpeza'    },
  { id: 34, name: 'Varal',                                      cat: '🧹 Limpeza'    },
  { id: 35, name: 'Vassoura',                                   cat: '🧹 Limpeza'    },
  { id: 36, name: 'Pano de chão',                              cat: '🧹 Limpeza'    },
  { id: 37, name: 'Cesto de roupas',                            cat: '🧹 Limpeza'    },
  { id: 38, name: 'Toalhas de banho',                           cat: '🛁 Banheiro'   },
  { id: 39, name: 'Toalhas de rosto',                           cat: '🛁 Banheiro'   },
  { id: 40, name: 'Lixeira banheiro (branco ou preto)',         cat: '🛁 Banheiro'   },
  { id: 41, name: 'Pano de louça',                             cat: '🏠 Casa'       },
  { id: 42, name: 'Jogo de cama',                               cat: '🏠 Casa'       },
  { id: 43, name: 'Toalha de mesa',                             cat: '🏠 Casa'       },
  { id: 44, name: 'Tapete',                                     cat: '🏠 Casa'       },
  { id: 45, name: 'Tábua de corte',                            cat: '🍳 Utensílios' },
  { id: 46, name: 'Lixeira cozinha (branco, preto ou cinza)',   cat: '🏠 Casa'       },
  { id: 47, name: 'Abridor de lata',                            cat: '🍳 Utensílios' },
  { id: 48, name: 'Jogo de tapetes para cozinha',               cat: '🏠 Casa'       },
  { id: 49, name: 'Jogo de tapetes para banheiro',              cat: '🛁 Banheiro'   },
  { id: 50, name: 'Varal portátil',                             cat: '🧹 Limpeza'    },
  { id: 51, name: 'Cabide de madeira',                          cat: '🏠 Casa'       },
];

/* ===========================
   ESTADO
   =========================== */
let selectedGiftId = null;
let activeCategory  = 'Todos';
let state           = {};

const USE_SHEETS = APPS_SCRIPT_URL.startsWith('https://');

/* ===========================
   LOADING BAR
   =========================== */
function setLoading(on) {
  const bar = document.getElementById('loading-bar');
  if (bar) bar.style.width = on ? '80%' : '0%';
}

/* ===========================
   GOOGLE SHEETS
   =========================== */
async function loadState() {
  if (!USE_SHEETS) {
    try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { state = {}; }
    return;
  }
  setLoading(true);
  try {
    const res  = await fetch(APPS_SCRIPT_URL, { cache: 'no-store' });
    const data = await res.json();
    if (typeof data === 'object' && !data.error) {
      state = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } catch {
    try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { state = {}; }
  } finally {
    setLoading(false);
  }
}

async function saveToSheets(giftId, buyerName) {
  try {
    const url = `${APPS_SCRIPT_URL}?action=save&id=${encodeURIComponent(giftId)}&name=${encodeURIComponent(buyerName)}`;
    const res = await fetch(url, { cache: 'no-store' });
    return await res.json();
  } catch {
    return { error: 'network' };
  }
}

// Atualiza a lista a cada 30 segundos para ver presentes escolhidos por outras pessoas
function startPolling() {
  setInterval(async () => {
    await loadState();
    filterGifts();
  }, 30000);
}

/* ===========================
   RENDERIZAÇÃO
   =========================== */
function getCategories() {
  return ['Todos', ...new Set(gifts.map(g => g.cat))];
}

function renderCatTabs() {
  const tabs = document.getElementById('cat-tabs');
  tabs.innerHTML = getCategories().map(c =>
    `<button class="cat-tab${c === activeCategory ? ' active' : ''}" onclick="setCategory('${c.replace(/'/g, "\\'")}')">${c}</button>`
  ).join('');
}

function setCategory(cat) {
  activeCategory = cat;
  renderCatTabs();
  filterGifts();
}

function filterGifts() {
  const q        = document.getElementById('search').value.toLowerCase().trim();
  const filtered = gifts.filter(g => {
    const matchCat = activeCategory === 'Todos' || g.cat === activeCategory;
    const matchQ   = !q || g.name.toLowerCase().includes(q) || g.cat.toLowerCase().includes(q);
    return matchCat && matchQ;
  });
  renderGifts(filtered);
}

function renderGifts(list) {
  const grid  = document.getElementById('gift-grid');
  const noRes = document.getElementById('no-results');
  grid.innerHTML = '';
  grid.appendChild(noRes);

  if (!list.length) { noRes.style.display = 'block'; updateStats(); return; }
  noRes.style.display = 'none';

  list.forEach(g => {
    const taken = state[g.id];
    const card  = document.createElement('div');
    card.className = 'gift-card' + (taken ? ' taken' : '');
    card.innerHTML = `
      <div class="gift-cat-badge">${g.cat}</div>
      <div class="gift-name">${g.name}</div>
      ${taken ? `<div class="gift-buyer">Por: ${taken}</div>` : ''}
      ${!taken ? `
        <button class="gift-btn" onclick="openModal(${g.id})">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 12v10H4V12"/>
            <rect x="2" y="7" width="20" height="5"/>
            <path d="M12 22V7"/>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
          </svg>
          Escolher este presente
        </button>` : ''}
    `;
    grid.appendChild(card);
  });

  updateStats();
}

function updateStats() {
  const takenCount = Object.keys(state).length;
  document.getElementById('stat-total').textContent     = gifts.length;
  document.getElementById('stat-available').textContent = gifts.length - takenCount;
  document.getElementById('stat-taken').textContent     = takenCount;
}

/* ===========================
   MODAIS
   =========================== */
function openModal(id) {
  selectedGiftId = id;
  const gift = gifts.find(g => g.id === id);
  document.getElementById('modal-gift-name').textContent = gift.name;
  document.getElementById('buyer-name').value            = '';
  document.getElementById('buyer-name').style.borderColor = '';
  const btn = document.getElementById('modal-confirm-btn');
  btn.disabled    = false;
  btn.textContent = 'Confirmar presente ♡';
  document.getElementById('modal-choose').classList.add('open');
  setTimeout(() => document.getElementById('buyer-name').focus(), 150);
}

function closeModal() {
  document.getElementById('modal-choose').classList.remove('open');
  selectedGiftId = null;
}

async function confirmGift() {
  const input = document.getElementById('buyer-name');
  const name  = input.value.trim();
  if (!name) {
    input.style.borderColor = '#e57373';
    input.placeholder = 'Por favor, informe seu nome';
    input.focus();
    return;
  }

  const btn = document.getElementById('modal-confirm-btn');
  btn.disabled    = true;
  btn.textContent = 'Salvando...';

  if (USE_SHEETS) {
    const result = await saveToSheets(selectedGiftId, name);

    if (result.error === 'taken') {
      // Outro usuário escolheu antes — atualiza UI e avisa
      await loadState();
      closeModal();
      filterGifts();
      showTakenAlert(result.buyer);
      return;
    }

    if (!result.error) {
      state[selectedGiftId] = name;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      // Erro de rede: salva só localmente como fallback
      state[selectedGiftId] = name;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  } else {
    state[selectedGiftId] = name;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  closeModal();
  filterGifts();
  showSuccessModal();
}

function showSuccessModal() {
  const modal = document.getElementById('modal-success');
  modal.querySelector('.modal-title').textContent    = 'Obrigado!';
  modal.querySelector('.modal-success-text').innerHTML =
    'Que presente lindo! O casal vai adorar.<br>Nos vemos na festa! 🥳';
  modal.querySelector('.modal-submit').textContent   = 'Ver a lista';
  modal.classList.add('open');
}

function showTakenAlert(takenBy) {
  const modal = document.getElementById('modal-success');
  modal.querySelector('.modal-title').textContent    = 'Presente já escolhido';
  modal.querySelector('.modal-success-text').innerHTML =
    `<strong>${takenBy}</strong> acabou de escolher este presente.<br>Por favor, escolha outro! 💝`;
  modal.querySelector('.modal-submit').textContent   = 'Escolher outro';
  modal.classList.add('open');
}

function closeSuccessModal() {
  document.getElementById('modal-success').classList.remove('open');
}

/* ===========================
   EVENTOS
   =========================== */
document.getElementById('modal-choose').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});
document.getElementById('modal-success').addEventListener('click', function (e) {
  if (e.target === this) closeSuccessModal();
});
document.getElementById('buyer-name').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') confirmGift();
  this.style.borderColor = '';
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeSuccessModal(); }
});

/* ===========================
   INICIALIZAÇÃO
   =========================== */
async function init() {
  renderCatTabs();
  filterGifts();
  await loadState();
  filterGifts();
  if (USE_SHEETS) startPolling();
}

init();
