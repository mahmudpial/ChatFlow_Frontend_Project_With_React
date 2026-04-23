import api from "./api";

export const authService = {
  register: async (data) => {
    const res = await api.post("/register", data);
    return res.data;
  },

  login: async (data) => {
    const res = await api.post("/login", data);

    // save token
    localStorage.setItem("token", res.data.token);

    return res.data;
  },

  logout: async () => {
    await api.post("/logout");
    localStorage.removeItem("token");
  },
};
