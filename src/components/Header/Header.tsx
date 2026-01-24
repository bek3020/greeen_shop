import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Drawer, Button } from "antd";
import Logo from "../../assets/img/logo.png";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { setAuthorizationModalVisiblity } from "../../redux/modol-store";
import Cookies from "js-cookie";
import { getUser } from "../../redux/user-slice";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dispatch = useReduxDispatch();

 
  const { user } = useReduxSelector((state) => state.user);

  const showDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const handleLogout = () => {
    Cookies.remove("user");
    dispatch(getUser(null));
  };

  return (
    <div className="py-5 border-b border-[#00800043] mb-10">
      <div className="max-w-[1205px] mx-auto px-4">
        <div className="flex items-center justify-between">
          <img src={Logo} alt="Logo" className="h-8" />
          <nav className="hidden sm:flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "text-gray-700"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "text-green-500 font-bold" : "text-gray-700"
              }
            >
              Blog
            </NavLink>
          </nav>

          <div className="hidden sm:flex items-center gap-4">
            <button className="hover:text-green-500">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>

            <button className="hover:text-green-500">
              <i className="fa-solid fa-cart-shopping"></i>
            </button>

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-green-600 font-semibold">
                  {user.first_name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-500 hover:underline"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => dispatch(setAuthorizationModalVisiblity())}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md h-[35px]"
              >
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <span className="font-semibold">Login</span>
              </button>
            )}
          </div>

          <div className="sm:hidden">
            <Button
              className="text-2xl text-gray-700"
              onClick={showDrawer}
              type="text"
              icon={<i className="fa-solid fa-bars"></i>}
            />
          </div>
        </div>

        <Drawer
          title={<img src={Logo} alt="Logo" className="h-8" />}
          placement="left"
          onClose={closeDrawer}
          open={drawerOpen}
        >
          <nav className="flex flex-col gap-3">
            <NavLink to="/" onClick={closeDrawer}>
              Home
            </NavLink>
            <NavLink to="/blog" onClick={closeDrawer}>
              Blog
            </NavLink>

            <div className="flex items-center gap-4 mt-6">
              <button>
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <button>
                <i className="fa-solid fa-cart-shopping"></i>
              </button>

              {user ? (
                <div className="flex flex-col gap-2">
                  <span className="text-green-600 font-semibold">
                    {user.first_name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 text-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => dispatch(setAuthorizationModalVisiblity())}
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Login
                </button>
              )}
            </div>
          </nav>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
