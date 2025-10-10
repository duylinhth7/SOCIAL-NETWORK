import { useContext } from "react";
import { HeartOutlined, HomeFilled, LoginOutlined, LogoutOutlined, MessageFilled, SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { message } from "antd";

function NavigationSidebar() {
  const { user, setUser } = useContext(AuthContext);
  const [messageApi, contextHolder] = message.useMessage();
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    messageApi.open({
      type: 'success',
      content: 'Đăng xuất thành công!',
    });
    setUser(null);
  };

  return (
    <>
      {contextHolder}
      <div className="px-5 h-screen bg-gray-100 shadow-md">
        <h3 className="font-bold text-2xl text-blue-400 my-5">Social Network</h3>

        <div className="my-10 flex items-center gap-2 cursor-pointer" onClick={() => nav("/")}>
          <div className="text-xl"><HomeFilled /></div>
          <span className="font-normal text-lg">Trang chủ</span>
        </div>

        <div className="my-10 flex items-center gap-2 cursor-pointer">
          <div className="text-xl"><SearchOutlined /></div>
          <span className="font-normal text-lg">Tìm kiếm</span>
        </div>

        <div className="my-10 flex items-center gap-2 cursor-pointer">
          <div className="text-xl"><HeartOutlined /></div>
          <span className="font-normal text-lg">Thông báo</span>
        </div>

        <div className="my-10 flex items-center gap-2 cursor-pointer">
          <div className="text-xl"><MessageFilled /></div>
          <span className="font-normal text-lg">Tin nhắn</span>
        </div>

        {user ? (
          <>
            <div className="my-10 flex items-center gap-2 cursor-pointer">
              <div className="w-7 h-7">
                <img
                  className="rounded-full object-cover w-full h-full"
                  src="https://media-cdn-v2.laodong.vn/storage/newsportal/2025/2/4/1458351/Ronaldo-1.jpg"
                  alt="avatar"
                />
              </div>
              <span className="font-normal text-lg">Trang cá nhân</span>
            </div>
            <div
              className="my-10 flex items-center gap-2 cursor-pointer"
              onClick={handleLogout}
            >
              <div className="text-xl"><LogoutOutlined /></div>
              <span className="font-normal text-lg">Đăng xuất</span>
            </div>
          </>
        ) : (
          <>
            <div
              className="my-10 flex items-center gap-2 cursor-pointer"
              onClick={() => nav("/login")}
            >
              <div className="text-xl"><LoginOutlined /></div>
              <span className="font-normal text-lg">Đăng nhập</span>
            </div>
            
            <div
              className="my-10 flex items-center gap-2 cursor-pointer"
              onClick={() => nav("/register")}
            >
              <div className="text-xl"><UserAddOutlined /></div>
              <span className="font-normal text-lg">Đăng ký</span>
            </div>
          </>
        )}
      </div></>
  );
}

export default NavigationSidebar;
