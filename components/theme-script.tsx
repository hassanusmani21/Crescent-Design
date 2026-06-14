export function ThemeScript() {
  const script = `
    (() => {
      const storageKey = "crescent-theme";
      const root = document.documentElement;
      const stored = window.localStorage.getItem(storageKey);
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = stored === "light" || stored === "dark" ? stored : prefersDark ? "dark" : "light";
      root.dataset.theme = theme;
      root.style.colorScheme = theme;
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
