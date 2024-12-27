## MMM-CryptoPortfolio

MMM-CryptoPortfolio est un module pour MagicMirror² permettant de suivre facilement vos investissements en cryptomonnaies. Ce module affiche en temps réel la valeur de votre portefeuille, les variations des cryptomonnaies, et des données personnalisables directement à partir de votre fichier de configuration.

![scree4](https://github.com/user-attachments/assets/0436fdde-fdc8-4f8f-8ba5-262641b77c22)

## Fonctionnalités principales :

- Affichage en temps réel de vos cryptomonnaies avec leur valeur actuelle.
- Tri automatique des cryptos par leur valeur.
- Affichage des variations sur 24h (avec des couleurs pour les gains et pertes).
- Support des logos des cryptomonnaies.
- Indication du solde total avec pourcentage de variation (gain/perte).
- Sauvegarde automatique de l'historique du solde pour des analyses futures.
- Traductions disponibles : Français et Anglais.
- Couleurs entièrement personnalisables.
- Mise à jour automatique à des intervalles définis.

## Installation :

    Clonez ce dépôt dans le répertoire des modules de votre MagicMirror :
    cd ~/MagicMirror/modules
    git clone https://github.com/DzMassi/MMM-CryptoPortfolio.git
    cd MMM-CryptoPortfolio
    npm install

## Ajoutez le module à votre fichier config.js :
    {
			module: "MMM-CryptoPortfolio",
			position: "top_right", // Position où le module sera affiché sur MagicMirror
			config: {
			currency: "USD", // Devise : USD, EUR, etc.
			displayCount: 10, // Nombre de cryptos à afficher
			showLogos: false,        // Afficher les logos (true/false)
			showPerformance24h: true, // Afficher la performance 24h (true/false)
			showTotal: true,
			sortBy: "value",
			positiveColor: "#00FF00",        // Couleur des performances positives
			negativeColor: "#FF0000",        // Couleur des performances négatives
			apiKey: "VOTRE_CLE_API", // Clé API CoinMarketCap
			cryptoListFile: "modules/MMM-CryptoPortfolio/cryptoList.json", // Chemin vers le fichier JSON
			updateInterval: 10, // Intervalle de mise à jour (en fonction de l'unité)
			updateIntervalUnit: "minutes" // Unité : "seconds", "minutes", ou "hours"
			}
		}

## Démarrez ou redémarrez votre MagicMirror², et le module apparaîtra.
    pm2 start mm
    pm2 restart mm

## Configuration :

## Clé API CoinMarketCap : Obtenez une clé API sur CoinMarketCap.

Auteur :

Créé par DzMassi.


## MMM-CryptoPortfolio

MMM-CryptoPortfolio is a module for MagicMirror² that allows you to easily track your cryptocurrency investments. This module displays your portfolio value, cryptocurrency variations, and customizable data in real-time.

![scree4](https://github.com/user-attachments/assets/6addcc82-a0bb-4e03-952e-d21828a2bd57)

## Key Features:

- Real-time display of your cryptocurrencies with their current value.
- Automatic sorting of cryptocurrencies by value.
- Display of 24-hour performance with color-coded gain/loss indicators.
- Support for cryptocurrency logos.
- Total balance with percentage change (gain/loss).
- Automatic saving of total balance history for future analysis.
- Available translations: French and English.
- Fully customizable colors.
- Automatic updates at user-defined intervals.

## Installation:

    Clone this repository into your MagicMirror modules folder:
    cd ~/MagicMirror/modules
    git clone https://github.com/DzMassi/MMM-CryptoPortfolio.git
    cd MMM-CryptoPortfolio
    npm install

## Add the module to your config.js file:
    {
	module: "MMM-CryptoPortfolio",
	position: "top_right", // Position where the module will be displayed on MagicMirror
	config: {
		currency: "USD", // Currency: USD, EUR, etc.
		displayCount: 10, // Number of cryptocurrencies to display
		showLogos: false, // Display logos (true/false)
		showPerformance24h: true, // Display 24-hour performance (true/false)
		showTotal: true, // Show total balance
		sortBy: "value", // Sort by: value, name, etc.
		positiveColor: "#00FF00", // Color for positive performance
		negativeColor: "#FF0000", // Color for negative performance
		apiKey: "YOUR_API_KEY", // CoinMarketCap API Key
		cryptoListFile: "modules/MMM-CryptoPortfolio/cryptoList.json", // Path to the JSON file
		updateInterval: 10, // Update interval (based on the unit)
		updateIntervalUnit: "minutes" // Unit: "seconds", "minutes", or "hours"
	}
}

## Start or restart your MagicMirror², and the module will appear.
    pm2 start mm
    pm2 restart mm

## Configuration:

    CoinMarketCap API Key: Get your API key from CoinMarketCap.
    
Author:

Created by DzMassi.
