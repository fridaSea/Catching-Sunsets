import multer from "multer";
import path from "path";
import colors from "colors";

const storage = multer.diskStorage({});

// Handling file size directly in multer
const limits = { fileSize: 5 * 1024 * 1024 };

// function fileFilter (req, file, cb) ...
const fileFilter = (req, file, cb) => {
  console.log("file :>> ", file);

  // Check the file extension to decide if we allow the upload or not
  let extension = path.extname(file.originalname);
  if (extension !== ".png" && extension !== ".jpg" && extension !== ".jpeg") {
    console.log("File extension not supported.".red);
    // To reject this file pass `false`, like so:
    cb(null, false);
    // cb(
    //   new Error(
    //     `Youa re trying to upload a ${extension} file. Only Images are supported.`
    //   )
    // );
  } else {
    console.log("File accepted.");
    // To accept the file pass `true`, like so:
    cb(null, true);
  }

  // You can always pass an error if something goes wrong:
  //   cb(new Error("I don't have a clue!"));
};

const multerUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits,
});

export default multerUpload;
