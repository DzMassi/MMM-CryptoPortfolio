const NodeHelper = require("node_helper");
const fetch = require("node-fetch");
const fs = require("fs");

module.exports = NodeHelper.create({
  socketNotificationReceived: async function (notification, config) {
    if (notification === "LOAD_CRYPTO_LIST") {
      try {
        const cryptoList = JSON.parse(fs.readFileSync(config.cryptoListFile));
        const symbols = cryptoList.map(crypto => crypto.name.toUpperCase()).join(",");

        const response = await fetch(
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols}&convert=${config.currency}`,
          { headers: { "X-CMC_PRO_API_KEY": config.apiKey } }
        );

        const logoResponse = await fetch(
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?symbol=${symbols}`,
          { headers: { "X-CMC_PRO_API_KEY": config.apiKey } }
        );

        const data = await response.json();
        const logoData = await logoResponse.json();

        let totalValue = 0;

        const cryptoData = cryptoList.map(crypto => {
          const cryptoSymbol = crypto.name.toUpperCase();
          if (data.data && data.data[cryptoSymbol]) {
            const price = data.data[cryptoSymbol].quote[config.currency].price;
            const value = crypto.quantity * price;
            const logo = logoData.data[cryptoSymbol]?.logo || ""; // URL du logo
            const performance24h = data.data[cryptoSymbol].quote[config.currency].percent_change_24h || 0;
            const performance1h = data.data[cryptoSymbol].quote[config.currency].percent_change_1h || 0;
            const performance7d = data.data[cryptoSymbol].quote[config.currency].percent_change_7d || 0;

            totalValue += value;

            return {
              name: crypto.name,
              value,
              logo,
              performance1h,
              performance24h,
              performance7d
            };
          } else {
            console.warn(`Symbol ${cryptoSymbol} not found in API response.`);
            return null;
          }
        }).filter(crypto => crypto !== null);

        this.sendSocketNotification("CRYPTO_DATA_RECEIVED", { cryptoData, totalValue });
      } catch (error) {
        console.error("Error fetching crypto data:", error.message);
        this.sendSocketNotification("CRYPTO_API_ERROR", { error: error.message });
      }
    }
  }
});