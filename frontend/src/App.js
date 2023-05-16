class App {
  $target = null;
  data = [];
  isDarkMode = null;
  page = 1;

  constructor($target) {
    this.$target = $target;

    this.loading = new Loading({ $target });

    this.darkModeToggle = new DarkModeToggle({
      $target,
      initMode: this.isDarkMode,
      onChange: (isDarkMode) => {
        this.isDarkMode = isDarkMode; //setState
      },
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        try {
          this.loading.show();
          const { data } = await api.fetchCats(keyword);
          this.setState(data);
          this.saveResult(data);
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
      onClick: async (image) => {
        try {
          this.loading.show();
          await this.imageInfo.showDetail({
            visible: true,
            image,
          });
          this.loading.hide();
        } catch (error) {
          console.log(error);
          this.loading.hide();
        }
      },
      onNextPage: async () => {
        try {
          this.loading.show();
          const lastKeyword = handleLocalStorage.get({
            key: "keywordHistory",
          })[0];
          const { data } = await api.fetchCatsWithPage({
            keyword: lastKeyword,
            page: ++this.page, //setState
          });
          console.log(this.page);
          this.setState([...this.data, ...data]);
          this.loading.hide();
        } catch (error) {
          console.error(error);
          this.loading.hide();
        }
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.init();
  }

  init() {
    this.data = handleLocalStorage.get({ key: "lastResult" }) || [];
    this.setState(this.data);
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result) {
    handleLocalStorage.set({ key: "lastResult", addData: result });
  }
}
