import { useEffect } from "react";

const UseTheme = (theme, setTheme) => {
  useEffect(() => {
    const savedTheme =
      window.localStorage.getItem("portalTheme");
    savedTheme && setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.dataset.theme = theme;
    window.localStorage.setItem("portalTheme", theme);
  }, [theme]);
};

export default UseTheme;
