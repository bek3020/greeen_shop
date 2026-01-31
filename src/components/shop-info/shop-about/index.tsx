import type { FC } from "react";
import type { AuthType, DataType, ProductType } from "../../../@types";
import { Avatar, Rate, Skeleton, Tooltip, Button, message } from "antd";
import { useQueryHandler } from "../../../hooks/useQuery";
import { useReduxDispatch } from "../../../hooks/useRedux";
import { addToCart, type Product } from "../../../redux/shop-slice";

const ShopAbout: FC<DataType<ProductType>> = ({ data, isError, isLoading }) => {
  const dispatch = useReduxDispatch();

  const { data: userData, isLoading: userLoading } = useQueryHandler<AuthType>({
    pathname: "user",
    url: data?.created_by ? `user/by_id/${data.created_by}` : "",
  });

  const handleAddToCart = () => {
    if (data) {
      // 1. Redux kutayotgan qat'iy tipda yangi obyekt yaratamiz (Mapping)
      const productForCart: Product = {
        id: data._id, // _id ni id ga o'girdik
        title: data.title,
        price: data.price,
        main_image: data.main_image,
        count: 1,
      };

      // 2. Endi dispatch xatosiz va 'any'siz ishlaydi
      dispatch(addToCart(productForCart));
      message.success(`${data.title} savatchaga qo'shildi!`);
    }
  };

  if (isError) return <p>Xatolik yuz berdi...</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-green-600 flex items-center justify-between pb-5">
        <div className="flex items-center gap-5">
          {userLoading || !data ? (
            <Skeleton.Avatar active size={60} />
          ) : (
            <Tooltip
              title={`${userData?.name || ""} ${userData?.surname || ""}`}
            >
              <Avatar src={userData?.profile_photo} size={60} />
            </Tooltip>
          )}
          <div>
            {isLoading ? (
              <Skeleton.Input active style={{ width: 150 }} />
            ) : (
              <div>
                <h2 className="text-[#3D3D3D] text-[25px] font-bold">
                  {data?.title}
                </h2>
                <h2 className="text-[#46A358] text-[20px] font-bold">
                  $ {data?.price}
                </h2>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <Rate disabled value={data?.rate || 0} />
          <p className="text-[12px] text-gray-400">{data?.views} reviews</p>
        </div>
      </div>

      <div className="my-2">
        <h3 className="font-bold">Short Description:</h3>
        <p className="text-gray-500">{data?.short_description}</p>
      </div>

      <div className="flex gap-4 mt-5">
        <Button
          onClick={handleAddToCart}
          type="primary"
          size="large"
          className="bg-[#46A358] w-[140px]"
          disabled={isLoading}
        >
          Add to Cart
        </Button>
      </div>

      <div className="mt-5 text-[14px]">
        <p>
          <span className="text-gray-400">SKU:</span> {data?._id}
        </p>
        <p>
          <span className="text-gray-400">Category:</span> {data?.category}
        </p>
        <p>
          <span className="text-gray-400">Tags:</span>{" "}
          {data?.tags && Array.isArray(data.tags)
            ? data.tags.join(", ")
            : "Home, Garden"}
        </p>
      </div>
    </div>
  );
};

export default ShopAbout;
