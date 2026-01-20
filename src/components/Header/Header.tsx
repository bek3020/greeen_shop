import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Drawer, Button } from 'antd'
import Logo from '../../assets/img/logo.png'
import { useReduxDispatch } from '../../hooks/useRedux'
import { setAuthorizationModalVisiblity } from '../../redux/modol-store'

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const showDrawer = () => setDrawerOpen(true)
  const closeDrawer = () => setDrawerOpen(false)
const dispatch = useReduxDispatch()
  return (
    <div className="py-5 border-b border-[#00800043]  mb-10">
      <div className="max-w-[1205px] mx-auto px-4">
        <div className="flex items-center justify-between">
          <img src={Logo} alt="Logo" className="h-8" />

          <nav className="hidden sm:flex gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'text-green-500 font-bold' : 'text-gray-700'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? 'text-green-500 font-bold' : 'text-gray-700'
              }
            >
              Blog
            </NavLink>
          </nav>

          <div className="hidden sm:flex items-center gap-4">
            <button className="hover:text-green-500 transition-colors duration-300">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button className="hover:text-green-500 transition-colors duration-300">
              <i className="fa-solid fa-cart-shopping"></i>
            </button>
            <button onClick={()=>dispatch(setAuthorizationModalVisiblity())} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md w-[100px] h-[35px] relative">
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              <span className="font-semibold">Login</span>
            </button>
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
          bodyStyle={{ paddingTop: 0 }}
        >
          <nav className="flex flex-col gap-3">
            <NavLink
              to="/"
              onClick={closeDrawer}
              className={({ isActive }) =>
                isActive ? 'text-green-500 font-bold block' : 'text-gray-700 block'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/blog"
              onClick={closeDrawer}
              className={({ isActive }) =>
                isActive ? 'text-green-500 font-bold block' : 'text-gray-700 block'
              }
            >
              Blog
            </NavLink>

            <div className="flex items-center gap-4 mt-6">
              <button className="cursor-pointer hover:text-green-500  transition-colors duration-300">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
              <button className="cursor-pointer hover:text-green-500  transition-colors duration-300">
                <i className="fa-solid fa-cart-shopping"></i>
              </button>
              <button className="flex items-center gap-2 cursor-pointer bg-green-600  text-white px-4 py-2 rounded-md w-[100px] h-[35px] relative">
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <span className="font-semibold">Login</span>
              </button>
            </div>
          </nav>
        </Drawer>
      </div>
    </div>
  )
}

export default Header
