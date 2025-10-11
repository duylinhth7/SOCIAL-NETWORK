import { useState } from "react";
import { useParams } from "react-router-dom";
import { OtpPasswordApi } from "../api/auth.api";
import { message } from "antd";

function OtpPassword() {
    const [messageApi, contextHolder] = message.useMessage();
    const params = useParams();
    const email = params.email;

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const otp = e.target.otp.value;
            const res = await OtpPasswordApi(email, otp);
            if(res.access_token){
                localStorage.setItem("access_token", res.access_token);
                messageApi.open({
                    type: "success",
                    content: "Xác nhận OTP thành công!"
                });
                window.location.href = ("/reset-password")
            } else {
                messageApi.open({
                    type: "error",
                    content: `${res.message}`
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
                        Xác nhận OTP
                    </h2>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-red-500 font-bold mb-2">Email*</label>
                        <input
                            type="email"
                            value={email}
                            readOnly
                            placeholder="Nhập email của bạn"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    {/* OTP */}
                    <div className="mb-4">
                        <label className="block text-red-500 font-bold mb-2">Mã OTP*</label>
                        <input
                            type="text"
                            name="otp"
                            maxLength={5}
                            placeholder="Nhập mã OTP"
                            required
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Xác nhận
                    </button>
                </form>
            </div>
        </>
    );
}

export default OtpPassword;
