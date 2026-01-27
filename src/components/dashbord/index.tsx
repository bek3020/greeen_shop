import Catigoriy from "./catigoriy";
import Products from "./products";

const Dashboder = () => {
  return (
    <div className="mt-5 grid grid-cols-[1fr_3fr] gap-5">
      <Catigoriy />
      <Products />
    </div>
  );
};

export default Dashboder;
