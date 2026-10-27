/**
 * JavaScript Principal — Instituto AMA (Acolhimento, Mentoria e Assistência)
 * Componentes Alpine.js e interatividade do website.
 */

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
        title: 'Estatuto Social do Instituto AMA',
        category: 'institucional',
        date: '2021-08-15',
        type: 'PDF',
        size: '1.2 MB',
        description: 'Documento de constituição jurídica, finalidades e regras de governança da organização.',
        url: '#'
      },
      {
        id: 2,
        title: 'Ata de Eleição e Posse da Diretoria Geral (2025-2029)',
        category: 'institucional',
        date: '2025-01-10',
        type: 'PDF',
        size: '850 KB',
        description: 'Registro oficial dos membros eleitos para a gestão do quadriênio 2025-2029.',
        url: '#'
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

  // Componente de Autenticação da Área do Colaborador
  Alpine.data('collaboratorAuth', () => ({
    credentials: {
      matricula: '',
      senha: '',
      lembrar: false
    },
    loading: false,
    errorMessage: '',
    successMessage: '',
    showPassword: false,

    submitLogin() {
      this.errorMessage = '';
      this.successMessage = '';

      if (!this.credentials.matricula || !this.credentials.senha) {
        this.errorMessage = 'Por favor, preencha a matrícula/CPF e a senha de acesso.';
        return;
      }

      this.loading = true;

      // Simulação de resposta da API de Autenticação
      setTimeout(() => {
        this.loading = false;
        if (this.credentials.senha.length < 4) {
          this.errorMessage = 'Credenciais não encontradas ou conta inativa. Entre em contato com a Secretaria do Instituto AMA.';
        } else {
          this.successMessage = 'Autenticação realizada com sucesso! Redirecionando com segurança ao Sistema AMA...';
          setTimeout(() => {
            alert('Acesso autorizado! Redirecionando para o ambiente seguro do colaborador.');
          }, 1000);
        }
      }, 1200);
    }
  }));

  // Componente de Abas para a página de Projetos
  Alpine.data('projectTabs', (defaultTab = 'acolher') => ({
    activeTab: defaultTab,
    
    setTab(tab) {
      this.activeTab = tab;
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