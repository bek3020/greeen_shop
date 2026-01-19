import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";


import 'swiper/css';
import 'swiper/css/pagination';

import Header from "../../components/Header/Header";
import Bannrer from "../../assets/img/01 1.png";

const banners = [
  {
    subtitle: "WELCOME TO GREENSHOP",
    title: "LET'S MAKE A BETTER ",
    titleGreen: "PLANET",
    desc: "We are an online plant shop offering a wide range of cheap and trendy plants. Use our plants to create an unique Urban Jungle. Order your favorite plant!",
    image: Bannrer,
  },
  {
    subtitle: "WELCOME TO GREENSHOP",
    title: "FRESHEN UP YOUR ",
    titleGreen: "HOME",
    desc: "Beautiful indoor plants that breathe life into your living space. Explore our new collection of summer succulents.",
    image: Bannrer,
  }
];

const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      <Header />

      <div className="max-w-[1200px] mx-auto px-4 mt-4">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="mySwiper bg-[#F5F5F5]/50 rounded-3xl" 
        >
          {banners.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-12 min-h-[450px]">
                
                {/* Chap tomon */}
                <div className="flex-1 text-left z-10">
                  <p className="text-[#3D3D3D] text-sm font-medium tracking-widest mb-2 uppercase">
                    {item.subtitle}
                  </p>
                  <h1 className="text-4xl md:text-7xl font-black text-[#3D3D3D] leading-tight uppercase">
                    {item.title} 
                    <span className="text-[#46A358]">{item.titleGreen}</span>
                  </h1>
                  <p className="text-[#727272] text-sm md:text-base mt-4 mb-8 max-w-[500px] leading-relaxed">
                    {item.desc}
                  </p>

                  <button className="bg-[#46A358] hover:bg-[#3b8a4a] text-white font-bold py-3 px-8 rounded-lg uppercase transition-all duration-300">
                    SHOP NOW
                  </button>
                </div>

                {/* O'ng tomon */}
                <div className="flex-1 flex justify-end relative mt-8 md:mt-0">
                  <img 
                    src={item.image} 
                    alt="Plant" 
                    className="w-[300px] md:w-[450px] object-contain z-10"
                  />
                  {/* Dekorativ kichik rasm */}
                  <img 
                    src={item.image} 
                    alt="Decoration" 
                    className="w-[100px] absolute bottom-5 left-0 opacity-30 hidden md:block"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CSS xatosi shu yerda edi, uni to'g'ri formatga o'tkazdik */}
      <style>{`
        .swiper-pagination-bullet-active {
          background: #46A358 !important;
          width: 12px;
          border-radius: 5px;
        }
        .swiper-pagination {
          bottom: 25px !important;
        }
      `}</style>
    </div>
  );
};

export default Home;  