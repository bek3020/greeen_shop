import { Skeleton } from "antd";

export const loaderApi = () => {
  const categoryLoader = () => {
    return Array.from({ length: 9 }).map((_, index) => (
      <div key={index}>
        <Skeleton.Input className="w-full!" block />
      </div>
    ));
  };
  return { categoryLoader };
};
