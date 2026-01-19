import { Form, Input } from "antd";
import { FcGoogle } from "react-icons/fc"; // Google uchun rangli ikonka
import { FaFacebook } from "react-icons/fa"; // Facebook uchun ikonka
import { useLoginMutation } from "../../../../hooks/useQuery/useQueryAction";

const Login = () => {
  const input_style = "h-[40px] mt-2 border-[#46A358] hover:border-[#46A358] focus:border-[#46A358]";
  const icon_style = "border h-[40px] rounded-md flex items-center justify-center gap-3 mb-4 cursor-pointer hover:bg-gray-50 transition-all";

  const onAuthGoogleItem = () => {
    console.log("Google orqali kirish bosildi");
    };
    const {mutate ,isPending} = useLoginMutation()
    const login = (e: { email: string, password: string }) => {
    
mutate(e)
}
  return (
    <div className="w-4/5 m-auto">
      <div className="mt-5">
        <p className="text-[#3D3D3D] mb-4">Enter your email and password to login</p>

        <Form onFinish={login} layout="vertical">
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email",
              },
            ]}
          >
            <Input
              className={input_style}
              type="email"
              placeholder="almamun_uxui@outlook.com"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password 
              className={input_style} 
              placeholder="Your password" 
            />
          </Form.Item>

          <p className="text-right text-sm text-[#46A358] cursor-pointer mt-1">
            Forgot Password?
          </p>

          <button 
            type="submit"
            className="bg-[#46A358] w-full mt-4 text-white h-[40px] rounded-md font-medium hover:bg-[#3d8b4b] transition-colors"
          >
            {isPending? "loading....": "Login"}
          </button>
        </Form>

        <div className="flex items-center justify-center mt-5 mb-5 gap-4">
          <div className="w-[30%] h-[1px] bg-[#EAEAEA]"></div>
          <p className="w-[40%] text-[#3D3D3D] text-[13px] text-center whitespace-nowrap">
            Or login with
          </p>
          <div className="w-[30%] h-[1px] bg-[#EAEAEA]"></div>
        </div>

        <div className="flex flex-col">
          <div onClick={onAuthGoogleItem} className={icon_style}>
            <FcGoogle size={20} />
            <span className="text-[13px] text-[#3D3D3D] font-medium">Login with Google</span>
          </div>

          <div className={icon_style}>
            <FaFacebook size={20} className="text-[#1877F2]" />
            <span className="text-[13px] text-[#3D3D3D] font-medium">Login with Facebook</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;