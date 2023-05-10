class DarkModeToggle {
  isDarkMode = null;

  constructor({ $target, initMode, onChange }) {
    this.isDarkMode = initMode;
    const $darkModeToggle = document.createElement("input");
    this.$darkModeToggle = $darkModeToggle;
    this.$darkModeToggle.type = "checkbox";

    this.$darkModeToggle.className = "darkModeToggle";
    $target.appendChild($darkModeToggle);

    $darkModeToggle.addEventListener("change", (e) => {
      const isChecked = e.target.checked;
      this.setColorMode(isChecked);
      onChange(isChecked);
    });

    // console.log("DarkModeToggle created.", this);
    this.initColorMode();
  }

  /** colorMode 초기화 */
  initColorMode() {
    this.setColorMode(this.isDarkMode);
    //window darkmode일때 상태를 변하지 않게
    this.$darkModeToggle.checked = this.isDarkMode;
  }

  /** document 조작 */
  setColorMode(isDarkMode) {
    document.documentElement.setAttribute(
      "color-mode",
      isDarkMode ? "dark" : "light"
    );
  }
}
