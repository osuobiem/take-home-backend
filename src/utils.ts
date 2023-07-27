import multer from "multer";

// Handle file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

export const uploadFile = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(new Error("Invalid file type"));
    }
  },
});
