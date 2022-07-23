const setToken = (token) => {
  console.log("seting token==>", token);
  return localStorage.setItem("accessToken", token);
};

const getToken = () => {
  return localStorage.getItem("accessToken");
};

const removeToken = () => {
  return localStorage.removeItem("accessToken");
};

const getAuthorizationHeader = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
};

export { getToken, setToken, removeToken, getAuthorizationHeader };
