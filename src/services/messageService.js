import api from "./api";

export const messageService = {
  send: async (data) => {
    const res = await api.post("/messages", data);
    return res.data;
  },
};
