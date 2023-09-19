import { useEffect } from "react";
import themeData from "../../config/ThemeData.js";
import { themeChange } from "theme-change";

const ThemeChooser = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      {themeData
        ? themeData.map((theme, index) => (
            <li
              data-set-theme={`${theme.theme}`}
              className="ACTIVECLASS"
              key={index}
            >
              {theme.theme}
            </li>
          ))
        : null}
    </>
  );
};

export default ThemeChooser;
