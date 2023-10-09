import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux";
import { getAllFloors } from "../redux/actions/floor";
import { getAllRooms, updateRoom } from "../redux/actions/rooms";
import { getAllCompanys } from "../redux/actions/company";
import DatePicker from "react-datepicker";
import { combineReducers } from 'redux';
import { createRental } from '../redux/actions/rental';

function CheckRoom() {
    const [isRoomChecked, setIsRoomChecked] = useState(false);
    const roomsFromReducer = useSelector(state => state.room.data1)
    const companysFromReducer = useSelector(state => state.company.data1)
    const floorsFromReducer = useSelector(state => state.floors.data)



    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupType, setPopupType] = useState(""); // "thue" or "cap-nhat"
    const [selectedRoom, setSelectedRoom] = useState(null);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRooms())
        dispatch(getAllCompanys())
        dispatch(getAllFloors())
    }, [])

    useEffect(() => {
        console.log(roomsFromReducer);
        console.log(companysFromReducer);
        console.log(floorsFromReducer);

    }, [roomsFromReducer, companysFromReducer, floorsFromReducer])





    const [addRoom, setAddRoom] = useState({
        companyId: 1,
        roomId: 1,
        reDateBegin: new Date().toISOString().split('T')[0], // Định dạng YYYY-MM-DD
        reDateEnd: new Date().toISOString().split('T')[0], // Định dạng YYYY-MM-DD
        reStatus: 1,
        rePrice: 0
    });



    const [roomPopup, setRoomPopup] = useState();
    const [tmpval, setTmpval] = useState();
    const openPopup = (room, tmp) => {
        setRoomPopup(room)
        console.log("valll", tmp);
        setTmpval(tmp)
        console.log(tmp);
        setIsPopupVisible(true);
    };

    const closePopup = () => {
        setIsPopupVisible(false);
        setTmpval("")
    };
    const handleChangeInputAdd = (e) => {

        const { name, value } = e.target
        console.log(name, value);
        setAddRoom({ ...addRoom, [name]: value })
    }
    const handelAddClick = async () => {

        // setAddRoom({ ...addRoom, roomId: roomPopup.id })
        // setAddRoom({ ...addRoom, reStatus: roomPopup.roomStatus })
        setAddRoom({...addRoom,roomId: roomPopup.id,});
        console.log("popup", roomPopup);
        console.log(addRoom);
        console.log("umf", roomPopup.id);
        console.log("stt", roomPopup.roomStatus);

        // Đợi cho việc cập nhật phòng hoàn thành
        await dispatch(createRental(addRoom));
        await dispatch(getAllRooms());

        closePopup();
    }

    const handleChangeInput = (e) => {

        const { name, value } = e.target
        console.log(name, value);
        setRoomPopup({ ...roomPopup, [name]: value })
    }
    const handelUpdateClick = async () => {
        console.log(roomPopup);

        // Đợi cho việc cập nhật phòng hoàn thành
        await dispatch(updateRoom(roomPopup, roomPopup.id));

        // Sau khi đã cập nhật, lấy lại danh sách phòng và hiển thị trên màn hình
        await dispatch(getAllRooms());

        closePopup();
    }


    return (
        <div style={{ marginTop: "100px" }}>
            {
                roomPopup && (
                    tmpval === "info" ? (
                        <div
                            style={{
                                top: 0,
                                position: "fixed",
                                display: isPopupVisible ? "flex" : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                zIndex: 3,
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                                height: "100vh",
                                width: "100vw",

                            }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                    padding: "20px",
                                    borderRadius: "10px",
                                    width: "600px",
                                    height: "400px",
                                    margin: "0 auto",
                                    textAlign: "left",
                                }}
                            >
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
                                                >
                                                    Hoàn thành thuê
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
                                                >
                                                    Xem hợp đồng
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
                        </div>
                    ) : (


                        tmpval === "update" ? (
                            <div

                                style={{
                                    top: 0,
                                    position: "fixed",
                                    display: isPopupVisible ? "flex" : "none",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 3,
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    height: "100vh",
                                    width: "100vw",

                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "#ffffff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "20px",
                                        borderRadius: "10px",
                                        width: "600px",
                                        height: "400px",
                                        margin: "0 auto",
                                        textAlign: "left",
                                    }}
                                >
                                    <h2 style={{ width: "100%", textAlign: "center", alignItems: "center" }}>Cập nhậtt Thông tin phòng</h2>
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
                                                <span  >Tên phòngg:  </span>
                                                <span >
                                                    <input
                                                        style={{ marginLeft: '10px', borderRadius: '10px', flex: '2.5' }}
                                                        type="text"
                                                        id='roomName'
                                                        name='roomName'
                                                        placeholder={roomPopup.roomName}
                                                        onChange={handleChangeInput}
                                                        required
                                                    />
                                                    VND

                                                </span>
                                            </div>
                                            <div>
                                                <span  >Tầng:  </span>
                                                <span>
                                                    {/* {floorsFromReducer.find((floor) => floor.id === roomPopup.floorId)?.floorName} */}
                                                    <select name="floorId" value={roomPopup.floorId} onChange={handleChangeInput} style={{ marginLeft: '10px', borderRadius: '10px' }}>
                                                        {floorsFromReducer.map((floor) => {
                                                            return (
                                                                <option key={floor.id} value={floor.id} >
                                                                    {floor.floorName}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                        }}>
                                            <div>
                                                <span  >Giá phòng:  </span>
                                                <span >
                                                    <input
                                                        style={{ marginLeft: '10px', borderRadius: '10px', flex: '2.5' }}
                                                        type="text"
                                                        id='roomPrice'
                                                        name='roomPrice'
                                                        placeholder={roomPopup.roomPrice}
                                                        onChange={handleChangeInput}
                                                        required
                                                    />
                                                    VND
                                                </span>
                                            </div>
                                            <div>
                                                <span  >Trạng thái:  </span>
                                                <span>
                                                    <select name="roomStatus" value={roomPopup.roomStatus} onChange={handleChangeInput} style={{ marginLeft: '10px', borderRadius: '10px' }}>
                                                        <option value={0}>Đang trống</option>
                                                        <option value={2}>Đang bảo trì</option>
                                                    </select>
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start;",
                                            }}>
                                            <span  >Mô tả:</span>
                                            <span>
                                                <input
                                                    style={{ marginLeft: '10px', borderRadius: '10px', flex: '2.5' }}
                                                    type="text"
                                                    id='roomDesc'
                                                    name='roomDesc'
                                                    placeholder={roomPopup.roomDesc}
                                                    onChange={handleChangeInput}
                                                    required
                                                />

                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-evenly",
                                            marginTop: "20px",
                                        }}
                                    >
                                        <button
                                            style={{
                                                backgroundColor: "#3498db",
                                                color: "#fff",
                                                border: "none",
                                                padding: "10px 20px",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                            onClick={handelUpdateClick}
                                        >
                                            Cập nhật
                                        </button>
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
                            </div>
                        ) : tmpval === "thue" ? (
                            <div

                                style={{
                                    top: 0,
                                    position: "fixed",
                                    display: isPopupVisible ? "flex" : "none",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    zIndex: 3,
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                    height: "100vh",
                                    width: "100vw",

                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: "#ffffff",
                                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                        padding: "20px",
                                        borderRadius: "10px",
                                        width: "600px",
                                        height: "400px",
                                        margin: "0 auto",
                                        textAlign: "left",
                                    }}
                                >
                                    <h2 style={{ width: "100%", textAlign: "center", alignItems: "center" }}>Tạo Hợp đồng thuê Phòng</h2>
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
                                                <span  >Giá Tiền:  </span>
                                                <span >
                                                    <input
                                                        style={{ marginLeft: '10px', borderRadius: '10px', flex: '2.5' }}
                                                        type="text"
                                                        id='rePrice'
                                                        name='rePrice'
                                                        placeholder={roomPopup.roomPrice}
                                                        onChange={handleChangeInputAdd}
                                                        required
                                                    />
                                                    VND
                                                </span>
                                            </div>
                                            <div>
                                                <span  >Công ty:  </span>
                                                <span>
                                                    <select name="companyId" value={companysFromReducer.id} onChange={handleChangeInputAdd} style={{ marginLeft: '10px', borderRadius: '10px' }}>
                                                        {companysFromReducer.map((company) => {
                                                            return (
                                                                <option key={company.id} value={company.id} >
                                                                    {company.cusName}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>

                                                </span>
                                            </div>

                                        </div>
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "flex-start;",
                                            }}>
                                            <div style={{ marginTop: '20px', width: '100%' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                    <span style={{ marginRight: '10px' }}>
                                                        Ngày bắt đầu thuê:
                                                    </span>
                                                    <DatePicker
                                                        selected={new Date(addRoom.reDateBegin)}
                                                        onChange={(date) => setAddRoom({ ...addRoom, reDateBegin: date.toISOString().split('T')[0] })}
                                                        dateFormat="yyyy-MM-dd"
                                                        minDate={new Date()}
                                                        style={{ borderRadius: '10px', padding: '5px' }}
                                                    />
                                                </label>
                                            </div>
                                            <div style={{ marginTop: '20px', width: '100%' }}>
                                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                    <span style={{ marginRight: '10px' }}>
                                                        Ngày hết hạn thuê:
                                                    </span>
                                                    <DatePicker
                                                        selected={new Date(addRoom.reDateEnd)}
                                                        onChange={(date) => setAddRoom({ ...addRoom, reDateEnd: date.toISOString().split('T')[0] })}
                                                        dateFormat="yyyy-MM-dd"
                                                        minDate={new Date()}
                                                        style={{ borderRadius: '10px', padding: '5px' }}
                                                    />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-evenly",
                                            marginTop: "20px",
                                        }}
                                    >
                                        <button
                                            style={{
                                                backgroundColor: "#3498db",
                                                color: "#fff",
                                                border: "none",
                                                padding: "10px 20px",
                                                borderRadius: "5px",
                                                cursor: "pointer",
                                            }}
                                            onClick={handelAddClick}
                                        >
                                            Thuê
                                        </button>
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
                            </div>
                        ) : null
                    )

                )}
            <table  >
                <tr>
                    <th>tầng </th>
                    <th>Phòng</th>
                </tr>
                {floorsFromReducer.map((floors) => (
                    <tr>
                        <td>
                            <p>{floors.floorName}</p>
                        </td>
                        <div key={floors.id} style={{ display: "flex" }}>
                            {roomsFromReducer.map(room => (
                                room.floorId === floors.id ? (
                                    <div key={room.id} >
                                        <td>
                                            <box style={{
                                                width: "200px",
                                                height: "50px",
                                                backgroundColor: room.roomStatus === 1 ? "yellow" : (room.roomStatus === 2 ? "red" : "green"),
                                                borderRadius: "10px",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                margin: "10px",
                                                cursor: "pointer"
                                            }}
                                                // onClick={() => {
                                                //     console.log(room.roomName);

                                                // }}
                                                onClick={() => {
                                                    openPopup(room, "info")
                                                    // console.log(room);
                                                }
                                                }
                                            >
                                                <p style={{ color: "white" }}>{room.roomName}</p>
                                            </box>
                                        </td>
                                    </div>
                                ) : null
                            ))}
                        </div>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default CheckRoom;