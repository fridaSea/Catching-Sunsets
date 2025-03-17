import {
  NewSunset,
  NewSunsetOkResponse,
  UpdatedSunset,
} from "../types/customTypes";
import { baseUrl } from "../utilities/urls";

export async function createSunsetApi(
  newSunset: NewSunset
): Promise<NewSunset> {
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
  urlencoded.append("imgUrl", newSunset.imgUrl);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const response = await fetch(`${baseUrl}/api/sunsets/add`, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to create sunset: ${response.status}`);
    }

    const result = (await response.json()) as NewSunsetOkResponse;
    return result.sunset;
  } catch (error) {
    console.log("error  creating sunset:>> ", error);
  }
}

export async function updateSunsetApi(sunset: UpdatedSunset) {
  const token = localStorage.getItem("token");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("id", sunset.id);
  // urlencoded.append("imgUrl", sunset.img);
  urlencoded.append("country", sunset.country);
  urlencoded.append("description", sunset.description);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: urlencoded,
  };

  await fetch(`${baseUrl}/api/sunsets/add`, requestOptions);
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

  if (response.status >= 400) {
    throw new Error(result.message);
  }

  return result.sunset;
}
