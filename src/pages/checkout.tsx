import React, { useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cartStore } from "@/store/cart.store";
import { useStoreState } from "zustand-x";

const Checkout = () => {
  const [cartItems] = useStoreState(cartStore, "cartItems");
  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item?.price, 0);
  }, [cartItems]);

  return (
    <div className="p-6 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Billing Details */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Billing Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <Input placeholder="Email Address" type="email" />
            <Input placeholder="Phone Number" type="tel" />
            <Input placeholder="Address" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="City" />
              <Input placeholder="Postal Code" />
            </div>
            <Input placeholder="Country" />
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Products List (You can map your cart items here dynamically) */}
            {cartItems?.map((items) => (
              <div key={items.id} className="flex justify-between">
                <span>{items?.title}</span>
                <span>${items?.price}</span>
              </div>
            ))}

            {/* Divider */}
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>
            <Button className="w-full mt-6" size="lg">
              Proceed to Payment
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Checkout;
