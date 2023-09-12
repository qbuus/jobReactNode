const whiteList = ["http://localhost:5173"];

export const Options = {
  credentials: true,
  optionsSuccessStatus: 200,
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by cors"));
    }
  },
};

export default Options;
