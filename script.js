/* Small progressive-enhancement layer for the mobile navigation. */

document.documentElement.classList.add("js");

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

  const updateThemeButtons = () => {
    const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
    const label = `Switch to ${nextTheme} mode`;
    const themeColor = root.dataset.theme === "dark" ? "#0c0e12" : "#ffffff";
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
      updateThemeButtons();
    });
  });

  const handleSystemThemeChange = (event) => {
    if (savedTheme() !== "light" && savedTheme() !== "dark") {
      root.dataset.theme = event.matches ? "dark" : "light";
      updateThemeButtons();
    }
  };

  if (systemTheme.addEventListener) {
    systemTheme.addEventListener("change", handleSystemThemeChange);
  } else {
    systemTheme.addListener(handleSystemThemeChange);
  }

  updateThemeButtons();

  document.querySelectorAll(".nav-toggle").forEach((toggle) => {
    const nav = document.getElementById(toggle.getAttribute("aria-controls"));
    if (!nav) return;

    const setOpen = (open, moveFocus = false) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
      nav.dataset.open = String(open);
      if (moveFocus) {
        const firstLink = nav.querySelector("a");
        if (firstLink) firstLink.focus();
      }
    };

    toggle.addEventListener("click", () => {
      setOpen(toggle.getAttribute("aria-expanded") !== "true", true);
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 820) setOpen(false);
    });
  });
});
