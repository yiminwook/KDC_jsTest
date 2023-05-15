class KeywordHistory {
  $target = null;
  $keywordHistory = null;
  data = [];

  constructor({ $target, onSearch }) {
    this.$target = $target;
    this.onSearch = onSearch;
    const $keywordHistory = document.createElement("ul");
    this.$keywordHistory = $keywordHistory;
    this.$keywordHistory.className = "KeywordHistory";
    $target.appendChild(this.$keywordHistory);

    this.init();
    this.render();
  }

  init() {
    const newData = handleLocalStorage.get({ key: "keywordHistory" });
    this.setState(newData);
  }

  addKeyword(keyword) {
    handleLocalStorage.set({ key: "keywordHistory", addData: keyword });
    const newData = handleLocalStorage.get({ key: "keywordHistory" });
    this.setState(newData);
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$keywordHistory.textContent = "";
    this.$keywordHistory.insertAdjacentHTML(
      "afterbegin",
      this.data
        .map((keyword) => `<li><button>${keyword}</button></li>`)
        .join("")
    );
    this.$keywordHistory
      .querySelectorAll("li button")
      .forEach((el) =>
        el.addEventListener("click", (e) => this.onSearch(e.target.textContent))
      );
  }
}
