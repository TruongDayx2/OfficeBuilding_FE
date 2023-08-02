import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllRoomsByFloorID } from "../redux/actions/rooms";

const Room = () => {
    const roomFromReducer = useSelector(state => state.room.data)
    const search = useLocation().search;
    const floorId = new URLSearchParams(search).get('floorId');
    const location = useLocation()
    const dispatch = useDispatch();

    

    useEffect(() => {
        dispatch(getAllRoomsByFloorID(floorId))
        return () => {
        }
    }, [location.pathname])
    console.log(roomFromReducer)

    return (
        <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
            <div className="admin-post__wrapper">
                <div>Danh sách các tầng</div>
                <div className="admin-post__body">
                    <table id="admin-post__table">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th style={{ width: '200px' }}>Phòng</th>
                                <th style={{ width: '200px' }}>Tầng</th>
                                <th style={{ width: '200px' }}>Giá</th>
                                <th style={{ width: '200px' }}>Trạng thái</th>
                                <th style={{ width: '105px' }}>Thao tác</th>

                            </tr>
                            {
                                roomFromReducer?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.floorName}</td>
                                        <td>
                                            <Link to={{
                                                pathname: "/rented-areas",
                                                search: `?floorId=` + item?.id,
                                            }}>
                                                <button className="post-edit-item-btn">
                                                    <i className='bx bxs-pencil'></i>
                                                    Xem
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="post-edit-item-btn" >
                                                <i className='bx bxs-pencil'></i>
                                                Sửa
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Room;