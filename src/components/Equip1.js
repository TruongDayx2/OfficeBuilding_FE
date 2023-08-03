import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllEquips } from "../redux/actions/equips";

const Equip1 = () => {
    const equipsFromReducer = useSelector(state => state.equip.data1)
    const location = useLocation()
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllEquips())
        return () => {
        }
    }, [location.pathname])
    useEffect(()=>{
        setSortedData(equipsFromReducer)
    },[equipsFromReducer])

    const [selectedStatus, setSelectedStatus] = useState(0);
    const [sortedData, setSortedData] = useState(equipsFromReducer);

    useEffect(() => {
        const dataCopy = [...sortedData];
        dataCopy.sort(sortByStatus);
        setSortedData(dataCopy);
    }, [selectedStatus]);

    const sortByStatus = (a, b) => {
        if ((a.equipmentStatus) === +selectedStatus) {
            return -1;
        }
        if (b.equipmentStatus === +selectedStatus) {
            return 1;
        }
        return 0;
    };

    const onFilterChange = (e) => {
        setSelectedStatus(e.target.value);
    }

    const searchRoom = (e) => {
        if (e.trim().length === 0) {
            setSortedData(equipsFromReducer)
            return;
        }
        const tmpRooms = equipsFromReducer.filter(emp => emp.equipmentName.includes(e.trim()));
        setSortedData(tmpRooms);
    }

    return (
        <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
            <div className="admin-post__wrapper">
                <div style={{ marginTop: '100px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: '1.5' }}>Danh sách các phòng</div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <form action="javascript:" class="search-bar" style={{ height: '30px', fontSize: '15px', borderRadius: '10px' }}>
                            <input style={{ borderRadius: '5px' }}
                                placeholder='Tìm kiếm phòng' type="search" name="search" pattern=".*\S.*"
                                required onChange={(e) => searchRoom(e.target.value)} />
                        </form>
                        <select style={{ width: '150px', height: '30px', fontSize: '15px' }} onChange={(e) => onFilterChange(e)}>
                            <option value={0}>Ngừng hoạt động</option>
                            <option value={1}>Đang hoạt động</option>
                            <option value={2}>Đang bảo trì</option>
                        </select>
                    </div>
                </div>
                <div className="admin-post__body">
                    <table id="admin-post__table">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th style={{ width: '105px' }}>Tên</th>
                                <th style={{ width: '200px' }}>Tầng</th>
                                <th style={{ width: '200px' }}>Trạng thái</th>
                                <th style={{ width: '200px' }}>Thao tác</th>

                            </tr>
                            {
                                sortedData?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.equipmentName}</td>
                                        <td>
                                            {item.floorId}
                                        </td>
                                        <td style={item.equipmentStatus === 0 ? { color: 'red' } : item.roomStatus === 1 ? { color: 'teal' } : { color: 'orange' }}>
                                            {item.roomStatus === 0 ? 'Ngừng hoạt động' : item.roomStatus === 1 ? 'Đang hoạt động' : 'Đang bảo trì'}
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

export default Equip1;