export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  img: string;
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
};

export type NewPost = {
  imgUrl: string;
  country: string;
  description: string;
};

export type UpdateOkResponse = {
  username: string;
};

// muss noch angepasst werden
export type GetGalleryOkResponse = {
  message: string;
  user: User;
};
