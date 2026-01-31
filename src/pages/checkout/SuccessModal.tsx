import { useNavigate } from "react-router-dom";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { setOrderModalVisibility } from "../../redux/modol-store";
import { clearCart } from "../../redux/shop-slice";
import type { RootState } from "../../redux/store";

const SuccessModal = () => {
  const dispatch = useReduxDispatch();
  const navigate = useNavigate();

  const { orderModalVisibility } = useReduxSelector(
    (state: RootState) => state.modal,
  );

  const { data: cartData, coupon } = useReduxSelector(
    (state: RootState) => state.cart,
  );

  if (!orderModalVisibility) return null;

  const subtotal = cartData.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );
  const shipping = 16;
  const discountAmount = (subtotal * coupon) / 100;
  const total = subtotal - discountAmount + shipping;

  const handleFinish = () => {
    dispatch(setOrderModalVisibility());
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[3000] flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[580px] rounded-lg shadow-2xl relative overflow-hidden">
        <div className="bg-[#46A358]/5 py-10 border-b-[8px] border-[#46A358] text-center relative">
          <button
            onClick={() => dispatch(setOrderModalVisibility())}
            className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
          >
            <CloseOutlined className="text-lg" />
          </button>
          <div className="w-16 h-16 bg-[#46A358]/10 rounded-full flex justify-center items-center mx-auto mb-3">
            <CheckOutlined className="text-3xl text-[#46A358]" />
          </div>
          <p className="text-[#727272]">Your order has been received</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-10 py-6 border-b bg-[#fbfbfb]">
          <div>
            <p className="text-[12px] text-gray-400">Order Number</p>
            <b className="text-[14px] text-[#727272]">19586687</b>
          </div>
          <div>
            <p className="text-[12px] text-gray-400">Date</p>
            <b className="text-[14px] text-[#727272]">
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </b>
          </div>
          <div>
            <p className="text-[12px] text-gray-400">Total</p>
            <b className="text-[14px] text-[#727272]">${total.toFixed(2)}</b>
          </div>
          <div>
            <p className="text-[12px] text-gray-400">Payment Method</p>
            <b className="text-[14px] text-[#727272]">Cash on delivery</b>
          </div>
        </div>

        {/* Buyurtma detallari */}
        <div className="px-10 py-5">
          <h3 className="font-bold mb-4">Order Details</h3>
          <div className="max-h-[150px] overflow-y-auto space-y-4 mb-6 pr-2 custom-scrollbar">
            {cartData.map((Item) => (
              <div
                key={Item.id}
                className="flex justify-between items-center text-sm"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={Item.main_image}
                    className="w-10 h-10 object-contain"
                    alt=""
                  />
                  <span>
                    {Item.title}{" "}
                    <span className="text-gray-400">(x{Item.count})</span>
                  </span>
                </div>
                <span className="font-bold text-[#727272]">
                  ${(Item.price * Item.count).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
            
            {coupon > 0 && (
              <div className="flex justify-between text-sm">
                <span>Coupon Discount ({coupon}%)</span>
                <span className="font-bold text-red-500">-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="font-bold">${shipping.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-lg">
              <span className="font-bold">Total</span>
              <span className="font-bold text-[#46A358]">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            onClick={handleFinish}
            className="w-full bg-[#46A358] text-white py-3 rounded-lg font-bold mt-8 hover:bg-[#3d8f4d] transition-colors"
          >
            Track your order
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
