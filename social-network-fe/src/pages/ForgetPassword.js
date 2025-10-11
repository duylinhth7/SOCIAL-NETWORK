import { message } from "antd";
import { ForgetPasswordApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const nav = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const email = event.target.email.value;
            const res = await ForgetPasswordApi(email);
            if (res.statusCode == 401) {
                messageApi.open({
                    type: "error",
                    content: `${res.message}`
                });
                return;
            } else {
                messageApi.open({
                    type: "success",
                    content: `${res.message}`
                });
                nav(`/forget-password/otp/${email}`);
            }
        } catch (error) {

        }
    }
    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                        Quên mật khẩu
                    </h2>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Nhập email của bạn
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Gửi yêu cầu đặt lại mật khẩu
                    </button>
                </form>
            </div>
        </>
    );
}
