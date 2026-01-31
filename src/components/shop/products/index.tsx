import { Empty } from "antd";
import { useReduxSelector } from "../../../hooks/useRedux";
import Card from "./card";

const ShopProducts = () => {
  // store.ts da 'cart' deb nomlangan:
  const { data } = useReduxSelector((state) => state.cart);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between pb-3 border-b border-[#46A358] mb-6">
        <h2 className="w-[40%] font-medium">Products</h2>
        <h2 className="w-[15%] text-center font-medium">Price</h2>
        <h2 className="w-[20%] text-center font-medium">Quantity</h2>
        <h2 className="w-[15%] text-center font-medium">Total</h2>
        <h2 className="w-[10%] text-center font-medium">Action</h2>
      </div>

      {data.length === 0 ? (
        <Empty description="Savatchangiz bo'sh" className="py-20" />
      ) : (
        data.map((item) => <Card key={item.id} {...item} />)
      )}
    </div>
  );
};

export default ShopProducts;
