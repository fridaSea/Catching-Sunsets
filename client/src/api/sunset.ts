import Sunsets from "../pages/Sunsets/Sunsets";
import {
  NewSunset,
  NewSunsetOkResponse,
  UpdatedSunset,
} from "../types/customTypes";
import { baseUrl } from "../utilities/urls";

export async function createSunsetApi(
  newSunset: NewSunset
): Promise<NewSunsetOkResponse> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("country", newSunset.country);
  urlencoded.append("description", newSunset.description);
  urlencoded.append("imgUrl", newSunset.img);
  urlencoded.append("ownerUserId", newSunset.ownerUserId);
  //NEW 19.03
  //urlencoded.append("ownerUserId", newSunset.sunsetOwner);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(`${baseUrl}/api/sunsets/add`, requestOptions);
    console.log("response :>> ", response);

    if (!response.ok) {
      throw new Error(`Failed to create sunset: ${response.status}`);
    }

    const result = (await response.json()) as NewSunsetOkResponse;
    console.log("result :>> ", result);
    return result;
  } catch (error) {
    console.log("error  creating sunset:>> ", error);
  }
}
//updateSunsetById
export async function updateSunsetApi(sunset: UpdatedSunset) {
  const token = localStorage.getItem("token");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("id", sunset.id);
  urlencoded.append("imgUrl", sunset.imgUrl);
  urlencoded.append("country", sunset.country);
  urlencoded.append("description", sunset.description);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: urlencoded,
  };

  //await fetch(`${baseUrl}/api/sunsets/add`, requestOptions);
  //NEW 19.03
  await fetch(`${baseUrl}/api/sunsets/${sunset.id}`, requestOptions);
}

export async function getSunsetApi(sunsetId: string): Promise<NewSunset> {
  const token = localStorage.getItem("token");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(
    `${baseUrl}/api/sunsets/${sunsetId}`,
    requestOptions
  );
  const result: { message: string; sunset: NewSunset } = await response.json();
  //console.log("result :>> ", result);
  if (response.status >= 400) {
    throw new Error(result.message);
  }

  return result.sunset;
}

export async function deleteSunsetApi(sunsetId: string): Promise<void> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("id", sunsetId);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: urlencoded,
  };

  //await fetch(`${baseUrl}/api/sunsets/:id`, requestOptions);
  //NEW 19.03
  await fetch(`${baseUrl}/api/sunsets/${sunsetId}`, requestOptions);
}
