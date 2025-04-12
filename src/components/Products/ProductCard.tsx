import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface IProductCardProps {
  title: string;
  image: string;
  id:number;
}

const ProductCard = ({ id,title, image }: IProductCardProps) => {
  return (
    <Card className="p-4 shadow-md rounded-2xl hover:shadow-lg transition-shadow duration-300">
      <CardContent className="flex flex-col items-center gap-4">
        <div className="bg-gray-100 rounded-xl p-4">
          <Image
            src={image}
            height={180}
            width={180}
            alt={title}
            className="object-contain rounded-lg"
          />
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-800">{title}</h2>

        <Link href={`/product/details/${id}`}>View product</Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
