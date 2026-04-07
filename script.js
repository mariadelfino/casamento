/* ===========================
   GIFT LIST
   =========================== */
const STORAGE_KEY = 'cha_panela_gifts_v1';

const gifts = [
  { id: 1,  name: 'Mededor',                        cat: '🍳 Utensílios' },
  { id: 2,  name: 'Bandejas',                        cat: '🍳 Utensílios' },
  { id: 3,  name: 'Rodo',                            cat: '🧹 Limpeza'    },
  { id: 4,  name: 'Sanduicheira',                    cat: '🍳 Utensílios' },
  { id: 5,  name: 'Funil',                           cat: '🍳 Utensílios' },
  { id: 6,  name: 'Cortador de pizza',               cat: '🍳 Utensílios' },
  { id: 7,  name: 'Prendedor de pacotes',            cat: '🍳 Utensílios' },
  { id: 8,  name: 'Espremedor de limão',             cat: '🍳 Utensílios' },
  { id: 9,  name: 'Escorredor de macarrão',          cat: '🍳 Utensílios' },
  { id: 10, name: 'Forma de cupcake',                cat: '🍰 Formas'     },
  { id: 11, name: 'Amassador de batata',             cat: '🍳 Utensílios' },
  { id: 12, name: 'Concha',                          cat: '🍽️ Louças'     },
  { id: 13, name: 'Espátula',                        cat: '🍳 Utensílios' },
  { id: 14, name: 'Rolador',                         cat: '🍳 Utensílios' },
  { id: 15, name: 'Saleiro (preto)',                 cat: '🍳 Utensílios' },
  { id: 16, name: 'Triturador de alho',              cat: '🍳 Utensílios' },
  { id: 17, name: 'Peneira',                         cat: '🍳 Utensílios' },
  { id: 18, name: 'Travessa de vidro',               cat: '🍰 Formas'     },
  { id: 19, name: 'Forma de pão',                    cat: '🍰 Formas'     },
  { id: 20, name: 'Forma de bolo quadrada',          cat: '🍰 Formas'     },
  { id: 21, name: 'Forma de bolo redonda',           cat: '🍰 Formas'     },
  { id: 22, name: 'Forma de pudim',                  cat: '🍰 Formas'     },
  { id: 23, name: 'Forma de pizza',                  cat: '🍰 Formas'     },
  { id: 24, name: 'Forma de gelo (silicone)',        cat: '🍰 Formas'     },
  { id: 25, name: 'Xícaras',                        cat: '🍽️ Louças'     },
  { id: 26, name: 'Kit facas',                       cat: '🍽️ Louças'     },
  { id: 27, name: 'Kit talheres (cinza ou preto)',   cat: '🍽️ Louças'     },
  { id: 28, name: 'Kit colher de pau',               cat: '🍽️ Louças'     },
  { id: 29, name: 'Colher de pau',                   cat: '🍽️ Louças'     },
  { id: 30, name: 'Pegador de macarrão',             cat: '🍽️ Louças'     },
  { id: 31, name: 'Pá de lixo',                     cat: '🧹 Limpeza'    },
  { id: 32, name: 'Balde',                           cat: '🧹 Limpeza'    },
  { id: 33, name: 'Grampo de roupa',                 cat: '🧹 Limpeza'    },
  { id: 34, name: 'Varal',                           cat: '🧹 Limpeza'    },
  { id: 35, name: 'Vassoura',                        cat: '🧹 Limpeza'    },
  { id: 36, name: 'Pano de chão',                   cat: '🧹 Limpeza'    },
  { id: 37, name: 'Cesto de roupas',                 cat: '🧹 Limpeza'    },
  { id: 38, name: 'Toalhas de banho',                cat: '🛁 Banheiro'   },
  { id: 39, name: 'Toalhas de rosto',                cat: '🛁 Banheiro'   },
  { id: 40, name: 'Lixeira banheiro (branco)',       cat: '🛁 Banheiro'   },
  { id: 41, name: 'Pano de louça',                  cat: '🏠 Casa'       },
  { id: 42, name: 'Jogo de cama',                    cat: '🏠 Casa'       },
  { id: 43, name: 'Toalha de mesa',                  cat: '🏠 Casa'       },
  { id: 44, name: 'Tapete',                          cat: '🏠 Casa'       },
  { id: 45, name: 'Tábua de corte',                 cat: '🍳 Utensílios' },
  { id: 46, name: 'Lixeira cozinha (preto ou cinza)',cat: '🏠 Casa'       },
  { id: 47, name: 'Abridor de lata',                 cat: '🍳 Utensílios' },
  { id: 48, name: 'Jogo de tapetes para cozinha',    cat: '🏠 Casa'       },
  { id: 49, name: 'Jogo de tapetes para banheiro',   cat: '🛁 Banheiro'   },
];

let selectedGiftId = null;
let activeCategory = 'Todos';
let state = {};

function loadState() {
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch { state = {}; }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

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
  const q = document.getElementById('search').value.toLowerCase().trim();
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

function openModal(id) {
  selectedGiftId = id;
  const gift = gifts.find(g => g.id === id);
  document.getElementById('modal-gift-name').textContent = gift.name;
  document.getElementById('buyer-name').value = '';
  document.getElementById('buyer-name').style.borderColor = '';
  document.getElementById('modal-choose').classList.add('open');
  setTimeout(() => document.getElementById('buyer-name').focus(), 150);
}

function closeModal() {
  document.getElementById('modal-choose').classList.remove('open');
  selectedGiftId = null;
}

function confirmGift() {
  const input = document.getElementById('buyer-name');
  const name  = input.value.trim();
  if (!name) {
    input.style.borderColor = '#e57373';
    input.placeholder = 'Por favor, informe seu nome';
    input.focus();
    return;
  }
  state[selectedGiftId] = name;
  saveState();
  closeModal();
  filterGifts();
  document.getElementById('modal-success').classList.add('open');
}

function closeSuccessModal() {
  document.getElementById('modal-success').classList.remove('open');
}

// Close modals on overlay click
document.getElementById('modal-choose').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});
document.getElementById('modal-success').addEventListener('click', function (e) {
  if (e.target === this) closeSuccessModal();
});

// Enter key to confirm
document.getElementById('buyer-name').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') confirmGift();
  this.style.borderColor = '';
});

// Close modals on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeSuccessModal(); }
});

// Init
loadState();
renderCatTabs();
filterGifts();
