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
        displayProjects(projects); // Affichage sur la page
        displayProjectsModal(projects); // Affichage dans la modale
    } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
    }
}

// Fonction pour afficher les projets dans la galerie de la page
function displayProjects(projects) {
    const gallery = document.querySelector('.gallery');
    
    if (gallery) {
        gallery.innerHTML = ''; // Vider la galerie

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

// Fonction pour afficher les projets dans la modale avec option de suppression
function displayProjectsModal(projects) {
    const modalGallery = document.querySelector('.modal-gallery');
    
    if (modalGallery) {
        modalGallery.innerHTML = '';

        projects.forEach((project, index) => {
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const deleteIcon = document.createElement('i');

            img.src = project.imageUrl;
            img.alt = project.title;

            deleteIcon.classList.add('fa', 'fa-trash', 'delete-icon');
            deleteIcon.addEventListener('click', () => deleteProject(index, projects));

            figure.appendChild(img);
            figure.appendChild(deleteIcon);
            modalGallery.appendChild(figure);
        });
    }
}

// Fonction pour supprimer un projet
function deleteProject(index, projects) {
    projects.splice(index, 1);

    displayProjects(projects);
    displayProjectsModal(projects);
}

// Charger les projets au chargement de la page
document.addEventListener('DOMContentLoaded', loadProjects);

// Fonction pour ouvrir et fermer les modales
function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

const editContainer = document.querySelector('.edit-container');
if (editContainer) {
    editContainer.addEventListener('click', openModal);
}

// Sélectionner les éléments nécessaires pour la deuxième modale
const backArrow = document.querySelector('.back-arrow');
const addProjectButton = document.getElementById('btn_addprojet');
const modalAddProject = document.getElementById('modal-add-project');

// Ouvrir la deuxième modale en cliquant sur "Ajouter une photo"
addProjectButton.addEventListener('click', function(event) {
    event.stopPropagation();
    modalAddProject.style.display = 'block';
});

const addProjectForm = document.getElementById('addProjectForm');
addProjectForm.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log("Projet ajouté !");
    modalAddProject.style.display = 'none';
});

backArrow.addEventListener('click', function() {
    modalAddProject.style.display = 'none';
    document.getElementById('modal').style.display = 'block';
});

// Fonction pour fermer toutes les modales
function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// Événement pour fermer toutes les modales avec la croix ou en cliquant en dehors
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('close-modal')) {
        closeAllModals();
    }
});

window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        closeAllModals();
    }
});


// Chargement des Catégories depuis l'API
async function loadCategories() {
    try {
        const response = await fetch("http://127.0.0.1:5678/api/categories");
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des catégories");
        }
        const categories = await response.json();
        const categorySelect = document.getElementById('category');

        // Ajouter chaque catégorie en tant qu'option dans le menu déroulant
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            categorySelect.appendChild(option);
        });
    } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
    }
}

// Appel de la fonction pour charger les catégories au chargement de la page
document.addEventListener('DOMContentLoaded', loadCategories);
