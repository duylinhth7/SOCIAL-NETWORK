import { useEffect, useState } from "react";
import { HeartOutlined, HomeFilled, HomeOutlined, LoginOutlined, LogoutOutlined, MessageFilled, SearchOutlined } from "@ant-design/icons"

function NavigationSidebar() {
    const [login, setLogin] = useState(1);
    return (
        <>
            <div className="px-5 h-screen bg-gray-100 shadow-sm">
                <h3 className="font-bold text-2xl text-blue-400 my-5">Social Network</h3>
                <div className="my-10 flex items-center gap-2">
                    <div className="text-xl"><HomeFilled /></div>
                    <span className="font-normal text-lg">Trang chủ</span>
                </div>
                <div className="my-10 flex items-center gap-2">
                    <div className="text-xl"><SearchOutlined /></div>
                    <span className="font-normal text-lg">Tìm kiếm</span>
                </div>
                <div className="my-10 flex items-center gap-2">
                    <div className="text-xl"><HeartOutlined /></div>
                    <span className="font-normal text-lg">Thông báo</span>
                </div>
                <div className="my-10 flex items-center gap-2">
                    <div className="text-xl"><MessageFilled /></div>
                    <span className="font-normal text-lg">Tin nhắn</span>
                </div>
                {
                    login ? (<>
                        <div className="my-10 flex items-center gap-2">
                            <div className="w-7 h-7">
                                <img  className="rounded-full object-cover w-full h-full" src="https://media-cdn-v2.laodong.vn/storage/newsportal/2025/2/4/1458351/Ronaldo-1.jpg" />
                            </div>
                            <span className="font-normal text-lg">Trang cá nhân</span>
                        </div>
                        <div className="my-10 flex items-center gap-2">
                            <div className="text-xl"><LogoutOutlined /></div>
                            <span className="font-normal text-lg">Đăng xuất</span>
                        </div>
                    </>) :
                        (<>
                            <div className="my-10 flex items-center gap-2">
                                <div className="text-xl"><LoginOutlined /></div>
                                <span className="font-normal text-lg">Đăng nhập</span>
                            </div>
                        </>)
                }
            </div>
        </>
    )
}
export default NavigationSidebar;