import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Drawer, Button, Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import Logo from "../../assets/img/logo.png";
import { useReduxDispatch, useReduxSelector } from "../../hooks/useRedux";
import { setAuthorizationModalVisibility } from "../../redux/modol-store";
import { clearUser } from "../../redux/user-slice";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useReduxDispatch();
  const { user } = useReduxSelector((state) => state.user);

  const showDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'settings',
      label: 'Settings',
      icon: <SettingOutlined />,
      onClick: () => navigate('/profile'),
    },
    {
      key: 'divider',
      type: 'divider' as const,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <div className="py-5 border-b border-[#00800043] mb-10">
      <div className="max-w-[1205px] mx-auto px-4">
        <div className="flex items-center justify-between">
          <a href="/">
            <img src={Logo} alt="Logo" className="h-8" />
          </a>

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
            <button className="hover:text-green-500 transition-colors duration-300">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <NavLink to="/shop">
              <button className="hover:text-green-500 transition-colors duration-300">
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </NavLink>
            
            {user ? (
              <Dropdown
                menu={{ items: userMenuItems }}
                placement="bottomRight"
                trigger={['click']}
              >
                <div className="cursor-pointer hover:bg-gray-50 px-3 py-2 rounded-lg transition-colors">
                  <span className="font-medium text-gray-700">
                    {user.name || 'User'}
                  </span>
                </div>
              </Dropdown>
            ) : (
              <button
                onClick={() => dispatch(setAuthorizationModalVisibility())}
                className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md w-[100px] h-[35px] relative"
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
              aria-label="Toggle menu"
              icon={<i className="fa-solid fa-bars"></i>}
            />
          </div>
        </div>

        <Drawer
          title={<img src={Logo} alt="Logo" className="h-8" />}
          placement="left"
          closable={true}
          onClose={closeDrawer}
          open={drawerOpen}
          styles={{ body: { paddingTop: 0 } }}
        >
          <nav className="flex flex-col gap-3">
            <NavLink
              to="/"
              onClick={closeDrawer}
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-bold block"
                  : "text-gray-700 block"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/blog"
              onClick={closeDrawer}
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-bold block"
                  : "text-gray-700 block"
              }
            >
              Blog
            </NavLink>

            <div className="flex items-center gap-4 mt-6">
              <button className="cursor-pointer hover:text-green-500 transition-colors duration-300">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <NavLink to="/shop">
                <button className="cursor-pointer hover:text-green-500 transition-colors duration-300">
                  <i className="fa-solid fa-cart-shopping"></i>
                </button>
              </NavLink>
              
              {user ? (
                <div className="flex flex-col gap-3 mt-4 w-full">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Avatar 
                      size={40} 
                      icon={<UserOutlined />}
                      src={user.profile_photo}
                      className="bg-[#46A358]"
                    />
                    <div>
                      <p className="font-medium text-gray-700">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      navigate('/profile');
                      closeDrawer();
                    }}
                    className="flex items-center gap-2 text-gray-700 hover:text-green-500 transition-colors p-2"
                  >
                    <UserOutlined />
                    Profile
                  </button>
                  
                  <button
                    onClick={() => {
                      handleLogout();
                      closeDrawer();
                    }}
                    className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors p-2"
                  >
                    <LogoutOutlined />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    dispatch(setAuthorizationModalVisibility());
                    closeDrawer();
                  }}
                  className="flex items-center gap-2 cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md w-[100px] h-[35px] relative"
                >
                  <i className="fa-solid fa-arrow-right-to-bracket"></i>
                  <span className="font-semibold">Login</span>
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