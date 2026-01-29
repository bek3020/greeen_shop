import React from "react";
import { Form, Input, Button, message } from "antd";
import { FcGoogle } from "react-icons/fc";

import { useLoginMutation } from "../../../../hooks/useQuery/useQueryAction";
import { useReduxDispatch } from "../../../../hooks/useRedux";
import { setUser } from "../../../../redux/user-slice";
import { setAuthorizationModalVisiblity } from "../../../../redux/modol-store";
import type { AuthType } from "../../../../@types";
import axios from "axios";
interface LoginValues {
  email: string;
  password: string;
}

interface LoginResponse {
  data?: {
    user: AuthType;
    token: string;
  };
  user?: AuthType;
  token?: string;
}

interface ErrorResponse {
  message: string;
}

const Login: React.FC = () => {
  const dispatch = useReduxDispatch();
  const { mutate, isPending } = useLoginMutation();

  const inputStyle =
    "h-[42px] rounded-md border-[#46A358] hover:border-[#46A358] focus:border-[#46A358]";

  const onFinish = (values: LoginValues) => {
    mutate(values, {
      onSuccess: (res: LoginResponse) => {
        const userData = res?.data?.user || res?.user;
        const token = res?.data?.token || res?.token;

        if (!userData) {
          message.error("Foydalanuvchi topilmadi!");
          return;
        }

        dispatch(
          setUser({
            user: userData,
            token,
          }),
        );

        dispatch(setAuthorizationModalVisiblity());
        message.success("Xush kelibsiz!");
      },
      onError: (err: Error) => {
        if (axios.isAxiosError<ErrorResponse>(err)) {
          const errorMsg = err.response?.data?.message || "Xatolik yuz berdi!";
          message.error(errorMsg);
        } else {
          message.error("Xatolik yuz berdi!");
        }
      },
    });
  };

  return (
    <div className="w-full max-w-[400px] mx-auto pt-6">
      <p className="text-[#3D3D3D] text-[14px] mb-6 text-center">
        Tizimga kirish uchun ma'lumotlaringizni kiriting
      </p>

      <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email majburiy!" },
            { type: "email", message: "Email formati xato!" },
          ]}
        >
          <Input className={inputStyle} placeholder="example@mail.com" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Parol"
          rules={[{ required: true, message: "Parol majburiy!" }]}
        >
          <Input.Password className={inputStyle} placeholder="********" />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          className="w-full h-[45px] bg-[#46A358] border-none font-bold mt-4"
        >
          {isPending ? "Kirilmoqda..." : "Login"}
        </Button>
      </Form>

      <div className="flex items-center my-6">
        <div className="flex-1 h-[1px] bg-[#EAEAEA]" />
        <span className="px-3 text-[#3D3D3D] text-[12px]">Yoki</span>
        <div className="flex-1 h-[1px] bg-[#EAEAEA]" />
      </div>

      <button className="flex items-center justify-center gap-3 w-full h-[40px] border rounded-md hover:bg-gray-50 transition-all">
        <FcGoogle size={20} />
        <span className="text-[#727272] text-[13px]">Google orqali kirish</span>
      </button>
    </div>
  );
};

export default Login;
