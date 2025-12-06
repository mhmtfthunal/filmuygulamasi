// Örnek Film Verileri (Database Simülasyonu)
const movies = [
    {
        id: 1,
        title: "Inception",
        category: "Bilim Kurgu",
        duration: "148 dk",
        imdb: "8.8",
        image: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
        description: "Dom Cobb (Leonardo DiCaprio), çok yetenekli bir hırsızdır. Uzmanlık alanı, zihnin en savunmasız olduğu rüya görme anında, bilinçaltının derinliklerindeki değerli sırları çekip çıkarmaktır.",
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
        id: 2,
        title: "The Dark Knight",
        category: "Aksiyon",
        duration: "152 dk",
        imdb: "9.0",
        image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
        description: "Batman, Teğmen Jim Gordon ve Bölge Savcısı Harvey Dent ile işbirliği yaparak Gotham Sokakları'nı suç örgütlerinden temizlemeye çalışır.",
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY"
    },
    {
        id: 3,
        title: "Interstellar",
        category: "Bilim Kurgu",
        duration: "169 dk",
        imdb: "8.6",
        image: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        description: "İnsanlığın sonunun geldiği bir dönemde, bir grup kaşif, insanlık için yeni bir ev aramak amacıyla solucan deliğinden geçerek boyutlar arası bir yolculuğa çıkar.",
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
    },
    {
        id: 4,
        title: "The Godfather",
        category: "Suç",
        duration: "175 dk",
        imdb: "9.2",
        image: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        description: "Baba, 40’lar ve 50’lerin Amerika’sında, bir İtalyan mafya ailesinin destansı öyküsünü konu alıyor.",
        trailer: "https://www.youtube.com/embed/sY1S34973zA"
    },
    {
        id: 5,
        title: "Avengers: Endgame",
        category: "Macera",
        duration: "181 dk",
        imdb: "8.4",
        image: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
        description: "Thanos'un evrenin yarısını yok etmesinden sonra kalan Avengers üyeleri, evreni eski haline getirmek için bir araya gelir.",
        trailer: "https://www.youtube.com/embed/TcMBFSGVi1c"
    },
    {
        id: 6,
        title: "Pulp Fiction",
        category: "Suç",
        duration: "154 dk",
        imdb: "8.9",
        image: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        description: "Birbirine geçmiş dört ayrı hikaye ile şiddet ve kurtuluş temalarını işleyen kült bir film.",
        trailer: "https://www.youtube.com/embed/s7EdQ4FqbhY"
    }
];

// Sayfa Yüklendiğinde Çalışacak Fonksiyonlar
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const page = path.split("/").pop();

    // Navbar Scroll Efekti
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    if (page === 'index.html' || page === '') {
        renderHero(); // Hero alanını yükle
        renderMovies(movies);
    } else if (page === 'favorites.html') {
        renderFavorites();
    } else if (page === 'product.html') {
        renderProductDetails();
    }
});

// Hero (Vitrin) Alanını Doldurma
function renderHero() {
    const heroSection = document.getElementById('hero-section');
    if (!heroSection) return;

    // Örnek olarak ilk filmi (Inception) veya rastgele birini seçelim
    const featuredMovie = movies[0]; 

    heroSection.style.display = 'block';
    // Arka plan resmi olarak filmin görselini kullanıyoruz (Normalde daha yüksek çözünürlüklü 'cover' resmi olur)
    heroSection.style.backgroundImage = `url('${featuredMovie.image}')`; 

    document.getElementById('hero-title').innerText = featuredMovie.title;
    document.getElementById('hero-desc').innerText = featuredMovie.description;

    // Butonlara tıklama olayları
    document.getElementById('hero-btn-play').onclick = () => goToDetail(featuredMovie.id);
    document.getElementById('hero-btn-detail').onclick = () => goToDetail(featuredMovie.id);
}

