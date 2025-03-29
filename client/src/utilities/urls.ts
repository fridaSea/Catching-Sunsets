// const baseUrl = "http://localhost:4004";

const baseUrl =
  import.meta.env.MODE === "development"
    ? import.meta.env.VITE_LOCAL_HOST
    : import.meta.env.VITE_SERVER_URL;

export { baseUrl };
