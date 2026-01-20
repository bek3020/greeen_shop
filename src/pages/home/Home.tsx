import { Swiper, SwiperSlide } from 'swiper/react';

import '../../../node_modules/swiper/swiper.css';
import '../../../node_modules/swiper/modules/pagination.css';

import BannerImg from "../../assets/img/01 1.png";
import Header from '../../components/Header/Header';

const Banner = () => {
  return (
    <section className="px-4 md:px-10 mt-6">
      <Header />

      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
        className="rounded-3xl overflow-hidden"
      >
        {[1, 2, 3].map((item) => (
          <SwiperSlide key={item}>
            <div className="bg-[#F5F5F5] flex flex-col md:flex-row items-center justify-between p-8 md:p-20">
              
              <div className="max-w-xl text-center md:text-left">
                <p className="text-gray-600 uppercase tracking-[3px] text-xs font-medium mb-3">
                  Welcome to Greenshop
                </p>

                <h1 className="text-4xl md:text-7xl font-black text-[#3D3D3D] leading-[1.1] mb-5">
                  LET&apos;S MAKE A <br />
                  <span className="text-[#46A358]">BETTER PLANET</span>
                </h1>

                <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10 max-w-sm">
                  We are an online plant shop offering a wide range of cheap and trendy plants.
                </p>

                <button className="bg-[#46A358] text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition-all uppercase text-sm">
                  Shop Now
                </button>
              </div>

              <div className="relative mt-10 md:mt-0">
                <img
                  src={BannerImg}
                  alt="Plant"
                  className="w-[300px] md:w-[450px] object-contain"
                />
                <img
                  src={BannerImg}
                  alt="Small Plant"
                  className="absolute bottom-5 left-0 w-20 md:w-32 opacity-80 hidden md:block"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
