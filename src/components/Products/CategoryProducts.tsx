import { getCategoryProductList } from "@/api/functions/products.api";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";

interface ICategoryProductsProps {
  slug: string;
}

const CategoryProducts = ({ slug }: ICategoryProductsProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["category-product-list", slug],
    queryFn: () => getCategoryProductList(slug as string),
    enabled: !!slug,
  });

  const settings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return <div className="text-center py-4">Loading products...</div>;
  }

  return (
    <div className="w-full bg-white py-6">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 capitalize">
          {slug.replace(/-/g, " ")} Products
        </h2>
        {!!data && data?.length > 0 ? (
          <Slider {...settings}>
            {data.map((item) => (
              <div className="p-2" key={item?.id}>
                <ProductCard
                  id={item.id}
                  title={item?.title}
                  image={item?.image}
                  category={item.category}
                  rating={item.rating.rate}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-gray-600 text-center py-6">
            No products found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
