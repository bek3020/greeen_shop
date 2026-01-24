import Filler_r from '../../assets/img/image 12.png'
import Card1 from '../../assets/img/card1.png'
import Card2 from '../../assets/img/card2.png'
import Card3 from '../../assets/img/card3.png'
import Card4 from '../../assets/img/card4.png'
import Card5 from '../../assets/img/card5.png'
import Card6 from '../../assets/img/card6.png'
import Card7 from '../../assets/img/card7.png'
import Card8 from '../../assets/img/card8.png'
import Card9 from '../../assets/img/card9.png'

const Catigoriy = () => {
  return (
    <div className="max-w-[1205px] mx-auto flex items-start justify-between gap-8 py-10 px-4">
      <div className="hidden lg:block left w-[310px] bg-[#FBFBFB] p-5 shrink-0">
        <div className="flex flex-col">
          <h3 className="text-[18px] font-bold text-[#3D3D3D] mb-4">Categories</h3>
          <div className="flex flex-col gap-4 pl-3 mb-10">
            <div className="flex justify-between text-[#46A358] font-bold cursor-pointer">
              <span>House Plants</span> <span>(33)</span>
            </div>
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Potter Plants</span> <span>(12)</span>
            </div>
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Seeds</span> <span>(65)</span>
            </div>
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Small Plants</span> <span>(39)</span>
            </div>
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Big Plants</span> <span>(23)</span>
            </div>
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Succulents</span> <span>(17)</span>
            </div>
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Trerrariums</span> <span>(19)</span>
            </div>
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Gardening</span> <span>(13)</span>
            </div>
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Accessories</span> <span>(18)</span>
            </div>
          </div>

          <h3 className="text-[18px] font-bold text-[#3D3D3D] mb-4">Price Range</h3>
          <div className="px-3 mb-10">
            <input
              type="range"
              min="39"
              max="1230"
              defaultValue="460"
              className="w-full h-1 bg-[#46A358] rounded-lg appearance-none cursor-pointer accent-[#46A358]"
            />
            <p className="mt-4 text-[#3D3D3D]">
              Price: <span className="text-[#46A358] font-bold">$39 - $1230</span>
            </p>
            <button className="mt-4 bg-[#46A358] text-white py-2 px-6 rounded-md font-bold hover:bg-[#3d8b4a] transition-all">
              Filter
            </button>
          </div>

          <h3 className="text-[18px] font-bold text-[#3D3D3D] mb-4">Size</h3>
          <div className="flex flex-col gap-4 pl-3 mb-10">
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Small</span> <span>(119)</span>
            </div>
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Medium</span> <span>(86)</span>
            </div>
            <div className="flex justify-between text-[#3D3D3D] hover:text-[#46A358] cursor-pointer">
              <span>Large</span> <span>(78)</span>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#46A3581A] to-[#46A3584D] p-6 text-center rounded-sm">
            <h2 className="text-[#46A358] text-3xl font-black italic">SUPER SALE</h2>
            <p className="text-[#3D3D3D] font-bold">UP TO 75% OFF</p>
            <img
              src={Filler_r}
              alt="sale"
              className="mt-4 w-full object-contain h-48"
            />
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="right flex-1 w-full">
        {/* Header Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex gap-4 sm:gap-8 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            <span className="text-[#46A358] font-bold border-b-2 border-[#46A358] pb-1 cursor-pointer whitespace-nowrap">
              All Plants
            </span>
            <span className="text-[#3D3D3D] hover:text-[#46A358] cursor-pointer whitespace-nowrap">
              New Arrivals
            </span>
            <span className="text-[#3D3D3D] hover:text-[#46A358] cursor-pointer whitespace-nowrap">
              Sale
            </span>
          </div>
          <div className="text-[#3D3D3D] text-sm sm:text-base cursor-pointer">
            Short by: <span className="font-semibold">Default sorting <i className="fa-solid fa-chevron-down ml-1 text-xs"></i></span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          
          {/* Card Component Template (Manual Repeat for 9 cards) */}
          <div className="group cursor-pointer">
            <div className="bg-[#FBFBFB] h-[300px] flex items-center justify-center relative border-t-2 border-transparent hover:border-[#46A358] transition-all duration-300">
              <img src={Card1} alt="Barberton Daisy" className="w-4/5 object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358] transition-colors">
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358] transition-colors">
                  <i className="fa-regular fa-heart"></i>
                </button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358] transition-colors">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
            <h4 className="mt-3 text-[#3D3D3D]">Barberton Daisy</h4>
            <p className="text-[#46A358] font-bold">$119.00</p>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-[#FBFBFB] h-[300px] flex items-center justify-center relative border-t-2 border-transparent hover:border-[#46A358] transition-all">
              <img src={Card2} alt="Angel Wing Begonia" className="w-4/5 object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-cart-shopping"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-regular fa-heart"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
            <h4 className="mt-3 text-[#3D3D3D]">Angel Wing Begonia</h4>
            <p className="text-[#46A358] font-bold">$169.00</p>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-[#FBFBFB] h-[300px] flex items-center justify-center relative border-t-2 border-transparent hover:border-[#46A358] transition-all">
              <span className="absolute top-0 left-0 bg-[#46A358] text-white px-3 py-1 text-sm font-medium">13% OFF</span>
              <img src={Card3} alt="African Violet" className="w-4/5 object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-cart-shopping"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-regular fa-heart"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
            <h4 className="mt-3 text-[#3D3D3D]">African Violet</h4>
            <div className="flex gap-3">
              <p className="text-[#46A358] font-bold">$199.00</p>
              <p className="text-[#A5A5A5] line-through">$229.00</p>
            </div>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-[#FBFBFB] h-[300px] flex items-center justify-center relative border-t-2 border-transparent hover:border-[#46A358] transition-all">
              <img src={Card4} alt="Beach Spider Lily" className="w-4/5 object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-cart-shopping"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-regular fa-heart"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
            <h4 className="mt-3 text-[#3D3D3D]">Beach Spider Lily</h4>
            <p className="text-[#46A358] font-bold">$129.00</p>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-[#FBFBFB] h-[300px] flex items-center justify-center relative border-t-2 border-transparent hover:border-[#46A358] transition-all">
              <img src={Card5} alt="Blushing Bromeliad" className="w-4/5 object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-cart-shopping"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-regular fa-heart"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
            <h4 className="mt-3 text-[#3D3D3D]">Blushing Bromeliad</h4>
            <p className="text-[#46A358] font-bold">$139.00</p>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-[#FBFBFB] h-[300px] flex items-center justify-center relative border-t-2 border-transparent hover:border-[#46A358] transition-all">
              <img src={Card6} alt="Aluminum Plant" className="w-4/5 object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-cart-shopping"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-regular fa-heart"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
            <h4 className="mt-3 text-[#3D3D3D]">Aluminum Plant</h4>
            <p className="text-[#46A358] font-bold">$179.00</p>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-[#FBFBFB] h-[300px] flex items-center justify-center relative border-t-2 border-transparent hover:border-[#46A358] transition-all">
              <img src={Card7} alt="Bird's Nest Fern" className="w-4/5 object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-cart-shopping"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-regular fa-heart"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
            <h4 className="mt-3 text-[#3D3D3D]">Bird's Nest Fern</h4>
            <p className="text-[#46A358] font-bold">$99.00</p>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-[#FBFBFB] h-[300px] flex items-center justify-center relative border-t-2 border-transparent hover:border-[#46A358] transition-all">
              <img src={Card8} alt="Broadleaf Lady Palm" className="w-4/5 object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-cart-shopping"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-regular fa-heart"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
            <h4 className="mt-3 text-[#3D3D3D]">Broadleaf Lady Palm</h4>
            <p className="text-[#46A358] font-bold">$59.00</p>
          </div>

          <div className="group cursor-pointer">
            <div className="bg-[#FBFBFB] h-[300px] flex items-center justify-center relative border-t-2 border-transparent hover:border-[#46A358] transition-all">
              <img src={Card9} alt="Chinese Evergreen" className="w-4/5 object-contain" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-cart-shopping"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-regular fa-heart"></i></button>
                <button className="bg-white w-9 h-9 flex items-center justify-center rounded-lg shadow-md hover:text-[#46A358]"><i className="fa-solid fa-magnifying-glass"></i></button>
              </div>
            </div>
            <h4 className="mt-3 text-[#3D3D3D]">Chinese Evergreen</h4>
            <p className="text-[#46A358] font-bold">$39.00</p>
          </div>

        </div>

        {/* Pagination */}
        <div className="flex justify-end gap-2 mt-20">
          <div className="w-9 h-9 flex items-center justify-center border border-[#E5E5E5] rounded bg-[#46A358] text-white cursor-pointer">1</div>
          <div className="w-9 h-9 flex items-center justify-center border border-[#E5E5E5] rounded hover:border-[#46A358] cursor-pointer text-[#3D3D3D]">2</div>
          <div className="w-9 h-9 flex items-center justify-center border border-[#E5E5E5] rounded hover:border-[#46A358] cursor-pointer text-[#3D3D3D]">3</div>
          <div className="w-9 h-9 flex items-center justify-center border border-[#E5E5E5] rounded hover:border-[#46A358] cursor-pointer text-[#3D3D3D]">4</div>
          <div className="w-9 h-9 flex items-center justify-center border border-[#E5E5E5] rounded hover:border-[#46A358] cursor-pointer text-[#3D3D3D]">
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catigoriy;