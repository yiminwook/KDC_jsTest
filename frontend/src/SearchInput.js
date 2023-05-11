const TEMPLATE = '<input type="text">';

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

    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.className = "RandomButton";
    this.$randomButton.textContent = "랜덤고양이";
    this.$searchInputSection.appendChild(this.$randomButton);

    this.$randomButton.addEventListener("click", (e) => {
      onRandomSearch(e.target);
    });
  }
}
