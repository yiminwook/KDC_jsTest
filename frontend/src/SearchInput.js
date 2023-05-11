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

    this.$searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    this.randomButton = new RandomButton({
      $target: this.$searchInputSection,
      onClick: (e) => {
        onRandomSearch(e);
      },
    });
  }
}
