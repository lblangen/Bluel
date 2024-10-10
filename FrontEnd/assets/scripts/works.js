// Fonction qui gère l'état du bouton en fonction de la connexion
function checkLoginStatus() {
    const loginButton = document.getElementById('loginButton');
    const token = localStorage.getItem('authToken');

    if (loginButton) {
        if (token) {
            loginButton.textContent = 'logout';

            const logoff = () => {
                localStorage.removeItem('authToken');
                alert('Vous êtes déconnecté.');
                loginButton.textContent = 'Login';
                window.location.href = 'login.html';
            };

            // Supprimer d'abord les anciens écouteurs pour éviter la duplication
            loginButton.removeEventListener('click', logoff);
            loginButton.addEventListener('click', logoff);
        } else {
            loginButton.addEventListener('click', function () {
                window.location.href = 'login.html';
            });
        }
    }
}

// Appel de la fonction au chargement de la page
window.addEventListener('DOMContentLoaded', checkLoginStatus);

// Fonction pour charger les projets depuis l'API
async function loadProjects() {
    try {
        const response = await fetch("http://127.0.0.1:5678/api/works");
        if (!response.ok) {
            throw new Error('Erreur lors du chargement des projets');
        }
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
    }
}

// Fonction pour afficher les projets dans la galerie
function displayProjects(projects) {
    const gallery = document.querySelector('.gallery');
    if (gallery) {
        gallery.innerHTML = ''; // Vider le contenu existant de la galerie

        projects.forEach(project => {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');

            img.src = project.imageUrl;
            img.alt = project.title;
            figcaption.textContent = project.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        });
    }
}

// Charger les projets au chargement de la page
document.addEventListener('DOMContentLoaded', loadProjects);

// Fonction pour ouvrir et fermer la modale
function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Ouvrir la modale en cliquant sur l'élément edit-container
const editContainer = document.querySelector('.edit-container');
if (editContainer) {
    editContainer.addEventListener('click', openModal);
}

// Fermer la modale en cliquant sur la croix
const closeModalButton = document.querySelector('.close-modal');
if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
}

// Fermer la modale en cliquant en dehors du contenu
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (modal && event.target === modal) {
        closeModal();
    }
});