import Catigoriy from "./catigoriy";
import Products from "./products";

const Dashboder = () => {
  return (
    <div className="mt-5 flex flex-col md:grid md:grid-cols-[1fr_3fr] gap-5 px-4 md:px-0">
      <aside className="w-full md:w-auto">
        <div className="sticky top-0 z-10 bg-white py-2 md:static">
          <Catigoriy />
        </div>
      </aside>
      <main className="w-full">
        <Products />
      </main>
    </div>
  );
};

export default Dashboder;
