import { useEffect } from "react";
import themeData from "../../config/ThemeData.js";
import { themeChange } from "theme-change";

const ThemeChooser = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-3">
        {themeData
          ? themeData.map((theme, index) => (
              <li
                data-set-theme={`${theme.theme}`}
                className="font-normal text-lg hover:bg-base-100 w-full rounded-md"
                key={index}
              >
                {theme.theme}
              </li>
            ))
          : null}
      </div>
    </>
  );
};

export default ThemeChooser;
