class Loading {
  data = null;
  isLoading = false;

  constructor({ $target }) {
    const $wapper = document.createElement("div");
    this.$wapper = $wapper;
    $target.appendChild($wapper);
  }

  show() {
    this.setState(true);
  }

  hide() {
    this.setState(false);
  }

  setState(nextData) {
    this.isLoading = nextData;
    this.render();
  }

  render() {
    if (this.isLoading === true) {
      this.$wapper.innerHTML = `
        <div class="Loading">
          <div>로딩중...</div>
        </div>
      `;
    } else {
      this.$wapper.innerHTML = ``;
    }
  }
}

export default Loading;
