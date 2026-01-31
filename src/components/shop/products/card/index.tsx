import { DeleteFilled } from "@ant-design/icons";
import type { FC } from "react";
import { useReduxDispatch } from "../../../../hooks/useRedux";
import {
  increment,
  decrement,
  deleteData,
  type Product,
} from "../../../../redux/shop-slice";
import { Popconfirm, message } from "antd"; // O'chirishdan oldin so'rash uchun

const Card: FC<Product> = (props) => {
  const dispatch = useReduxDispatch();
  const productId = String(props.id); // ID har doim string ekanligiga ishonch hosil qilamiz

  const handleDelete = () => {
    dispatch(deleteData(productId));
    message.success("Mahsulot savatchadan o'chirildi");
  };

  return (
    <div className="my-5 bg-[#fbfbfb] p-4 flex items-center justify-between rounded-lg hover:shadow-sm transition-shadow">
      {/* Mahsulot rasmi va nomi */}
      <div className="flex items-center gap-4 w-[40%]">
        <div className="w-[70px] h-[70px] bg-white rounded overflow-hidden border">
          <img
            src={props.main_image}
            alt={props.title}
            className="w-full h-full object-contain"
          />
        </div>
        <h3 className="text-[16px] font-medium text-[#3D3D3D] line-clamp-1">
          {props.title}
        </h3>
      </div>

      {/* Narxi */}
      <div className="text-[#727272] w-[15%] text-center font-medium">
        ${props.price.toFixed(2)}
      </div>

      {/* Miqdorni boshqarish */}
      <div className="flex items-center justify-center gap-3 w-[20%]">
        <button
          onClick={() => dispatch(decrement(productId))}
          disabled={props.count <= 1}
          className={`w-8 h-8 rounded-full text-white font-bold transition-all active:scale-90 ${
            props.count <= 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#46A358] hover:bg-[#3b8a4a]"
          }`}
        >
          -
        </button>
        <span className="font-bold text-[16px] min-w-[20px] text-center">
          {props.count}
        </span>
        <button
          onClick={() => dispatch(increment(productId))}
          className="w-8 h-8 bg-[#46A358] hover:bg-[#3b8a4a] rounded-full text-white font-bold transition-all active:scale-90"
        >
          +
        </button>
      </div>

      {/* Jami narx */}
      <div className="text-[#46A358] font-bold w-[15%] text-center text-[16px]">
        ${(props.price * props.count).toFixed(2)}
      </div>

      {/* O'chirish tugmasi */}
      <div className="w-[5%] text-right">
        <Popconfirm
          title="Mahsulotni o'chirasizmi?"
          onConfirm={handleDelete}
          okText="Ha"
          cancelText="Yo'q"
        >
          <DeleteFilled className="text-gray-400 hover:text-red-500 cursor-pointer text-[18px] transition-colors" />
        </Popconfirm>
      </div>
    </div>
  );
};

export default Card;
