import { createClient } from "@/lib/supabase/client";
import { authStore } from "@/store/auth.store";
import { cartStore } from "@/store/cart.store";
import { TProductSchema } from "@/typescript/products.interface";
import { useEffect } from "react";
import { toast } from "sonner";
import { useStoreState, useStoreValue } from "zustand-x";

const useAddToCart = () => {
  const supabase = createClient();
  const user = useStoreValue(authStore, "user");
  const [cartItems, setCartItems] = useStoreState(cartStore, "cartItems");

  const fetchAllCartItems = async () => {
    const { data, error } = await supabase
      .from("cart")
      .select("*")
      .eq("userID", user?.id);

    console.log(data);

    if (error) {
      setCartItems([]);
    }

    if (data) {
      setCartItems(data);
    }
  };

  const addToCart = async (data: TProductSchema["IProductObject"]) => {
    try {
      if (!!data) {
        const cartData = await supabase
          .from("cart")
          .insert([
            {
              userID: user?.id,
              title: data.title,
              price: data.price,
              photo: data.image,
              productID: data.id,
              quantity: 1,
            },
          ])
          .select()
          .throwOnError();

        if (cartData.data) {
          toast.success("item added");
          fetchAllCartItems();
        }

        if (cartData.error) {
          toast.error("something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (id: number) => {
    const { data, error } = await supabase
      .from("cart")
      .delete()
      .eq("id", id)
      .select("*");

    if (data) {
      toast.success("cart item removed");
      fetchAllCartItems();
    }

    if (error) {
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAllCartItems();
    }
  }, [user?.id]);

  return {
    addToCart,
    removeFromCart,
  };
};

export default useAddToCart;
