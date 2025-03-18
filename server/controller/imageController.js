import uploadToCloudinary from "../utilities/imageUpload";

const imageUpload = async (req, res) => {
  console.log("Image upload is working");
  // console.log("req :>> ", req);

  // ist hier nicht sehr genau das error handling
  if (!req.file) {
    return res.status(500).json({
      error: "File Type not supported",
    });
  }
  if (req.file) {
    //we could check the file size here (or do it diretly in Multer)
    // TO Do - calculate how much  size: 49983 in Bytes,  is in  megabytes and then you decide how many Megabytes you want to allow to upload
    // 5 Megabytes

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
