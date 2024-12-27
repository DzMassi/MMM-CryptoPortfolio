MMM-CryptoPortfolio

MMM-CryptoPortfolio est un module pour MagicMirror² qui permet de suivre vos cryptomonnaies préférées, leur valeur actuelle et leur performance. Ce module affiche également le solde total de votre portefeuille et le pourcentage de gain ou de perte.
🛠️ Fonctionnalités

    Affichage des cryptomonnaies : Consultez vos cryptos avec leur valeur et leur performance sur 24h.
    Solde total du portefeuille : Le solde total est calculé automatiquement et affiché avec un pourcentage de gain/perte.
    Logos et performances : Possibilité d'afficher les logos des cryptomonnaies et leur variation en pourcentage.
    Tri dynamique : Les cryptos sont affichées par ordre décroissant de leur valeur.
    Sauvegarde des soldes : Historique des soldes totaux sauvegardé automatiquement dans un fichier balances.json.

📦 Installation

    Clonez ce dépôt dans le répertoire modules de MagicMirror :

    cd ~/MagicMirror/modules
    git clone https://github.com/YourUsername/MMM-CryptoPortfolio.git
    cd MMM-CryptoPortfolio
    npm install

    Configurez le module dans votre fichier config.js.

⚙️ Configuration

Ajoutez cette configuration dans le fichier config.js :

{
    module: "MMM-CryptoPortfolio",
    position: "top_right", // Position où le module sera affiché
    config: {
        currency: "USD", // Devise à afficher (USD, EUR, etc.)
        displayCount: 5, // Nombre de cryptos affichées
        showLogos: true, // Affiche les logos des cryptos
        showPerformance24h: true, // Affiche la performance sur 24h
        positiveColor: "#00FF00", // Couleur des gains
        negativeColor: "#FF0000", // Couleur des pertes
        apiKey: "VOTRE_API_KEY", // Clé API CoinMarketCap
        cryptoListFile: "modules/MMM-CryptoPortfolio/cryptoList.json", // Chemin vers le fichier JSON
        updateInterval: 30, // Intervalle de mise à jour (en minutes)
    }
}

📝 Exemple de fichier cryptoList.json

Listez vos cryptos et leur quantité dans ce fichier :

[
    { "name": "BTC", "quantity": 0.1 },
    { "name": "ETH", "quantity": 2.5 }
]

📂 Fichiers sauvegardés

![scree4](https://github.com/user-attachments/assets/90bb7f2f-a767-4179-a76a-4399a80a76db)


Affichage avec logos et performance :

🚀 Prochaines améliorations

    Ajouter un graphique pour visualiser les performances du portefeuille.
    Support pour plusieurs périodes de performance (7 jours, 1 mois, etc.).
    Notifications pour des alertes de prix ou de performance.

📜 Licence

Ce projet est sous licence MIT.

Si vous avez des questions ou souhaitez contribuer, n'hésitez pas à ouvrir une issue ou une pull request ! 😊
