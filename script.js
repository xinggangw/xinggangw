/* Theme controls. The initial theme is applied by theme-init.js. */

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const storageKey = "wsi-theme";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  const savedTheme = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  };

  const updateTheme = () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    const label = `Switch to ${nextTheme} mode`;
    const themeColor = root.dataset.theme === "dark" ? "#0c0d0f" : "#f4f4f0";

    document.querySelectorAll(".theme-toggle").forEach((toggle) => {
      toggle.setAttribute("aria-label", label);
      toggle.setAttribute("title", label);
    });
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => {
      meta.setAttribute("content", themeColor);
    });
  };

  document.querySelectorAll(".theme-toggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = nextTheme;
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // The current page can still change theme without persistence.
      }
      updateTheme();
    });
  });

  const handleSystemThemeChange = (event) => {
    if (savedTheme() !== "light" && savedTheme() !== "dark") {
      root.dataset.theme = event.matches ? "dark" : "light";
      updateTheme();
    }
  };

  if (systemTheme.addEventListener) {
    systemTheme.addEventListener("change", handleSystemThemeChange);
  } else {
    systemTheme.addListener(handleSystemThemeChange);
  }

  updateTheme();
});
