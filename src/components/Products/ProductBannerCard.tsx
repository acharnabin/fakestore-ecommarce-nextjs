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

interface IProductBannerCardProps {
  id: number;
}

const ProductBannerCard = ({ id }: IProductBannerCardProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProductDetails(id),
  });

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
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">
                {data?.title}
              </h2>
              <p className="text-gray-600 mb-4">{data?.description}</p>
              <span className="text-xl font-bold text-green-600 mb-6 inline-block">
                ${data?.price}
              </span>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                  <AccordionTrigger>Details</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping">
                  <AccordionTrigger>Shipping</AccordionTrigger>
                  <AccordionContent>
                    Shipping information goes here.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </div>

        {/* Image Section */}
        <div className="flex items-center justify-center bg-gray-100 rounded-xl p-4 min-w-[200px] min-h-[200px]">
          {isLoading ? (
            <Skeleton className="h-[200px] w-[200px] rounded-lg" />
          ) : (
            data?.image && (
              <Image
                src={data.image}
                height={200}
                width={200}
                alt="product"
                className="rounded-lg object-contain"
              />
            )
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProductBannerCard;
