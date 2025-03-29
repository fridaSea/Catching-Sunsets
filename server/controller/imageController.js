import uploadToCloudinary from "../utilities/imageUpload";

const imageUpload = async (req, res) => {
  console.log("Image upload is working");

  // ist hier nicht sehr genau das error handling
  if (!req.file) {
    return res.status(500).json({
      error: "File Type not supported",
      // if no file is uploaded
    });
  }
  if (req.file) {
    //Upload it to Cloudinary
    const uploadedImage = await uploadToCloudinary(req.file);

    if (!uploadedImage) {
      return res.status(400).json({
        error: "Image couldn`t be uploaded",
      });
    }

    if (uploadedImage) {
      return res.status(200).json({
        message: "Image uploaded successfully",
        imgUrl: uploadedImage.secure_url,
      });
    }

    console.log("uploadedImage :>> ".green, uploadedImage);
  }
};

export { imageUpload };
