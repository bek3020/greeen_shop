import { useParams } from "react-router-dom";
import { useQueryHandler } from "../../hooks/useQuery";
import ShopSwiper from "./shop-swiper";
import ShopAbout from "./shop-about";
import type { ProductType } from "../../@types";
import { Skeleton, Alert } from "antd";

const ShopInfoComponent = () => {
  const { category, id } = useParams<{ category: string; id: string }>();

  const { data, isLoading, isError } = useQueryHandler<ProductType>({
    pathname: "shop-info",
    url: `flower/category/${category}/${id}`,
  });

  if (isError) {
    return (
      <div className="w-[90%] m-auto py-10">
        <Alert
          message="Error"
          description="Ma'lumot yuklashda xatolik yuz berdi."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <section className="w-[90%] m-auto py-10">
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-10">
        <ShopSwiper isLoading={isLoading} isError={isError} data={data} />
        <ShopAbout isLoading={isLoading} isError={isError} data={data} />
      </div>

      <div>
        <div className="border-b border-green-600 mt-10 pb-5 cursor-pointer text-[18px] text-[#3d3d3d] font-bold">
          Product Description
        </div>

        {isLoading ? (
          <Skeleton active className="mt-4" />
        ) : (
          <p
            className="mt-4 text-[#3d3d3d] text-[16px] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
          ></p>
        )}
      </div>
    </section>
  );
};

export default ShopInfoComponent;
