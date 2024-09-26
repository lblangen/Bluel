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

        // Vérification si la réponse est correcte (statut 200 ou 201)
        // if (response.ok) {
        //    const data = await response.json(); // Récupérer la réponse JSON (par exemple, un token)
        //    console.log("Réponse de l'API:", data);

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

        // Vous pouvez ici rediriger vers une autre page ou stocker le token
        // Exemple : localStorage.setItem('token', data.token);

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

    // Lorsqu'on clique sur le bouton "Log Off"
    const logoffButton = document.getElementById('btn_logoff');

    logoffButton.addEventListener('click', function() {
        // Supprimer le token du localStorage
        localStorage.removeItem('authToken');

        // Afficher un message et rediriger ou réinitialiser le formulaire
        document.getElementById('message').textContent = 'Vous êtes déconnecté.';
        document.getElementById('loginForm').reset();  // Réinitialiser le formulaire

        // Optionnel : rediriger vers la page de login ou une autre page
        // window.location.href = "login.html";
});