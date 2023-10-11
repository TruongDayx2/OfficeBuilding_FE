import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux";
import { getAllFloors } from "../redux/actions/floor";
import { getAllRooms, updateRoom } from "../redux/actions/rooms";
import { getAllCompanys } from "../redux/actions/company";
import DatePicker from "react-datepicker";
import { combineReducers } from 'redux';
import { cancelRental, createRental, getAllRentals } from "../redux/actions/rental";

function CheckRoom() {
    const [isRoomChecked, setIsRoomChecked] = useState(false);
    const roomsFromReducer = useSelector(state => state.room.data1)
    const companysFromReducer = useSelector(state => state.company.data1)
    const floorsFromReducer = useSelector(state => state.floors.data)
    const rentalsFromReducer = useSelector(state => state.rental.data1)

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupType, setPopupType] = useState(""); // "thue" or "cap-nhat"
    const [selectedRoom, setSelectedRoom] = useState(null);
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
    const [rentalPopup, setRentalPopup] = useState();
    console.log("dataa",localStorage.getItem("role"));

    const closePopup = () => {
        setIsPopupVisible(false);
        setTmpval("")
    };
    const openPopup = (room, tmp) => {
        setRoomPopup(room)
        setTmpval(tmp)
        setIsPopupVisible(true);
        setRentalPopup(rentalsFromReducer.find((rental) => rental.roomId === room.id && rental.reStatus === 1))

    };
   
    const [numValue, setNumValue] = useState();
    const handleChangeInputAdd = (e) => {

        const { name, value } = e.target
        if ((name == "rePrice" && Number(value) < 0) || value == "-0") {
            setNumValue("")
            console.log("pingggg");
        }
        else {
            setNumValue(value)
        }
        setAddRoom({ ...addRoom, [name]: value })
    }
    const handelAddClick = async () => {
        setAddRoom({ ...addRoom, roomId: roomPopup.id, });
        await dispatch(createRental(addRoom));
        await dispatch(getAllRooms());
        closePopup();
    }
    const handleChangeInput = (e) => {
        const { name, value } = e.target
        setRoomPopup({ ...roomPopup, [name]: value })
    }
    const handelUpdateClick = async () => {
        await dispatch(updateRoom(roomPopup, roomPopup.id));
        await dispatch(getAllRooms());
        closePopup();
    }
    const handelDoneRental = async (id) => {

        const currentDate = new Date()
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        await dispatch(cancelRental(id, formattedDate));
        await dispatch(getAllRooms());

        closePopup();
    }
    return (
        <div style={{ marginTop: "100px" }}>
            {
                roomPopup && (

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
                                width: "800px",
                                height: "600px",
                                margin: "0 auto",
                                textAlign: "left",
                            }}
                        >
                            {
                                tmpval === "info" ? (
                                    <>

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
                                    </>
                                ) : (tmpval === "update" ? (
                                    <>
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

                                    </>
                                ) : tmpval === "thue" ? (

                                    <>
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
                                                            type="number"
                                                            id='rePrice'
                                                            name='rePrice'
                                                            value={numValue}
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
                                    </>
                                ) : tmpval === "detail" ? (
                                    <>
                                        <div style={{ marginTop: '20px', width: '100%' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <span style={{ flex: '1' }}>
                                                    Tên công ty:
                                                </span>
                                                <span style={{ flex: '1', fontWeight: '500' }}>

                                                    <span>
                                                        {companysFromReducer.find((company1) => company1.id === rentalPopup.companyId).cusName || "loading"}
                                                    </span>
                                                </span>
                                            </label>
                                        </div>
                                        <div style={{ marginTop: '20px', width: '100%' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <span style={{ flex: '1' }}>
                                                    Tên phòng:
                                                </span>
                                                <span style={{ flex: '1', fontWeight: '500' }}>
                                                    {roomPopup.roomName}
                                                </span>
                                                <span style={{ flex: '1' }}>
                                                    Tòa nhà:
                                                </span>
                                                <span style={{ flex: '1', fontWeight: '500' }}>
                                                    77Building
                                                </span>
                                            </label>
                                        </div>
                                        <div style={{ marginTop: '20px', width: '100%' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <span style={{ flex: '1' }}>
                                                    Mã hợp đồng:
                                                </span>
                                                <span style={{ flex: '1', fontWeight: '500', display: 'flex' }}>
                                                    {
                                                        console.log(rentalPopup)
                                                    }
                                                    {rentalPopup.id + companysFromReducer.find((company1) => company1.id === rentalPopup.companyId).cusName + rentalPopup.roomId}
                                                </span>
                                            </label>
                                        </div>
                                        <div style={{ marginTop: '20px', width: '100%' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <span style={{ flex: '1' }}>
                                                    Tiền thuê (tháng):
                                                </span>
                                                <span style={{ flex: '1', fontWeight: '500' }}>
                                                    {Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(rentalPopup.rePrice)}
                                                </span>
                                            </label>
                                        </div>
                                        <div style={{ marginTop: '20px', width: '100%' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <span style={{ flex: '1' }}>
                                                    Ngày bắt đầu thuê:
                                                </span>
                                                <span style={{ flex: '1', fontWeight: '500' }}>
                                                    {rentalPopup.reDateBegin}
                                                </span>
                                            </label>
                                        </div>
                                        <div style={{ marginTop: '20px', width: '100%' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <span style={{ flex: '1' }}>
                                                    Ngày hết hạn thuê:
                                                </span>
                                                <span style={{ flex: '1', fontWeight: '500' }}>
                                                    {rentalPopup.reDateEnd}
                                                </span>
                                            </label>
                                        </div>
                                        <div style={{ marginTop: '20px', width: '100%' }}>
                                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                                <span style={{ flex: '1' }}>
                                                    Trạng thái:
                                                </span>
                                                <span style={{ flex: '1', fontWeight: '500' }}>
                                                    {rentalPopup.reStatus === 0 ? 'Hết hạn' : 'Còn hạn'}
                                                </span>
                                            </label>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-evenly",
                                            marginTop: "20px",
                                        }}>
                                            <button
                                                style={{
                                                    backgroundColor: "#3498db",
                                                    color: "#fff",
                                                    border: "none",
                                                    padding: "10px 20px",
                                                    borderRadius: "5px",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() => handelDoneRental(rentalPopup.id, "thue")}

                                            >
                                                Kết thúc hợp đồng
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

                                        </div></>
                                ) : null)
                            }
                        </div>
                    </div>

                )

            }
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

                                                onClick={() => {
                                                    openPopup(room, "info")
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