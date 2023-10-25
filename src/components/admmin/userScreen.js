import React, { useState } from 'react';
import './admin.css';

function UsersScreen() {
    const [showPopup, setShowPopup] = useState(false);
    const handleAdduser = () => {
        console.log("Thêm user");
        console.log(showPopup);
        setShowPopup(showPopup => !showPopup);
    }
    const closePopup = () => {
        setShowPopup(false);
    }
    const handleEdituser = (id) => {
        alert("Sửa user" + users.find(user => user.id === id).name);
    }
    const handleDeleteuser = (id) => {
        alert("Xóa user" + users.find(user => user.id === id).name);
    }
    const addUser = () => {
        alert("Thêm user");
    }

    const users = [
        {
            id: 1,
            name: "Nguyễn Văn A",
            email: "nguyenvana@gmail.com",
            role: "admin"
        },
        {
            id: 2,
            name: "Nguyễn Văn B",
            email: "nguyenvanb@gmail.com",
            role: "user"
        }
    ]



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
                                <th>Quyền</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleEdituser(user.id)}>Sửa</button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteuser(user.id)}>Xóa</button>
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
                    <div className="popup-content" style={{ display:"inline-list-item"}}>
                        <h2>Thêm user</h2>
                        <input type="text" placeholder="Tên user" />
                        <input type="text" placeholder="userName" />
                        <input type="text" placeholder="Email" />
                        <input type="text" placeholder="Password" />
                        <input type="text" placeholder="nhập lại Password" />
                        <select>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                        <div className="btn-popup" style={{justifyContent:"space-evenly", display:"flex"}}>
                            <button className="btn btn-primary" onClick={() => addUser()}>Thêm</button>
                            <button className="btn btn-danger" onClick={closePopup}>Đóng</button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}



export default UsersScreen;