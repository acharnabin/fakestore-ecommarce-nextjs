// manage auth store
import { User } from "@supabase/supabase-js";
import { createStore } from "zustand-x";

type IAuthStoreInitialValue = {
  user:User|null;
  isLoggedIn:boolean;
  userId:null|string
}

const initialValues:IAuthStoreInitialValue = {
  isLoggedIn: false,
  userId: null,
  user:null
};

export const authStore = createStore(initialValues, {
  name: "auth",
  persist: true,
});