// Filmleri Listeleme (Ana Sayfa)
function renderMovies(movieList) {
    const container = document.getElementById('movie-container');
    if (!container) return;

    container.innerHTML = '';
    movieList.forEach(movie => {
        const col = document.createElement('div');
        // col-6: Mobilde 2'li, col-md-4: Tablette 3'lü, col-lg-3: Masaüstünde 4'lü
        col.className = 'col-6 col-md-4 col-lg-3 mb-4'; 
        col.innerHTML = `
            <div class="card movie-card" onclick="goToDetail(${movie.id})">
                <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-truncate">${movie.title}</h5>
                    <div class="mt-auto d-flex justify-content-between align-items-center flex-wrap gap-1">
                        <span class="card-text small text-muted text-truncate" style="max-width: 60%;">${movie.category}</span>
                        <span class="badge-imdb" style="font-size: 0.75rem;">★ ${movie.imdb}</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Detay Sayfasına Yönlendirme
function goToDetail(id) {
    window.location.href = `product.html?id=${id}`;
}

// Ürün Detaylarını Gösterme
function renderProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const movieId = parseInt(params.get('id'));
    const movie = movies.find(m => m.id === movieId);

    if (movie) {
        document.getElementById('movie-title').innerText = movie.title;
        document.getElementById('movie-image').src = movie.image;
        document.getElementById('movie-desc').innerText = movie.description;
        document.getElementById('movie-category').innerText = movie.category;
        document.getElementById('movie-duration').innerText = movie.duration;
        document.getElementById('movie-imdb').innerText = movie.imdb;
        document.getElementById('movie-trailer').src = movie.trailer;

        // Favori Butonu Kontrolü
        const favBtn = document.getElementById('fav-btn');
        if (isFavorite(movie.id)) {
            favBtn.classList.remove('btn-outline-danger');
            favBtn.classList.add('btn-danger');
            favBtn.innerText = 'Favorilerden Çıkar';
        }

        favBtn.onclick = () => toggleFavorite(movie);
    } else {
        document.querySelector('.container').innerHTML = '<h2 class="text-center mt-5">Film bulunamadı!</h2>';
    }
}

// Favori İşlemleri
function getFavorites() {
    return JSON.parse(localStorage.getItem('myFavoriteMovies')) || [];
}

function isFavorite(id) {
    const favorites = getFavorites();
    return favorites.some(m => m.id === id);
}

function toggleFavorite(movie) {
    let favorites = getFavorites();
    if (isFavorite(movie.id)) {
        favorites = favorites.filter(m => m.id !== movie.id);
        alert('Film favorilerden çıkarıldı.');
    } else {
        favorites.push(movie);
        alert('Film favorilere eklendi!');
    }
    localStorage.setItem('myFavoriteMovies', JSON.stringify(favorites));
    
    // Eğer detay sayfasındaysak butonu güncelle
    const favBtn = document.getElementById('fav-btn');
    if (favBtn) {
        if (isFavorite(movie.id)) {
            favBtn.classList.remove('btn-outline-danger');
            favBtn.classList.add('btn-danger');
            favBtn.innerText = 'Favorilerden Çıkar';
        } else {
            favBtn.classList.add('btn-outline-danger');
            favBtn.classList.remove('btn-danger');
            favBtn.innerText = 'Favorilere Ekle';
        }
    }

    // Eğer favoriler sayfasındaysak listeyi yenile
    if (window.location.pathname.includes('favorites.html')) {
        renderFavorites();
    }
}

// Favorileri Listeleme Sayfası
function renderFavorites() {
    const favorites = getFavorites();
    const container = document.getElementById('favorites-container');
    if (!container) return;

    if (favorites.length === 0) {
        container.innerHTML = '<div class="col-12 text-center"><p class="lead">Henüz favori film eklemediniz.</p></div>';
        return;
    }

    container.innerHTML = '';
    favorites.forEach(movie => {
        const col = document.createElement('div');
        // col-6: Mobilde 2'li
        col.className = 'col-6 col-md-4 col-lg-3 mb-4';
        col.innerHTML = `
            <div class="card movie-card" onclick="goToDetail(${movie.id})">
                <img src="${movie.image}" class="card-img-top" alt="${movie.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-truncate">${movie.title}</h5>
                    <div class="mt-auto d-flex justify-content-between align-items-center flex-wrap gap-1">
                        <span class="card-text small text-muted text-truncate" style="max-width: 60%;">${movie.category}</span>
                        <span class="badge-imdb" style="font-size: 0.75rem;">★ ${movie.imdb}</span>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}
