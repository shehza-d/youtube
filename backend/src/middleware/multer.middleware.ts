import multer from "multer";

// multer's disk storage settings
const storageConfig = multer.diskStorage({
  destination: "./public/temp",

  filename: (_, file, cb) => {
    console.log("🚀 ~ multer-file:", file);

    cb(null, `shehzad-${new Date().getTime()}-${file.originalname}`); //remove shehzad in file name
  },
});

// multer's settings
export const upload = multer({
  storage: storageConfig,
  // limits: { fileSize: 3500 * 3500 },
  // onFileUploadStart
});

// new syntax ==== const upload =multer({ dest: './public/data/upload/'})
// https://www.npmjs.com/package/multer#diskstorage
