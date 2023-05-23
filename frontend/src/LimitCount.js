const LIMIT_COUNTS_OPTIONS = [10, 25, 50];

class LimitCount {
  data;
  constructor({ $target, onSelect }) {
    const $limitCount = document.createElement("select");
    this.$limitCount = $limitCount;
    this.$limitCount.classList = "LimitCount";
    $target.appendChild(this.$limitCount);

    const $limitCountOptions = LIMIT_COUNTS_OPTIONS.map((option) => {
      const $option = document.createElement("option");
      $option.value = option;
      $option.textContent = option + " 개씩";
      this.$limitCount.appendChild($option);
    });

    this.$limitCount.addEventListener("change", (e) => {
      onSelect(e.target.value);
    });
  }
}

export default LimitCount;
