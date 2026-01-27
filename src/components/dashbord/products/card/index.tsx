import { useNavigate } from "react-router-dom";
import {
  HeartFilled,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

type ProductType = {
  id: string | number;
  main_image: string;
  title: string;
  price: number | string;
  discount?: boolean;
  discount_price?: number | string;
};

const Card = (props: ProductType) => {
  const navigate = useNavigate();

  const icon_style =
    "bg-[#FFFFFF] w-[35px] h-[35px] flex rounded-lg justify-center items-center cursor-pointer text-[20px]";

  const handleAddToCart = () => {
    console.log("add to cart:", props);
  };

  const goToDetail = () => {
    navigate(`/product/${props.id}`);
  };

  return (
    <div className="relative group">
      <div className="group h-[300px] bg-[#f5f5f5] flex justify-center items-center relative rounded-lg overflow-hidden">
        <img
          src={props.main_image || "/placeholder.svg"}
          alt={props.title || "product"}
          className="w-4/5 max-sm:h-[100%] object-contain cursor-pointer"
          onClick={goToDetail}
        />

        <div className="hidden gap-3 justify-center inset-x-auto absolute bottom-[20px] items-center group-hover:flex transition-all">
          <div className={icon_style} onClick={handleAddToCart}>
            <ShoppingCartOutlined />
          </div>
          <div className={icon_style}>
            <HeartFilled className="text-red-500" />
          </div>
          <div className={icon_style} onClick={goToDetail}>
            <SearchOutlined />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-[#3D3D3D] text-[16px] font-[500] pt-[10px] pb-[2px]">
          {props.title}
        </h3>

        <div className="flex items-center gap-3">
          <h1 className="text-[#46A358] text-[18px] font-bold">
            {props.price}$
          </h1>

          {props.discount && (
            <h1 className="font-[300] text-[#A5A5A5] line-through">
              {props.discount_price}$
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
