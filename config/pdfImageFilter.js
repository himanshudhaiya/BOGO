const pdfImageFilter = function (req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(pdf|jpg|JPG|jpeg|JPEG|png|PNG|PDF)$/)) {
    req.fileValidationError = "Only pdf,images files are allowed!";
    return cb(new Error("Only pdf,images files are allowed!"), false);
  }
  cb(null, true);
};
module.exports = pdfImageFilter;
