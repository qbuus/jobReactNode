import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return callback(new Error("Only pdf file are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1 * 1024 * 1024, // 1mb
  },
});
