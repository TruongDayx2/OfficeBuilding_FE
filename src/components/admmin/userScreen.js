import React, { useEffect, useState } from 'react';
import './admin.css';
import {createUser, getAllRoles, getAllUsers} from '../../api/admin';

function UsersScreen() {

    const [showPopup, setShowPopup] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [allRole, setAllRole] = useState([]);
const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchAllRole = async () => {
           const res = await getAllUsers();
              console.log("all user",res);
                setUsers(res);
        }
        fetchAllRole();
    },[])

    const handleAdduser = async() => {
        console.log("Thêm user");
        console.log(showPopup);
        setIsCreate(true);
        setShowPopup(showPopup => !showPopup);
        const response = await getAllRoles();
        console.log("all role user",response);
        setAllRole(response);
    }
    const closePopup = () => {
        setShowPopup(false);
        console.log("closePopup");
        setIsCreate(false);
        setIsUpdate(false);

    }
    const handleEdituser = (userName) => {
        setIsUpdate(true);
        setShowPopup(showPopup => !showPopup);
        alert("Sửa user" + users.find(user => user.userName === userName).fullName);
        //cập nhật value cho các ô input bằng dữ liệu của user cần sửa bằng documanet.getElementById
        const user = users.find(user => user.userName === userName);

    }
    const handleDeleteuser = (userName) => {
        alert("Xóa user" + users.find(user => user.userName === userName).name);
    }


    const handleResetPass = (userName) => {
        alert("ddooir maatj khaaur user" + users.find(user => user.userName === userName).name+"thanhf 1234567890");
    }
   


    const [user, setUser] = useState({
        fullname: "",
        username: "",
        email: "",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createUser(user,pickrole);
        console.log("response create user",response);

        closePopup();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "setrole"){
           setPickrole(value);
           return;
        }
        if(name === "rePassword"){
            return;
        }
        setUser({ ...user, [name]: value })
    }

    const handleselectRole = (e) => {

        setPickrole(e.target.value)
     
    }

    const [pickrole, setPickrole] = useState(1);
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
                                        {/* <td>{user.role}</td> */}
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleEdituser(user.username)}>Sửa</button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteuser(user.username)}>{user.status ==0?"khóa":"mở khóa"}</button>
                                            <button className="btn btn-warning" onClick={() => handleResetPass(user.username)}>Reset mật khẩu</button>
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
                                onChange={handleChange}
                                required
                                {...(isUpdate && { disabled: true })}
                            />
                            <input type="text"
                                name="fullname"
                                placeholder="Tên user"
                                onChange={handleChange}
                                required
                            />

                         
                            <input type="text"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                                required

                            />
                            {isCreate? (
                               <>
                                <input type="text"
                                name="password"
                                placeholder="Password"
                                onChange={handleChange}
                                required

                            />
                            <input type="text"
                                name="rePassword"
                                placeholder="nhập lại Password"
                                onChange={handleChange}
                                required

                            />
                            </>):null
                        }
                            <select  onChange={handleselectRole}>
                              {
                                  allRole.map((role,index) => (
                                    <option value={role.id} key={role.id}>{role.name}</option>
                                ))
                              }
                                {/* <option value="Admin">Admin</option>
                                <option value="User">User</option> */}

                            </select>
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