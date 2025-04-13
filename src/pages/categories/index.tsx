import { getCategoryList } from "@/api/functions/products.api";
import CategoryList from "@/components/Products/CategoryList";
import CategoryProducts from "@/components/Products/CategoryProducts";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const CategoryListPage = () => {
  const { data: categoryData, isLoading } = useQuery({
    queryKey: ["category-list"],
    queryFn: getCategoryList,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Buttons */}
      <section className="py-6 border-b border-gray-200">
        <CategoryList />
      </section>

      {/* Products Per Category */}
      <section className="mt-6">
        {isLoading ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            Loading categories...
          </div>
        ) : (
          categoryData?.map((cat) => (
            <div key={cat} className="mb-10">
              <CategoryProducts slug={cat} />
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default CategoryListPage;
