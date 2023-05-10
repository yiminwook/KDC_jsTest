console.log("app is running!");

class App {
  $target = null;
  data = [];
  isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches; //window darkmode üũ;

  constructor($target) {
    this.$target = $target;

    this.darkModeToggle = new DarkModeToggle({
      $target,
      initMode: this.isDarkMode,
      onChange: (isDarkMode) => {
        this.isDarkMode = isDarkMode;
      },
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: (image) => {
        this.imageInfo.setState({
          visible: true,
          image,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  test() {
    console.log(this.isDarkMode);
  }
}
