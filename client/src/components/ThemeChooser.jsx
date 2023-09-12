import UseTheme from "../hooks/useTheme";
import { useState } from "react";
import themeData from "../config/ThemeData.js";

const ThemeChooser = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("portalTheme") ?? "light"
  );

  UseTheme(theme);
  return (
    <>
      {themeData.map((theme, index) => (
        <button
          className="btn mt-1 mx-3"
          key={index}
          onClick={(e) => {
            e.preventDefault();
            setTheme(theme.theme);
          }}
        >
          {theme.theme}
        </button>
      ))}
    </>
  );
};

export default ThemeChooser;
