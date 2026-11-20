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
   1. Tema Escuro Permanente
   ========================================================================== */
function initTheme() {
  document.documentElement.setAttribute('data-bs-theme', 'dark');
}

/* ==========================================================================
   2. Simulador Químico de Misturas com Frasco Animado
   ========================================================================== */
const chemicalData = {
  // Água Sanitária + Desincrustante Ácido (O caso de Dona Francisca)
  "sanitaria_desincrustante": {
    status: "danger",
    badge: "☠️ PERIGO EXTREMO — GÁS CLORO TÓXICO",
    title: "Reação Redox com Liberação de Cl₂ (O Caso de Dona Francisca)",
    formula: "NaClO(aq) + 2 HCl(aq) ➔ Cl₂(g) ↑ + NaCl(aq) + H₂O(l)",
    explanation: "A água sanitária contém hipoclorito de sódio (meio básico). Os limpadores de cerâmica ou pedras comumente contêm ácido clorídrico (ácido muriático). A reação entre eles é uma óxido-redução violenta que oxida o íon cloreto e reduz o hipoclorito, liberando <strong>gás cloro (Cl₂)</strong>.",
    hazards: "O Cl₂ é um gás amarelado-esverdeado de odor sufocante. Ao entrar em contato com os olhos e a água dos pulmões, forma ácido clorídrico e ácido hipocloroso nas mucosas, causando ardência imediata, tosse intensa, asfixia e risco iminente de <strong>edema agudo de pulmão</strong>.",
    verdict: "JAMAIS MISTURAR! Se inalado, abandone o local imediatamente e procure socorro médico urgente (Ligue 192 / SAMU)."
  },
  // Água Sanitária + Vinagre
  "sanitaria_vinagre": {
    status: "danger",
    badge: "☠️ PERIGO ALTO — LIBERAÇÃO DE VAPORES DE CLORO",
    title: "Acidificação do Hipoclorito por Ácido Acético",
    formula: "NaClO(aq) + CH₃COOH(aq) ➔ HClO(aq) + CH₃COONa(aq)  [HClO instável ➔ Cl₂ ↑]",
    explanation: "O vinagre contém cerca de 4% a 5% de ácido acético. Ao abaixar o pH da água sanitária, o equilíbrio químico é deslocado para a formação de ácido hipocloroso (HClO), que rapidamente se decompõe liberando gás cloro (Cl₂) e vapores corrosivos.",
    hazards: "Ardência nos olhos, sensação de garganta queimando, falta de ar e crises agudas de broncoespasmo.",
    verdict: "PERIGOSO! Não misture vinagre com água sanitária em hipótese alguma."
  },
  // Água Sanitária + Amônia
  "sanitaria_amonia": {
    status: "danger",
    badge: "☠️ PERIGO EXTREMO — FORMAÇÃO DE CLORAMINAS TÓXICAS",
    title: "Reação com Compostos Nitrogenados",
    formula: "NH₃(aq) + NaClO(aq) ➔ NH₂Cl(g) ↑ + NaOH(aq)",
    explanation: "Muitos desinfetantes multiuso contêm amônia. Quando combinados com hipoclorito, formam compostos gasosos tóxicos chamados <strong>cloraminas (NH₂Cl e NHCl₂)</strong>.",
    hazards: "Vapores asfixiantes, danos celulares graves nos alvéolos pulmonares, dor torácica intensa e tontura severa.",
    verdict: "LETAL! Combinação frequentemente responsável por internações de trabalhadores de limpeza."
  },
  // Água Sanitária + Álcool 70%
  "sanitaria_alcool": {
    status: "danger",
    badge: "☠️ PERIGO GRAVE — FORMAÇÃO DE CLOROFÓRMIO",
    title: "Haloformação (Clorofórmio e Ácido Clorídrico)",
    formula: "C₂H₅OH + NaClO ➔ CHCl₃(g) ↑ + HCOONa + NaCl + H₂O",
    explanation: "A reação haloforme entre o hipoclorito e compostos orgânicos alcoólicos produz clorofórmio (triclorometano) e compostos organoclorados tóxicos.",
    hazards: "O clorofórmio é um potente depressor do sistema nervoso central, hepatotóxico (fígado) e nefrotóxico (rins), causando tontura, sonolência e desmaio.",
    verdict: "PROIBIDO! O álcool deve ser usado isoladamente em superfícies secas para higienização."
  },
  // Vinagre + Bicarbonato de Sódio
  "vinagre_bicarbonato": {
    status: "warning",
    badge: "⚠️ INEFICAZ — O FAMOSO MITO DA INTERNET",
    title: "Reação de Neutralização Ácido-Base (Desperdício)",
    formula: "CH₃COOH(aq) + NaHCO₃(s) ➔ CH₃COONa(aq) + H₂O(l) + CO₂(g) ↑",
    explanation: "O vinagre é ácido (pH ~2,5) e o bicarbonato é básico (pH ~8,5). Ao misturá-los, ocorre uma reação de neutralização instantânea. A intensa efervescência que encanta as pessoas nas redes sociais é apenas liberação de dióxido de carbono (CO₂ - gás inofensivo presente no refrigerante).",
    hazards: "O sal formado (acetato de sódio) e a água resultante não possuem poder desincrustante nem desengordurante potente! Se colocado em um frasco borrifador fechado, a pressão do CO₂ pode estourar o recipiente e ferir quem estiver por perto.",
    verdict: "DESPERDÍCIO! Use o bicarbonato com água/detergente para ação mecânica e o vinagre separadamente para remover calcário/manchas alcalinas. Nunca os misture em frasco fechado."
  },
  // Água Oxigenada + Vinagre
  "vinagre_oxigenada": {
    status: "danger",
    badge: "☠️ PERIGO ALTO — FORMAÇÃO DE ÁCIDO PERACÉTICO",
    title: "Síntese Acidental de Ácido Peracético",
    formula: "CH₃COOH(aq) + H₂O₂(aq) ⇌ CH₃COOOH(aq) + H₂O(l)",
    explanation: "A combinação do ácido acético do vinagre com o peróxido de hidrogênio (água oxigenada) sintetiza o ácido peracético concentrado.",
    hazards: "Substância altamente corrosiva que queima a pele, causa lesões corneanas irreversíveis e danifica permanentemente os tecidos respiratórios se inalada.",
    verdict: "NUNCA MISTURE! Embora usado industrialmente em hospitais sob estrito controle, seu preparo caseiro é perigosíssimo."
  },
  // Água Sanitária + Água Oxigenada
  "sanitaria_oxigenada": {
    status: "danger",
    badge: "💥 REAÇÃO VIOLENTA — DESPRENDIMENTO RÁPIDO DE OXIGÊNIO",
    title: "Decomposição Exotérmica Rápida",
    formula: "NaClO(aq) + H₂O₂(aq) ➔ NaCl(aq) + H₂O(l) + O₂(g) ↑ + Calor",
    explanation: "Ocorre uma oxidação rápida do peróxido pelo hipoclorito, liberando grandes volumes de gás oxigênio puro com aumento súbito de temperatura e pressão.",
    hazards: "Risco de explosão em recipientes fechados e projeção de líquidos cáusticos nos olhos e rosto.",
    verdict: "EVITE! Inativa as propriedades de desinfecção de ambos os produtos e pode causar estouros mecânicos."
  },
  // Detergente + Bicarbonato
  "detergente_bicarbonato": {
    status: "success",
    badge: "✅ MISTURA SEGURA & EFICAZ (Ação Mecânica e Tensoativa)",
    title: "Saponificação Auxiliar e Abrasão Suave",
    formula: "Detergente Tensoativo + NaHCO₃(s) + H₂O(l) [Sem reação violenta]",
    explanation: "O bicarbonato age como abrasivo suave não riscante e levemente alcalinizante, enquanto o detergente quebra a tensão superficial e emulsifica gorduras.",
    hazards: "Nenhum gás tóxico gerado. Totalmente seguro.",
    verdict: "APROVADO! Excelente alternativa caseira de baixo custo para remover panelas engorduradas e pias com segurança."
  },
  // Água Sanitária + Detergente Neutro
  "sanitaria_detergente": {
    status: "info",
    badge: "ℹ️ USE COM RESSALVAS (Atenção ao Rótulo)",
    title: "Diluição e Possível Perda de Eficiência",
    formula: "NaClO(aq) + Tensoativos Neutros",
    explanation: "Se o detergente for rigorosamente neutro, não há reação tóxica imediata. No entanto, muitos detergentes contêm fragrâncias, corantes ou aminas que podem degradar o hipoclorito ou reduzir drasticamente o poder desinfetante.",
    hazards: "Dermatite de contato caso não use luvas.",
    verdict: "O ideal recomendado pela ANVISA é limpar primeiro a sujeira com água e sabão/detergente, enxaguar bem, e só depois aplicar a água sanitária diluída para desinfetar."
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
    let liquidColor = "#84cc16";
    let animationEffect = "";

    resultCard.classList.remove('toxic-pulse');

    if (data.status === "danger") {
      badgeClass = "bg-danger text-white";
      borderClass = "border-danger";
      liquidColor = "#a3e635"; // Verde-limão tóxico (Cl₂ gasoso)
      resultCard.classList.add('toxic-pulse');
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
      liquidColor = "#f59e0b"; // Âmbar efervescente
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
      liquidColor = "#06b6d4"; // Azul-piscina limpo
      animationEffect = `
        <div class="chem-fizz">
          <span class="fizz-dot b1" style="background: rgba(255,255,255,0.85);"></span>
          <span class="fizz-dot b2" style="background: rgba(255,255,255,0.85);"></span>
        </div>
      `;
    } else if (data.status === "info") {
      badgeClass = "bg-info text-dark";
      borderClass = "border-info";
      liquidColor = "#64748b";
    }

    const flaskGraphic = `
      <div class="flask-vis-wrapper">
        ${animationEffect}
        <svg class="flask-svg" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M42 10 H58 V35 L88 95 C92 103 86 112 76 112 H24 C14 112 8 103 12 95 L42 35 V10 Z" stroke="currentColor" stroke-width="4" stroke-linejoin="round" class="text-secondary opacity-75"/>
          <path d="M38 10 H62" stroke="currentColor" stroke-width="5" stroke-linecap="round" class="text-secondary"/>
          <path class="flask-liquid-path" d="M22 92 L38 58 H62 L78 92 C80 98 76 106 68 106 H32 C24 106 20 98 22 92 Z" fill="${liquidColor}" opacity="0.85"/>
          <line x1="48" y1="70" x2="56" y2="70" stroke="currentColor" stroke-width="2" opacity="0.4"/>
          <line x1="45" y1="82" x2="55" y2="82" stroke="currentColor" stroke-width="2" opacity="0.4"/>
          <line x1="42" y1="94" x2="54" y2="94" stroke="currentColor" stroke-width="2" opacity="0.4"/>
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
   4. Quiz com Comemoração de Acertos
   ========================================================================== */
const quizQuestions = [
  {
    question: "1. No caso de Dona Francisca em Imperatriz, qual gás tóxico e sufocante foi produzido pela mistura de água sanitária (NaClO) com o desincrustante ácido (HCl)?",
    options: [
      { text: "A) Gás Oxigênio (O₂), que não causa danos pulmonares.", correct: false },
      { text: "B) Gás Cloro (Cl₂), que reage com a umidade das vias aéreas formando ácidos corrosivos.", correct: true },
      { text: "C) Gás Metano (CH₄), que apenas tem odor desagradável de decomposição.", correct: false },
      { text: "D) Gás Carbônico (CO₂), inofensivo e responsável por refrigerantes.", correct: false }
    ],
    explanation: "Correto! O hipoclorito de sódio sofre óxido-redução com o ácido clorídrico (HCl), desprendendo Cloro molecular (Cl₂), altamente tóxico e com capacidade de destruir o epitélio pulmonar."
  },
  {
    question: "2. Um colega de classe de Mariana argumentou: 'Se um produto é ácido e o outro é básico, não deveria ocorrer apenas neutralização?'. Por que essa afirmação é equivocada no caso dos produtos de limpeza comerciais?",
    options: [
      { text: "A) Porque produtos comerciais não são substâncias puras em soluções ideais; eles contêm agentes oxidantes e outros íons reativos que geram gases e reações de oxi-redução violentas.", correct: true },
      { text: "B) Porque a Química do cotidiano não segue as mesmas leis científicas dos laboratórios.", correct: false },
      { text: "C) Porque o vinagre e a água sanitária possuem o mesmo valor de pH na escala universal.", correct: false },
      { text: "D) Porque a neutralização sempre produz substâncias inflamáveis e explosivas.", correct: false }
    ],
    explanation: "Exato! Nem todo ácido + base produz apenas sal neutro e água. O hipoclorito é um oxidante enérgico. Em meio ácido, ele oxida cloretos a gás cloro (Cl₂), e não uma simples água com sal inofensiva."
  },
  {
    question: "3. Por que a famosa mistura de 'Vinagre + Bicarbonato de Sódio' amplamente divulgada no TikTok é considerada um desperdício do ponto de vista químico?",
    options: [
      { text: "A) Porque ela produz gases venenosos que destroem móveis e vidros.", correct: false },
      { text: "B) Porque o ácido acético neutraliza a basicidade do bicarbonato, gerando água, CO₂ e um sal inofensivo que não tem poder nem desengordurante nem desincrustante.", correct: true },
      { text: "C) Porque o bicarbonato reage apenas em temperaturas superiores a 300 °C.", correct: false },
      { text: "D) Porque o vinagre se transforma em álcool etílico instantaneamente.", correct: false }
    ],
    explanation: "Muito bem! O borbulhamento é apenas gás carbônico (CO₂). O ácido e a base se anulam mutuamente, resultando numa solução aquosa de acetato de sódio, que perde tanto a propriedade desincrustante do ácido quanto a propriedade desengordurante do bicarbonato."
  },
  {
    question: "4. Qual é a recomendação oficial da ANVISA e do CFQ para realizar uma limpeza eficiente e de baixo custo sem arriscar a vida das trabalhadoras?",
    options: [
      { text: "A) Misturar todos os desinfetantes disponíveis em um balde fechado para potencializar o aroma.", correct: false },
      { text: "B) Usar água fervente com água sanitária pura sem luvas para acelerar a evaporação.", correct: false },
      { text: "C) Fazer a limpeza prévia com água e detergente/sabão neutro, enxaguar e só depois desinfetar com água sanitária na diluição correta (sem misturas).", correct: true },
      { text: "D) Substituir qualquer produto de limpeza por querosene aquecido em ambiente fechado.", correct: false }
    ],
    explanation: "Perfeito! A limpeza em duas etapas (remoção mecânica de sujeira com detergente neutro + enxágue + desinfecção com água sanitária diluída em água fria) é a mais barata, segura e com maior respaldo científico."
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
   5. Partículas Moleculares Flutuantes no Fundo (Efeito Ciência)
   ========================================================================== */
function createFloatingParticles() {
  const targetHeader = document.querySelector('.hero-section') || document.querySelector('.page-header-banner');
  if (!targetHeader) return;

  const container = document.createElement('div');
  container.className = 'chem-bg-particles';

  const molecules = ['H₂O', 'Cl₂', 'pH', 'NaClO', 'HCl', 'OH⁻', 'CO₂'];
  const leftPositions = [8, 22, 38, 55, 72, 88];

  leftPositions.forEach((pos, idx) => {
    const bubble = document.createElement('div');
    bubble.className = 'chem-floating-bubble';
    bubble.textContent = molecules[idx % molecules.length];
    bubble.style.left = `${pos}%`;
    const size = Math.floor(Math.random() * 18) + 36; // 36px a 54px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.animationDuration = `${12 + (idx * 2)}s`;
    bubble.style.animationDelay = `${idx * 1.8}s`;
    container.appendChild(bubble);
  });

  targetHeader.style.position = 'relative';
  targetHeader.appendChild(container);
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
