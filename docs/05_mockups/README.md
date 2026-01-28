# Documentation des Maquettes Haute-Fidélité (Mockups)

Ce document présente les écrans finaux de l'interface utilisateur (UI) du projet Prism. Ces maquettes intègrent la charte graphique, les choix de couleurs et l'expérience utilisateur (UX) centrée sur la modularité.

## Identité Visuelle et Choix de Design

Comme défini dans la stratégie de design, l'interface a été conçue pour offrir une expérience immersive et personnalisable.

	Palette de couleurs : Utilisation d'un Dark Mode (fond sombre/gris anthracite) dominant pour réduire la fatigue visuelle et donner un aspect premium. Les actions principales et les éléments interactifs sont mis en valeur par des touches de violet et des dégradés (bleu/violet).
	Philosophie UX : L'accent est mis sur la customisation. L'utilisateur construit sa propre expérience en activant ou désactivant des "Modules" via un Hub communautaire.
	Structure : Une navigation latérale persistante permet de basculer rapidement entre les modules installés.

## Inventaire des Écrans

### 1. Authentification (LOGIN.png & REGISTER.png)

L'entrée dans l'application se fait via une interface épurée mettant en avant le logo "Prism".

	Connexion : Champs simples avec des bordures en dégradé subtil. Bouton d'action principal "Login" en violet vif.
	Inscription : Formulaire étendu demandant le nom d'utilisateur, l'email et la confirmation du mot de passe.

### 2. Navigation Globale (Visible sur tous les écrans internes)

	Sidebar (Gauche) : Liste verticale des modules actifs (Messages, Reel, Forum, Trading, Shopping, Video). Un bouton Add modules en bas permet d'accéder au store/hub.
	Header (Haut) : Accès rapide au Profil, aux Paramètres (engrenage) et aux Notifications (cloche avec badge rouge).

### 3. Profil Utilisateur (PROFILE.jpg & PROFILE MODIFIE.png)
L'espace personnel se décline en deux vues :
	Vue Publique : Affiche l'avatar, les statistiques (publications, followers) et une galerie de photos (grid) sous l'avatar.
	Vue Détaillée/Édition : Présente les informations sous forme de "cartes" (Email, Followers, Localisation, Following) et permet l'ajout d'une bio ou la modification des informations.

### 4. Messagerie (MESSAGES.png)
Le module de communication privée.

	Liste des conversations : Colonne de gauche listant les contacts.
	Zone de chat : Les messages de l'utilisateur apparaissent dans des bulles violettes distinctives alignées à droite, sur fond sombre. Barre de saisie en bas avec options d'envoi et de vocal.

### 5. Visionneuse de Reel (SHORT_REEL.png)

Module de consommation de contenu vidéo vertical.

	Immersion : Le contenu prend la majeure partie de l'écran (fond noir).
	Interactions : Colonne d'actions latérale droite (Like, Commentaire, Partage, Options). Bouton "Subscribe" et description en bas à gauche.

### 6. Paramètres Généraux (PARAMETRE.jpg)

C'est le cœur du concept modulaire.

	Gestion des Modules : Une interface explicite avec des interrupteurs (Toggles) violets.
	Fonctionnalité : L'utilisateur peut activer ("Actif") ou désactiver ("Désactif") des modules comme les Jeux, le Trading ou le Forum. Si un module est désactivé, il disparaît de la barre de navigation.
	Catégories : Menu latéral pour gérer l'Apparence, le Son, la Confidentialité, etc.
