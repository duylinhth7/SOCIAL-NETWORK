import { useContext, useState } from "react";
import { UserOutlined, LockOutlined, EyeOutlined } from "@ant-design/icons";
import { getInfoUser, login } from "../api/auth.api";
import { message } from 'antd';
import {useNavigate} from "react-router-dom"
import AuthContext from "../contexts/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
     const { setUser } = useContext(AuthContext)
    const nav = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Email:", email, "Password:", password);// TODO: gọi API đăng nhập ở đây
        const res = await login(email, password);
        if (res.statusCode === 401) {
            messageApi.open({
                type: 'error',
                content: 'Đăng nhập không thành công!',
            });
        } else {
            const {access_token} = res;
            const user = await getInfoUser(access_token);
            setUser(user);
            localStorage.setItem("access_token", access_token);
            messageApi.open({
                type: 'success',
                content: 'Đăng nhập thành công!',
            });
            setTimeout(() => {
                nav("/")
            }, 1000)
        }
    };

    return (
        <>
            {contextHolder}
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
                        Chào mừng trở lại!
                    </h2>

                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Email */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-bold">Email của bạn</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                <UserOutlined className="text-gray-400 text-lg mr-2" />
                                <input
                                    type="email"
                                    placeholder="Nhập email của bạn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full outline-none text-gray-700"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-gray-700 mb-2 font-bold">Mật khẩu</label>
                            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                                <LockOutlined className="text-gray-400 text-lg mr-2" />
                                <input
                                    type={showPass ? "text" : "password"}
                                    placeholder="Nhập mật khẩu của bạn"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full outline-none text-gray-700"
                                    required
                                />
                                <EyeOutlined className="text-gray-400 text-lg ml-2 cursor-pointer" onClick={() => setShowPass(!showPass)} />
                            </div>
                        </div>


                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200"
                        >
                            Đăng nhập
                        </button>
                    </form>

                    {/* Forgot password */}
                    <div className="text-center mt-4">
                        <a href="#" className="text-blue-500 hover:underline text-sm">
                            Quên mật khẩu?
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
