import { GetProfileOkResponse, User } from "../types/customTypes";
import { baseUrl } from "../utilities/urls";

export async function getUserProfileApi(): Promise<User> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(`${baseUrl}/api/users/profile`, requestOptions);
  //console.log('response :>> ', response);
  if (!response.ok) {
    throw new Error(`Failed to fetch user profile: ${response.status}`);
    //console.error("something went wrong");
  }
  // if it is okay, we gonna transfer the response to a json
  const result = (await response.json()) as GetProfileOkResponse;
  return result.user;
}

export async function updateProfileApi(user: User): Promise<void> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("id", user.id);
  urlencoded.append("imgUrl", user.img);
  urlencoded.append("username", user.username);
  urlencoded.append("email", user.email);

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: urlencoded,
  };

  await fetch(`${baseUrl}/api/users/profile`, requestOptions);
}
