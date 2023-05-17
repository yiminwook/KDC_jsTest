const handleLocalStorage = {
  /**
   * @key "lastResult" | "keywordHistory"
   */
  get: ({ key }) => {
    const keyword = JSON.parse(localStorage.getItem(key)) || [];
    return keyword;
  },
  set: ({ key, addData }) => {
    const data = handleLocalStorage.get({ key });
    let newData;
    if (key === "lastResult") {
      newData = addData;
    } else {
      newData = [addData, ...data].slice(0, 5); //최근 5개
    }
    localStorage.setItem(key, JSON.stringify(newData));
  },
};

export default handleLocalStorage;
