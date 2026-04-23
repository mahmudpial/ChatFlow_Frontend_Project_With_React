import api from "./api"; // axios instance

export const contactService = {
  getAll: async () => {
    try {
      const res = await api.get("/contacts");
      return res.data;
    } catch (error) {
      console.error("Get contacts error:", error);
      throw error;
    }
  },

  create: async (data) => {
    try {
      const res = await api.post("/contacts", data);
      return res.data;
    } catch (error) {
      console.error("Create contact error:", error);
      throw error;
    }
  },
};
