# 🧪 WebQuest de Química: Limpeza ou Perigo? Os Riscos Invisíveis das Misturas Caseiras

> **Uma WebQuest moderna, investigativa e responsiva para o Ensino Médio de Química**, fundamentada na metodologia de **Estudo de Caso** (Sá & Queiroz, 2010; Herreid, 1998) e alinhada à **BNCC** e ao **Currículo do Território Maranhense**.

* **Acadêmico / Autor:** Alessandro Monteiro de Sousa  
* **Local de Contextualização:** Imperatriz, Maranhão  
* **Público-Alvo:** 3º ano do Ensino Médio (ou 1º/2º anos em unidades temáticas de Reações Químicas, Ácidos, Bases, pH e Termoquímica/Redox)  
* **Tecnologias:** HTML5 semântico, Bootstrap 5.3, JavaScript Moderno, CSS3 com variáveis e suporte nativo a Tema Claro/Escuro (Dark Mode).

---

## 🌟 Destaques e Funcionalidades

1. **Design Moderno e 100% Responsivo:**
   - Adaptado perfeitamente para celulares, tablets, notebooks e computadores desktop.
   - Alternador de **Modo Claro / Modo Escuro** com persistência no navegador.
   - Tipografia limpa (*Plus Jakarta Sans* e *JetBrains Mono* para equações químicas).
   - Botão para **Impressão / Salvar em PDF** formatado para uso em sala de aula sem computadores.

2. **O Estudo de Caso Completo:**
   - Narrativa envolvente sobre Dona Francisca (diarista) e Mariana em Imperatriz-MA.
   - Balões de diálogo dinâmicos e destaques visuais para os pontos críticos de segurança.
   - Matriz com os **11 critérios de Herreid (1998)** para um bom caso investigativo.

3. **🔬 Simulador Interativo de Misturas Domésticas:**
   - Permite que o estudante selecione dois produtos comuns de limpeza (Água Sanitária, Desincrustante Ácido, Vinagre, Bicarbonato, Amônia, Álcool 70%, Água Oxigenada, Detergente).
   - Exibe a reação química balanceada, a toxicidade dos gases liberados ($Cl_2$, cloraminas, clorofórmio, etc.) e a recomendação técnica oficial da ANVISA e do Conselho Federal de Química (CFQ).

4. **Escala de pH Visual do Cotidiano:**
   - Gráfico de cores demonstrando os valores de pH dos produtos de limpeza reais.

5. **📋 Checklist Interativo da Equipe:**
   - Barra de progresso interativa que salva automaticamente o avanço das tarefas no navegador (`localStorage`).

6. **🎯 Quiz Rápido de Fixação:**
   - 4 questões com correção instantânea e explicação pedagógica detalhada.

7. **Matriz de Avaliação (Rubrica):**
   - Critérios claros e transparentes divididos em 4 níveis (Insuficiente, Regular, Bom e Excelente).

8. **Guia Docente & Alinhamento à BNCC:**
   - Habilidades da BNCC contempladas: `EM13CNT101`, `EM13CNT104`, `EM13CNT301` e `EM13CNT307`.
   - Referências completas das obras de Herreid (1998), Sá & Queiroz (2010), ANVISA e SEDUC-MA.

---

## 🚀 Como Publicar no GitHub Pages (Passo a Passo Rápido)

Para colocar sua WebQuest no ar gratuitamente pelo **GitHub Pages**, siga estes passos simples:

