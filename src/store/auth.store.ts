// manage auth store
import { createStore } from "zustand-x";

const initialValues = {
  isLoggedIn: false,
  userId: null,
};

export const authStore = createStore(initialValues, {
  name: "auth",
  persist: true,
});

