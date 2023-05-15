const handleLocalStorage = {
  getKeyword: () => {
    const keyword = JSON.parse(localStorage.getItem("keywordHistory")) || [];
    return keyword;
  },
  setKeyword: (keyword) => {
    const data = handleLocalStorage.getKeyword();
    const newData = [keyword, ...data].slice(0, 5); //최근 5개
    localStorage.setItem("keywordHistory", JSON.stringify(newData));
  },
};
