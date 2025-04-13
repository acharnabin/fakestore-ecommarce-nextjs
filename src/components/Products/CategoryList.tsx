import { getCategoryList } from "@/api/functions/products.api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const CategoryList = () => {
  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["category-list"],
    queryFn: getCategoryList,
  });

  if (isLoading) {
    return <div className="text-center py-4">Loading categories...</div>;
  }

  return (
    <div className="w-full bg-white shadow-sm py-4">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Shop by Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {categoryData?.map((item) => (
            <Link
              key={item}
              href={`/categories/${item}`}
              className="px-4 py-2 rounded-full bg-amber-100 text-amber-700 border border-amber-300 hover:bg-amber-500 hover:text-white transition-all duration-200 text-sm font-medium"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
