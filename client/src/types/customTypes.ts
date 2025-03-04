

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