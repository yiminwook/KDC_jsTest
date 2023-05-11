class DarkModeToggle {
  isDarkMode = null;

  constructor({ $target, initMode, onChange }) {
    this.isDarkMode = initMode;
    const $darkModeToggleSection = document.createElement("section");
    this.$darkModeToggleSection = $darkModeToggleSection;
    $target.appendChild(this.$darkModeToggleSection);

    const $darkModeToggle = document.createElement("input");
    this.$darkModeToggle = $darkModeToggle;
    this.$darkModeToggle.type = "checkbox";
    this.$darkModeToggle.className = "DarkModeToggle";
    this.$darkModeToggleSection.appendChild(this.$darkModeToggle);

    this.$darkModeToggle.addEventListener("change", (e) => {
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
    //window 다크모드 설정과 체크박스 체크여부를 같게
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
