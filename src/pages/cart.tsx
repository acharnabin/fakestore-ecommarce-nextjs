import React, { useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useStoreState } from "zustand-x";
import { cartStore } from "@/store/cart.store";
import useAddToCart from "@/hooks/supabase/useCart";

const Cart = () => {
  const [cartItems] = useStoreState(cartStore, "cartItems");
  const { removeFromCart } = useAddToCart();
  

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item?.price, 0);
  }, [cartItems]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      <div className="rounded-xl border shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems?.length > 0 ? (
              cartItems.map((cart) => (
                <TableRow key={cart?.id}>
                  <TableCell className="font-medium">{cart?.title}</TableCell>
                  <TableCell>${cart?.price?.toFixed(2)}</TableCell>
                  <TableCell>
                    <img
                      src={cart?.photo}
                      alt={cart?.title}
                      className="h-12 w-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(cart?.id)}
                      className="cursor-pointer"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-10 text-gray-500">
                  Your cart is empty.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          {cartItems?.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3} className="font-semibold">
                  Total
                </TableCell>
                <TableCell className="text-right font-semibold">
                   <Button>
                    Checkout ${total.toFixed(2)}
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Cart;
