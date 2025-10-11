const api = "http://localhost:3000/posts";
const token = localStorage.getItem("access_token");

//get post
export const getPostsApi = async (page, limit, type) => {
    try {
        const response = await fetch(api + `/feed?page=${page}&limit=${limit}&type=${type}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        return await response.json();
    } catch (error) {
        return error;
    }
}