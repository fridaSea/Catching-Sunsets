import {
  GetProfileOkResponse,
  LoginOkResponse,
  NewSunset,
  UpdateUser,
  User,
} from "../types/customTypes";
import { baseUrl } from "../utilities/urls";

export async function loginUserApi(
  email: string,
  password: string
): Promise<User> {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("email", email);
  urlencoded.append("password", password);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  const response = await fetch(`${baseUrl}/api/users/login`, requestOptions);

  const result = (await response.json()) as LoginOkResponse;

  if (response.status >= 400) {
    throw new Error(result.message);
  } else if (result.token) {
    localStorage.setItem("token", result.token);
  }

  return result.user;
}

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

export async function updateProfileApi(user: UpdateUser): Promise<void> {
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

export async function deleteProfileApi(userId: string): Promise<void> {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("No token found");
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("id", userId);

  const requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: urlencoded,
  };

  await fetch(`${baseUrl}/api/users/profile`, requestOptions);
}

export async function getUserSunsetsApi(): Promise<Array<NewSunset>> {
  const token = localStorage.getItem("token");
  //console.log(localStorage.getItem("token"));

  if (!token) {
    throw new Error("No token found");
  }

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  const response = await fetch(`${baseUrl}/api/sunsets/mine`, requestOptions);

  if (!response.ok) {
    throw new Error(`Failed to fetch user Sunset profile: ${response.status}`);
    //console.error("something went wrong");
  }
  // if it is okay, we gonna transfer the response to a json
  const result = await response.json();
  return result.sunsetsByUser;
}
