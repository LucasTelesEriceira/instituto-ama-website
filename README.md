# 🌐 Instituto AMA — Website Institucional Oficial

[![Netlify Status](https://api.netlify.com/api/v1/badges/20397203-657a-4a20-8886-81f98466ae6f/deploy-status)](https://app.netlify.com/sites/institutoama/deploys)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Alpine.js](https://img.shields.io/badge/Alpine.js-8BC0D0?style=for-the-badge&logo=alpinedotjs&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![WebP](https://img.shields.io/badge/Assets-100%25_WebP-00599C?style=for-the-badge)

> **Plataforma web oficial do Instituto AMA (Acolhimento, Mentoria e Assistência)**, organização da sociedade civil dedicada à transformação social, governança comunitária e dignidade humana na região do Itaqui-Bacanga, em São Luís/MA.

🔗 **Acesse o site em produção:** [https://institutoama10.com.br](https://institutoama10.com.br)

---

## 🎯 Sobre o Projeto

O portal foi desenvolvido sob rígidos padrões de **governança visual corporativa (B2B/B2C)**, com foco em usabilidade, alta performance, acessibilidade digital e transparência de dados públicos. O website serve como canal oficial para divulgação de projetos socioassistenciais, prestação de contas com auditoria cidadã, engajamento comunitário e atração de investimentos corporativos com impacto ESG.

---

## ⚡ Destaques de Arquitetura & Engenharia

- **Arquitetura JAMstack Leve & Ultrarrápida:** Construído com HTML5 semântico e reatividade leve orientada a componentes com **Alpine.js 3.x**, dispensando a sobrecarga de frameworks SPA pesados para garantir carregamento instantâneo e indexação SEO 100% nativa.
- **Design System Exclusivo:** Paleta institucional harmonizada (Tons quentes de afeto, turquesa de saúde e esmeralda comunitário), tipografia com Google Fonts Poppins e sistema de tokens padronizados em Tailwind CSS.
- **Otimização de Mídia (100% WebP):** Todas as imagens de eventos reais, fotos de campo e avatares de liderança foram convertidas e otimizadas para `.webp` de alta fidelidade e baixo peso de tráfego.
- **Central de Notícias Dinâmica & Filtrável:**
  - Sistema de busca em tempo real e filtros categorizados por projetos (*Projeto Acolher*, *Ação AMA*, *Mulheres Empreendedoras*, *Projeto Capacitar*, *Transparência & ESG*);
  - Páginas de matéria completa integradas dinamicamente com métricas de impacto (*stats*), autoria e downloads de relatórios oficiais comprobatórios em PDF.
- **Formulário Serverless (Netlify Forms):** Integração nativa para contato, ouvidoria e canal de voluntariado, com notificações automáticas por e-mail e proteção contra spam.
- **Governança & LGPD Compliance:** Página dedicada de Política de Privacidade e Proteção de Dados Pessoais (LGPD), termo de direito de imagem e portal de transparência com certidões e atas oficiais.

---

## 📂 Estrutura de Páginas

```text
website-instituto-ama/
├── index.html                     # Página Inicial (Hero, Missão, Pilares e Destaques)
├── instituto.html                 # O Instituto, História, Linha do Tempo e Diretoria Oficial
├── projetos.html                  # Portfólio dos Projetos Socioassistenciais
├── projeto-acolher.html           # Projeto Acolher (Infância & Metodologia Sophia)
├── acao-ama.html                  # Projeto Ação AMA (Saúde Comunitária & Mutirões)
├── mulheres-empreendedoras.html   # Mulheres Empreendedoras & Selo AMA de Origem
├── projeto-capacitar.html         # Projeto Capacitar (Qualificação Profissional Juvenil)
├── noticias.html                  # Feed de Notícias & Artigos com Filtros em Tempo Real
├── noticia.html                   # Leitor de Matéria Completa & Documentos Oficiais
├── relacoes-institucionais.html   # Portal B2B, Relatórios ESG e Atas da Transparência
├── apoio.html                     # Campanha de Doações e Chave PIX Oficial
├── privacidade-lgpd.html          # Política de Privacidade & LGPD
├── css/                           # Estilos customizados
├── tailwind_theme/                # CSS compilado do design system
└── assets/                        # Documentos PDF e Imagens otimizadas em WebP
```

---

## 🚀 Como Executar Localmente

Como o projeto é estático e otimizado, não requer banco de dados local para execução:

1. **Clone o repositório:**
   ```bash
   git clone git@github.com:LucasTelesEriceira/instituto-ama-website.git
   cd instituto-ama-website
   ```

2. **Inicie um servidor local HTTP:**
   ```bash
   # Com Python:
   python3 -m http.server 8085

   # Ou com Node.js (npx serve):
   npx serve .
   ```

3. **Acesse no navegador:**
   [http://localhost:8085](http://localhost:8085)

---

## 🌐 Deploy Contínuo

O projeto conta com pipeline de deploy automático e gerenciamento via **Netlify CLI / MCP API**:

- **Site ID Netlify:** `20397203-657a-4a20-8886-81f98466ae6f`
- **Domínio de Produção:** [https://institutoama10.com.br](https://institutoama10.com.br)
- **Certificado SSL:** Let's Encrypt ativo e renovado automaticamente.

---

## 👨‍💻 Autor & Desenvolvedor

Desenvolvido por **Lucas Teles Ericeira**  
- **GitHub:** [@LucasTelesEriceira](https://github.com/LucasTelesEriceira)  
- **Projeto:** Instituto AMA (Acolhimento, Mentoria e Assistência)  
- **Local:** São Luís, Maranhão — Brasil
