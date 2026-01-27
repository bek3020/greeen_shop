import type { DiscoutFlowerType } from "../../../../@types";
import { useQueryHandler } from "../../../../hooks/useQuery";
import { Skeleton } from "antd";

const Discaut = () => {
  const { data, isLoading } = useQueryHandler<DiscoutFlowerType>({
    url: "features/discount",
    pathname: "discaut",
  });

  if (isLoading || !data) {
    return (
      <div className="flex items-center flex-col justify-between gap-[10px] text-center mt-4">
        <Skeleton.Input active className="!w-[150px] !h-[24px]" />
        <Skeleton.Input active className="!w-[200px] !h-[28px]" />
        <Skeleton.Image active className="!w-[300px] !h-[200px]" />
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col justify-between gap-[10px] text-center mt-4">
      <h3 className="text-[#46a358] text-[20px] font-normal leading-[120%]">
        {data.title}
      </h3>
      <h2 className="text-[#3d3d3d] font-bold text-[20px]">
        UP TO {data.discoount_up_to}% OFF
      </h2>
      <img src={data.poster_image_url || "/placeholder.svg"} alt={data.title || "Discount"} />
    </div>
  );
};

export default Discaut;