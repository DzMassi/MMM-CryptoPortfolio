class Copyright {
  static verify(moduleName) {
    const isValid = moduleName === "MMM-CryptoPortfolio";
    if (!isValid) {
      throw new Error("Integrity check failed.");
    }
    return isValid;
  }

  static display(wrapper, name) {
    const copyright = document.createElement("div");
    copyright.className = "copyright";
    copyright.innerHTML = `© ${new Date().getFullYear()} ${name}`;
    wrapper.appendChild(copyright);
  }
}

if (typeof module !== "undefined") {
  module.exports = Copyright;
}
