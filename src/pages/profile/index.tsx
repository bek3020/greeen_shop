import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { Empty } from "antd";
import Feature from "../../components/features";
import {
  FaUser,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaHeart,
  FaClock,
  FaSignOutAlt,
} from "react-icons/fa";
import { Upload } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MyProducts from "./MyProducts";
import Wishlist from "./Wishlist";

interface AuthType {
  name: string;
  surname?: string;
  email: string;
  phone_number?: string;
  profile_photo?: string;
  wishlist: string[];
}

const Profile = () => {
  const navigate = useNavigate();

  // User ma'lumotlarini olish
  const [user] = useState<AuthType | null>(() => {
    const userCookie = Cookies.get("user");
    if (!userCookie) return null;
    try {
      return JSON.parse(userCookie) as AuthType;
    } catch {
      return null;
    }
  });

  const [activeTab, setActiveTab] = useState("profile");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    navigate("/");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />

      <div className="w-[90%] mx-auto mt-10 flex flex-col md:flex-row gap-8 mb-10 flex-grow">
        {/* SIDEBAR */}
        <aside className="w-full md:w-[280px] bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-bold text-[#3D3D3D] border-b pb-4 mb-4">
            My Account
          </h2>
          <nav>
            <ul className="flex flex-col gap-2">
              {[
                { key: "profile", icon: <FaUser />, label: "Account Details" },
                { key: "orders", icon: <FaBoxOpen />, label: "My Products" },
                { key: "address", icon: <FaMapMarkerAlt />, label: "Address" },
                { key: "wishlist", icon: <FaHeart />, label: "Wishlist" },
                { key: "trackOrder", icon: <FaClock />, label: "Track Order" },
              ].map(({ key, icon, label }) => (
                <li key={key}>
                  <button
                    onClick={() => setActiveTab(key)}
                    className={clsx(
                      "w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 font-medium",
                      activeTab === key
                        ? "bg-[#46A358]/10 text-[#46A358] border-l-4 border-[#46A358]"
                        : "text-[#727272] hover:bg-gray-50 hover:text-[#46A358]",
                    )}
                  >
                    {icon}
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button
            onClick={handleLogout}
            className="mt-10 flex items-center text-red-500 font-bold hover:bg-red-50 w-full px-4 py-3 rounded-lg transition-all"
          >
            <FaSignOutAlt className="mr-3" /> Log out
          </button>
        </aside>

        {/* CONTENT SECTION */}
        <section className="flex-1 bg-white p-8 rounded-lg shadow-sm border min-h-[500px]">
          {/* 1. Account Details */}
          {activeTab === "profile" && (
            <div>
              <h3 className="text-xl font-bold text-[#3D3D3D] mb-6">
                Personal Information
              </h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-[#3D3D3D] mb-2">
                    * First name
                  </label>
                  <input
                    type="text"
                    defaultValue={user?.name || ""}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#46A358] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3D3D3D] mb-2">
                    * Last name
                  </label>
                  <input
                    type="text"
                    placeholder="Surname"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#46A358] transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3D3D3D] mb-2">
                    * Email address
                  </label>
                  <input
                    type="email"
                    readOnly
                    value={user?.email || ""}
                    className="w-full border border-gray-200 bg-gray-50 text-gray-500 rounded-lg px-4 py-2.5 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#3D3D3D] mb-2">
                    * Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="+998"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-[#46A358] transition-all"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-[#3D3D3D] mb-2">
                    Profile photo
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id="photo"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="photo"
                      className="flex items-center gap-2 px-4 py-2 border border-[#46A358] text-[#46A358] rounded-lg cursor-pointer hover:bg-[#46A358] hover:text-white transition-all"
                    >
                      <Upload size={18} /> Upload
                    </label>
                    <span className="text-sm text-gray-400">
                      {fileName || "No file chosen"}
                    </span>
                  </div>
                </div>

                <div className="md:col-span-2 mt-4">
                  <button
                    type="button"
                    className="px-8 py-3 bg-[#46A358] text-white font-bold rounded-lg hover:bg-[#3b8a4a] transition-all shadow-md active:scale-95"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 2. My Products (Orders) */}
          {activeTab === "orders" && <MyProducts />}

          {/* 3. Wishlist */}
          {activeTab === "wishlist" && <Wishlist />}

          {/* Boshqalar */}
          {(activeTab === "address" || activeTab === "trackOrder") && (
            <div className="py-20 text-center">
              <Empty
                description={`${activeTab.toUpperCase()} bo'limi ustida ish olib borilmoqda...`}
              />
            </div>
          )}
        </section>
      </div>

      <Feature />
      <Footer />
    </div>
  );
};

export default Profile;
