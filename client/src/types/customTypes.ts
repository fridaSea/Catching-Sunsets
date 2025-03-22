export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  img: string;
};

// export type UserWithSunsets = {
//   id: string;
//   username: string;
//   email: string;
//   password: string;
//   img: string;
//   uploadedImages: string[];
// };

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

// export type GetProfileOkResponse = {
//   message: string;
//   user: User;
// };
export type GetProfileOkResponse = {
  message: string;
  user: UserWithSunsets;
};

export type ImageUploadOkResponse = {
  message: string;
  imgUrl: string;
  username: string;
  //new
};

export type SunsetImageUploadOkResponse = {
  message: string;
  imgUrl: string;
  country: string;
  description: string;
  //new
};

export type NewSunsetOkResponse = {
  message: string;
  post: NewSunsetPopulated;
};

export type NewSunset = {
  id: string;
  img: string;
  country: string;
  description: string;
  //NEW 19.03
  // sunsetOwner: string;
  ownerUserId: string;
};

//NEW 19.03
// type NewSunsetPopulated = Omit<NewSunset, "sunsetOwner">;
type NewSunsetPopulated = Omit<NewSunset, "ownerUserId">;
export type UpdatedSunset = {
  id: string;
  imgUrl: string;
  country: string;
  description: string;
};
// muss noch angepasst werden
export type GetSunsetOkResponse = {
  message: string;
  user: User;
};

export type UpdateOkResponse = {
  username: string;
};
