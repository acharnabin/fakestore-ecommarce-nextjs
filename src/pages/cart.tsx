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

const Cart = () => {
  const [cartItems, setCartItems] = useStoreState(cartStore, "cartItems");

  const handleDelete = (index: number) => {
    const updatedItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedItems);
  };

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
            {cartItems?.map((cart, index) => (
              <TableRow key={cart?.id}>
                <TableCell className="font-medium">{cart?.title}</TableCell>
                <TableCell>${cart?.price?.toFixed(2)}</TableCell>
                <TableCell>
                  <img
                    src={cart.image}
                    alt={cart.title}
                    className="h-12 w-12 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} className="font-semibold">
                Total
              </TableCell>
              <TableCell className="text-right font-semibold">
                ${total.toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Cart;
