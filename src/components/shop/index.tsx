import Feature from "../features";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ShopProducts from "./products";
import ShopTotal from "./total";

const ShopComponent = () => {
  return (
    <section>
      <Header />

      <div className="w-[90%] m-auto grid grid-cols-[3fr_1fr] gap-5 py-5">
        <ShopProducts />
        <ShopTotal />
      </div>
      <Feature />
      <Footer />
    </section>
  );
};

export default ShopComponent;
