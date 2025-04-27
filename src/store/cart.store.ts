// manage auth store
import { TCartSchema } from "@/typescript/cart.interface";
import { createStore } from "zustand-x";




interface ICartStoreInitialValues {
  cartItems: TCartSchema['TCartObj'][];
}

const initialValues: ICartStoreInitialValues = {
  cartItems: [],
};

export const cartStore = createStore(initialValues, {
  name: "cart",
  persist: true,
});
