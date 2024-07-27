import Cookie from "js-cookie";

export const handleToken = (token: string) => {
  Cookie.set("token", token, { expires: 1 });
  console.log("Token set: ", token);
};

export const getToken = () => {
  const token = Cookie.get("token");
  console.log("Token by get: ", token);
  return token;
};

export const removeToken = () => {
  Cookie.remove("token");
  console.log("Token removed");
};
