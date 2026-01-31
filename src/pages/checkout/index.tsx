import { useReduxSelector, useReduxDispatch } from "../../hooks/useRedux";
import type { RootState } from "../../redux/store";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Form, Input, Select, Radio, message } from "antd";
import { setOrderModalVisibility } from "../../redux/modol-store";
import { addOrder } from "../../redux/user-slice";
import SuccessModal from "./SuccessModal";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const [form] = Form.useForm(); 

  const { data: cartData, coupon } = useReduxSelector(
    (state: RootState) => state.cart,
  );
  const { user } = useReduxSelector(
    (state: RootState) => state.user,
  );

  // Hisob-kitoblar
  const subtotal = cartData.reduce((acc, item) => acc + item.price * item.count, 0);
  const shipping = 16.00;
  const discountAmount = (subtotal * coupon) / 100;
  const total = subtotal - discountAmount + shipping;

  // Agar foydalanuvchi tizimga kirmagan bo'lsa yoki savat bo'sh bo'lsa, ortga qaytarish
  useEffect(() => {
    if (!user) {
      message.warning("Checkout sahifasiga o'tish uchun avval tizimga kiring");
      navigate("/");
    }
    if (cartData.length === 0) {
      navigate("/");
    }
  }, [user, cartData, navigate]);

  const onFinish = (values: any) => {
    // Buyurtma obyektini yaratish
    const newOrder = {
      _id: `order_${Date.now()}`,
      total_price: total,
      status: "processing",
      created_at: new Date().toISOString(),
      products: cartData.map(item => ({
        product_id: item.id,
        title: item.title,
        price: item.price,
        count: item.count,
        main_image: item.main_image
      })),
      billing_info: values
    };

    // Redux'ga buyurtmani qo'shish
    dispatch(addOrder(newOrder));
    
    console.log("Order submitted:", newOrder);
    dispatch(setOrderModalVisibility());
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <SuccessModal />

      <div className="w-[90%] max-w-[1400px] mx-auto py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* CHAP TOMON: Form (Billing Address) */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-[#3D3D3D] mb-1">
              Billing Address
            </h2>
            <div className="h-[2px] w-full bg-gray-100 mt-2"></div>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6"
            initialValues={{
              firstName: user?.name || "",
              email: user?.email || "",
            }}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Ism kiriting!" }]}
            >
              <Input
                className="h-10 rounded-lg"
                placeholder="Enter first name"
              />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Familiya kiriting!" }]}
            >
              <Input
                className="h-10 rounded-lg"
                placeholder="Enter last name"
              />
            </Form.Item>

            <Form.Item
              label="Country / Region"
              name="country"
              rules={[{ required: true, message: "Davlatni tanlang!" }]}
            >
              <Select className="h-10" placeholder="Select a country / region">
                <Select.Option value="uzbekistan">Uzbekistan</Select.Option>
                <Select.Option value="usa">USA</Select.Option>
                <Select.Option value="russia">Russia</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Town / City"
              name="city"
              rules={[{ required: true }]}
            >
              <Input className="h-10 rounded-lg" />
            </Form.Item>

            <Form.Item
              label="Street Address"
              name="street"
              className="md:col-span-2"
              rules={[{ required: true }]}
            >
              <Input
                placeholder="House number and street name"
                className="h-10 rounded-lg"
              />
            </Form.Item>

            <Form.Item
              label="Email address"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input className="h-10 rounded-lg" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[{ required: true }]}
            >
              <Input addonBefore="+998" className="h-10 rounded-lg w-full" />
            </Form.Item>

            <Form.Item
              label="Order notes (optional)"
              name="notes"
              className="md:col-span-2"
            >
              <Input.TextArea rows={4} className="rounded-lg" />
            </Form.Item>
          </Form>
        </div>

        {/* O'NG TOMON: Order Summary */}
        <div className="lg:col-span-1 border-l lg:pl-10">
          <h2 className="text-xl font-bold text-[#3D3D3D] mb-6">Your Order</h2>

          <div className="space-y-4 max-h-[350px] overflow-y-auto mb-6 pr-2">
            <div className="flex justify-between border-b pb-2 text-sm font-medium">
              <span>Products</span>
              <span>Subtotal</span>
            </div>
            {cartData.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg hover:shadow-sm transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.main_image}
                    className="w-10 h-10 object-contain"
                    alt={item.title}
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-xs truncate w-[100px]">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-normal">
                      SKU: {item.id.slice(0, 10)}
                    </p>
                  </div>
                  <span className="text-gray-400 text-xs">
                    (x{item.count})
                  </span>
                </div>
                <span className="text-[#46A358] font-bold text-sm">
                  ${(item.price * item.count).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <p className="text-right text-[#46A358] text-xs mb-6 cursor-pointer hover:underline">
            Have a coupon code? <span className="font-bold">Click here</span>
          </p>

          {/* Order Summary */}
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              {coupon > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Coupon Discount ({coupon}%)</span>
                  <span className="text-red-500 font-medium">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span className="font-medium">${shipping.toFixed(2)}</span>
              </div>
              
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-[#46A358]">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t pt-5">
            <h3 className="font-bold text-base mb-4 text-[#3D3D3D]">
              Payment Method
            </h3>
            <Radio.Group defaultValue={1} className="w-full space-y-3">
              <div className="border border-gray-100 p-3 rounded-lg hover:border-[#46A358] transition-all">
                <Radio value={1} className="font-medium text-[#3D3D3D]">
                  Cash on delivery
                </Radio>
              </div>
              <div className="border border-gray-100 p-3 rounded-lg hover:border-[#46A358] transition-all flex items-center gap-2">
                <Radio value={2} className="font-medium text-[#3D3D3D]">
                  Bank Transfer
                </Radio>
              </div>
            </Radio.Group>

            <button
              onClick={() => form.submit()}
              className="w-full bg-[#46A358] text-white py-3.5 rounded-lg font-bold mt-10 hover:bg-[#3d8f4d] shadow-lg shadow-green-500/20 active:scale-[0.98] transition-all"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
