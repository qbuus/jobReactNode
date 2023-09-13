import UseTheme from "../../hooks/useTheme";
import { useState, useEffect } from "react";
import themeData from "../../config/ThemeData.js";

const ThemeChooser = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("portalTheme") ?? "light"
  );
  const [active, setActive] = useState(null);

  UseTheme(theme, setTheme);

  return (
    <>
      {themeData
        ? themeData.map((theme, index) => (
            <li
              className={`text-center outline-base-content overflow-hidden rounded-lg hover:bg-base-100 p-2 ${
                active === index && "btn-active"
              }`}
              key={theme.theme}
              onClick={(e) => {
                e.preventDefault();
                setTheme(theme.theme);
                setActive((val) =>
                  val === index ? null : index
                );
              }}
            >
              {theme.theme}
            </li>
          ))
        : null}
    </>
  );
};

export default ThemeChooser;
