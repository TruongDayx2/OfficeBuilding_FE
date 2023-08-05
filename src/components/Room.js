import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllRoomsByFloorID } from "../redux/actions/rooms";

const Room = () => {
    const roomFromReducer = useSelector(state => state.room.data)
    const [floorId, setFloorId] = useState(0);
    const location = useLocation()
    const dispatch = useDispatch();


    useEffect(() => {
        
        const id = location.pathname.split('/')[2];
        console.log(id)
        setFloorId(Number(id))
        dispatch(getAllRoomsByFloorID(Number(id)))
        return () => {
            console.log(location.pathname);
        }
    }, [location.pathname])

    useEffect(() => {
        setSortedData(roomFromReducer);
    }, [roomFromReducer])

    const [selectedStatus, setSelectedStatus] = useState(0);
    const [sortedData, setSortedData] = useState(roomFromReducer);

    useEffect(() => {
        const dataCopy = [...sortedData];
        dataCopy.sort(sortByStatus);
        setSortedData(dataCopy);
    }, [selectedStatus]);

    const sortByStatus = (a, b) => {
        if ((a.roomStatus) === +selectedStatus) {
            return -1;
        }
        if (b.roomStatus === +selectedStatus) {
            return 1;
        }
        return 0;
    };

    const onFilterChange = (e) => {
        setSelectedStatus(e.target.value);
    }

    const searchRoom = (e) => {
        if (e.trim().length === 0) {
            setSortedData(roomFromReducer)
            return;
        }
        const searchTerm = e.trim().toLowerCase();

        const tmpRooms = roomFromReducer.filter(emp => emp.roomName.toLowerCase().includes(searchTerm));
        setSortedData(tmpRooms);
    }

    return (
        <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
            <div className="admin-post__wrapper">
                <div style={{ marginTop: '100px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: '1.5' }}>Danh sách các phòng</div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <form  class="search-bar" style={{ height: '30px', fontSize: '15px', borderRadius: '10px' }}>
                            <input style={{ borderRadius: '5px' }}
                                placeholder='Tìm kiếm phòng' type="search" name="search" pattern=".*\S.*"
                                required onChange={(e) => searchRoom(e.target.value)} />
                        </form>
                        <select style={{ width: '120px', height: '30px', fontSize: '15px' }} onChange={(e) => onFilterChange(e)}>
                            <option value={0}>Đang trống</option>
                            <option value={1}>Đang sử dụng</option>
                            <option value={2}>Đang bảo trì</option>
                        </select>
                    </div>
                </div>
                <div className="admin-post__body">
                    <table id="admin-post__table">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th style={{ width: '105px' }}>Phòng</th>
                                <th style={{ width: '200px' }}>Tầng</th>
                                <th style={{ width: '200px' }}>Giá (VND)</th>
                                <th style={{ width: '200px' }}>Trạng thái</th>
                                <th style={{ width: '200px' }}>Thao tác</th>

                            </tr>
                            {
                                sortedData?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.roomName}</td>
                                        <td>
                                            {item.floorId}
                                        </td>
                                        <td>
                                            {item.roomPrice * 1000000}
                                        </td>
                                        <td style={item.roomStatus === 0 ? { color: 'teal' } : item.roomStatus === 1 ? { color: 'orange' } : { color: 'red' }}>
                                            {item.roomStatus === 0 ? 'Đang trống' : item.roomStatus === 1 ? 'Đang sử dụng' : 'Đang bảo trì'}
                                        </td>
                                        <td>
                                            <button className="post-edit-item-btn" style={{ width: '150px' }}>
                                                <i className='bx bxs-pencil' style={{ marginRight: '10px' }}></i>
                                                Cập nhật
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