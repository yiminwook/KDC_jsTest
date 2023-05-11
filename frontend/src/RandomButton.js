class RandomButton {
  constructor({ $target, onClick }) {
    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.className = "RandomButton";
    this.$randomButton.textContent = "랜덤고양이";
    $target.appendChild(this.$randomButton);
    this.$randomButton.addEventListener("click", (e) => {
      onClick(e);
    });
  }
}
