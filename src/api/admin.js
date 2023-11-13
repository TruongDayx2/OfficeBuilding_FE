import axios from "axios";



const getAllRoles = async () => {

    try {
        const response = await axios.get("http://localhost:8080/admin/getAllRole", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        });
        console.log("response all role api", response);

        return response.data;

    }
    catch (error) {
        console.error(error);
    }
};

const getAllUsers = async () => {
    const response = await axios.get("http://localhost:8080/api/admin/u/getAllUser", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
        }
    });
    console.log("response all user api", response);
    return response.data;
};


const lockUser = async (id,userName, email, fullName) => {

    const body= {
            userName: userName,
            email: email,
            fullName: fullName,
        }

    const response = await axios.put(`http://localhost:8080/api/admin/u/lock/${userName}`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json"
        },body
    
    });

    return response.data;
}
const createUser = async (user, id) => {
    try {
        const response = await axios.post(`http://localhost:8080/admin/register/${id}`, user, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        });
        console.log("response create user api", response);
        return response.data;
    }
    catch (error) {
        console.error(error);
    }
}


export { getAllRoles, getAllUsers, createUser, lockUser };
