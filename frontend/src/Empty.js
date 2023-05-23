class Empty {
  data = null;
  isLoading = false;

  constructor({ $target }) {
    const $empty = document.createElement("div");
    this.$empty = $empty;
    this.$empty.className = "EmptyWapper";
    $target.appendChild($empty);

    this.init();
    this.render();
  }

  init() {
    this.setState({ show: false, isNull: false });
  }

  show(data) {
    this.setState({
      show: data === null || data.length <= 0,
      isNull: data === null,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$empty.textContent = ``;
    this.$empty.style.display = "none";
    if (this.data.show === true) {
      this.$empty.style.display = "block";
      this.$empty.insertAdjacentHTML(
        "afterbegin",
        `<div class="Empty">
          <p>${
            this.data.isNull ? "요청에 실패했습니다." : "데이터가 없습니다."
          }</p>
        </div>`
      );
    }
  }
}

export default Empty;
