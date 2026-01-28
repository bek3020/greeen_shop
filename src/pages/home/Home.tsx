import BannerImg from "../../assets/img/01 1.png";
import Dashboder from "../../components/dashbord";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

const Home = () => {
  return (
    <section className="max-w-[1205px] mx-auto px-4 mt-6">
      <Header />

      <div className="bg-[#F5F5F5]/80 rounded-3xl mt-5 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between p-5 sm:p-10 md:p-16 lg:p-20 min-h-[450px]">
          <div className="w-full max-w-xl text-center md:text-left order-2 md:order-1 mt-6 md:mt-0">
            <p className="text-gray-600 uppercase tracking-[2px] text-[10px] md:text-xs font-semibold mb-2">
              Welcome to Greenshop
            </p>

            <h1 className="text-[26px] xs:text-[32px] sm:text-5xl md:text-6xl lg:text-[70px] font-black text-[#3D3D3D] leading-[1.1] mb-3 md:mb-5">
              LET&apos;S MAKE A <br />
              <span className="text-[#46A358]">BETTER PLANET</span>
            </h1>

            <p className="text-gray-500 text-[11px] sm:text-[13px] md:text-base leading-relaxed mb-6 md:mb-10 max-w-[450px] mx-auto md:mx-0">
              We are an online plant shop offering a wide range of cheap and
              trendy plants. Use our plants to create an unique Urban Jungle.
              Order your favorite plants!
            </p>

            <button className="bg-[#46A358] text-white px-6 py-2.5 md:px-8 md:py-3 rounded-md font-bold hover:bg-[#3b8a4a] transition-all uppercase text-[12px] md:text-sm active:scale-95 shadow-md">
              Shop Now
            </button>
          </div>

          <div className="w-full md:w-auto relative order-1 md:order-2 flex justify-center items-center">
            <img
              src={BannerImg}
              alt="Small Plant"
              className="absolute bottom-4 -left-6 w-16 md:w-32 opacity-80 hidden sm:block"
            />

            <img
              src={BannerImg}
              alt="Main Plant"
              className="w-[180px] xs:w-[230px] sm:w-[320px] md:w-[400px] lg:w-[460px] object-contain relative z-10"
            />
          </div>
        </div>
      </div>
      <Dashboder />
      <Footer />
    </section>
  );
};

export default Home;
