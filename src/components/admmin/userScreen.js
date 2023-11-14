import React, { useEffect, useState } from 'react';
import './admin.css';
import { createUser, getAllRoles, getAllUsers } from '../../api/admin';
import { useContext } from 'react';
import { NotifiContext } from '../notify/notify';

function UsersScreen() {

    const [showPopup, setShowPopup] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [allRole, setAllRole] = useState([]);
    const [users, setUsers] = useState([]);
    const { setErrorCode } = useContext(NotifiContext)

    useEffect(() => {
        const fetchAllRole = async () => {
            const res = await getAllUsers();
            console.log("all user", res);
            setUsers(res);
        }
        fetchAllRole();
    }, [])

    const [inputUser, setInputUser] = useState("");
    const [inputFullname, setInputFullname] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputRole, setInputRole] = useState("1");
    const [inputPassword, setInputPassword] = useState("");
    const [inputRePassword, setInputRePassword] = useState("");
    const handleAdduser = async () => {
        console.log("Thêm user");
        console.log(showPopup);
        setIsCreate(true);
        setShowPopup(showPopup => !showPopup);
        const response = await getAllRoles();
        console.log("all role user", response);
        setAllRole(response);


    }
    const closePopup = () => {
        setShowPopup(false);
        console.log("closePopup");
        setIsCreate(false);
        setIsUpdate(false);

        setInputUser("");
        setInputFullname("");
        setInputEmail("");
        setInputRole("1");
        setInputPassword("");
        setInputRePassword("");


    }
    const handleEdituser = (username) => {
        setIsUpdate(true);
        setShowPopup(showPopup => !showPopup);
        alert("Sửa user" + users.find(user => user.username === username).fullname);
        //cập nhật value cho các ô input bằng dữ liệu của user cần sửa bằng documanet.getElementById
        const user = users.find(user => user.username === username);

    }
   
    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (inputPassword !== inputRePassword) {
            setErrorCode("ERROR_PASSWORD_001");
            return;
        }
        const userBody = {
            username: inputUser,
            email:  inputEmail,
            password: inputPassword,
            fullname: inputFullname,
        }
        const response1 = await createUser(userBody, inputRole);
        console.log("bodyyy",userBody);

        closePopup();
    }

    return (
        <div>
            <div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <h1> Quản lý user</h1>
                    <button className="btn btn-primary" onClick={handleAdduser}>Thêm user</button>
                </div>

                <br></br>
                <div>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Email</th>
                                {/* <th>Quyền</th> */}
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => (
                                    <tr key={user.username}>
                                        <td>{index + 1}</td>
                                        <td>{user.fullname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleEdituser(user.username)}>Sửa</button>
                                         
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>



            </div>
            {showPopup && (
                <div className="popup_dashboard" >
                    <form onSubmit={handleSubmit} >
                        <div className="popup-content" style={{ display: "inline-list-item" }}>
                            <h2>Thêm user</h2>

                            <input type="text"
                                name="userName"
                                placeholder="username"
                                value={inputUser}
                                onChange={(e) => { setInputUser(e.target.value) }}

                                required
                                {...(isUpdate && { disabled: true })}
                            />
                            <input type="text"
                                name="fullname"
                                placeholder="Tên user"
                                onChange={(e) => { setInputFullname(e.target.value) }}
                                value={inputFullname}
                                required
                            />


                            <input type="text"
                                name="email"
                                placeholder="Email"
                                onChange={(e) => { setInputEmail(e.target.value) }}
                                required
                                value={inputEmail}
                            />
                            {isCreate ? (
                                <>
                                    <input type="text"
                                        name="password"
                                        placeholder="Password"
                                        onChange={(e) => { setInputPassword(e.target.value) }}
                                        value={inputPassword}

                                    />
                                    <input type="text"
                                        name="rePassword"
                                        placeholder="nhập lại Password"
                                        onChange ={ (e)=>{setInputRePassword(e.target.value)}}
                                        required
                                        value={inputRePassword}
                                    />
                                    <select onChange={(e)=>{setInputRole(e.target.value)}} >
                                        <option value="1">Admin</option>
                                        <option value="2">Nhân viên</option>
                                        <option value="3">Khách hàng</option>
                                    </select>

                                </>) : null
                            }
                    
                            <div className="btn-popup" style={{ justifyContent: "space-evenly", display: "flex" }}>
                                <button className="btn btn-primary" >Thêm</button>
                                <button className="btn btn-danger" onClick={closePopup}>Đóng</button>
                            </div>

                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}



export default UsersScreen;