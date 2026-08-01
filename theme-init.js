/* Apply the saved or system theme before the stylesheet paints. */

(() => {
  const storageKey = "wsi-theme";
  let theme;

  try {
    theme = localStorage.getItem(storageKey);
  } catch (error) {
    // Storage can be unavailable in restrictive privacy modes.
  }

  if (theme !== "light" && theme !== "dark") {
    theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  document.documentElement.dataset.theme = theme;
})();
