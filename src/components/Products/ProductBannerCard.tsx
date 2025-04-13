import React from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getProductDetails } from "@/api/functions/products.api";
import { Star, StarHalf, StarOff } from "lucide-react";


interface IProductBannerCardProps {
  id: number;
}

const ProductBannerCard = ({ id }: IProductBannerCardProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProductDetails(id),
  });

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

  return (
    <Card className="p-6 shadow-md rounded-2xl bg-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Text Content */}
        <div className="flex-1 w-full">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-4" />
              <Skeleton className="h-6 w-24 mb-6" />
              <Skeleton className="h-10 w-full rounded-md" />
            </>
          ) : (
            <>
              {/* Category */}
              {data?.category && (
                <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full inline-block mb-3">
                  {data.category}
                </span>
              )}

              {/* Title */}
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                {data?.title}
              </h2>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold text-green-600">
                  ${data?.price}
                </span>
                {data?.rating && renderStars(data.rating.rate)}
              </div>

              {/* Accordion */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                  <AccordionTrigger>Description</AccordionTrigger>
                  <AccordionContent>
                    {data?.description || "No details available."}
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping</AccordionTrigger>
                  <AccordionContent>
                    Free shipping on all orders over $50. Ships in 1-2 days.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center bg-gray-100 rounded-xl p-4 min-w-[220px] min-h-[220px]">
          {isLoading ? (
            <Skeleton className="h-[200px] w-[200px] rounded-lg" />
          ) : (
            data?.image && (
              <Image
                src={data.image}
                height={220}
                width={220}
                alt="product"
                className="rounded-lg object-contain max-h-[220px]"
              />
            )
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductBannerCard;
