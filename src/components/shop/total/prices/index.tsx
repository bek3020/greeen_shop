import { Link, useNavigate } from "react-router-dom";
import { Form, message } from "antd";
import { useRef, useState } from "react";
import { Loader } from "lucide-react";
import { useReduxDispatch, useReduxSelector } from "../../../../hooks/useRedux";
import type { RootState } from "../../../../redux/store";
import { setAuthorizationModalVisibility } from "../../../../redux/modol-store";
import { setDiscount } from "../../../../redux/shop-slice";

const ShopTotal = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);

  // Login bo'lganini tekshirish uchun user state'ni olamiz
  const { user } = useReduxSelector((state: RootState) => state.user);
  const { data, coupon } = useReduxSelector((state: RootState) => state.cart);

  // Hisob-kitoblar
  const subtotal = data.reduce((acc, item) => acc + item.price * item.count, 0);
  const shipping = subtotal > 0 ? 16.00 : 0;
  const discountAmount = (subtotal * coupon) / 100;
  const total = subtotal - discountAmount + shipping;

  const handleCheckout = () => {
    if (data.length === 0) {
      return message.warning("Savatchangiz bo'sh!");
    }

    if (user) {
      navigate("/checkout");
    } else {
      message.info("Avval tizimga kiring!");
      dispatch(setAuthorizationModalVisibility());
    }
  };

  const getCoupon = () => {
    const value = inputRef.current?.value?.trim();
    if (!value) return;
    
    setIsPending(true);
    // Oddiy coupon kodlari
    setTimeout(() => {
      if (value.toLowerCase() === "save10") {
        dispatch(setDiscount(10));
        message.success("10% chegirma qo'llanildi!");
      } else if (value.toLowerCase() === "save20") {
        dispatch(setDiscount(20));
        message.success("20% chegirma qo'llanildi!");
      } else {
        message.error("Noto'g'ri coupon kodi!");
      }
      setIsPending(false);
      if (inputRef.current) inputRef.current.value = "";
    }, 1000);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border h-fit">
      <h3 className="pb-5 text-[#3D3D3D] border-b border-[#46A358] font-bold text-[18px] mb-6">
        Cart Totals
      </h3>

      {/* Coupon Input */}
      <Form onFinish={getCoupon} className="flex h-[40px] mb-6">
        <input
          ref={inputRef}
          placeholder="Coupon code"
          className="border w-4/5 border-[#46A358] px-3 rounded-l-lg outline-none text-sm"
        />
        <button 
          type="submit"
          className="bg-[#46A358] text-white w-1/5 rounded-r-lg font-medium hover:bg-[#3b8a4a] transition-colors flex items-center justify-center"
        >
          {isPending ? (
            <Loader className="animate-spin h-4 w-4" />
          ) : (
            "Apply"
          )}
        </button>
      </Form>

      {/* Price Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-[#3D3D3D]">Subtotal</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        
        {coupon > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-[#3D3D3D]">Coupon Discount ({coupon}%)</span>
            <span className="text-red-500 font-medium">-${discountAmount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between text-sm">
          <span className="text-[#3D3D3D]">Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <span className="text-[#3D3D3D] font-bold text-lg">Total</span>
            <span className="text-[#46A358] font-bold text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className="w-full bg-[#46A358] text-white h-[45px] rounded-md font-bold hover:bg-[#3b8a4a] transition-colors shadow-md active:scale-95"
      >
        Proceed To Checkout
      </button>

      <Link to="/" className="block text-center mt-4 text-[#46A358] hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
};

export default ShopTotal;


