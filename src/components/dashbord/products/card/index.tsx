import { useNavigate } from "react-router-dom";
import {
  HeartFilled,
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
// 1. Redux hooklari va action'ni import qiling
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import { addToCart } from "../../../../redux/shop-slice";
import { addToWishlist, removeFromWishlist } from "../../../../redux/user-slice";
import { message } from "antd";

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
  // 2. Dispatch'ni chaqirib olamiz
  const dispatch = useReduxDispatch();
  const { wishlist } = useReduxSelector((state) => state.user);

  const isInWishlist = wishlist.includes(String(props.id));

  const icon_style =
    "bg-[#FFFFFF] w-[35px] h-[35px] flex rounded-lg justify-center items-center cursor-pointer text-[20px] hover:bg-[#46A358] hover:text-white transition-all";

  const handleAddToCart = (e: React.MouseEvent) => {
    // Rasmga o'tib ketmasligi uchun stopPropagation qilamiz
    e.stopPropagation();

    // 3. Redux kutayotgan formatda obyekt yaratamiz va yuboramiz
    const productForCart = {
      id: String(props.id), // ID ni stringga o'tkazamiz
      title: props.title,
      price: Number(props.price),
      main_image: props.main_image,
      count: 1,
    };

    dispatch(addToCart(productForCart));
    message.success(`${props.title} savatchaga qo'shildi!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isInWishlist) {
      dispatch(removeFromWishlist(String(props.id)));
      message.success(`${props.title} sevimlilardan o'chirildi`);
    } else {
      dispatch(addToWishlist(String(props.id)));
      message.success(`${props.title} sevimlilarga qo'shildi`);
    }
  };

  const goToDetail = () => {
    navigate(`/product/${props.id}`);
  };

  return (
    <div className="relative group cursor-pointer" onClick={goToDetail}>
      <div className="h-[300px] bg-[#f5f5f5] flex justify-center items-center relative rounded-lg overflow-hidden">
        <img
          src={props.main_image || "/placeholder.svg"}
          alt={props.title || "product"}
          className="w-4/5 max-sm:h-[100%] object-contain"
        />

        <div className="hidden gap-3 justify-center inset-x-auto absolute bottom-[20px] items-center group-hover:flex transition-all">
          {/* Savatcha tugmasi */}
          <div className={icon_style} onClick={handleAddToCart}>
            <ShoppingCartOutlined />
          </div>
          {/* Wishlist tugmasi */}
          <div className={icon_style} onClick={handleWishlist}>
            {isInWishlist ? (
              <HeartFilled className="text-red-500" />
            ) : (
              <HeartOutlined />
            )}
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
