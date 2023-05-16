class SearchResult {
  $searchResultSection = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    this.$searchResultSection = document.createElement("section");
    $target.appendChild(this.$searchResultSection);

    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    this.$searchResultSection.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  /** 요소가 화면에 보이는지 확인 */
  isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  applyEventToElement(items) {
    document.addEventListener("scroll", () => {
      const lastItem = items[items.length - 1];
      if (!lastItem) return;
      if (!this.isElementInViewport(lastItem)) return;
      this.onNextPage();
      // items.forEach((el, index) => {
      //   if (this.isElementInViewport(el) && items.length - 1 === index) {
      //     this.onNextPage();
      //   }
      // });
    });
  }

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat) => `
          <li class="item">
            <img src=${cat.url} alt=${cat.name} />
          </li>
        `
      )
      .join("");

    const listItems = this.$searchResult.querySelectorAll(".item");

    listItems.forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
    });

    this.applyEventToElement(listItems);
  }
}
