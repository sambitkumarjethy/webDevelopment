export const storage = {
  getToken() {
    return localStorage.getItem("accessToken");
  },

  setToken(token) {
    localStorage.setItem("accessToken", token);
  },

  removeToken() {
    localStorage.removeItem("accessToken");
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  clear() {
    localStorage.clear();
  },
};
