// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    const heartsContainer = document.getElementById('hearts');
    
    if (!heartsContainer) {
        console.error('Container de corações não encontrado!');
        return;
    }

    // Diferentes tipos de corações 
    const heartTypes = ['❤️', '💖', '💕', '💗', '💝', '💘', '💞', '💓'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        
        // Escolhe um tipo de coração aleatório
        heart.textContent = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        
        // Posicionamento aleatório horizontal (0% a 95% para evitar corte)
        heart.style.left = Math.random() * 95 + '%';
        
        // Propriedades aleatórias para cada coração
        const fontSize = Math.random() * 25 + 15; // Entre 15px e 40px
        const opacity = Math.random() * 0.4 + 0.6; // Entre 0.6 e 1.0
        const duration = Math.random() * 8 + 6; // Entre 6s e 14s
        const delay = Math.random() * 2; // Entre 0s e 2s
        
        heart.style.fontSize = fontSize + 'px';
        heart.style.opacity = opacity;
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = delay + 's';
        
        // Adiciona o coração ao container
        heartsContainer.appendChild(heart);
        
        // Remove o coração após a animação para evitar acúmulo
        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, (duration + delay + 1) * 1000); // Duração + delay + margem de segurança
    }

    // cria múltiplos corações iniciais
    function createInitialHearts() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createHeart();
            }, i * 200); // Cria um coração a cada 200ms
        }
    }

    // Inicia a criação de corações
    createInitialHearts();
    
    // Continua criando corações em intervalos de 300ms
    const heartInterval = setInterval(createHeart, 300); 
    
    // Função para pausar/retomar a animação 
    window.toggleHearts = function() {
        if (heartInterval) {
            clearInterval(heartInterval);
            heartInterval = null;
            console.log('Corações pausados');
        } else {
            heartInterval = setInterval(createHeart, 300);
            console.log('Corações retomados');
        }
    };
    
    // Limpa o intervalo quando a página é fechada 
    window.addEventListener('beforeunload', function() {
        if (heartInterval) {
            clearInterval(heartInterval);
        }
    });
    
    // Adiciona efeito de hover nos itens da timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Cria alguns corações extras quando hover
            for (let i = 0; i < 3; i++) {
                setTimeout(createHeart, i * 100);
            }
        });
    });
});

// controla a intensidade dos corações
function setHeartIntensity(intensity) {
    const intervals = {
        'low': 500,
        'medium': 300,
        'high': 150
    };
    
    if (window.heartInterval) {
        clearInterval(window.heartInterval);
    }
    
    const interval = intervals[intensity] || 300;
    window.heartInterval = setInterval(createHeart, interval);
    console.log(`Intensidade dos corações alterada para: ${intensity} (${interval}ms)`);
}

// cria efeito especial de corações
function heartExplosion(x = 50, y = 50) {
    const heartsContainer = document.getElementById('hearts');
    if (!heartsContainer) return;
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.textContent = '💖';
            heart.style.left = (x + (Math.random() - 0.5) * 20) + '%';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            heart.style.animationDuration = (Math.random() * 4 + 3) + 's';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 8000);
        }, i * 100);
    }
}