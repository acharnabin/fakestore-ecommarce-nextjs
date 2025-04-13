import { getProductList } from "@/api/functions/products.api";
import CategoryList from "@/components/Products/CategoryList";
import ProductBannerCard from "@/components/Products/ProductBannerCard";
import ProductCard from "@/components/Products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["product-list"],
    queryFn: getProductList,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Featured Product */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">🌟 Featured Product</h2>
        <ProductBannerCard id={2} />
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold mb-6">🛍️ Browse by Category</h2>
        <div className="bg-white p-4 rounded-xl shadow-md">
          <CategoryList />
        </div>
      </section>

      {/* Product Slider */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">🛒 New Arrivals</h2>
          <p className="text-sm text-gray-500">Explore our latest products</p>
        </div>
        <Slider arrows {...settings}>
          {data?.map((item) => (
            <div key={item.id} className="p-3">
              <ProductCard
                id={item.id}
                title={item.title}
                image={item.image}
                category={item.category}
                rating={item.rating.rate}
              />
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
}
