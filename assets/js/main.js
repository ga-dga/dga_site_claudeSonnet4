// Ana site JavaScript kodları

// Load data from JSON files
async function loadData() {
    try {
        // Load news
        const newsResponse = await fetch('data/news.json');
        const newsData = await newsResponse.json();
        
        // Load blog
        const blogResponse = await fetch('data/blog.json');
        const blogData = await blogResponse.json();
        
        // Render content
        renderNews(newsData);
        renderProducts();
        
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to default content
        renderDefaultContent();
    }
}

function renderNews(newsData) {
    const featuredNews = newsData.filter(item => item.featured);
    const otherNews = newsData.filter(item => !item.featured);
    
    // Render featured news
    const featuredContainer = document.getElementById('featured-news');
    if (featuredNews.length > 0) {
        const latest = featuredNews[0];
        featuredContainer.innerHTML = `
            <div class="featured-news fade-in">
                <div class="featured-badge">ÖNE ÇIKAN</div>
                <div class="news-meta">
                    <span class="news-date">${formatDate(latest.date)}</span>
                    <span class="news-category">${latest.category}</span>
                </div>
                <h3>${latest.title}</h3>
                <p>${latest.excerpt}</p>
                <a href="#" class="btn btn-primary">
                    <i class="fas fa-arrow-right"></i>
                    Detayları İncele
                </a>
            </div>
        `;
    }
    
    // Render other news
    const otherContainer = document.getElementById('other-news');
    if (otherNews.length > 0) {
        otherContainer.innerHTML = `
            <div class="other-news">
                ${otherNews.slice(0, 6).map(item => `
                    <div class="news-card fade-in">
                        <div class="news-date">${formatDate(item.date)}</div>
                        <h4>${item.title}</h4>
                        <p>${item.excerpt}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
}

function renderProducts() {
    const products = [
        {
            icon: 'fas fa-bolt',
            title: 'WSCAD SUITE',
            description: 'Elektrik mühendisliği için komple E-CAD çözümü.',
            features: ['35+ yıllık deneyim', '80,000+ aktif kullanıcı', 'Elektrik şematik tasarım', '3D panel layout']
        },
        // Diğer ürünler...
    ];
    
    const container = document.getElementById('products-grid');
    container.innerHTML = products.map(product => `
        <div class="product-card fade-in">
            <div class="product-header">
                <div class="product-icon">
                    <i class="${product.icon}"></i>
                </div>
                <h3>${product.title}</h3>
            </div>
            <p>${product.description}</p>
            <ul class="product-features">
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <a href="#" class="btn btn-primary">Keşfet</a>
        </div>
    `).join('');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('tr-TR', options);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadData();
    
    // Navigation handling
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            
            if (!name || !email) {
                alert('Lütfen zorunlu alanları doldurun.');
                return;
            }

            alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
            this.reset();
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
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

    // Animation observer
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';
        observer.observe(el);
    });
});