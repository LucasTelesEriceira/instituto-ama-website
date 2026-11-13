/**
 * JavaScript Principal — Instituto AMA (Acolhimento, Mentoria e Assistência)
 * Componentes Alpine.js e interatividade do website.
 */

// ==============================================================================
// 1. Resolução Dinâmica de Ambiente & Endpoints da REST API V2
// ==============================================================================
(function() {
  /**
   * Identifica se a página está sendo executada em ambiente de desenvolvimento local.
   */
  function isLocalEnvironment() {
    if (typeof window === 'undefined' || !window.location) return false;
    const host = window.location.hostname || '';
    const protocol = window.location.protocol || '';
    return !host || 
      host === 'localhost' || 
      host === '127.0.0.1' || 
      host.endsWith('.teste') || 
      host.endsWith('.local') || 
      protocol === 'file:';
  }

  /**
   * Obtém a URL base da REST API do Instituto AMA de acordo com o ambiente atual.
   * Prioridade:
   * 1. window.AMA_API_BASE_URL explícito
   * 2. Ambiente local (LocalWP WordPress headless) -> http://api-instituto-ama.teste/wp-json/ama/v2
   * 3. Produção/Staging -> https://api.institutoamabr.org/wp-json/ama/v2
   */
  function getAmaApiBase() {
    if (typeof window !== 'undefined' && window.AMA_API_BASE_URL) {
      return window.AMA_API_BASE_URL.replace(/\/public\/editais.*$/, '').replace(/\/$/, '');
    }

    if (isLocalEnvironment()) {
      return 'http://api-instituto-ama.teste/wp-json/ama/v2';
    }

    return 'https://api.institutoamabr.org/wp-json/ama/v2';
  }

  /**
   * Constrói a URL completa para qualquer endpoint público ou privado.
   */
  function getAmaApiUrl(endpoint) {
    const base = getAmaApiBase();
    const cleanEndpoint = (endpoint || '').replace(/^\//, '');
    return `${base}/${cleanEndpoint}`;
  }

  if (typeof window !== 'undefined') {
    window.isLocalEnvironment = isLocalEnvironment;
    window.getAmaApiBase = getAmaApiBase;
    window.getAmaApiUrl = getAmaApiUrl;
  }
})();

document.addEventListener('alpine:init', () => {
  
  // Componente de Navegação Global
  Alpine.data('navigation', () => ({
    mobileMenuOpen: false,
    scrolled: false,
    currentPath: (window.location.pathname.split('/').pop() || 'index.html').toLowerCase(),
    
    init() {
      window.addEventListener('scroll', () => {
        this.scrolled = window.scrollY > 20;
      });
    },

    isActive(page) {
      let path = this.currentPath || 'index.html';
      return path === page.toLowerCase();
    },

    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },

    closeMobileMenu() {
      this.mobileMenuOpen = false;
    }
  }));

  // Componente para Copiar Chave PIX
  Alpine.data('pixCopy', (chave = '48722909000180') => ({
    chave: chave,
    copied: false,

    copyToClipboard() {
      navigator.clipboard.writeText(this.chave).then(() => {
        this.copied = true;
        setTimeout(() => {
          this.copied = false;
        }, 3000);
      }).catch(err => {
        console.error('Erro ao copiar chave PIX: ', err);
      });
    }
  }));

  // Componente do Portal da Transparência (Busca e Filtro)
  Alpine.data('transparencyHub', () => ({
    searchQuery: '',
    selectedCategory: 'todos',
    documents: [
      {
        id: 1,
        title: 'Relatório de Prestação de Contas & ESG',
        category: 'financeiro',
        date: '2026-01-15',
        type: 'PDF',
        size: '179 KB',
        description: 'Demonstrativo consolidado de impacto social, governança e conformidade com o MROSC.',
        url: 'assets/docs/relatorio-prestacao-contas-esg-instituto-ama.pdf'
      },
      {
        id: 3,
        title: 'Comprovante de Inscrição e Situação Cadastral (CNPJ)',
        category: 'institucional',
        date: '2025-01-05',
        type: 'PDF',
        size: '340 KB',
        description: 'Cartão CNPJ 48.722.909/0001-80 ativo na Receita Federal do Brasil.',
        url: '#'
      },
      {
        id: 4,
        title: 'Lei de Utilidade Pública Municipal — São Luís/MA',
        category: 'reconhecimentos',
        date: '2024-06-20',
        type: 'PDF',
        size: '520 KB',
        description: 'Reconhecimento oficial de utilidade pública outorgado pelo município de São Luís.',
        url: '#'
      },
      {
        id: 5,
        title: 'Declaração de Utilidade Pública Estadual — Maranhão',
        category: 'reconhecimentos',
        date: '2024-11-12',
        type: 'PDF',
        size: '610 KB',
        description: 'Reconhecimento de utilidade pública estadual concedido pelo Estado do Maranhão.',
        url: '#'
      },
      {
        id: 6,
        title: 'Relatório Anual de Impacto e Atendimentos 2025',
        category: 'financeiro',
        date: '2025-12-28',
        type: 'PDF',
        size: '3.4 MB',
        description: 'Demonstrativo completo de 4.200 atendimentos executados, balanço e indicadores.',
        url: '#'
      },
      {
        id: 7,
        title: 'Termo de Cooperação Técnica — SESC & CRAS Itaqui-Bacanga',
        category: 'parcerias',
        date: '2025-03-14',
        type: 'PDF',
        size: '980 KB',
        description: 'Acordo para execução de oficinas de formação profissional e apoio comunitário.',
        url: '#'
      },
      {
        id: 8,
        title: 'Planejamento Estratégico e Orçamento 2026',
        category: 'financeiro',
        date: '2026-01-15',
        type: 'PDF',
        size: '1.8 MB',
        description: 'Plano de metas, expansão de oficinas e cursos para o exercício de 2026.',
        url: '#'
      }
    ],

    get filteredDocuments() {
      return this.documents.filter(doc => {
        const matchesCategory = this.selectedCategory === 'todos' || doc.category === this.selectedCategory;
        const matchesSearch = doc.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                              doc.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      });
    }
  }));

  // Componente de Abas para a página de Projetos
  Alpine.data('projectTabs', (defaultTab = 'acolher') => ({
    activeTab: defaultTab,
    
    setTab(tab) {
      this.activeTab = tab;
    }
  }));

  // Componente de Editais & Chamadas Públicas (Consome API oficial)
  Alpine.data('editaisHub', () => ({
    searchQuery: '',
    selectedStatus: 'todos',
    selectedEsfera: 'todos',
    loading: false,
    error: null,
    editais: [],

    async init() {
      await this.fetchEditais();
    },

    async fetchEditais() {
      this.loading = true;
      this.error = null;
      try {
        const editaisApiUrl = (typeof window.getAmaApiUrl === 'function') 
          ? window.getAmaApiUrl('public/editais')
          : (window.AMA_API_BASE_URL || 'https://api.institutoamabr.org/wp-json/ama/v2/public/editais');
        
        const controller = (typeof AbortController !== 'undefined') ? new AbortController() : null;
        const timeoutId = controller ? setTimeout(() => controller.abort(), 3500) : null;

        const res = await fetch(editaisApiUrl, {
          signal: controller ? controller.signal : undefined,
          headers: { 'Accept': 'application/json' }
        });
        if (timeoutId) clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          this.editais = (data && Array.isArray(data.items)) ? data.items : (Array.isArray(data) ? data : []);
        } else {
          await this.loadLocalFallback();
        }
      } catch (e) {
        console.info('Base de editais remota offline ou em modo estático. Tentando catálogo local...');
        await this.loadLocalFallback();
      } finally {
        this.loading = false;
      }
    },

    async loadLocalFallback() {
      try {
        const fallbackRes = await fetch('assets/data/editais.json');
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          this.editais = (fallbackData && Array.isArray(fallbackData.items)) ? fallbackData.items : (Array.isArray(fallbackData) ? fallbackData : []);
          this.error = null;
        } else {
          this.editais = [];
          this.error = 'Não foi possível carregar a lista de editais no momento.';
        }
      } catch (errFallback) {
        this.editais = [];
        this.error = 'Falha de comunicação com a base de dados de editais.';
      }
    },

    getStatusBadge(status) {
      const map = {
        'prospeccao': { label: 'Em Prospecção', bg: 'bg-neutral-100 text-neutral-700 border-neutral-200' },
        'elaboracao': { label: 'Inscrições / Elaboração', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
        'submetido': { label: 'Submetido', bg: 'bg-blue-50 text-blue-800 border-blue-200' },
        'em_analise': { label: 'Em Julgamento', bg: 'bg-sky-50 text-sky-800 border-sky-200' },
        'diligencia': { label: 'Em Diligência', bg: 'bg-orange-50 text-orange-800 border-orange-200' },
        'aprovado': { label: 'Proposta Aprovada', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
        'recursos_liberados': { label: 'Recursos Liberados', bg: 'bg-teal-50 text-teal-800 border-teal-200' },
        'em_execucao': { label: 'Em Execução', bg: 'bg-primary-50 text-primary-800 border-primary-200' },
        'prestacao_contas': { label: 'Prestação de Contas', bg: 'bg-purple-50 text-purple-800 border-purple-200' },
        'concluido': { label: 'Concluído', bg: 'bg-stone-100 text-stone-700 border-stone-200' }
      };
      return map[status] || { label: 'Publicado', bg: 'bg-neutral-100 text-neutral-700 border-neutral-200' };
    },

    getEsferaLabel(esfera) {
      const map = {
        'publico_federal': 'Federal',
        'publico_estadual': 'Estadual',
        'publico_municipal': 'Municipal',
        'emenda_parlamentar': 'Emenda Parlamentar',
        'privado': 'Setor Privado / ESG',
        'fundacao': 'Fundação / Instituto',
        'internacional': 'Internacional'
      };
      return map[esfera] || esfera;
    },

    formatDate(dateStr) {
      if (!dateStr) return 'A definir';
      try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
          return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
      } catch (e) {
        return dateStr;
      }
    },

    get filteredEditais() {
      return this.editais.filter(ed => {
        const matchesStatus = this.selectedStatus === 'todos' || ed.status === this.selectedStatus;
        const matchesEsfera = this.selectedEsfera === 'todos' || ed.tipo_esfera === this.selectedEsfera;
        const query = this.searchQuery.toLowerCase().trim();
        const matchesQuery = !query || 
          (ed.titulo && ed.titulo.toLowerCase().includes(query)) ||
          (ed.codigo && ed.codigo.toLowerCase().includes(query)) ||
          (ed.orgao_financiador && ed.orgao_financiador.toLowerCase().includes(query)) ||
          (ed.objeto_resumo && ed.objeto_resumo.toLowerCase().includes(query)) ||
          (ed.area_tematica && ed.area_tematica.toLowerCase().includes(query));
        
        return matchesStatus && matchesEsfera && matchesQuery;
      });
    }
  }));

  // Componente de Ouvidoria & Canal Ético (Consome API oficial)
  Alpine.data('ouvidoriaHub', () => ({
    activeTab: 'formulario', // 'formulario' | 'consulta' | 'sucesso'
    tipo: 'denuncia',
    sigilo: true,
    assunto: '',
    descricao: '',
    departamento_alvo: 'geral',
    perfil_manifestante: 'comunidade',
    prioridade: 'media',
    nome_manifestante: '',
    email_manifestante: '',
    telefone_manifestante: '',

    // Submissão
    submitting: false,
    submitError: null,
    protocoloGerado: '',
    protocoloResult: null,
    copied: false,

    // Consulta
    searchProtocolo: '',
    consultando: false,
    consultaError: null,
    consultaResult: null,

    get apiBase() {
      if (typeof window.getAmaApiBase === 'function') {
        return window.getAmaApiBase();
      }
      if (window.AMA_API_BASE_URL) {
        return window.AMA_API_BASE_URL.replace(/\/public\/editais.*$/, '').replace(/\/$/, '');
      }
      return 'https://api.institutoamabr.org/wp-json/ama/v2';
    },

    async submitManifestacao() {
      if (!this.assunto.trim()) {
        this.submitError = 'Por favor, informe o assunto da manifestação.';
        return;
      }
      if (!this.descricao.trim()) {
        this.submitError = 'Por favor, detalhe a sua manifestação no campo de descrição.';
        return;
      }
      if (!this.sigilo && !this.nome_manifestante.trim()) {
        this.submitError = 'Como a opção identificada está selecionada, informe seu nome completo.';
        return;
      }

      this.submitting = true;
      this.submitError = null;

      const payload = {
        tipo: this.tipo,
        sigilo: this.sigilo ? 1 : 0,
        assunto: this.assunto.trim(),
        descricao: this.descricao.trim(),
        departamento_alvo: this.departamento_alvo,
        perfil_manifestante: this.perfil_manifestante,
        prioridade: this.tipo === 'denuncia' ? 'urgente' : this.prioridade,
        nome_manifestante: this.sigilo ? '' : this.nome_manifestante.trim(),
        email_manifestante: this.sigilo ? '' : this.email_manifestante.trim(),
        telefone_manifestante: this.sigilo ? '' : this.telefone_manifestante.trim()
      };

      try {
        const res = await fetch(`${this.apiBase}/ouvidoria/manifestacoes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.protocolo) {
          this.protocoloGerado = data.protocolo;
          this.protocoloResult = data.item || null;
          this.activeTab = 'sucesso';
          this.resetForm();
        } else {
          this.submitError = data.message || 'Falha ao registrar manifestação. Verifique os dados e tente novamente.';
        }
      } catch (err) {
        this.submitError = 'Não foi possível conectar ao servidor de ouvidoria. Verifique sua conexão ou tente mais tarde.';
      } finally {
        this.submitting = false;
      }
    },

    async consultarProtocolo() {
      const proto = this.searchProtocolo.trim().toUpperCase();
      if (!proto) {
        this.consultaError = 'Digite o número do protocolo para realizar a consulta.';
        return;
      }

      this.consultando = true;
      this.consultaError = null;
      this.consultaResult = null;

      try {
        const res = await fetch(`${this.apiBase}/ouvidoria/manifestacoes/consulta-publica?protocolo=${encodeURIComponent(proto)}`, {
          headers: { 'Accept': 'application/json' }
        });
        const data = await res.json();

        if (res.ok && data.encontrado) {
          this.consultaResult = data;
        } else {
          this.consultaError = data.message || `Nenhuma manifestação encontrada com o protocolo "${proto}". Verifique a digitação.`;
        }
      } catch (err) {
        this.consultaError = 'Erro de comunicação ao consultar o protocolo. Tente novamente mais tarde.';
      } finally {
        this.consultando = false;
      }
    },

    copyProtocolo(proto) {
      if (!proto) return;
      navigator.clipboard.writeText(proto).then(() => {
        this.copied = true;
        setTimeout(() => { this.copied = false; }, 2500);
      });
    },

    resetForm() {
      this.assunto = '';
      this.descricao = '';
      this.nome_manifestante = '';
      this.email_manifestante = '';
      this.telefone_manifestante = '';
      this.sigilo = true;
      this.tipo = 'denuncia';
      this.departamento_alvo = 'geral';
      this.prioridade = 'media';
    },

    getStatusBadge(status) {
      if (!status) return { label: 'Recebido', bg: 'bg-neutral-100 text-neutral-700 border-neutral-200' };
      const map = {
        'novo': { label: 'Recebido / Triagem', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
        'em_analise': { label: 'Em Análise / Apuração', bg: 'bg-blue-50 text-blue-800 border-blue-200' },
        'encaminhado': { label: 'Encaminhado ao Setor', bg: 'bg-purple-50 text-purple-800 border-purple-200' },
        'respondido': { label: 'Respondido Oficialmente', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
        'arquivado': { label: 'Arquivado', bg: 'bg-stone-100 text-stone-700 border-stone-200' }
      };
      return map[status] || { label: status, bg: 'bg-neutral-100 text-neutral-700 border-neutral-200' };
    },

    getTipoLabel(tipo) {
      if (!tipo) return 'Manifestação';
      const map = {
        'denuncia': 'Denúncia',
        'reclamacao': 'Reclamação',
        'sugestao': 'Sugestão',
        'elogio': 'Elogio',
        'informacao': 'Pedido de Informação'
      };
      return map[tipo] || tipo;
    },

    getPrioridadeBadge(prioridade) {
      if (!prioridade) return { label: 'Normal', bg: 'bg-neutral-100 text-neutral-700 border-neutral-200' };
      const map = {
        'baixa': { label: 'Prioridade Baixa', bg: 'bg-stone-100 text-stone-700 border-stone-200' },
        'media': { label: 'Prioridade Média', bg: 'bg-blue-50 text-blue-800 border-blue-200' },
        'alta': { label: 'Prioridade Alta', bg: 'bg-amber-50 text-amber-800 border-amber-200' },
        'urgente': { label: 'Urgente (SLA Especial)', bg: 'bg-rose-50 text-rose-800 border-rose-200' }
      };
      return map[prioridade] || { label: prioridade, bg: 'bg-neutral-100 text-neutral-700 border-neutral-200' };
    },

    formatDateTime(dateStr) {
      if (!dateStr) return 'Não informado';
      try {
        const d = new Date(dateStr.replace(' ', 'T'));
        if (isNaN(d.getTime())) return dateStr;
        return d.toLocaleDateString('pt-BR', {
          day: '2-digit', month: '2-digit', year: 'numeric',
          hour: '2-digit', minute: '2-digit'
        });
      } catch (e) {
        return dateStr;
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return 'A definir';
      try {
        const parts = dateStr.split('-');
        if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
        return dateStr;
      } catch (e) {
        return dateStr;
      }
    }
  }));

  // Componente de Contadores de Impacto Animados
  Alpine.data('impactCounters', () => ({
    counters: [
      { label: 'Atendimentos Realizados', value: 4200, prefix: '+', current: 0 },
      { label: 'Crianças Acolhidas', value: 120, prefix: '', current: 0 },
      { label: 'Mulheres Capacitadas', value: 80, prefix: '', current: 0 },
      { label: 'Jovens e Adultos Qualificados', value: 60, prefix: '', current: 0 },
      { label: 'Bolsas e Estágios Concedidos', value: 30, prefix: '', current: 0 }
    ],

    init() {
      this.animateCounters();
    },

    animateCounters() {
      this.counters.forEach(c => {
        let step = Math.ceil(c.value / 40);
        let interval = setInterval(() => {
          c.current += step;
          if (c.current >= c.value) {
            c.current = c.value;
            clearInterval(interval);
          }
        }, 30);
      });
    }
  }));

});

/**
 * Inicializador global de Animações de Scroll (Scroll Reveal / FadeUp)
 * Observa todos os elementos com a classe `.anim` e aplica a classe `.visible` quando entram na tela.
 */
const initScrollObserver = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.20,
  });

  document.querySelectorAll('.anim').forEach(el => observer.observe(el));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollObserver);
} else {
  initScrollObserver();
}