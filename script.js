// ===== API DE PROJETOS DO GITHUB =====

// Função para buscar repositórios reais do GitHub
async function buscarProjetosGitHub() {
    try {
        // Buscar repositórios do usuário samuel0860
        const response = await fetch('https://api.github.com/users/samuel0860/repos?sort=updated&per_page=6');
        
        if (!response.ok) {
            throw new Error('Erro ao buscar repositórios do GitHub');
        }
        
        const repos = await response.json();
        
        // Mapear os dados da API para o formato dos projetos
        const projetos = repos.map(repo => {
            // Definir imagem baseada na linguagem principal
            let imagem = 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop'; // Default
            
            if (repo.language === 'JavaScript') {
                imagem = 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop';
            } else if (repo.language === 'Python') {
                imagem = 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop';
            } else if (repo.language === 'HTML' || repo.language === 'CSS') {
                imagem = 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&h=400&fit=crop';
            } else if (repo.language === 'Java') {
                imagem = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop';
            }
            
            return {
                id: repo.id,
                nome: repo.name,
                descricao: repo.description || 'Projeto desenvolvido com dedicação e foco em boas práticas de programação.',
                imagem: imagem,
                tecnologias: repo.language ? [repo.language] : ['Code'],
                link: repo.html_url,
                demo: repo.homepage || repo.html_url,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                atualizado: new Date(repo.updated_at).toLocaleDateString('pt-BR')
            };
        });
        
        return projetos;
        
    } catch (error) {
        console.error('Erro ao buscar projetos do GitHub:', error);
        throw error;
    }
}

// Função para criar o card de projeto
function criarCardProjeto(projeto) {
    const card = document.createElement('div');
    card.className = 'projeto-card';
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    // Formatar o nome do repositório (remover hífens e capitalizar)
    const nomeFormatado = projeto.nome
        .split('-')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ');
    
    card.innerHTML = `
        <div class="projeto-imagem">
            <img src="${projeto.imagem}" 
                 alt="Imagem representativa do projeto ${nomeFormatado}" 
                 class="projeto-img"
                 loading="lazy">
            <div class="projeto-overlay">
                <a href="${projeto.link}" 
                   class="projeto-btn" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   aria-label="Ver código do projeto ${nomeFormatado} no GitHub">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                    GitHub
                </a>
                ${projeto.demo !== projeto.link ? `
                    <a href="${projeto.demo}" 
                       class="projeto-btn" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       aria-label="Ver demo do projeto ${nomeFormatado}">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Demo
                    </a>
                ` : ''}
            </div>
        </div>
        <div class="projeto-info">
            <h4 class="projeto-nome">${nomeFormatado}</h4>
            <p class="projeto-desc">${projeto.descricao}</p>
            <div class="projeto-meta">
                ${projeto.stars > 0 ? `
                    <span class="projeto-stat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        ${projeto.stars}
                    </span>
                ` : ''}
                ${projeto.forks > 0 ? `
                    <span class="projeto-stat">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="18" r="3"></circle>
                            <circle cx="6" cy="6" r="3"></circle>
                            <circle cx="18" cy="6" r="3"></circle>
                            <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"></path>
                            <path d="M12 12v3"></path>
                        </svg>
                        ${projeto.forks}
                    </span>
                ` : ''}
                <span class="projeto-stat projeto-data">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    ${projeto.atualizado}
                </span>
            </div>
            <div class="projeto-tecnologias">
                ${projeto.tecnologias.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Função para renderizar os projetos
async function renderizarProjetos() {
    const grid = document.getElementById('projetos-grid');
    const loading = document.getElementById('loading');
    
    try {
        // Buscar projetos reais do GitHub
        const projetos = await buscarProjetosGitHub();
        
        // Esconder loading
        loading.style.display = 'none';
        
        if (projetos.length === 0) {
            grid.innerHTML = `
                <div class="empty-message">
                    <p>📦 Nenhum projeto público encontrado ainda.</p>
                    <p>Acompanhe o <a href="https://github.com/samuel0860" target="_blank">GitHub</a> para ver novos projetos!</p>
                </div>
            `;
            return;
        }
        
        // Renderizar cada projeto
        projetos.forEach((projeto, index) => {
            const card = criarCardProjeto(projeto);
            grid.appendChild(card);
            
            // Animação de entrada escalonada
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        console.log(`✅ ${projetos.length} projetos carregados do GitHub!`);
        
    } catch (error) {
        loading.innerHTML = `
            <div class="error-message">
                <p>❌ Erro ao carregar projetos do GitHub.</p>
                <p>Verifique sua conexão e tente novamente.</p>
                <button onclick="location.reload()" class="reload-btn">Recarregar</button>
            </div>
        `;
        console.error('Erro:', error);
    }
}

// Função para scroll suave nos links de navegação
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para adicionar efeito parallax no hero
function initParallax() {
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / 500);
        }
    });
}

// Função para animação de fade-in ao scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    document.querySelectorAll('.tech-card').forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar projetos da API do GitHub
    renderizarProjetos();
    
    // Inicializar scroll suave
    initSmoothScroll();
    
    // Inicializar parallax
    initParallax();
    
    // Inicializar animações de scroll
    initScrollAnimations();
    
    console.log('🚀 Portfolio de Samuel Sales carregado com sucesso!');
    console.log('📧 Contato: muelsales@gmail.com');
    console.log('🔗 GitHub: https://github.com/samuel0860');
});
