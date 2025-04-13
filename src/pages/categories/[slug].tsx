import { getCategoryProductList } from "@/api/functions/products.api";
import CategoryList from "@/components/Products/CategoryList";
import ProductCard from "@/components/Products/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import Slider from "react-slick";

const CategoryPage = () => {
  const { slug } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["category-product-list", slug],
    queryFn: () => getCategoryProductList(slug as string),
    enabled: !!slug,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 capitalize">
          { !!slug && slug?.toString()?.replace(/-/g, " ")} Products
        </h1>
        <p className="text-lg">Browse top items from this category</p>
      </section>

      {/* Category Selector */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <CategoryList />
      </div>

      {/* Product Slider or Skeletons */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                key={index}
                className="w-full h-[300px] rounded-xl shadow"
              />
            ))}
          </div>
        ) : data && data.length > 0 ? (
          <Slider {...settings} arrows>
            {data.map((item) => (
              <div className="p-2" key={item.id}>
                <ProductCard
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  category={item.category}
                  rating={item.rating?.rate}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No products found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
