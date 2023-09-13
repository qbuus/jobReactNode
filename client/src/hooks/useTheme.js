import { useEffect } from "react";

const UseTheme = (theme) => {
  useEffect(() => {
    localStorage.setItem("portalTheme", theme);
    const localTheme = localStorage.getItem("portalTheme");
    document.body.dataset.theme = localTheme;
  }, [theme]);
};

export default UseTheme;
