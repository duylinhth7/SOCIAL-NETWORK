import { message } from "antd";
import { ResetPasswordApi } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
    const [messageApi, contextHolder] = message.useMessage();
    const nav = useNavigate();
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const password = e.target.password.value;
            const confirmPassword = e.target.confirmPassword.value;
            const res = await ResetPasswordApi(password, confirmPassword);
            if (res.modifiedCount === 1) {
                messageApi.open({
                    type: "success",
                    content: "Cập nhật mật khẩu thành công!"
                });
                setTimeout(() => {
                    nav("/");
                }, 2000)
            } else {
                messageApi.open({
                    type: "error",
                    content: "Thất bại!"
                });
                return;
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            {contextHolder}
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-2xl shadow-md w-96"
                >
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Đặt lại mật khẩu
                    </h2>

                    {/* Mật khẩu mới */}
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Mật khẩu mới*</label>
                        <input
                            minLength={8}
                            type="password"
                            name="password"
                            placeholder="Nhập mật khẩu mới"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* Xác nhận mật khẩu */}
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2">
                            Xác nhận mật khẩu mới*
                        </label>
                        <input
                            minLength={8}
                            type="password"
                            name="confirmPassword"
                            placeholder="Nhập lại mật khẩu"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Đặt lại mật khẩu
                    </button>
                </form>
            </div>
        </>
    );
}

export default ResetPassword;
