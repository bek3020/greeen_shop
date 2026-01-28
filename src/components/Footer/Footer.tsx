import Footer1 from "../../assets/img/footer1.png";
import Footer2 from "../../assets/img/footer2.png";
import Footer3 from "../../assets/img/footer1.png";
import Footer4 from "../../assets/img/pyl.png";
const Footer = () => {
  return (
    <footer className="bg-[#FBFBFB] font-sans text-[rgb(61,61,61)] mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-[#46A358]/20 pb-8">
          <div className="flex flex-col items-start space-y-3 px-2">
            <div className="relative">
              <div className="absolute inset-0 bg-[#46A358] opacity-10 rounded-full"></div>
              <img
                src={Footer1}
                alt="Care"
                className="w-16 h-16 relative z-10 p-2"
              />
            </div>
            <h3 className="font-bold text-lg">Garden Care</h3>
            <p className="text-sm text-[#727272] leading-6">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-3 border-l-0 md:border-l border-[#46A358]/20 md:pl-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#46A358] opacity-10 rounded-full"></div>
              <img
                src={Footer2}
                alt="Renovation"
                className="w-16 h-16 relative z-10 p-2"
              />
            </div>
            <h3 className="font-bold text-lg">Plant Renovation</h3>
            <p className="text-sm text-[#727272] leading-6">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-3 border-l-0 md:border-l border-[#46A358]/20 md:pl-8">
            <div className="relative">
              <div className="absolute inset-0 bg-[#46A358] opacity-10 rounded-full"></div>
              <img
                src={Footer3}
                alt="Watering"
                className="w-16 h-16 relative z-10 p-2"
              />
            </div>
            <h3 className="font-bold text-lg">Watering Garden</h3>
            <p className="text-sm text-[#727272] leading-6">
              We are an online plant shop offering a wide range of cheap and
              trendy plants.
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-lg leading-tight">
              Would you like to join newsletters?
            </h3>
            <div className="flex shadow-sm">
              <input
                type="email"
                placeholder="enter your email address..."
                className="flex-1 border-none rounded-l-md px-4 py-3 bg-white focus:ring-1 focus:ring-[#46A358] outline-none text-sm"
              />
              <button className="bg-[#46A358] text-white px-6 py-3 rounded-r-md font-bold hover:bg-[#3d8e4c] transition-all">
                Join
              </button>
            </div>
            <p className="text-xs text-[#727272] leading-5">
              We usually post offers and challenges in newsletter. We’re your
              online houseplant destination.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-[#46A358]/20 bg-[#FBFBFB]">
          <div>
            <h4 className="font-bold mb-4 text-[#3D3D3D]">My Account</h4>
            <ul className="space-y-3 text-sm text-[#3D3D3D]">
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  About
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  Specials
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#3D3D3D]">Help & Guide</h4>
            <ul className="space-y-3 text-sm text-[#3D3D3D]">
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  How to Buy
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  Shipping & Delivery
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  Product Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#3D3D3D]">Categories</h4>
            <ul className="space-y-3 text-sm text-[#3D3D3D]">
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  House Plants
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  Potter Plants
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  Seeds
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#46A358] transition">
                  Small Plants
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-[#3D3D3D]">Social Media</h4>
            <div className="flex space-x-3 mb-6">
              {["facebook", "instagram", "twitter", "linkedin", "union"].map(
                (social) => (
                  <a
                    key={social}
                    href="/"
                    className="border border-[#46A358]/20 p-2 rounded-md hover:bg-[#46A358]/10 transition"
                  >
                    <img
                      src={`/assets/icons/${social}.svg`}
                      alt={social}
                      className="w-4 h-4"
                    />
                  </a>
                ),
              )}
            </div>
            <h4 className="font-bold mb-4 text-[#3D3D3D]">We accept</h4>
            <div className="flex items-center space-x-3">
              <img src={Footer4} alt="Payments" className="h-6" />
            </div>
          </div>
        </div>

        <div className="py-6 text-center text-sm text-[#3D3D3D]">
          <p>© {new Date().getFullYear()} GreenShop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
