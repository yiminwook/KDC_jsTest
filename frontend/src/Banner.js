import api from "./api.js";

const SLICE_COUNT = 5;

class Banner {
  data = { current: 0, items: [] };

  constructor({ $target }) {
    this.$wapper = document.createElement("div");
    this.$wapper.className = "Banner";

    this.$banner = document.createElement("ul");

    this.$preButton = document.createElement("button");
    this.$preButton.textContent = "PREV";
    this.$preButton.className = "prev";
    this.$preButton.addEventListener("click", () => {
      if (this.data.current <= 0) return;
      let pre = this.data.current - 1;
      this.changeCurrent(pre);
    });

    this.$nextButton = document.createElement("button");
    this.$nextButton.textContent = "NEXT";
    this.$nextButton.className = "next";
    this.$nextButton.addEventListener("click", () => {
      if (this.data.current === SLICE_COUNT - 1) return;
      let next = this.data.current + 1;
      this.changeCurrent(next);
    });

    this.$wapper.appendChild(this.$banner);
    this.$wapper.appendChild(this.$preButton);
    this.$wapper.appendChild(this.$nextButton);
    $target.appendChild(this.$wapper);

    this.init();
    this.render();
  }

  async init() {
    await this.getRandom();
  }

  changeCurrent(index) {
    this.setState({ ...this.data, current: index });
    this.moveTo(index);
  }

  /** index에 따라 left를 조정  */
  moveTo(index) {
    let leftPos = -Number(this.$wapper.clientWidth) * index;
    this.$banner.style.left = leftPos + "px";
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  async getRandom() {
    try {
      const response = await api.fetchRandomCats();
      if (!response || response.data.length < 5)
        throw new Error("data is under 5");
      this.setState({
        ...this.data,
        items: response.data.slice(0, SLICE_COUNT),
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    this.$banner.innerText = "";
    if (this.data.items) {
      this.$banner.insertAdjacentHTML(
        "afterbegin",
        this.data.items
          .map(
            (banner) => `
          <li style="background-image:url(${banner.url})"></li>
        `
          )
          .join("")
      );

      // 배너 전체길이
      this.$banner.style.width =
        Number(this.$wapper.clientWidth) * SLICE_COUNT + "px";

      // 각 li의 길이
      this.$banner.querySelectorAll("li").forEach((item) => {
        item.style.width = this.$wapper.clientWidth + "px";
      });
    }
  }
}

export default Banner;
