/* ==========================================================================
   WEBQUEST: LIMPEZA OU PERIGO? OS RISCOS INVISÍVEIS DAS MISTURAS CASEIRAS
   Lógica Interativa: Simulador Químico, Animações Moleculares, Checklist e Quiz
   Autor: Alessandro Monteiro de Sousa
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initSimulator();
  initChecklist();
  initQuiz();
  createFloatingParticles();
});

/* ==========================================================================
   1. Tema Claro Institucional Permanente
   ========================================================================== */
function initTheme() {
  document.documentElement.setAttribute('data-bs-theme', 'light');
}

/* ==========================================================================
   2. Simulador Químico de Misturas com Frasco Animado (Linguagem Direta)
   ========================================================================== */
const chemicalData = {
  // Água Sanitária + Desincrustante Ácido (O caso de Dona Francisca)
  "desincrustante_sanitaria": {
    status: "danger",
    badge: "🛑 PERIGO GRAVE — SOLTA GÁS CLORO TÓXICO",
    title: "O Caso de Dona Francisca no Banheiro",
    formula: "Água Sanitária + Limpador Ácido ➔ Gás Cloro (Cl₂) Perigoso!",
    explanation: "A água sanitária contém cloro (hipoclorito) e os limpadores de cerâmica contêm ácidos fortes. Quando você junta os dois no mesmo balde ou vaso sanitário, ocorre uma reação química que libera <strong>Gás Cloro (Cl₂)</strong> no ar.",
    hazards: "Esse gás tem cheiro forte e sufocante. Ele queima os olhos, arde a garganta, provoca tosse intensa e pode fechar a respiração em poucos segundos!",
    verdict: "NUNCA MISTURE! Se acontecer, saia correndo do local para respirar ar puro e ligue para o SAMU (192)."
  },
  // Água Sanitária + Vinagre
  "sanitaria_vinagre": {
    status: "danger",
    badge: "🛑 PERIGO — SOLTA VAPORES DE CLORO",
    title: "Água Sanitária + Vinagre",
    formula: "Água Sanitária + Vinagre ➔ Liberação de Vapores Tóxicos",
    explanation: "Muita gente acha que o vinagre é fraquinho e não faz mal, mas ele é um ácido. Ao misturar com água sanitária, o ácido libera o cloro na forma de vapor tóxico.",
    hazards: "Ardência forte nos olhos, dor de cabeça, tosse e falta de ar.",
    verdict: "NÃO MISTURE! Use o vinagre sozinho para tirar calcário e a água sanitária sozinha para desinfetar."
  },
  // Água Sanitária + Amônia
  "amonia_sanitaria": {
    status: "danger",
    badge: "☠️ PERIGO EXTREMO — GÁS VENENOSO",
    title: "Água Sanitária + Desinfetante com Amônia",
    formula: "Cloro + Amônia ➔ Cloraminas (Gases Venenosos)",
    explanation: "Alguns desinfetantes perfumados têm amônia na fórmula. A mistura com água sanitária produz gases perigosos chamados cloraminas.",
    hazards: "Vapores asfixiantes que queimam as vias respiratórias, causam dor no peito e podem causar desmaio.",
    verdict: "MUITO PERIGOSO! Nunca misture água sanitária com desinfetantes perfumados no mesmo balde."
  },
  // Água Sanitária + Álcool 70%
  "alcool_sanitaria": {
    status: "danger",
    badge: "🛑 PERIGO — FORMA CLOROFÓRMIO",
    title: "Água Sanitária + Álcool",
    formula: "Cloro + Álcool ➔ Clorofórmio e Compostos Tóxicos",
    explanation: "A mistura de água sanitária com álcool produz compostos tóxicos, inclusive clorofórmio.",
    hazards: "Causa tontura, dor de cabeça, enjoo e pode fazer a pessoa desmaiar no banheiro fechado.",
    verdict: "ERRADO! Passe o álcool puro apenas para higienizar superfícies já secas."
  },
  // Vinagre + Bicarbonato de Sódio
  "bicarbonato_vinagre": {
    status: "warning",
    badge: "⚠️ NÃO FUNCIONA — O FAMOSO MITO DA INTERNET",
    title: "Vinagre + Bicarbonato: Apenas Espuminha!",
    formula: "Vinagre (Ácido) + Bicarbonato (Base) ➔ Água com Sal + Gás Carbônico",
    explanation: "Nos vídeos do TikTok parece mágico porque sobe muita espuma. Mas quimicamente, o ácido do vinagre anula o bicarbonato! A espuma é só gás carbônico (o mesmo gás do refrigerante).",
    hazards: "Não solta fumaça tóxica, mas a mistura perde o poder de limpeza e você joga dinheiro fora. Além disso, se fechar em uma garrafa borrifadora, a pressão da espuma pode estourar a garrafa!",
    verdict: "DESPERDÍCIO! Use o bicarbonato com água para esfregar gordura, e o vinagre sozinho para tirar manchas de calcário."
  },
  // Água Oxigenada + Vinagre
  "oxigenada_vinagre": {
    status: "danger",
    badge: "🛑 PERIGO — ÁCIDO CORROSIVO",
    title: "Água Oxigenada + Vinagre",
    formula: "Vinagre + Água Oxigenada ➔ Ácido Peracético Corrosivo",
    explanation: "Essa mistura cria um ácido forte e corrosivo que pode queimar a pele e estragar móveis e pisos.",
    hazards: "Queimaduras na pele, ardência nos olhos e irritação no nariz e garganta.",
    verdict: "NÃO FAÇA EM CASA! Mantenha cada produto em seu frasco original."
  },
  // Água Sanitária + Água Oxigenada
  "oxigenada_sanitaria": {
    status: "danger",
    badge: "💥 CUIDADO — PODE ESPIRRAR NO ROSTO",
    title: "Reação Rápida com Bolhas e Calor",
    formula: "Água Sanitária + Água Oxigenada ➔ Libera muito Oxigênio e Calor",
    explanation: "Os dois reagem rápido, esquentam e soltam muitas bolhas de oxigênio de uma vez.",
    hazards: "O líquido pode espirrar nos olhos e no rosto da pessoa, e se o frasco estiver fechado ele pode estourar.",
    verdict: "EVITE! Uma substância anula a outra e não limpa nada."
  },
  // Detergente + Bicarbonato
  "bicarbonato_detergente": {
    status: "success",
    badge: "✅ MISTURA SEGURA E MUITO BOA!",
    title: "Detergente Neutro + Bicarbonato de Sódio",
    formula: "Detergente (Tira Gordura) + Bicarbonato (Esfrega sem Riscar)",
    explanation: "Essa é uma receita caseira segura e que realmente funciona! O detergente solta a gordura e o bicarbonato ajuda a esfregar sujeiras difíceis sem riscar a panela ou o azulejo.",
    hazards: "Nenhum gás perigoso! É 100% seguro para a saúde.",
    verdict: "APROVADO! Ótima para limpar pias, fogões e o fundo de panelas engorduradas sem gastar muito."
  },
  // Água Sanitária + Detergente Neutro
  "detergente_sanitaria": {
    status: "info",
    badge: "ℹ️ USE DO JEITO CERTO (EM 2 ETAPAS)",
    title: "Água Sanitária com Detergente",
    formula: "Primeiro limpa com detergente ➔ Enxágua ➔ Depois usa a água sanitária",
    explanation: "Não solta fumaça tóxica se o detergente for neutro comum. Porém, misturar os dois no mesmo balde faz a água sanitária perder a força de matar germes.",
    hazards: "Pode ressecar a pele das mãos se não usar luvas.",
    verdict: "REGRA DE OURO: Primeiro lave o chão com água e sabão/detergente, enxágue com água, e por último passe a água sanitária diluída para desinfetar."
  }
};

