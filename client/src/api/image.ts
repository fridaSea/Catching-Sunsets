import { ImageUploadOkResponse } from "../types/customTypes";
import { baseUrl } from "../utilities/urls";

export async function uploadNewImageApi(
  image: File
): Promise<{ imgUrl: string }> {
  const formdata = new FormData();
  formdata.append("image", image);

  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  const response = await fetch(
    // `${baseUrl}/api/users/uploadImage`,
    `${baseUrl}/api/image/upload`,
    requestOptions
  );

  const result: ImageUploadOkResponse = await response.json();

  if (response.status >= 400) {
    throw new Error(result.message);
  }

  return { imgUrl: result.imgUrl };
}
