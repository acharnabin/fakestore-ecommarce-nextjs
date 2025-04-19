// manage auth store
import { TProductSchema } from "@/typescript/products.interface";
import { createStore } from "zustand-x";


interface ICartStoreInitialValues {
    cartItems:TProductSchema['IProductObject'][]
}

const initialValues:ICartStoreInitialValues = {
  cartItems:[]
};

export const cartStore = createStore(initialValues, {
  name: "cart",
  persist: true,
});
