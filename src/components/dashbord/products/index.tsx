import type { ProductType } from "../../../@types";
import { useQueryHandler } from "../../../hooks/useQuery";
import { Skeleton } from "antd";
import Card from "./card";
import { useSearchParamsHandler } from "../../../hooks/paramsApi";

const Products = () => {
  const { getParam } = useSearchParamsHandler();
  const category = getParam("category") || "house-plants";
  const range_min = getParam("range_min") || "0";
  const range_max = getParam("range_max") || "1000";

  const { data, isLoading, isError } = useQueryHandler<ProductType[]>({
    url: `flower/category/${category}`,
    pathname: `products-${category}-${range_min}-${range_max}`,
    param: {
      range_max,
      range_min,
    },
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <Skeleton.Image active className="!w-full !h-[300px]" />
            <Skeleton.Input active className="!w-3/4 !h-[20px]" />
            <Skeleton.Input active className="!w-1/2 !h-[24px]" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Xatolik yuz berdi</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data?.map((value) => (
        <Card
          key={value._id}
          id={value._id}
          main_image={value.main_image}
          title={value.title}
          price={value.price}
          discount={value.discount}
          discount_price={value.discount_price}
        />
      ))}
    </div>
  );
};

export default Products;
