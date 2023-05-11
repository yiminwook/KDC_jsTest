console.log("app is running!");

class App {
  $target = null;
  data = [];
  isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches; //window darkmode üũ;

  constructor($target) {
    this.$target = $target;

    this.loading = new Loading({ $target });

    this.darkModeToggle = new DarkModeToggle({
      $target,
      initMode: this.isDarkMode,
      onChange: (isDarkMode) => {
        this.isDarkMode = isDarkMode;
      },
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        try {
          this.loading.show();
          const { data } = await api.fetchCats(keyword);
          this.setState(data);
          this.loading.hide();
        } catch (error) {
          console.error(error);
          this.loading.hide();
        }
      },
      onRandomSearch: async () => {
        try {
          this.loading.show();
          const { data } = await api.fetchRandomCats();
          this.setState(data);
          this.loading.hide();
        } catch (error) {
          console.error(error);
          this.loading.hide();
        }
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
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
