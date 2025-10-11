import { useEffect, useState } from "react";
import { getPostsApi } from "../api/posts.api";
import { CommentOutlined, DashOutlined, EllipsisOutlined, HeartOutlined, SendOutlined } from '@ant-design/icons';
import PostImages from "./PostImages";

function Feed() {
    const [data, setDate] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 10;
    const fetchApi = async () => {
        const data = await getPostsApi(page, limit, "feed");
        console.log(data)
        setDate(data);
    };
    useEffect(() => {
        fetchApi();
    }, [page]);

    //Comment
    const handleSubmitComment = async (post_id, e) => {
        e.preventDefault();
        const value = e.target.comment.value;
        console.log(post_id);
        console.log(value)
    }
    //End comment
    return (
        <>
            <div className="max-w-xl">
                {
                    data.length > 0 ?
                        (<>
                            {
                                data.map((item, index) => (
                                    <div className="text-center relative max-w-[450px] mb-10" key={index}>
                                        <div className="flex items-center gap-3 mb-3">
                                            <img className="max-w-8 max-h-8 rounded-full" src={item.user_id.avatar ? item.user_id.avatar : "https://bla.edu.vn/wp-content/uploads/2025/09/avatar-fb.jpg"} />
                                            <div className="text-nowrap font-medium">{item.user_id.fullname}</div>
                                            <div className="">  {new Date(item.createdAt).toLocaleDateString("vi-VN", {
                                                timeZone: "Asia/Ho_Chi_Minh",
                                            })}</div>
                                            <div className="absolute right-1"><EllipsisOutlined /></div>
                                        </div>
                                        <div>
                                            {
                                                item.images.length > 0 ?
                                                    (<>
                                                        <PostImages images={item.images} />
                                                    </>)
                                                    :
                                                    (<></>)
                                            }
                                        </div>
                                        <div className="flex gap-4 py-3 text-2xl">
                                            <span><HeartOutlined /></span>
                                            <span><CommentOutlined /></span>
                                            <span><SendOutlined /></span>
                                        </div>
                                        <div className="flex gap-3">
                                            <b>{item.user_id.fullname}</b>
                                            <p>{item.content}</p>
                                        </div>
                                        <form className="py-3 flex" onSubmit={(e) => {handleSubmitComment(item._id, e)}}>
                                            <input  required name="comment" placeholder="Nhập bình luận..." className="w-full border-none outline-none" />
                                            <button className="font-bold">
                                                Gửi
                                            </button>
                                        </form>
                                        <div className=" py-4 border-b border-gray-300"></div>
                                    </div>
                                ))
                            }
                        </>)
                        :
                        (<></>)
                }
            </div>
        </>
    )
}
export default Feed;