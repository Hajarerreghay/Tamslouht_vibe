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
    
    // Trouver et activer le lien correspondant
    const targetLink = document.querySelector(`.nav-links a[onclick*="${sectionName}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }
    
    currentSection = sectionName;
    
    // Actions spécifiques selon la section
    if (sectionName === 'agenda') {
        generateCalendar();
    }
}


// Système de notifications
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (notification && notificationText) {
        notificationText.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

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
        
        // Faire défiler jusqu'à la vidéo
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
    if (itinerary) {
        mapContainer.innerHTML = itinerary.map;
        duration.textContent = itinerary.duration;
        points.textContent = itinerary.points;
        practicalInfo.innerHTML = `<p><strong>Description :</strong> ${itinerary.info}</p>
            <p><strong>Tarifs :</strong> À partir de 150 MAD/personne</p>
            <p><strong>Réservation :</strong> 48h à l'avance recommandées</p>
            <p><strong>Groupe :</strong> 2 à 15 personnes</p>`;
        downloadBtn.style.display = 'inline-block';
    }
}

function downloadPDF() {
    if (currentItinerary) {
        showNotification('Téléchargement de la fiche PDF en cours...', 'info');
        // Ici, on générerait et téléchargerait le PDF
    }
}

// Fonctions du store
// Base de données des produits
        const products = {
            'vase-terre-cuite-1': { name: 'Vase en terre cuite', price: 350 },
            'vase-terre-cuite-2': { name: 'Vase en terre cuite', price: 300 },
            'tapis-berbere-1': { name: 'Tapis berbère authentique', price: 1000 },
            'tapis-berbere-2': { name: 'Tapis berbère authentique', price: 1200 },
            'huile-olive': { name: 'Huile d\'olive pure', price: 150 },
            'fantasia-1': { name: 'Produit de fantasia', price: 3000 },
            'fantasia-2': { name: 'Produit de fantasia', price: 3000 },
            'fantasia-3': { name: 'Produit de fantasia', price: 3000 },
            'fantasia-4': { name: 'Produit de fantasia', price: 3000 },
            'service-the': { name: 'Service à thé traditionnel', price: 450 }
        };

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

            if (cartCount) cartCount.textContent = cart.length;

            if (cart.length === 0) {
                if (cartItems) cartItems.innerHTML = '<p>Votre panier est vide</p>';
                if (cartTotal) cartTotal.textContent = '';
                if (checkoutBtn) checkoutBtn.style.display = 'none';
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

            if (cartItems) cartItems.innerHTML = html;
            if (cartTotal) cartTotal.textContent = `Total: ${total} MAD`;
            if (checkoutBtn) checkoutBtn.style.display = 'inline-block';
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
            showNotification('Article retiré du panier', 'info');
        }

        function checkout() {
            if (cart.length === 0) return;
            
            // Afficher le modal
            const modal = document.getElementById('checkoutModal');
            modal.style.display = 'block';
            
            // Mettre à jour le résumé de commande
            updateOrderSummary();
            
            // Focus sur le premier champ
            document.getElementById('firstName').focus();
        }

        function updateOrderSummary() {
            const orderSummary = document.getElementById('orderSummary');
            const orderTotal = document.getElementById('orderTotal');
            
            let html = '';
            let total = 0;
            
            cart.forEach(item => {
                html += `<div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                    <span>${item.name}</span>
                    <span>${item.price} MAD</span>
                </div>`;
                total += item.price;
            });
            
            orderSummary.innerHTML = html;
            orderTotal.textContent = `Total: ${total} MAD`;
        }

        function cancelCheckout() {
            const modal = document.getElementById('checkoutModal');
            modal.style.display = 'none';
            
            // Réinitialiser le formulaire
            document.getElementById('checkoutForm').reset();
        }

        // Gestionnaire de soumission du formulaire
        document.getElementById('checkoutForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const orderData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                address: formData.get('address'),
                phone: formData.get('phone'),
                items: cart,
                total: cart.reduce((sum, item) => sum + item.price, 0)
            };
            
            // Simuler la soumission de commande
            showNotification('Traitement de votre commande...', 'info');
            
            setTimeout(() => {
                // Fermer le modal
                cancelCheckout();
                
                // Vider le panier
                cart = [];
                updateCart();
                
                // Confirmation
                showNotification(`Merci ${orderData.firstName} ! Votre commande a été confirmée. Vous recevrez un email de confirmation à ${orderData.email}.`, 'success');
                
                // Ici vous pourriez envoyer les données à votre serveur
                console.log('Données de commande:', orderData);
            }, 2000);
        });

        // Fermer le modal en cliquant à l'extérieur
        window.onclick = function(event) {
            const modal = document.getElementById('checkoutModal');
            if (event.target === modal) {
                cancelCheckout();
            }
        }

        function showNotification(message, type) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.textContent = message;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.remove();
            }, 4000);
        }

        // Initialiser le panier au chargement
        updateCart();

// Fonctions du calendrier
function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    
    if (!calendarGrid || !currentMonthElement) return;
    
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

// Fonctions utilitaires
function formatDate(date, locale = 'fr-FR') {
    return new Intl.DateTimeFormat(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

function formatPrice(price, currency = 'MAD') {
    return `${price.toLocaleString('fr-FR')} ${currency}`;
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de base
    generateCalendar();
    updateCart();
    
    // Animation d'entrée
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = 'translateY(0)';
            hero.style.opacity = '1';
        }
    }, 100);
    
    console.log('🌟 TAMESLOUHT VIBES - Site initialisé avec succès !');
    // NOTIFICATION DE BIENVENUE SUPPRIMÉE - La ligne suivante a été commentée
    // showNotification('Bienvenue sur TAMESLOUHT VIBES ! Explorez notre patrimoine culturel.', 'success');
});

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            }
        });
    }
});

// Smooth scrolling pour une meilleure UX
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if(href !== "#") { // Vérifie si ce n'est pas juste "#"
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});


// Gestionnaire de redimensionnement de fenêtre
window.addEventListener('resize', function() {
    if (window.innerWidth < 768) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.style.display = 'none';
        }
    }
});

// Gestion du défilement pour les effets visuels
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('header');
    
    if (header) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Défilement vers le bas
            header.style.transform = 'translateY(-100%)';
        } else {
            // Défilement vers le haut
            header.style.transform = 'translateY(0)';
        }
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
    
    // Escape pour fermer les notifications
    if (e.key === 'Escape') {
        const notification = document.getElementById('notification');
        if (notification && notification.classList.contains('show')) {
            notification.classList.remove('show');
        }
    }
});

console.log('🚀 TAMESLOUHT VIBES - Système optimisé chargé et opérationnel !');

 // Stockage persistant des commentaires avec données d'exemple
        let comments = [
            {
                id: 1640995200000,
                name: "Hajar ERREGHAY",
                email: "hajar@gmail.com",
                text: "Un documentaire fascinant qui capture l'essence de notre patrimoine culturel. La qualité de la narration et les témoignages sont particulièrement touchants.",
                date: new Date(2025, 5, 14, 14, 30).toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            },
            {
                id: 1640908800000,
                name: "Fatima Zahra",
                email: "fatima@gmail.com",
                text: "Merci pour ce magnifique travail de préservation. C'est important de garder vivante la mémoire de nos ancêtres et de transmettre ces valeurs aux nouvelles générations.",
                date: new Date(2025, 5, 14, 16, 45).toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            },
            {
                id: 1640822400000,
                name: "Achraf el",
                email: "achraf@gamil.com",
                text: "Excellente initiative ! Ce type de documentaire est essentiel pour préserver notre identité culturelle. J'espère voir plus de productions similaires.",
                date: new Date(2025, 5, 15, 10, 20).toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            }
        ];

        // Fonction pour charger les commentaires depuis la simulation de stockage
        function loadComments() {
            // Dans un vrai environnement, vous pourriez utiliser:
            // const savedComments = localStorage.getItem('documentaryComments');
            // if (savedComments) {
            //     comments = JSON.parse(savedComments);
            // }
            
            displayComments();
        }

        // Fonction pour sauvegarder les commentaires
        function saveComments() {
            // Dans un vrai environnement, vous pourriez utiliser:
            // localStorage.setItem('documentaryComments', JSON.stringify(comments));
            
            // Pour cette démonstration, nous gardons les commentaires en mémoire
            console.log('Commentaires sauvegardés:', comments.length);
        }

        function addComment() {
            const userName = document.getElementById('userName').value.trim();
            const userEmail = document.getElementById('userEmail').value.trim();
            const commentText = document.getElementById('commentText').value.trim();

            // Validation
            if (!userName || !commentText) {
                alert('Veuillez remplir au moins votre nom et votre commentaire.');
                return;
            }

            // Créer le commentaire
            const comment = {
                id: Date.now(),
                name: userName,
                email: userEmail,
                text: commentText,
                date: new Date().toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            // Ajouter au début de la liste
            comments.unshift(comment);

            // Sauvegarder les commentaires
            saveComments();

            // Réinitialiser le formulaire
            document.getElementById('userName').value = '';
            document.getElementById('userEmail').value = '';
            document.getElementById('commentText').value = '';

            // Mettre à jour l'affichage
            displayComments();

            // Animation de confirmation
            const btn = document.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = '✓ Commentaire ajouté !';
            btn.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = 'linear-gradient(135deg, #3498db, #2980b9)';
            }, 2000);
        }

        function displayComments() {
            const container = document.getElementById('commentsContainer');
            const countElement = document.getElementById('commentCount');
            
            // Mettre à jour le compteur
            countElement.textContent = comments.length;
            
            if (comments.length === 0) {
                container.innerHTML = `
                    <div class="no-comments">
                        Aucun commentaire pour le moment. Soyez le premier à partager votre avis !
                    </div>
                `;
                return;
            }

            container.innerHTML = comments.map(comment => `
                <div class="comment">
                    <div class="comment-header">
                        <span class="comment-author">${escapeHtml(comment.name)}</span>
                        <span class="comment-date">${comment.date}</span>
                    </div>
                    <div class="comment-text">${escapeHtml(comment.text)}</div>
                </div>
            `).join('');
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // Permettre la soumission avec Enter (Ctrl+Enter dans le textarea)
        document.getElementById('commentText').addEventListener('keydown', function(e) {
            if (e.ctrlKey && e.key === 'Enter') {
                addComment();
            }
        });

        // Animation d'entrée
        window.addEventListener('load', function() {
            const section = document.querySelector('.section');
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 100);
            
            // Charger les commentaires au démarrage
            loadComments();
        });
   

//Fonctions spécifiques pour les sous-sections des activités culturelles
function showAteliers() {
    showSection('ateliers');
}

function showScoutisme() {
    showSection('scoutisme');
}

function showMediation() {
    showSection('mediation');
}

function showActivites() {
    showSection('activites');
}



