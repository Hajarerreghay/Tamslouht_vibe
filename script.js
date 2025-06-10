
        // Variables globales
        let currentSection = 'accueil';
        let cart = [];
        let currentMonth = new Date();
        let currentItinerary = null;

        // Navigation entre sections
        function showSection(sectionName) {
            // Masquer toutes les sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Afficher la section demandée
            document.getElementById(sectionName).classList.add('active');
            
            // Mettre à jour la navigation
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            event.target.classList.add('active');
            
            currentSection = sectionName;
            
            // Actions spécifiques selon la section
            if (sectionName === 'agenda') {
                generateCalendar();
            }
        }
/*
        // Système de notifications
        function showNotification(message, type = 'success') {
            const notification = document.getElementById('notification');
            const notificationText = document.getElementById('notificationText');
            
            notificationText.textContent = message;
            notification.className = `notification ${type}`;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
*/
        // Fonctions du documentaire
        function playVideo() {
         showNotification('Lecture du documentaire en cours...', 'info');
    
    // Récupérer l'élément vidéo
    const video = document.getElementById('documentaryVideo');
    
    if (video) {
        // Lancer la lecture de la vidéo
        video.play().then(() => {
            console.log('Vidéo lancée avec succès');
        }).catch((error) => {
            console.error('Erreur lors de la lecture:', error);
            showNotification('Erreur lors de la lecture de la vidéo', 'error');
        });
        
        // Optionnel : faire défiler jusqu'à la vidéo
        video.scrollIntoView({ behavior: 'smooth' });
    } else {
        showNotification('Vidéo introuvable', 'error');
    }
}
        function showTrailer() {
            showNotification('Chargement de la bande-annonce...', 'info');
        }

        // Fonctions de la galerie
        function uploadPhoto(input) {
            if (input.files && input.files[0]) {
                showNotification('Photo ajoutée avec succès ! Merci pour votre contribution.', 'success');
                // Ici, on traiterait l'upload réel
            }
        }

        function filterPhotos(category) {
            const photos = document.querySelectorAll('.photo-item');
            photos.forEach(photo => {
                if (category === 'all' || photo.dataset.category === category) {
                    photo.style.display = 'flex';
                } else {
                    photo.style.display = 'none';
                }
            });
        }

        // Fonctions des itinéraires
        function selectItinerary(type) {
            currentItinerary = type;
            const mapContainer = document.getElementById('mapContainer');
            const duration = document.getElementById('duration');
            const points = document.getElementById('points');
            const practicalInfo = document.getElementById('practicalInfo');
            const downloadBtn = document.getElementById('downloadBtn');

            if (!type) {
                mapContainer.innerHTML = '🗺️ Carte interactive des itinéraires<br><small>Sélectionnez un circuit pour voir l\'itinéraire détaillé</small>';
                duration.textContent = 'Sélectionnez un circuit';
                points.textContent = 'Sélectionnez un circuit';
                downloadBtn.style.display = 'none';
                return;
            }

            const itineraries = {
                artisanat: {
                    duration: 'Demi-journée (4h)',
                    points: '5 ateliers d\'artisans',
                    map: '🗺️ Itinéraire Artisanat : Poterie → Tissage → Bijouterie → Menuiserie → Forge',
                    info: 'Visite guidée des ateliers traditionnels avec démonstrations en direct.'
                },
                soufisme: {
                    duration: 'Journée complète (6h)',
                    points: '3 zaouïas et 2 mausolées',
                    map: '🗺️ Circuit Spirituel : Zaouïa principale → Mausolée Sidi Rahal → Méditation',
                    info: 'Découverte du patrimoine spirituel avec guide spécialisé.'
                },
                nature: {
                    duration: '2-3 heures',
                    points: '4 sites naturels',
                    map: '🗺️ Randonnée Nature : Départ village → Oliveraies → Point de vue → Retour',
                    info: 'Randonnée facile accessible à tous, chaussures de marche recommandées.'
                },
                culture: {
                    duration: 'Demi-journée (3h)',
                    points: '6 monuments historiques',
                    map: '🗺️ Circuit Culturel : Centre historique → Musée → Architecture traditionnelle',
                    info: 'Visite des principaux sites patrimoniaux avec audioguide.'
                },
                gastronomie: {
                    duration: 'Journée complète (8h)',
                    points: '4 dégustations + atelier cuisine',
                    map: '🗺️ Circuit Gourmand : Marché → Coopérative → Restaurant → Atelier cuisine',
                    info: 'Expérience culinaire complète avec dégustation et apprentissage.'
                }
            };

            const itinerary = itineraries[type];
            mapContainer.innerHTML = itinerary.map;
            duration.textContent = itinerary.duration;
            points.textContent = itinerary.points;
            practicalInfo.innerHTML = `<p><strong>Description :</strong> ${itinerary.info}</p>
                <p><strong>Tarifs :</strong> À partir de 150 MAD/personne</p>
                <p><strong>Réservation :</strong> 48h à l'avance recommandées</p>
                <p><strong>Groupe :</strong> 2 à 15 personnes</p>`;
            downloadBtn.style.display = 'inline-block';
        }

        function downloadPDF() {
            if (currentItinerary) {
                showNotification('Téléchargement de la fiche PDF en cours...', 'info');
                // Ici, on générerait et téléchargerait le PDF
            }
        }

        // Fonctions du store
        function filterProducts(category) {
            const products = document.querySelectorAll('.product-card');
            products.forEach(product => {
                if (category === 'all' || product.dataset.category === category) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            });
        }

        function addToCart(productId) {
            const products = {
                'vase-terre-cuite': { name: 'Vase en terre cuite', price: 350 },
                'tapis-berbere': { name: 'Tapis berbère authentique', price: 1200 },
                'bracelet-argent': { name: 'Bracelet en argent gravé', price: 280 },
                'huile-argan': { name: 'Huile d\'argan pure', price: 150 },
                'miel-montagne': { name: 'Miel de montagne', price: 80 },
                'service-the': { name: 'Service à thé traditionnel', price: 450 }
            };

            const product = products[productId];
            if (product) {
                cart.push({ id: productId, ...product });
                updateCart();
                showNotification(`${product.name} ajouté au panier !`, 'success');
            }
        }

        function updateCart() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const checkoutBtn = document.getElementById('checkoutBtn');

            cartCount.textContent = cart.length;

            if (cart.length === 0) {
                cartItems.innerHTML = '<p>Votre panier est vide</p>';
                cartTotal.textContent = '';
                checkoutBtn.style.display = 'none';
                return;
            }

            let html = '';
            let total = 0;
            cart.forEach((item, index) => {
                html += `<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                    <span>${item.name}</span>
                    <span>${item.price} MAD</span>
                    <button onclick="removeFromCart(${index})" style="background: #ff4757; color: white; border: none; border-radius: 3px; padding: 0.2rem 0.5rem; cursor: pointer;">×</button>
                </div>`;
                total += item.price;
            });

            cartItems.innerHTML = html;
            cartTotal.textContent = `Total: ${total} MAD`;
            checkoutBtn.style.display = 'inline-block';
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
            showNotification('Article retiré du panier', 'info');
        }

        function checkout() {
            if (cart.length === 0) return;
            
            showNotification('Redirection vers le paiement sécurisé...', 'info');
            // Ici, on intégrerait un système de paiement réel
            setTimeout(() => {
                cart = [];
                updateCart();
                showNotification('Commande confirmée ! Vous recevrez un email de confirmation.', 'success');
            }, 2000);
        }

        // Fonctions du calendrier
        function generateCalendar() {
            const calendarGrid = document.getElementById('calendarGrid');
            const currentMonthElement = document.getElementById('currentMonth');
            
            const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                           'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
            
            currentMonthElement.textContent = `${months[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`;

            // Événements du mois (exemple)
            const events = {
                15: 'Festival des Arts',
                22: 'Moussem Sidi Rahal',
                23: 'Moussem Sidi Rahal',
                24: 'Moussem Sidi Rahal'
            };

            let html = '';
            
            // En-têtes des jours
            const dayHeaders = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
            dayHeaders.forEach(day => {
                html += `<div class="calendar-day" style="font-weight: bold; background: #f0f0f0;">${day}</div>`;
            });

            // Calculer le premier jour du mois et le nombre de jours
            const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
            const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
            const startingDayOfWeek = firstDay.getDay();
            const daysInMonth = lastDay.getDate();

            // Jours vides avant le premier jour du mois
            for (let i = 0; i < startingDayOfWeek; i++) {
                html += '<div class="calendar-day"></div>';
            }

            // Jours du mois
            for (let day = 1; day <= daysInMonth; day++) {
                const hasEvent = events[day];
                const eventClass = hasEvent ? 'event' : '';
                const eventTitle = hasEvent ? `title="${hasEvent}"` : '';
                
                html += `<div class="calendar-day ${eventClass}" ${eventTitle} onclick="selectDay(${day})">${day}</div>`;
            }

            calendarGrid.innerHTML = html;
        }

        function changeMonth(direction) {
            currentMonth.setMonth(currentMonth.getMonth() + direction);
            generateCalendar();
        }

        function selectDay(day) {
            showNotification(`Jour ${day} sélectionné`, 'info');
        }

        // Initialisation
        document.addEventListener('DOMContentLoaded', function() {
            generateCalendar();
            updateCart();
            
            // Animation d'entrée
            setTimeout(() => {
                document.querySelector('.hero').style.transform = 'translateY(0)';
                document.querySelector('.hero').style.opacity = '1';
            }, 100);
        });

        // Gestion du menu mobile
        document.querySelector('.mobile-menu').addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });

        // Smooth scrolling pour une meilleure UX
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
/*
        // Auto-hide notification après 5 secondes  
        let notificationTimeout;
        function autoHideNotification() {
            const notification = document.getElementById('notification');
            if (notification.classList.contains('show')) {
                clearTimeout(notificationTimeout);
                notificationTimeout = setTimeout(() => {
                    notification.classList.remove('show');
                }, 5000);
            }
        }

        // Détection de la géolocalisation pour les itinéraires
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    function(position) {
                        showNotification('Localisation détectée ! Calcul des itinéraires personnalisés...', 'success');
                    },
                    function(error) {
                        showNotification('Géolocalisation non disponible. Les itinéraires standards seront proposés.', 'info');
                    }
                );
            }
        }
*/
        // Système de recherche global
        function searchSite(query) {
            if (!query) return;
            
            const searchableContent = {
                'documentaire': ['film', 'vidéo', 'mémoire', 'culturel', 'histoire'],
                'galerie': ['photo', 'image', 'participative', 'partage'],
                'itineraires': ['circuit', 'tourisme', 'visite', 'randonnée', 'artisanat', 'nature'],
                'store': ['boutique', 'artisanal', 'achat', 'produit', 'poterie', 'tapis'],
                'agenda': ['événement', 'festival', 'actualité', 'moussem'],
            };

            const results = [];
            for (const section in searchableContent) {
                if (searchableContent[section].some(keyword => 
                    keyword.toLowerCase().includes(query.toLowerCase()) || 
                    query.toLowerCase().includes(keyword.toLowerCase())
                )) {
                    results.push(section);
                }
            }

            if (results.length > 0) {
                showSection(results[0]);
                showNotification(`Résultats trouvés dans la section ${results[0]}`, 'success');
            } else {
                showNotification('Aucun résultat trouvé pour votre recherche', 'info');
            }
        }

        // Système de partage sur réseaux sociaux
        function shareContent(platform, section = currentSection) {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent(`Découvrez ${section} sur TAMESLOUHT VIBES - Patrimoine culturel authentique`);
            
            const shareUrls = {
                facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
                whatsapp: `https://wa.me/?text=${text}%20${url}`,
                email: `mailto:?subject=TAMESLOUHT VIBES&body=${text}%20${url}`
            };

            if (shareUrls[platform]) {
                window.open(shareUrls[platform], '_blank', 'width=600,height=400');
                showNotification(`Partage sur ${platform} ouvert !`, 'success');
            }
        }

        // Système de favoris localStorage (simulation)
        let favorites = [];
        
        function toggleFavorite(type, id) {
            const favoriteKey = `${type}-${id}`;
            const index = favorites.indexOf(favoriteKey);
            
            if (index > -1) {
                favorites.splice(index, 1);
                showNotification('Retiré des favoris', 'info');
            } else {
                favorites.push(favoriteKey);
                showNotification('Ajouté aux favoris !', 'success');
            }
            
            updateFavoriteButtons();
        }

        function updateFavoriteButtons() {
            // Mise à jour des boutons favoris (si présents)
            document.querySelectorAll('[data-favorite]').forEach(btn => {
                const isFavorite = favorites.includes(btn.dataset.favorite);
                btn.textContent = isFavorite ? '❤️' : '🤍';
                btn.title = isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris';
            });
        }

        // Mode sombre/clair
        let isDarkMode = false;

        function toggleDarkMode() {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode', isDarkMode);
            
            if (isDarkMode) {
                document.documentElement.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)');
                document.documentElement.style.setProperty('--text-color', '#ecf0f1');
                document.documentElement.style.setProperty('--card-bg', 'rgba(52, 73, 94, 0.9)');
                showNotification('Mode sombre activé', 'success');
            } else {
                document.documentElement.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
                document.documentElement.style.setProperty('--text-color', '#333');
                document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.95)');
                showNotification('Mode clair activé', 'success');
            }
        }

        // Système de newsletter
        function subscribeNewsletter(email) {
            if (!email || !email.includes('@')) {
                showNotification('Veuillez entrer une adresse email valide', 'error');
                return;
            }
            
            showNotification('Inscription à la newsletter réussie ! Merci pour votre intérêt.', 'success');
            // Ici on intégrerait l'API de newsletter
        }

        // Détection de la langue du navigateur
        function detectLanguage() {
            const userLang = navigator.language || navigator.userLanguage;
            const supportedLangs = ['fr', 'ar', 'en'];
            const defaultLang = 'fr';
            
            let detectedLang = defaultLang;
            for (const lang of supportedLangs) {
                if (userLang.startsWith(lang)) {
                    detectedLang = lang;
                    break;
                }
            }
            
            return detectedLang;
        }

        // Système de traduction basique
        const translations = {
            fr: {
                welcome: 'Bienvenue à Tameslouht',
                discover: 'Découvrez le patrimoine culturel unique',
                documentary: 'Documentaire',
                gallery: 'Galerie',
                itineraries: 'Itinéraires',
                store: 'Store',
                agenda: 'Agenda',
                contact: 'Contact'
            },
            en: {
                welcome: 'Welcome to Tameslouht',
                discover: 'Discover the unique cultural heritage',
                documentary: 'Documentary',
                gallery: 'Gallery',
                itineraries: 'Itineraries',
                store: 'Store',
                agenda: 'Events',
                contact: 'Contact'
            },
            ar: {
                welcome: 'مرحباً بكم في تامصلوحت',
                discover: 'اكتشفوا التراث الثقافي الفريد',
                documentary: 'وثائقي',
                gallery: 'معرض الصور',
                itineraries: 'المسارات',
                store: 'المتجر',
                agenda: 'الأجندة',
                contact: 'اتصال'
            }
        };

        let currentLang = 'fr';

        function changeLanguage(lang) {
            if (!translations[lang]) return;
            
            currentLang = lang;
            const t = translations[lang];
            
            // Mise à jour des textes principaux
            document.querySelector('.hero h1').textContent = t.welcome;
            document.querySelector('.hero p').textContent = t.discover;
            
            // Mise à jour de la navigation
            const navLinks = document.querySelectorAll('.nav-links a');
            const navTexts = [t.documentary, t.gallery, t.itineraries, t.store, t.agenda, t.contact];
            navLinks.forEach((link, index) => {
                if (navTexts[index]) link.textContent = navTexts[index];
            });

            showNotification(`Langue changée en ${lang.toUpperCase()}`, 'success');
        }

        // Système de feedback utilisateur
        function submitFeedback(rating, comment) {
            if (rating < 1 || rating > 5) {
                showNotification('Veuillez donner une note entre 1 et 5 étoiles', 'error');
                return;
            }
            
            const feedback = {
                rating: rating,
                comment: comment,
                timestamp: new Date().toISOString(),
                section: currentSection
            };
            
            // Ici on enverrait le feedback à un serveur
            showNotification('Merci pour votre retour ! Votre avis nous aide à améliorer le site.', 'success');
        }

        // Système de statistiques (simulation)
        function trackPageView(section) {
            const stats = {
                section: section,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                referrer: document.referrer
            };
            
            // Ici on enverrait les stats à un service d'analytics
            console.log('Page view tracked:', stats);
        }

        // Optimisation des performances - Lazy loading des images
        function lazyLoadImages() {
            const images = document.querySelectorAll('img[data-src]');
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => imageObserver.observe(img));
        }

        // Système de cache pour les données
        const cache = new Map();

        function getCachedData(key) {
            const cached = cache.get(key);
            if (cached && Date.now() - cached.timestamp < 300000) { // 5 minutes
                return cached.data;
            }
            return null;
        }

        function setCachedData(key, data) {
            cache.set(key, {
                data: data,
                timestamp: Date.now()
            });
        }

        /*Gestion des erreurs globales
        window.addEventListener('error', function(e) {
            console.error('Erreur détectée:', e.error);
            showNotification('Une erreur est survenue. Veuillez rafraîchir la page si le problème persiste.', 'error');
        });*/

        // Service Worker pour le cache offline (simulation)
        function registerServiceWorker() {
            if ('serviceWorker' in navigator) {
                // Ici on enregistrerait un vrai service worker
                console.log('Service Worker supporté');
                showNotification('Mode hors-ligne disponible !', 'info');
            }
        }

        // Initialisation complète
        document.addEventListener('DOMContentLoaded', function() {
            // Initialisation de base
            generateCalendar();
            updateCart();
            lazyLoadImages();
            
            // Détection et application de la langue
            const detectedLang = detectLanguage();
            if (detectedLang !== 'fr') {
                changeLanguage(detectedLang);
            }
            
            // Tentative de géolocalisation
            //getLocation();
            
            // Enregistrement du service worker
            registerServiceWorker();
            
            // Animation d'entrée
            setTimeout(() => {
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.transform = 'translateY(0)';
                    hero.style.opacity = '1';
                }
            }, 100);
            
            // Track de la page d'accueil
            trackPageView('accueil');
            
            console.log('🌟 TAMESLOUHT VIBES - Site initialisé avec succès !');
            showNotification('Bienvenue sur TAMESLOUHT VIBES ! Explorez notre patrimoine culturel.', 'success');
        });

        // Gestionnaire de redimensionnement de fenêtre
        window.addEventListener('resize', function() {
            // Réajustement des éléments si nécessaire
            if (window.innerWidth < 768) {
                document.querySelector('.nav-links').style.display = 'none';
            }
        });

        // Gestion du défilement pour les effets visuels
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const header = document.querySelector('header');
            
            if (scrollTop > lastScrollTop) {
                // Défilement vers le bas
                header.style.transform = 'translateY(-100%)';
            } else {
                // Défilement vers le haut
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        // Raccourcis clavier
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K pour la recherche
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchTerm = prompt('Rechercher sur le site :');
                if (searchTerm) {
                    searchSite(searchTerm);
                }
            }
            
            // Escape pour fermer les modales
            if (e.key === 'Escape') {
                const notification = document.getElementById('notification');
                if (notification.classList.contains('show')) {
                    notification.classList.remove('show');
                }
            }
        });

        // Fonction utilitaire pour formatter les dates
        function formatDate(date, locale = 'fr-FR') {
            return new Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        }

        // Fonction utilitaire pour formatter les prix
        function formatPrice(price, currency = 'MAD') {
            return `${price.toLocaleString('fr-FR')} ${currency}`;
        }

        // Animation des compteurs
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start);
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target;
                }
            }
            
            updateCounter();
        }

        // Système de validation des formulaires amélioré
        function validateForm(form) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff4757';
                    isValid = false;
                } else {
                    field.style.borderColor = '#2ed573';
                }
            });
            
            return isValid;
        }

        // Fonction pour exporter des données
        function exportData(data, filename, type = 'json') {
            let content, mimeType;
            
            switch (type) {
                case 'json':
                    content = JSON.stringify(data, null, 2);
                    mimeType = 'application/json';
                    break;
                case 'csv':
                    content = convertToCSV(data);
                    mimeType = 'text/csv';
                    break;
                default:
                    content = JSON.stringify(data, null, 2);
                    mimeType = 'application/json';
            }
            
            const blob = new Blob([content], { type: mimeType });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        }

        function convertToCSV(data) {
            if (!Array.isArray(data) || data.length === 0) return '';
            
            const headers = Object.keys(data[0]);
            const csvContent = [
                headers.join(','),
                ...data.map(row => headers.map(header => row[header]).join(','))
            ].join('\n');
            
            return csvContent;
        }

        // Système de backup des données utilisateur
        function backupUserData() {
            const userData = {
                cart: cart,
                favorites: favorites,
                language: currentLang,
                theme: isDarkMode ? 'dark' : 'light',
                timestamp: new Date().toISOString()
            };
            
            exportData(userData, `tameslouht-backup-${Date.now()}.json`);
            showNotification('Sauvegarde de vos données créée !', 'success');
        }

        // Fonction pour restaurer les données
        function restoreUserData(file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.cart) cart = data.cart;
                    if (data.favorites) favorites = data.favorites;
                    if (data.language) changeLanguage(data.language);
                    if (data.theme === 'dark' && !isDarkMode) toggleDarkMode();
                    
                    updateCart();
                    updateFavoriteButtons();
                    
                    showNotification('Données restaurées avec succès !', 'success');
                } catch (error) {
                    showNotification('Erreur lors de la restauration des données', 'error');
                }
            };
            reader.readAsText(file);
        }

        console.log('🚀 TAMESLOUHT VIBES - Système complet chargé et opérationnel !');
    