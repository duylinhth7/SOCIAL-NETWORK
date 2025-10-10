const api = "http://localhost:3000/auth";

//Login
export const login = async (email, password) => {
    try {
        const response = await fetch(api + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

//Get my info
export const getInfoUser = async (token) => {
    try {
        const response = await fetch(api + "/me", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
}

//Đăng ký
export const register = async (data) => {
    try {
        const formData = new FormData();
        // append từng trường
        formData.append("fullname", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);

        // nếu có avatar
        if (data.avatar) {
            formData.append("avatar", data.avatar);
        }
        const response = await fetch(api + "/register", {
            method: "POST",
            body: formData, // dùng formData thay vì JSON
        });
        return await response.json()
    } catch (error) {
        console.log(error);
    }
}