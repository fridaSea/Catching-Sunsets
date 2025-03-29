export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  img: string;
};

export type UpdateUser = {
  id: string;
  username: string;
  img: string;
  email: string;
};

export type UserRegisterForm = {
  username: string;
  email: string;
  password: string;
  img: string;
};

export type UserImage = {
  img: string;
};

export type RegisterOkResponse = {
  message: string;
  user: string;
};

export type LoginCredentials = Pick<User, "email" | "password">;

export type LoginOkResponse = {
  message: string;
  user: User;
  token: string;
};

export type GetProfileOkResponse = {
  message: string;
  user: User;
};

export type ImageUploadOkResponse = {
  message: string;
  imgUrl: string;
  username: string;
};

export type SunsetImageUploadOkResponse = {
  message: string;
  imgUrl: string;
  country: string;
  description: string;
};

export type NewSunsetOkResponse = {
  message: string;
  post: NewSunsetPopulated;
};

export type NewSunset = {
  id: string;
  _id?: string; //optionales Feld für _id
  img: string;
  country: string;
  description: string;
  ownerUserId: string;
};

type NewSunsetPopulated = Omit<NewSunset, "ownerUserId">;
export type UpdatedSunset = {
  id: string;
  imgUrl: string;
  country: string;
  description: string;
};

// export type GetSunsetOkResponse = {
//   message: string;
//   user: User;
// };

export type UpdateOkResponse = {
  username: string;
};
