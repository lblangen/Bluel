// Fonction qui gère l'état du bouton en fonction de la connexion
function checkLoginStatus() {
    const loginButton = document.getElementById('loginButton');
    const token = localStorage.getItem('authToken');

    // Vérifier si un token est présent
    if (token) {
        // Si un token est trouvé, changer le texte en "Log Off"
        loginButton.textContent = 'logout';

        // Ajouter un événement "click" pour déconnecter l'utilisateur
        loginButton.addEventListener('click', function logoff() {
            // Supprimer le token du localStorage pour déconnecter l'utilisateur
            localStorage.removeItem('authToken');
            alert('Vous êtes déconnecté.');

            // Changer le texte du bouton en "Login" après déconnexion
            loginButton.textContent = 'Login';

            // Supprimer l'événement "click" de déconnexion pour éviter les conflits
            loginButton.removeEventListener('click', logoff);

            // Rediriger vers la page de login après la déconnexion (optionnel)
            window.location.href = 'login.html';
        });
    } else {
        // Si pas de token, ajouter un événement pour rediriger vers la page de login
        loginButton.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }
}

// Appel de la fonction au chargement de la page
window.addEventListener('load', checkLoginStatus);