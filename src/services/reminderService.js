import api from "./api";

export const reminderService = {
  create: async (data) => {
    const res = await api.post("/reminders", data);
    return res.data;
  },

  markDone: async (id) => {
    const res = await api.patch(`/reminders/${id}`);
    return res.data;
  },
};
