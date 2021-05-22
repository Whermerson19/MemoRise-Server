import multer from "multer";
import path from "path";

const tmpFolder = path.resolve(__dirname, "..", "..", "..", "tmp");

const uploadConfig = {
  tmpFolder,
  destination: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, cb) => {
      const encode = Math.floor(Math.random() * 987676);
      const filename = `${encode}-${file.originalname}`;

      return cb(null, filename);
    },
  }),
};

export default uploadConfig;
