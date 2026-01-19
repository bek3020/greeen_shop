import { Form, Input, Button } from "antd";
import { useRegisterMutation } from "../../../../hooks/useQuery/useQueryAction/index";

const Register = () => {
  const input_style = "h-[40px] mt-2 border-[#46A358] hover:border-[#46A358] focus:border-[#46A358]";
  const { mutate, isPending } = useRegisterMutation();

  const onRegister = (values: { email: string; password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      console.log("Parollar mos emas!");
      return;
    }
    mutate({ email: values.email, password: values.password });
  };

  return (
    <div className="w-4/5 m-auto mt-5">
      <p className="text-[#3D3D3D] mb-4">Create your account</p>
      <Form onFinish={onRegister} layout="vertical">
        <Form.Item
          name="email"
          label="Emaii"
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
          <Input.Password className={input_style} placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password className={input_style} placeholder="Confirm password" />
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
    </div>
  );
};

export default Register;
