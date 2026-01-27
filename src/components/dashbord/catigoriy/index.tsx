import type { CategoryType } from "../../../@types";
import { loaderApi } from "../../../generic/Loader/index";
import { useSearchParamsHandler } from "../../../hooks/paramsApi";
import { useQueryHandler } from "../../../hooks/useQuery";
import Discaut from "./discant";
import Price from "./price";

const Category = () => {
  const { setParam, getParam } = useSearchParamsHandler();
  const activeCategory = getParam("category");
  const { data, isLoading, isError } = useQueryHandler<CategoryType[]>({
    url: "flower/category",
    pathname: "category",
  });

  const { categoryLoader } = loaderApi();

  if (isLoading) {
    return (
      <div className="bg-[#f2f2f2] p-4 rounded-[5px]">
        <h2 className="text-[#3d3d3d] font-bold">Categories</h2>
        <div className="p-2">{categoryLoader()}</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-[#f2f2f2] p-4 rounded-[5px]">
        <h2 className="text-[#3d3d3d] font-bold">Categories</h2>
        <p className="text-red-500 p-2">Xatolik yuz berdi</p>
      </div>
    );
  }

  return (
    <div className="bg-[#f2f2f2] p-4 rounded-[5px]">
      <h2 className="text-[#3d3d3d] font-bold">Categories</h2>
      <div className="p-2 flex flex-col gap-5">
        {data?.map((value) => (
          <div
            onClick={() => setParam({ category: value.route_path })}
            key={value._id}
            className={`flex items-center gap-2 justify-between 
                       hover:text-[#46a358] cursor-pointer 
                       ${activeCategory === value.route_path ? "text-[#46a358] font-bold" : "text-[#3d3d3d]"}`}
          >
            <h3>{value.title}</h3>
            <h3>({value.count})</h3>
          </div>
        ))}
      </div>
      <Price />
      <Discaut />
    </div>
  );
};

export default Category;
