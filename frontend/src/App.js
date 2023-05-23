import DarkModeToggle from "./DarkModeToggle.js";
import ImageInfo from "./ImageInfo.js";
import Loading from "./Loading.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import api from "./api.js";
import handleLocalStorage from "./utils/localstorage.js";

class App {
  $target = null;
  data = {
    items: [],
    page: 1,
    isDarkMode: false,
  };

  constructor($target) {
    this.$target = $target;

    this.loading = new Loading({ $target });

    this.darkModeToggle = new DarkModeToggle({
      $target,
      initMode: this.data.isDarkMode,
      onChange: (isDarkMode) => {
        this.setState({ ...this.data, isDarkMode });
      },
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        try {
          this.loading.show();
          const { data = [] } = await api.fetchCats(keyword);
          this.setState({ ...this.data, items: data });
          this.saveResult(data);
          this.loading.hide();
        } catch (error) {
          console.error(error);
          this.setState({ ...this.data, items: null });
          this.loading.hide();
        }
      },

      onRandomSearch: async () => {
        try {
          this.loading.show();
          const { data } = await api.fetchRandomCats();
          this.setState({ ...this.data, items: data });
          this.loading.hide();
        } catch (error) {
          console.error(error);
          this.loading.hide();
        }
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data.items,
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
            page: this.data.page + 1, //setState
          });
          const newItems = [...this.data.items, ...data];
          this.setState({
            ...this.data,
            items: newItems,
            page: this.data.page + 1,
          });
          this.loading.hide();
        } catch (error) {
          console.error(error);
          this.loading.hide();
        }
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      initData: {
        visible: false,
        image: null,
      },
    });

    this.init();
  }

  init() {
    const lastItems = handleLocalStorage.get({ key: "lastResult" }) || [];
    this.setState({ ...this.data, items: lastItems });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(this.data.items);
  }

  saveResult(result) {
    handleLocalStorage.set({ key: "lastResult", addData: result });
  }
}

export default App;
