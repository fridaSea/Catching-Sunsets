

export type User = {
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
} 

export type UserImage = {
    img: string;
};

export type RegisterOkResponse = {
    message: string;
    user: string;
}

export type LoginCredentials = Pick<User, "email" | "password">

export type LoginOkResponse = {
    message: string;
    user: string;
    token:string;
}

export type GetProfileOkResponse = {
    message: string;
    user: string;
}
// USER or user???