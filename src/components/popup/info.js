import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux";
import { getAllFloors } from "../redux/actions/floor";
import { getAllRooms, updateRoom } from "../redux/actions/rooms";
import { getAllCompanys } from "../redux/actions/company";


function info(props) {

    const roomsFromReducer = useSelector(state => state.room.data1)
    const companysFromReducer = useSelector(state => state.company.data1)
    const floorsFromReducer = useSelector(state => state.floors.data)
    const rentalsFromReducer = useSelector(state => state.rental.data1)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRooms())
        dispatch(getAllCompanys())
        dispatch(getAllFloors())
        dispatch(getAllRentals())
    }, [])
    useEffect(() => {
        console.log(roomsFromReducer);
        console.log(companysFromReducer);
        console.log(floorsFromReducer);
        console.log(rentalsFromReducer);

    }, [roomsFromReducer, companysFromReducer, floorsFromReducer])

    const [roomPopup, setRoomPopup] = useState();
    const openPopup = (room, tmp) => {
        setRoomPopup(room)
        setTmpval(tmp)
        setIsPopupVisible(true);
        setRentalPopup(rentalsFromReducer.find((rental) => rental.roomId === room.id && rental.reStatus === 1))

    };
    const closePopup = () => {
        setIsPopupVisible(false);
        setTmpval("")
    };




    return (
        <div style={{ marginTop: "100px" }}>
            <h2 style={{ width: "100%", textAlign: "center", alignItems: "center" }}>Thông tin phòng</h2>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}>
                    <div>
                        <span  >ID:  </span>
                        <span>{roomPopup.id}</span>
                    </div>
                    <div>
                        <span  >Tên phòng:  </span>
                        <span>{roomPopup.roomName}</span>
                    </div>
                    <div>
                        <span  >Tầng:  </span>
                        <span>
                            {floorsFromReducer.find((floor) => floor.id === roomPopup.floorId)?.floorName}
                        </span>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}>
                    <div>
                        <span  >Giá phòng:  </span>
                        <span>{roomPopup.roomPrice}</span>
                    </div>
                    <div>
                        <span  >Trạng thái:  </span>
                        <span>
                            {roomPopup.roomStatus === 1
                                ? "đang cho thuê"
                                : roomPopup.roomStatus === 2
                                    ? "đang bảo trì"
                                    : "trống"}
                        </span>
                    </div>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-start;",
                    }}>
                    <span  >Mô tả:</span>
                    <span
                        style={{ marginLeft: "15px" }}>{roomPopup.roomDesc}</span>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    marginTop: "20px",
                }}
            >
                {
                    roomPopup.roomStatus === 0 ? (
                        <button
                            style={{
                                backgroundColor: "#3498db",
                                color: "#fff",
                                border: "none",
                                padding: "10px 20px",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                            onClick={() => openPopup(roomPopup, "thue")}
                        >
                            Thuê
                        </button>) : null
                }


                <button
                    style={{
                        backgroundColor: "#3498db",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={() => openPopup(roomPopup, "update")}
                >
                    Cập nhậttt
                </button>

                {
                    roomPopup.roomStatus === 1 ? (
                        <>
                            <button
                                style={{
                                    backgroundColor: "#3498db",
                                    color: "#fff",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => openPopup(roomPopup, "detail")}
                            >
                                Xem hợp đồng
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#3498db",
                                    color: "#fff",
                                    border: "none",
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                }}
                                onClick={() => openPopup(roomPopup, "detail")}
                            >
                                xem trang thiết bị
                            </button>
                        </>
                    ) : null
                }
                <button
                    style={{
                        backgroundColor: "#e74c3c",
                        color: "#fff",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                    onClick={closePopup}
                >
                    Cancel
                </button>
            </div>

        </div>
    );
}





export default info;