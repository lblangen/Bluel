document.getElementById("btn_login").addEventListener("click", login);

async function login(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    console.log("Tentative de connexion...");

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log("Email:", email, "Mot de passe:", password);

    try {
        // Envoi de la requête POST à l'API pour la connexion
        const response = await fetch("http://127.0.0.1:5678/api/users/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: password })
        });

        if (!response.ok) {
            const errorData = await response.json();  // Si l'API renvoie un message d'erreur spécifique
            document.getElementById('message').textContent = errorData.message || 'Nom d\'utilisateur ou mot de passe incorrect.'; 
            console.log("Erreur de connexion :", response.status);
            return;
        }

        // Si la connexion réussit, récupérer la réponse JSON
         const data = await response.json(); 
         console.log("Réponse de l'API:", data);

        // Stocker le token dans le localStorage
         localStorage.setItem('authToken', data.token);  // Assurez-vous que 'data.token' contient bien le token renvoyé par votre API
         
        // Affichage du succès de la connexion
         alert('Connexion réussie !');

         // Rediriger vers index.html après la connexion réussie
         window.location.href = "index.html"; 

    } catch (error) {
        // En cas d'erreur dans la requête ou la connexion au serveur
        console.error("Erreur lors de la connexion à l'API :", error);
        document.getElementById('message').textContent = 'Une erreur est survenue. Veuillez réessayer plus tard.';
    }
}

        // Vérifier si un token est déjà stocké dans le localStorage au chargement de la page
window.addEventListener('load', function() {
    const token = localStorage.getItem('authToken');
    if (token) {
        document.getElementById('message').textContent = 'Vous êtes déjà connecté.';
        // Rediriger l'utilisateur vers une page différente, si nécessaire
        // window.location.href = "page_principale.html"; // Exemple de redirection après vérification
    } else {
        document.getElementById('message').textContent = 'Veuillez vous connecter.';
    }
});

// Vérification au chargement de la page pour la redirection si le token est présent
window.addEventListener('load', function() {
    const token = localStorage.getItem('authToken');
    if (token) {
        document.getElementById('message').textContent = 'Vous êtes déjà connecté. Redirection en cours...';
        // Rediriger l'utilisateur vers la page d'accueil (index.html) s'il est déjà connecté
        window.location.href = "index.html";
    }
});

window.addEventListener('load', function() {
    const loginButton = document.getElementById('loginButton');
    const token = localStorage.getItem('authToken');

    if (token) {
        // Si un token est trouvé, changer le texte en "Logout"
        loginButton.textContent = 'Logout';

        // Ajouter un événement "click" pour déconnecter l'utilisateur
        loginButton.addEventListener('click', function() {
            // Supprimer le token du localStorage
            localStorage.removeItem('authToken');
            alert('Vous êtes déconnecté.');

            // Changer le texte du bouton en "Login" après déconnexion
            loginButton.textContent = 'Login';

            // Optionnel : rediriger vers la page de login
            // window.location.href = "login.html";
        });
    } else {
        // Si pas de token, ajouter un lien vers la page de login
        loginButton.addEventListener('click', function() {
            // Rediriger vers la page de connexion
            window.location.href = "login.html";
        });
    }
});

    // Lorsqu'on clique sur le bouton "Log Off"
    const logoffButton = document.getElementById('btn_logoff');

    logoffButton.addEventListener('click', function() {
        // Supprimer le token du localStorage
        localStorage.removeItem('authToken');

        // Afficher un message et rediriger ou réinitialiser le formulaire
        document.getElementById('message').textContent = 'Vous êtes déconnecté.';
        document.getElementById('loginForm').reset();  // Réinitialiser le formulaire

        // Optionnel : rediriger vers la page de login ou une autre page
        // window.location.href = "index.html";
});