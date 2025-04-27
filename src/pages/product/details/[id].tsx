import { getProductDetails } from "@/api/functions/products.api";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, StarHalf, StarOff } from "lucide-react";
import CategoryProducts from "@/components/Products/CategoryProducts";
import { useStoreState } from "zustand-x";
import { cartStore } from "@/store/cart.store";

import useAddToCart from "@/hooks/supabase/useCart";

const ProductDetailsPage = () => {

  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProductDetails(Number(id)),
    enabled: !!id,
  });
  
  const [cartItems, setCartItems] = useStoreState(cartStore, "cartItems");
  const {addToCart,removeFromCart}=useAddToCart()

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div className="flex items-center gap-1">
        {[...Array(full)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={18}
            className="text-yellow-500 fill-yellow-500"
          />
        ))}
        {half && (
          <StarHalf size={18} className="text-yellow-500 fill-yellow-500" />
        )}
        {[...Array(empty)].map((_, i) => (
          <StarOff key={`empty-${i}`} size={18} className="text-gray-300" />
        ))}
      </div>
    );
  };



  const isItemAdded = useMemo(() => {
    const item = cartItems.find((cart) => cart?.productID === data?.id);

    return Boolean(item);
  }, [data, cartItems]);


  return (
    <div className="bg-gray-50">
      {/* Product Details */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="flex justify-center items-center bg-white rounded-xl shadow-lg p-6">
            {isLoading ? (
              <Skeleton className="w-[300px] h-[300px] rounded-lg" />
            ) : (
              data?.image && (
                <Image
                  src={data.image}
                  alt={data.title}
                  width={300}
                  height={300}
                  className="object-contain rounded-lg max-h-[300px]"
                />
              )
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center space-y-6">
            {isLoading ? (
              <>
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-full" />
              </>
            ) : (
              <>
                {/* Category */}
                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full w-fit">
                  {data?.category}
                </span>

                {/* Title */}
                <h2 className="text-3xl font-semibold text-gray-800">
                  {data?.title}
                </h2>

                {/* Rating */}
                {data?.rating?.rate && (
                  <div className="flex items-center gap-2">
                    {renderStars(data.rating.rate)}
                    <span className="text-sm text-gray-500">
                      ({data.rating.count} reviews)
                    </span>
                  </div>
                )}

                {/* Price */}
                <span className="text-2xl font-bold text-green-600">
                  ${data?.price}
                </span>

                {/* Description */}
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600">{data?.description}</p>
                </div>

                {/* CTA */}
                {isItemAdded ? (
                  <button
                    disabled
                    onClick={()=>removeFromCart(data?.id)}
                    className="bg-gray-50-600  px-6 py-3 rounded-xl text-black transition duration-300 w-fit"
                  >
                    Added to Cart
                  </button>
                ) : (
                  <button
                    onClick={()=>addToCart(data)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition duration-300 w-fit"
                  >
                    Add to Cart
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Related Products (Optional - for future use) */}
      {!!data?.category && (
        <section className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            You May Also Like
          </h2>
          <div className="mt-2">
            <CategoryProducts slug={data?.category} />
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetailsPage;
