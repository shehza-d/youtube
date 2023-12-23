import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: "./public/temp",

  filename: (req, file, cb) => {
    console.log("multer-file: ", file);

    cb(null, `shehzad-${file.originalname}-${new Date().getTime()}`); //remove shehzad in file name
  },
});

export const upload = multer({ storage: storageConfig });

// new syntax ==== const upload =multer({ dest: './public/data/upload/'})
// https://www.npmjs.com/package/multer#diskstorage
