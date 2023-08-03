import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFloors } from "../redux/actions/floor";

const Floor1 = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const floorsFromReducer = useSelector(state => state.floors.data)
    useEffect(() => {
        dispatch(getAllFloors())
        return () => {

        }
    }, [location.pathname])

    return (
        <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
            <div className="admin-post__wrapper">
                <div style={{ marginTop: '100px', fontSize: '30px', marginBottom: '20px' }}>Danh sách các tầng</div>
                <div className="admin-post__body">
                    <table id="admin-post__table">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th style={{ width: '200px' }}>Tầng</th>
                                <th style={{ width: '200px' }}>Phòng</th>
                                <th style={{ width: '200px' }}>Trang thiết bị</th>
                            </tr>
                            {
                                floorsFromReducer?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.floorName}</td>
                                        <td>
                                            <Link to={
                                                `/rooms/${item?.id}`
                                            }>
                                                <button className="post-edit-item-btn">
                                                    Xem
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={
                                                `/equips/${item?.id}`
                                            }>
                                                <button className="post-edit-item-btn">
                                                    Xem
                                                </button>
                                            </Link>
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

export default Floor1;