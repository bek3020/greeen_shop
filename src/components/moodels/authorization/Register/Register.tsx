import { Form, Input, Button, message } from "antd";
import { useRegisterMutation } from "../../../../hooks/useQuery/useQueryAction/index";
import { useReduxDispatch } from "../../../../hooks/useRedux";
import { setUser } from "../../../../redux/user-slice";
import { setAuthorizationModalVisibility } from "../../../../redux/modol-store";
import { FcGoogle } from "react-icons/fc";
import type { AuthType } from "../../../../@types";

interface RegisterResponse {
  data?: {
    user: AuthType;
    token: string;
  };
  user?: AuthType;
  token?: string;
}

const Register = () => {
  const dispatch = useReduxDispatch();
  const input_style =
    "h-[40px] mt-2 border-[#46A358] hover:border-[#46A358] focus:border-[#46A358]";
  const { mutate, isPending } = useRegisterMutation();
  const icon_style =
    "border h-[40px] rounded-md flex items-center justify-center gap-3 mb-4 cursor-pointer hover:bg-gray-50 transition-all";

  const onAuthGoogleItem = () => {
    console.log("Google orqali kirish bosildi");
  };

  const onRegister = (values: {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    if (values.password !== values.confirmPassword) {
      message.error("Parollar mos emas!");
      return;
    }
    
    mutate({
      name: values.name,
      surname: values.surname,
      email: values.email,
      password: values.password,
    }, {
      onSuccess: (res: RegisterResponse) => {
        const userData = res?.data?.user || res?.user;
        const token = res?.data?.token || res?.token;

        if (!userData) {
          message.error("Ro'yxatdan o'tishda xatolik!");
          return;
        }

        dispatch(
          setUser({
            user: userData,
            token,
          }),
        );

        dispatch(setAuthorizationModalVisibility());
        message.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
      },
      onError: (err: any) => {
        const errorMsg = err?.response?.data?.message || "Ro'yxatdan o'tishda xatolik!";
        message.error(errorMsg);
      },
    });
  };

  return (
    <div className="w-4/5 m-auto mt-5">
      <p className="text-[#3D3D3D] mb-4">Create your account</p>
      <Form onFinish={onRegister} layout="vertical">
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input className={input_style} placeholder="Your name" />
        </Form.Item>

        <Form.Item
          name="surname"
          label="Surname"
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <Input className={input_style} placeholder="Your surname" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input className={input_style} placeholder="your_email@example.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input your password!" }]}
          hasFeedback
        >
          <Input.Password
            className={input_style}
            placeholder="Enter password"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            className={input_style}
            placeholder="Confirm password"
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="bg-[#46A358] w-full h-[40px] rounded-md font-medium hover:bg-[#3d8b4b] transition-colors"
          loading={isPending}
        >
          Register
        </Button>
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
          <span className="text-[13px] text-[#3D3D3D] font-medium">
            Login with Google
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
