import { Modal } from "antd"
import { useReduxDispatch, useReduxSelector } from "../../../hooks/useRedux"
import { setAuthorizationModalVisiblity } from "../../../redux/modol-store"
import { useState } from "react"
import Login from "./Login/Login"
import Register from "./Register/Register"


const AuthorizationModal = () => {
    const { authorizationModalVisiblity } = useReduxSelector(state => state.modalSlice)
    const dispatch = useReduxDispatch()
    const [state, setState] = useState<string>('login')
  return (
      <Modal open={authorizationModalVisiblity} footer={false}  onCancel={()=> dispatch(setAuthorizationModalVisiblity())}>
          <div className="mt-10">
              <div className="flex items-center justify-center gap-4">
                  <div onClick={()=> setState('login')} className={`text-gray-400 text-2xl hover:text-gray-600 cursor-pointer ${state === "login" && "text-green-600"}`}>Login</div>
                  <div className="bg-[#3d3d3d] w-1 h-5"></div>
                  <div onClick={()=> setState('register')} className={`text-gray-400 text-2xl hover:text-gray-600 cursor-pointer ${state === "register" && "text-green-600"}`}>Regiser</div>
              </div>
              {state ==="login"? <Login/>:<Register/>}
         </div>
      </Modal>
  )
}

export default AuthorizationModal