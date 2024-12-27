Module.register("MMM-CryptoPortfolio", {
  defaults: {
    currency: "USD",
    updateInterval: 30,
    updateIntervalUnit: "minutes",
    displayCount: 5,
    showLogos: true,
    showPerformance24h: true,
    showTotal: true,
    sortBy: "value", // Tri par valeur
    showPerformancePeriods: ["24h"],
    positiveColor: "#00FF00", // Couleur pour les gains
    negativeColor: "#FF0000", // Couleur pour les pertes
    totalValueColor: "#FFD700", // Couleur par défaut pour la valeur totale
    minValue: 0,
    displayMode: "detailed",
    manualUpdate: false,
    showCopyright: true,
    apiKey: "",
    cryptoListFile: "modules/MMM-CryptoPortfolio/cryptoList.json",
    translationsFile: "modules/MMM-CryptoPortfolio/translations.json"
  },

  start: function () {
    this.cryptoData = [];
    this.totalValues = 0;
    this.previousTotalValue = null; // Stocke la valeur précédente pour le calcul du pourcentage
    this.error = null;
    this.translations = {};

    const unit = this.config.updateIntervalUnit || "minutes";
    const intervalInMs = this.config.updateInterval *
      (unit === "seconds" ? 1000 : unit === "minutes" ? 60000 : unit === "hours" ? 3600000 : 60000);

    this.config.updateInterval = intervalInMs;

    this.loadTranslations();
    this.sendSocketNotification("LOAD_CRYPTO_LIST", this.config);

    if (!this.config.manualUpdate) {
      setInterval(() => {
        this.sendSocketNotification("LOAD_CRYPTO_LIST", this.config);
      }, this.config.updateInterval);
    }
  },

  loadTranslations: function () {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", this.config.translationsFile, false);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const allTranslations = JSON.parse(xhr.responseText);
        this.translations = allTranslations[config.language] || allTranslations["en"];
      }
    };
    xhr.send(null);
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "CRYPTO_DATA_RECEIVED") {
      this.cryptoData = payload.cryptoData.filter(crypto => crypto.value >= this.config.minValue);
      this.totalValues = payload.totalValue;
      this.error = null;
      this.updateDom();
    } else if (notification === "CRYPTO_API_ERROR") {
      this.error = payload.error;
      this.updateDom();
    }
  },

  getDom: function () {
    const wrapper = document.createElement("div");

    if (this.error) {
      wrapper.innerHTML = `Erreur : ${this.error}`;
      return wrapper;
    }

    if (this.config.showTotal) {
      const totalWrapper = document.createElement("div");
      totalWrapper.className = "total-wrapper";

      const total = document.createElement("span");
      total.className = "total";

      let percentageChange = 0;
      if (this.previousTotalValue !== null && this.previousTotalValue !== 0) {
        percentageChange = ((this.totalValues - this.previousTotalValue) / this.previousTotalValue) * 100;
      }

      const color = percentageChange >= 0 ? this.config.positiveColor : this.config.negativeColor;

      total.innerHTML = `Solde : <span style="font-weight: bold; color: ${this.config.totalValueColor};">${this.totalValues.toFixed(2)} ${this.config.currency}</span>`;
      total.innerHTML += ` <span style="font-size: 16px; color: ${color};">(${percentageChange.toFixed(2)}%)</span>`;

      totalWrapper.appendChild(total);
      wrapper.appendChild(totalWrapper);
    }

    const table = document.createElement("table");
    table.className = "small";

    // ** Nouveau tri par valeur décroissante **
    this.cryptoData.sort((a, b) => b.value - a.value);

    this.cryptoData.slice(0, this.config.displayCount).forEach((crypto) => {
      const row = document.createElement("tr");

      if (this.config.showLogos) {
        const logoCell = document.createElement("td");
        const logo = document.createElement("img");
        logo.src = crypto.logo;
        logo.className = "crypto-logo";
        logoCell.appendChild(logo);
        row.appendChild(logoCell);
      }

      const nameCell = document.createElement("td");
      nameCell.innerHTML = crypto.name.toUpperCase();
      row.appendChild(nameCell);

      const valueCell = document.createElement("td");
      valueCell.innerHTML = `${crypto.value.toFixed(2)} ${this.config.currency}`;
      row.appendChild(valueCell);

      if (this.config.showPerformance24h) {
        const performanceCell = document.createElement("td");
        performanceCell.innerHTML = `${crypto.performance24h.toFixed(2)} %`;
        performanceCell.style.color = crypto.performance24h >= 0 ? this.config.positiveColor : this.config.negativeColor;
        row.appendChild(performanceCell);
      }

      table.appendChild(row);
    });

    wrapper.appendChild(table);

    if (this.config.showCopyright) {
      const copyright = document.createElement("div");
      copyright.className = "copyright";
      copyright.innerHTML = "© 2024 DzMassi";
      wrapper.appendChild(copyright);
    }

    return wrapper;
  }
});
