import { getProductList } from "@/api/functions/products.api";
import ProductBannerCard from "@/components/Products/ProductBannerCard";
import ProductCard from "@/components/Products/ProductCard";
import Header from "@/layout/Header";
import { useQuery } from "@tanstack/react-query";
import Slider from "react-slick";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: ["product-list"],
    queryFn: getProductList,
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };

  return (
    <div>
      <ProductBannerCard id={2} />

      <Slider arrows {...settings}>
        {data?.map((item) => (
          <div className="p-2" key={item?.id}>
            <ProductCard
              key={item?.id}
              id={item.id}
              title={item?.title}
              image={item?.image}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
