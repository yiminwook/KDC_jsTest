class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $searchInputSection = document.createElement("section");
    this.$searchInputSection = $searchInputSection;
    this.$searchInputSection.className = "SearchInputSection";
    $target.appendChild(this.$searchInputSection);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.className = "SearchInput";
    this.$searchInput.autofocus = "autofocus";
    this.$searchInputSection.appendChild(this.$searchInput);

    this.randomButton = new RandomButton({
      $target: this.$searchInputSection,
      onClick: (e) => {
        onRandomSearch(e);
      },
    });

    this.keywordHistory = new KeywordHistory({
      $target: this.$searchInputSection,
      onSearch: (keyword) => onSearch(keyword),
    });

    this.$searchInput.addEventListener("keypress", (e) => {
      //keyup시 두번 요청오류
      if (e.key === "Enter" || e.key === 13) {
        const keyword = e.target.value;
        onSearch(keyword);
        this.keywordHistory.addKeyword(keyword);
      }
    });
  }
}