### Passo 1: Criar o Repositório no GitHub
1. Acesse sua conta no [GitHub](https://github.com/) e clique em **"New"** (Novo Repositório).
2. Dê um nome ao repositório (por exemplo: `webquest-quimica`).
3. Deixe o repositório como **Público** (Public) e **não** precisa marcar "Add a README" (já temos um pronto).
4. Clique em **"Create repository"**.

### Passo 2: Enviar os Arquivos pelo Terminal
No terminal do seu computador (dentro da pasta do projeto `Web Quest`), execute:

```bash
git init
git add .
git commit -m "feat: WebQuest de Química completa e responsiva"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/webquest-quimica.git
git push -u origin main
```
*(Substitua `SEU-USUARIO/webquest-quimica` pela URL fornecida pelo seu GitHub).*

### Passo 3: Ativar o GitHub Pages
1. No seu repositório no GitHub, clique na aba **Settings** (Configurações).
2. No menu lateral esquerdo, clique em **Pages** (em "Code and automation").
3. Em **"Build and deployment" > "Source"**, selecione **Deploy from a branch**.
4. Em **Branch**, selecione `main` e a pasta `/(root)`.
5. Clique em **Save**.
6. Aguarde cerca de 1 a 2 minutos. O GitHub gerará o link oficial da sua WebQuest, como:
   `https://seu-usuario.github.io/webquest-quimica/`

---

## 📁 Estrutura Multi-Páginas

A WebQuest está dividida em páginas individuais dedicadas, com navegação integrada na barra superior e botões sequenciais de avanço/retorno no rodapé de cada etapa:

```text
Web Quest/
├── index.html         # Página Inicial: Apresentação, Hero e Mapa de Navegação da WebQuest
├── caso.html          # O Estudo de Caso: A história de Dona Francisca e Mariana em Imperatriz-MA
├── introducao.html    # Introdução: Riscos de intoxicação e epidemia de desinformação nas redes
├── tarefa.html        # A Tarefa: Cartilha Ilustrada, Campanha Digital e Parecer Técnico
├── processo.html      # O Processo: Os 4 Papéis Cooperativos, 4 Fases e Checklist Interativo
├── simulador.html     # Simulador Químico: Teste interativo de misturas e Escala de pH visual
├── recursos.html      # Recursos: Links oficiais (ANVISA, CFQ, PhET, SBQ/QNESC, Disque-Intoxicação)
├── avaliacao.html     # Avaliação: Matriz de Rubrica Analítica e Quiz de Fixação com 4 questões
├── conclusao.html     # Conclusão: A Química a serviço da cidadania e defesa da vida
├── professor.html     # Guia Docente: Alinhamento BNCC, Currículo do Maranhão, Metodologia e Créditos
├── css/
│   └── style.css      # Estilização completa, variáveis, temas claro/escuro e responsividade
├── js/
│   └── script.js      # Lógica do simulador químico, controle de tema, checklist e quiz
└── README.md          # Documentação do projeto e instruções de publicação
```

---

## 👨‍🏫 Estrutura Pedagógica da WebQuest

* **Introdução:** Apresenta o dilema da desinformação nas redes e os riscos toxicológicos.
* **O Caso:** A narrativa em Imperatriz-MA (Dona Francisca, Dona Helena, Mariana e o Professor).
* **Tarefa:** Três produtos práticos:
  1. *Cartilha Ilustrada / Guia de Bolso* para diaristas.
  2. *Campanha Digital* para redes sociais combatendo receitas milagrosas perigosas.
  3. *Parecer Técnico* para a aula de Química com equações balanceadas e estudo de viabilidade econômica.
* **Processo:** Divisão em 4 papéis especializados (Químico, Especialista em Saúde, Consultor Econômico e Comunicador Social).
* **Recursos:** Links oficiais da ANVISA, CFQ, simulador PhET e QNESC/SBQ.
* **Avaliação:** Rubrica analítica de 4 critérios e 4 níveis de desempenho.
* **Conclusão:** Reflexão sobre a função social e humanitária da Química.

---

## 📜 Licença e Créditos

Trabalho idealizado pelo acadêmico **Alessandro Monteiro de Sousa**.  
Desenvolvido como Recurso Educacional Aberto (REA) para a melhoria do ensino de Química e Ciências da Natureza.
Livre para utilização didática mediante citação da fonte e do autor.
