import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from "react-redux";
import { getAllFloors } from "../redux/actions/floor";
import { getAllRooms, updateRoom } from "../redux/actions/rooms";
import { getAllCompanys } from "../redux/actions/company";
import DatePicker from "react-datepicker";
import { combineReducers } from 'redux';
import { cancelRental, createRental, getAllRentals } from "../redux/actions/rental";

function info(props) {

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
        </div>
    );
}





export default info;