import React, { useContext, useState } from "react";
import { Form, Input, Button, message, Upload, Avatar, Space } from "antd";
import { UserAddOutlined, MailOutlined, LockOutlined, UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"
import { getInfoUser, register } from "../api/auth.api";
import AuthContext from "../contexts/AuthContext";

function Register() {
  const [form] = Form.useForm();
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const { setUser } = useContext(AuthContext)
  const nav = useNavigate();

  const handleUpload = (file) => {
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setAvatarPreview(e.target.result);
    reader.readAsDataURL(file);
    return false; // ngăn tự động upload
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
  };

  const onFinish = async (values) => {
    const data = values;
    if (avatarFile) {
      data["avatar"] = avatarFile
    };
    const res = await register(data);
    if (res.access_token) {
      localStorage.setItem("access_token", res.access_token);
      const user = await getInfoUser(res.access_token);
      setUser(user);
      messageApi.open({
        type: 'success',
        content: 'Đăng ký thành công!',
      });
      setTimeout(() => {
        nav("/")
      }, 2000)
    } else {
      messageApi.open({
        type: 'error',
        content: `${res.message}`,
      });
    }


    // TODO: Gọi API register, kèm avatar
    // message.success("Đăng ký thành công!");
    // form.resetFields();
    // handleRemoveAvatar();
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-500 flex items-center justify-center gap-2">
            <UserAddOutlined /> Đăng ký
          </h2>

          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="fullname"
              label="Họ và tên"
              rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
            >
              <Input placeholder="Nhập tên" />
            </Form.Item>

            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Mật khẩu"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Xác nhận mật khẩu"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng xác nhận mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Xác nhận mật khẩu" />
            </Form.Item>

            {/* Upload Avatar */}
            <Form.Item label="Avatar (tùy chọn)">
              <Upload beforeUpload={handleUpload} showUploadList={false} accept="image/*">
                <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
              </Upload>
              {avatarPreview && (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <Avatar src={avatarPreview} size={100} />
                  <Button
                    type="default"
                    icon={<DeleteOutlined />}
                    onClick={handleRemoveAvatar}
                  >
                    Xóa ảnh
                  </Button>
                </div>
              )}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div></>
  );
}

export default Register;
