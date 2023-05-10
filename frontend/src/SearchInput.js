const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInputSection = document.createElement("section");
    const $searchInput = document.createElement("input");

    this.$searchInputSection = $searchInputSection;
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.className = "SearchInput";

    this.$searchInputSection.appendChild(this.$searchInput);
    $target.appendChild(this.$searchInputSection);

    $searchInput.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        onSearch(e.target.value);
      }
    });

    console.log("SearchInput created.", this);
  }
  render() {}
}
