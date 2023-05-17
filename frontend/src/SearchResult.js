const IMAGE_PLACEHOLDER = "https://via.placeholder.com/200x300";
class SearchResult {
  $searchResultSection = null;
  data = null;
  onClick = null;

  listObserver = new IntersectionObserver((items, observer) => {
    const lastDataIdx = this.data.length - 1;
    items.forEach((item) => {
      if (!item.isIntersecting) return;
      //imageLoading
      const imageEl = item.target.querySelector("img");
      imageEl.src = imageEl.dataset.src;
      const dataIndex = Number(item.target.dataset.index);
      //무한스크롤
      if (dataIndex === lastDataIdx) {
        this.onNextPage();
      }
    });
  });

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

  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <li class="item" data-index=${index}>
            <div>
              <img src=${IMAGE_PLACEHOLDER} data-src=${cat.url} alt=${cat.name} />
            </div
          </li>
        `
      )
      .join("");

    const listItems = this.$searchResult.querySelectorAll(".item");

    listItems.forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });

      this.listObserver.observe($item);
    });
  }
}
