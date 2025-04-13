import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Star, StarHalf, StarOff } from "lucide-react";

interface IProductCardProps {
  id: number;
  title: string;
  image: string;
  category?: string;
  rating?: number; // e.g. 4.5
}

const ProductCard = ({ id, title, image, category, rating = 0 }: IProductCardProps) => {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} size={16} className="text-yellow-500 fill-yellow-500" />
        ))}
        {halfStar && <StarHalf size={16} className="text-yellow-500 fill-yellow-500" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} size={16} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <Card className="p-4 shadow-sm border border-gray-200 rounded-2xl hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex flex-col items-center gap-4">
        {/* Product Image */}
        <div className="bg-gray-100 rounded-xl p-4 w-full flex justify-center h-[200px]">
          <Image
            src={image}
            height={180}
            width={180}
            alt={title}
            className="object-contain"
          />
        </div>

        {/* Category Badge */}
        {category && (
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
            {category}
          </span>
        )}

        {/* Title */}
        <h2 className="text-base font-semibold text-center text-gray-800 line-clamp-2">
          {title}
        </h2>

        {/* Rating */}
        {renderStars(rating)}

        {/* View Product Link */}
        <Link
          href={`/product/details/${id}`}
          className="mt-2 inline-block bg-amber-500 text-white px-4 py-2 rounded-full text-sm hover:bg-amber-600 transition-colors"
        >
          View Product
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
