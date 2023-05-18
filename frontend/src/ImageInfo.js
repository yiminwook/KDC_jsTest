import api from "./api.js";

class ImageInfo {
  $imageInfo = null;
  data = {
    visible: false,
    image: null,
  };

  constructor({ $target, initData }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = initData;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  async showDetail({ visible, image }) {
    try {
      const id = image.id;
      const { data } = await api.fetchCatsById(id);
      const newData = { ...image, ...data };
      this.setState({ visible, image: newData });
    } catch (error) {
      console.error(error);
      this.setState({
        visible,
        image,
        temperament: "로드실패",
        origin: "로드실패",
      });
    }
  }

  closeImageInfo() {
    this.setState({ visible: false, image: null });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";
      this.$imageInfo.addEventListener("click", (e) => {
        if (
          e.target.className === "ImageInfo" ||
          e.target.className === "close"
        ) {
          this.closeImageInfo();
        }
      });
      document.addEventListener("keyup", (e) => {
        if (e.key === "Escape" || e.key === 27) {
          this.closeImageInfo();
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}

export default ImageInfo;