function initSimulator() {
  const select1 = document.getElementById('prod1Select');
  const select2 = document.getElementById('prod2Select');
  const resultCard = document.getElementById('reactionResult');
  const btnReset = document.getElementById('btnResetSim');

  if (!select1 || !select2 || !resultCard) return;

  function evaluateMixture() {
    const p1 = select1.value;
    const p2 = select2.value;

    if (!p1 || !p2) {
      renderIdleState();
      return;
    }

    if (p1 === p2) {
      renderSameProduct();
      return;
    }

    const key = [p1, p2].sort().join('_');
    const match = chemicalData[key] || getGenericReaction(p1, p2);

    renderResult(match);
  }

  function renderIdleState() {
    resultCard.className = "reaction-screen";
    resultCard.innerHTML = `
      <div class="py-5 text-center text-muted">
        <div class="flask-vis-wrapper mb-3">
          <svg class="flask-svg" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42 10 H58 V35 L88 95 C92 103 86 112 76 112 H24 C14 112 8 103 12 95 L42 35 V10 Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" class="text-secondary opacity-50"/>
            <path d="M38 10 H62" stroke="currentColor" stroke-width="5" stroke-linecap="round" class="text-secondary opacity-50"/>
          </svg>
        </div>
        <h5 class="fw-bold">Selecione dois produtos acima</h5>
        <p class="small mb-0">O simulador demonstrará a reação química, os gases produzidos e os riscos à saúde.</p>
      </div>
    `;
  }

  function renderSameProduct() {
    resultCard.className = "reaction-screen";
    resultCard.innerHTML = `
      <div class="py-4 text-center">
        <span class="badge bg-secondary mb-2">PRODUTOS IGUAIS</span>
        <h5 class="fw-bold text-main mt-2">Você selecionou o mesmo produto nos dois campos</h5>
        <p class="text-muted small">Não há reação entre amostras do mesmo produto químico. Lembre-se sempre de conferir a diluição indicada no rótulo pelo fabricante!</p>
      </div>
    `;
  }

  function getGenericReaction(p1, p2) {
    return {
      status: "info",
      badge: "ℹ️ AVALIAÇÃO PREVENTIVA",
      title: "Mistura não recomendada sem especificação técnica",
      formula: "Produto A + Produto B ➔ Incompatibilidade desconhecida",
      explanation: "A ANVISA e o Conselho Federal de Química (CFQ) recomendam formalmente nunca misturar produtos saneantes comerciais, pois os estabilizantes, corantes e aditivos de formulações distintas podem sofrer reações cruzadas imprevistas.",
      hazards: "Risco de inativação química, manchas permanentes em superfícies e irritações na pele.",
      verdict: "REGRA DE OURO DA QUÍMICA: Use um produto por vez, enxágue com água e nunca misture frascos."
    };
  }

  function renderResult(data) {
    let badgeClass = "bg-danger text-white";
    let borderClass = "border-danger";
    let liquidColor = "#16a34a";
    let animationEffect = "";

    if (data.status === "danger") {
      badgeClass = "bg-danger text-white";
      borderClass = "border-danger";
      liquidColor = "#b91c1c"; // Tijolo Alerta
      animationEffect = `
        <div class="chem-fumes">
          <span class="fume-cloud f1"></span>
          <span class="fume-cloud f2"></span>
          <span class="fume-cloud f3"></span>
        </div>
      `;
    } else if (data.status === "warning") {
      badgeClass = "bg-warning text-dark";
      borderClass = "border-warning";
      liquidColor = "#b45c18"; // Terracota / Âmbar
      animationEffect = `
        <div class="chem-fizz">
          <span class="fizz-dot b1"></span>
          <span class="fizz-dot b2"></span>
          <span class="fizz-dot b3"></span>
          <span class="fizz-dot b4"></span>
        </div>
      `;
    } else if (data.status === "success") {
      badgeClass = "bg-success text-white";
      borderClass = "border-success";
      liquidColor = "#1e5e3a"; // Verde Floresta Aprovado
      animationEffect = `
        <div class="chem-fizz">
          <span class="fizz-dot b1" style="background: rgba(30, 94, 58, 0.7);"></span>
          <span class="fizz-dot b2" style="background: rgba(30, 94, 58, 0.7);"></span>
        </div>
      `;
    } else if (data.status === "info") {
      badgeClass = "bg-primary text-white";
      borderClass = "border-primary";
      liquidColor = "#561e0a";
    }

    const flaskGraphic = `
      <div class="flask-vis-wrapper">
        ${animationEffect}
        <svg class="flask-svg" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 10 H58 V35 L88 95 C92 103 86 112 76 112 H24 C14 112 8 103 12 95 L42 35 V10 Z" stroke="#4a3e36" stroke-width="4" stroke-linejoin="round"/>
          <path d="M38 10 H62" stroke="#4a3e36" stroke-width="5" stroke-linecap="round"/>
          <path class="flask-liquid-path" d="M22 92 L38 58 H62 L78 92 C80 98 76 106 68 106 H32 C24 106 20 98 22 92 Z" fill="${liquidColor}" opacity="0.85"/>
          <line x1="48" y1="70" x2="56" y2="70" stroke="#786b62" stroke-width="2" opacity="0.6"/>
          <line x1="45" y1="82" x2="55" y2="82" stroke="#786b62" stroke-width="2" opacity="0.6"/>
          <line x1="42" y1="94" x2="54" y2="94" stroke="#786b62" stroke-width="2" opacity="0.6"/>
        </svg>
      </div>
    `;

    resultCard.innerHTML = `
      <div class="text-start w-100">
        ${flaskGraphic}
        <div class="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
          <span class="reaction-badge ${badgeClass}">${data.badge}</span>
          <span class="small text-muted font-mono"><i class="fa-solid fa-atom me-1"></i>Análise Estequiométrica</span>
        </div>
        <h4 class="fw-bold mb-2 text-main">${data.title}</h4>
        
        <div class="formula-display font-mono text-center my-3">
          ${data.formula}
        </div>

        <div class="row g-3 mt-1">
          <div class="col-md-7">
            <h6 class="fw-bold text-primary mb-1"><i class="fa-solid fa-circle-info me-1"></i> O que acontece quimicamente:</h6>
            <p class="small text-main mb-3">${data.explanation}</p>
            
            <h6 class="fw-bold text-danger mb-1"><i class="fa-solid fa-triangle-exclamation me-1"></i> Riscos Biológicos e Sintomas:</h6>
            <p class="small text-muted mb-0">${data.hazards}</p>
          </div>
          <div class="col-md-5">
            <div class="p-3 rounded bg-subtle border ${borderClass} d-flex flex-column justify-content-between">
              <div>
                <span class="d-block fw-bold small text-uppercase mb-2 text-main"><i class="fa-solid fa-shield-halved me-1"></i> Parecer Técnico:</span>
                <p class="small fw-semibold text-main mb-0">${data.verdict}</p>
              </div>
              <div class="mt-3 pt-2 border-top border-secondary-subtle">
                <span class="badge bg-dark-subtle text-muted text-wrap font-monospace" style="font-size: 0.72rem;">Fonte: ANVISA / CFQ / Manual de Toxicologia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  select1.addEventListener('change', evaluateMixture);
  select2.addEventListener('change', evaluateMixture);

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      select1.value = "";
      select2.value = "";
      renderIdleState();
    });
  }

  // Demonstração inicial da mistura de Dona Francisca
  select1.value = "sanitaria";
  select2.value = "desincrustante";
  evaluateMixture();
}

/* ==========================================================================
   3. Checklist do Aluno com Animação de Conclusão (Confetti)
   ========================================================================== */
function initChecklist() {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  const progressBar = document.getElementById('taskProgressBar');
  const progressText = document.getElementById('taskProgressText');
  const btnResetTasks = document.getElementById('btnResetTasks');

  if (!checkboxes.length) return;

  function loadProgress() {
    let savedTasks = JSON.parse(localStorage.getItem('webquest_tasks') || '{}');
    checkboxes.forEach((box, index) => {
      box.checked = !!savedTasks[index];
      updateItemStyle(box);
    });
    updateProgressDisplay();
  }

  function saveProgress() {
    let tasksState = {};
    checkboxes.forEach((box, index) => {
      tasksState[index] = box.checked;
      updateItemStyle(box);
    });
    localStorage.setItem('webquest_tasks', JSON.stringify(tasksState));
    updateProgressDisplay();
  }

  function updateItemStyle(box) {
    const parent = box.closest('.checklist-item');
    if (parent) {
      if (box.checked) {
        parent.classList.add('completed');
      } else {
        parent.classList.remove('completed');
      }
    }
  }

  function updateProgressDisplay() {
    const total = checkboxes.length;
    const checked = document.querySelectorAll('.task-checkbox:checked').length;
    const percentage = Math.round((checked / total) * 100);

    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
      progressBar.setAttribute('aria-valuenow', percentage);
      
      if (percentage === 100) {
        progressBar.classList.remove('bg-primary');
        progressBar.classList.add('bg-success');
      } else {
        progressBar.classList.remove('bg-success');
        progressBar.classList.add('bg-primary');
      }
    }
    if (progressText) {
      if (percentage === 100) {
        progressText.innerHTML = `<strong>🎉 Missão 100% Concluída! Parabéns à Equipe!</strong>`;
        progressText.classList.add('text-success');
        launchConfetti();
      } else {
        progressText.textContent = `${checked} de ${total} etapas concluídas (${percentage}%)`;
        progressText.classList.remove('text-success');
      }
    }
  }

  checkboxes.forEach(box => {
    box.addEventListener('change', saveProgress);
  });

  if (btnResetTasks) {
    btnResetTasks.addEventListener('click', () => {
      if (confirm('Deseja realmente reiniciar o progresso da sua missão?')) {
        localStorage.removeItem('webquest_tasks');
        checkboxes.forEach(box => {
          box.checked = false;
          updateItemStyle(box);
        });
        updateProgressDisplay();
      }
    });
  }

  loadProgress();
}

/* ==========================================================================
   4. Quiz com Comemoração de Acertos (Linguagem Direta e Acessível)
   ========================================================================== */
const quizQuestions = [
  {
    question: "1. No caso de Dona Francisca, qual gás tóxico e perigoso saiu da mistura de água sanitária com o limpador ácido, provocando tosse e ardência nos olhos?",
    options: [
      { text: "A) Gás Oxigênio (O₂), que é o ar puro que respiramos.", correct: false },
      { text: "B) Gás Cloro (Cl₂), um gás venenoso e sufocante que queima as vias respiratórias.", correct: true },
      { text: "C) Gás Hélio (He), que apenas deixa a voz fina.", correct: false },
      { text: "D) Vapor de água comum, que não causa nenhum dano.", correct: false }
    ],
    explanation: "Muito bem! A água sanitária misturada com ácidos libera Gás Cloro (Cl₂). Ele é altamente tóxico e queima os olhos e os pulmões."
  },
  {
    question: "2. Um colega de Mariana achava que misturar ácido com base sempre virava só água e sal. Por que misturar água sanitária com produtos ácidos é tão perigoso?",
    options: [
      { text: "A) Porque a água sanitária tem hipoclorito, que em contato com ácidos sofre uma reação forte e solta gases perigosos.", correct: true },
      { text: "B) Porque todo produto de limpeza explode instantaneamente.", correct: false },
      { text: "C) Porque o vinagre e a água sanitária têm o mesmo pH.", correct: false },
      { text: "D) Porque os produtos de limpeza não seguem leis da Química.", correct: false }
    ],
    explanation: "Exato! A água sanitária tem uma substância oxidante (hipoclorito). Quando entra em contato com ácidos, a reação gera gases venenosos em vez de uma mistura calma."
  },
  {
    question: "3. Por que a receita de misturar 'Vinagre + Bicarbonato de Sódio' famosa na internet não é recomendada para limpar de verdade?",
    options: [
      { text: "A) Porque ela produz radiação que destrói as roupas.", correct: false },
      { text: "B) Porque o ácido do vinagre anula a base do bicarbonato: a espuma é só gás carbônico (CO₂) e o que sobra no balde perde a força de limpeza.", correct: true },
      { text: "C) Porque essa mistura vira óleo de cozinha instantaneamente.", correct: false },
      { text: "D) Porque o bicarbonato só funciona se for misturado com refrigerante.", correct: false }
    ],
    explanation: "Perfeito! A espuminha nos vídeos é só gás carbônico (CO₂). O ácido e a base se anulam, virando água com sal comum, jogando o dinheiro de ambos no ralo."
  },
  {
    question: "4. Qual é a forma correta, mais barata e 100% segura de limpar uma casa sem arriscar a saúde das trabalhadoras?",
    options: [
      { text: "A) Misturar todos os desinfetantes juntos no mesmo balde para ficar mais cheiroso.", correct: false },
      { text: "B) Ferver água sanitária no fogão para evaporar mais rápido.", correct: false },
      { text: "C) Lavar primeiro com água e sabão/detergente, enxaguar bem e só depois aplicar água sanitária diluída em água fria (sem misturar nada).", correct: true },
      { text: "D) Fechar as janelas para o cheiro dos produtos não escapar.", correct: false }
    ],
    explanation: "Show de bola! A regra de ouro é a limpeza em duas etapas: primeiro lava com sabão/detergente e água, enxágua, e depois desinfeta com água sanitária diluída, sempre em local bem arejado."
  }
];

function initQuiz() {
  const quizContainer = document.getElementById('quizContainer');
  if (!quizContainer) return;

  quizContainer.innerHTML = quizQuestions.map((q, qIndex) => `
    <div class="custom-card mb-4" id="quiz-q-${qIndex}">
      <h6 class="fw-bold mb-3 text-main">${q.question}</h6>
      <div class="quiz-options-group">
        ${q.options.map((opt, optIndex) => `
          <button type="button" class="quiz-option" data-q="${qIndex}" data-opt="${optIndex}">
            ${opt.text}
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback mt-3 p-3 rounded d-none" id="feedback-${qIndex}"></div>
    </div>
  `).join('');

  quizContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.quiz-option');
    if (!btn) return;

    const qIndex = parseInt(btn.dataset.q);
    const optIndex = parseInt(btn.dataset.opt);
    const question = quizQuestions[qIndex];
    const option = question.options[optIndex];
    const parentCard = document.getElementById(`quiz-q-${qIndex}`);
    const feedbackEl = document.getElementById(`feedback-${qIndex}`);

    const allOptions = parentCard.querySelectorAll('.quiz-option');
    allOptions.forEach(b => {
      b.disabled = true;
      b.style.pointerEvents = 'none';
    });

    feedbackEl.classList.remove('d-none', 'bg-success-subtle', 'text-success', 'bg-danger-subtle', 'text-danger');

    if (option.correct) {
      btn.classList.add('correct');
      feedbackEl.classList.add('bg-success-subtle', 'text-success', 'border', 'border-success');
      feedbackEl.innerHTML = `<i class="fa-solid fa-circle-check me-2"></i><strong>Excelente!</strong> ${question.explanation}`;
      launchConfetti();
    } else {
      btn.classList.add('wrong');
      allOptions.forEach((b, idx) => {
        if (question.options[idx].correct) {
          b.classList.add('correct');
        }
      });
      feedbackEl.classList.add('bg-danger-subtle', 'text-danger', 'border', 'border-danger');
      feedbackEl.innerHTML = `<i class="fa-solid fa-circle-xmark me-2"></i><strong>Incorreto.</strong> ${question.explanation}`;
    }
  });
}

/* ==========================================================================
   5. Partículas Moleculares Flutuantes (Desativado para Layout Institucional)
   ========================================================================== */
function createFloatingParticles() {
  // Mantido desativado para garantir um visual limpo e institucional
}

/* ==========================================================================
   6. Efeito Confete Leve para Acertos e Conclusão
   ========================================================================== */
function launchConfetti() {
  let canvas = document.getElementById('confettiCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    document.body.appendChild(canvas);
  }

  const ctx = canvas.getContext('2d');
  const width = canvas.width = window.innerWidth;
  const height = canvas.height = window.innerHeight;

  const colors = ['#0284c7', '#0d9488', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899'];
  const particles = [];
  const particleCount = 45;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width / 2,
      y: height * 0.45,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.7) * 14,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }

  let animationFrame;
  function render() {
    ctx.clearRect(0, 0, width, height);

    let activeParticles = 0;
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravidade
      p.rotation += p.vRotation;
      p.alpha -= 0.012; // fade out

      if (p.alpha > 0) {
        activeParticles++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrame = requestAnimationFrame(render);
    } else {
      cancelAnimationFrame(animationFrame);
      ctx.clearRect(0, 0, width, height);
    }
  }

  render();
}
