import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { createEquipment, deleteEquipment, getAllEquips, updateEquipment } from "../redux/actions/equips";
import { getAllFloors } from "../redux/actions/floor";
import { getAllRentals } from "../redux/actions/rental";
import { getAllCompanys } from "../redux/actions/company";
import { getAllRooms } from "../redux/actions/rooms";

const Rental1 = () => {
    const floorsFromReducer = useSelector(state => state.floors.data)
    const rentalsFromReducer = useSelector(state => state.rental.data1)
    const companysFromReducer = useSelector(state => state.company.data1)
    const roomsFromReducer = useSelector(state => state.room.data1)

    const location = useLocation()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllRentals())
        dispatch(getAllFloors())
        dispatch(getAllCompanys())
        dispatch(getAllRooms())
        return () => {
            console.log(location.pathname);
        }
    }, [location.pathname])

    const [sortedData, setSortedData] = useState(rentalsFromReducer);

    useEffect(() => {
        setSortedData(rentalsFromReducer)
    }, [rentalsFromReducer])


    const searchRoom = (e) => {
        if (e.trim().length === 0) {
            setSortedData(rentalsFromReducer)
            return;
        }
        const searchTerm = e.trim().toLowerCase();

        const tmpRooms = companysFromReducer.filter(emp => emp.cusName.toLowerCase().includes(searchTerm));
        // setSortedData(tmpRooms);
        console.log(tmpRooms)
        // setSearchCompany(tmpRooms)
        const updatedResultArray = rentalsFromReducer.filter(item => tmpRooms.some(company => company.id === item.companyId));
        setSortedData(updatedResultArray);
    }


    const [isShow, setIsShow] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [item, setItem] = useState({})
    const [idItem, setIdItem] = useState({})
    const [isDelete, setIsDelete] = useState(false)
    const [isDetail, setIsDetail] = useState(false)

    useEffect(() => {
        if (isUpdate || isDelete || isDetail) {
            console.log(item)
            setFormData(item)
            setIdItem(item.id)
        }
    }, [isUpdate, isDelete, isDetail])

    const popUpActive = (mode, item) => {
        setIsShow(true);
        document.querySelector('.form-post').classList.add('active');
        if (mode === "edit") {
            setIsUpdate(true)
            setItem(item)
            document.querySelector('.dialog__title').textContent = "Sửa trang thiết bị";
        } else if (mode === 'delete') {
            setIsDelete(true)
            setItem(item)
            document.querySelector('.dialog__title').textContent = "Bạn có chắc chắn xóa?";
        } else if (mode === 'detail') {
            setIsDetail(true)
            setItem(item)
            document.querySelector('.dialog__title').textContent = "Hợp đồng thuê phòng";
        }
        else {
            document.querySelector('.dialog__title').textContent = "Thêm trang thiết bị";
        }
    }
    const initialFormData = {
        reDateBegin: '',
        reDateEnd: '',
        roomId: 1,
        companyId: 1,
    };
    const cancelClick = () => {
        setFormData(initialFormData);
        setIsShow(false);
        setIsUpdate(false);
        setIsDelete(false)
        setIsDetail(false)
        setItem({})
        document.querySelector('.form-post').classList.remove('active');
    }

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Thực hiện các xử lý dữ liệu ở đây, ví dụ: gửi dữ liệu lên server
        console.log(formData);
        setFormData(initialFormData);
        if (!isUpdate && !isDelete) {
            dispatch(createEquipment(formData))
        } else if (isUpdate) {
            dispatch(updateEquipment(formData, idItem))
        } else {
            dispatch(deleteEquipment(idItem))
        }
        // Reset form sau khi gửi thành công (tuỳ ý)
        window.location.reload();
        cancelClick();
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'equipmentStatus' || name === 'floorId' ? parseInt(value) : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const CompanyName = ({ companyId }) => {
        console.log(companysFromReducer)
        const company = companysFromReducer.find(company => company.id === companyId);
        console.log(company)
        if (company) {
            return (
                <div>{company.cusName}</div>
            );
        }
        else {
            return <div>Đang tải...</div>; // Bạn có thể hiển thị thông báo tải hoặc xử lý trường hợp này theo cách khác
        }
    }

    const RoomName = ({ roomId }) => {
        const room = roomsFromReducer.find(room => room.id === roomId);
        if (room) {
            return (
                <div>{room.roomName}</div>
            );
        }
        else {
            return <div>Đang tải...</div>; // Bạn có thể hiển thị thông báo tải hoặc xử lý trường hợp này theo cách khác
        }
    }

    const RentMonth = ({ roomId }) => {
        const room = roomsFromReducer.find(room => room.id === roomId);
        if (room) {
            return (
                <div>{room.roomPrice * 1000000} VND</div>
            );
        }
        else {
            return <div>Đang tải...</div>; // Bạn có thể hiển thị thông báo tải hoặc xử lý trường hợp này theo cách khác
        }
    }

    return (
        <div style={{ minHeight: "100vh" }} className="admin-post__container">
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay" style={{ height: '1000vh' }}></div>
                <div className="form-post" style={{ height: isDelete ? '200px' : '' }}>
                    <div className="form-post__title dialog__title">
                        Thêm trang thiết bị
                    </div>
                    <div style={{ display: isDelete ? 'block' : 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
                            <button type="button" onClick={(e) => handleSubmit(e)} style={{ borderRadius: '10px', backgroundColor: 'teal', color: 'white' }}>Xác nhận</button>
                            <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange' }}>
                                Hủy
                            </button>
                        </div>
                    </div>
                    <div style={{ display: isDetail ? 'block' : 'none' }}>
                        <div style={{ marginTop: '20px', width: '100%' }}>
                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <span style={{ flex: '1' }}>
                                    Tên công ty:
                                </span>
                                <span style={{ flex: '1', fontWeight: '500' }}>
                                    <CompanyName companyId={formData.companyId} />
                                </span>
                            </label>
                        </div>
                        <div style={{ marginTop: '20px', width: '100%' }}>
                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <span style={{ flex: '1' }}>
                                    Tên phòng:
                                </span>
                                <span style={{ flex: '1', fontWeight: '500' }}>
                                    <RoomName roomId={formData.roomId} />
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
                                <span style={{ flex: '1', fontWeight: '500' }}>
                                    {formData.id}
                                </span>
                            </label>
                        </div>
                        <div style={{ marginTop: '20px', width: '100%' }}>
                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <span style={{ flex: '1' }}>
                                    Tiền thuê (tháng):
                                </span>
                                <span style={{ flex: '1', fontWeight: '500' }}>
                                    <RentMonth roomId={formData.roomId} />
                                </span>
                            </label>
                        </div>
                        <div style={{ marginTop: '20px', width: '100%' }}>
                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <span style={{ flex: '1' }}>
                                    Ngày bắt đầu thuê:
                                </span>
                                <span style={{ flex: '1', fontWeight: '500' }}>
                                    {formData.reDateBegin}
                                </span>
                            </label>
                        </div>
                        <div style={{ marginTop: '20px', width: '100%' }}>
                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <span style={{ flex: '1' }}>
                                    Ngày hết hạn thuê:
                                </span>
                                <span style={{ flex: '1', fontWeight: '500' }}>
                                    {formData.reDateEnd}
                                </span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '80px' }}>
                            <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange' }}>
                                Đóng
                            </button>
                        </div>
                    </div>
                    <div className="form-post__content" style={{ height: '80%', display: isDelete ? 'none' : isDetail ? 'none' : 'block' }}>
                        <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '50px', marginRight: '50px' }}>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Tên trang thiết bị:
                                    </span>
                                    <input
                                        style={{ marginLeft: '10px', borderRadius: '10px', flex: '2.5' }}
                                        type="text"
                                        id='equipmentName'
                                        name="equipmentName"
                                        value={formData.equipmentName}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <label>
                                    Trạng thái:
                                    <select name="equipmentStatus" value={formData.equipmentStatus} onChange={handleChange} style={{ marginLeft: '10px', borderRadius: '10px' }}>
                                        <option value={0}>Ngừng hoạt động</option>
                                        <option value={1}>Đang hoạt động</option>
                                        <option value={2}>Đang bảo trì</option>
                                    </select>
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Mô tả:
                                    </span>
                                    <input
                                        style={{ marginLeft: '10px', borderRadius: '10px', flex: '7' }}
                                        type="text"
                                        name="equipmentDesc"
                                        value={formData.equipmentDesc}
                                        onChange={handleChange}
                                    />
                                </label>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <label>
                                    Tầng chứa trang thiết bị:
                                    <select name="floorId" value={formData.floorId} onChange={handleChange} style={{ marginLeft: '10px', borderRadius: '10px' }}>
                                        {floorsFromReducer.map((floor) => {
                                            return (
                                                <option key={floor.id} value={floor.id} >
                                                    {floor.floorName}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                                <button type="submit" style={{ borderRadius: '10px', backgroundColor: 'teal', color: 'white' }}>Xác nhận</button>
                                <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange' }}>
                                    Hủy
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

            <div className="admin-post__wrapper">
                <div style={{ marginTop: '50px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: '3' }}>Danh sách hợp đồng</div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <form className="search-bar" style={{ height: '30px', fontSize: '15px', borderRadius: '10px' }}>
                            <input style={{ borderRadius: '5px', width: '250px' }}
                                placeholder='Tìm kiếm công ty' type="search" name="search" pattern=".*\S.*"
                                required onChange={(e) => searchRoom(e.target.value)} />
                        </form>
                        {/* <select style={{ width: '150px', height: '30px', fontSize: '15px' }} onChange={(e) => onFilterChange(e)}>
                            <option value={0}>Ngừng hoạt động</option>
                            <option value={1}>Đang hoạt động</option>
                            <option value={2}>Đang bảo trì</option>
                        </select> */}
                        {/* <div style={{ width: '150px', height: '30px', fontSize: '15px' }} >
                            <button onClick={() => popUpActive()} style={{ backgroundColor: 'teal', color: 'white', borderRadius: '10px' }}>
                                Thêm mới
                            </button>
                        </div> */}
                    </div>
                </div>
                <div className="admin-post__body">
                    <table id="admin-post__table">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th style={{ width: '105px' }}>Mã hợp đồng</th>
                                <th style={{ width: '200px' }}>Công ty</th>
                                <th style={{ width: '105px' }}>Phòng</th>
                                <th style={{ width: '200px' }}>Thao tác</th>

                            </tr>
                            {
                                sortedData?.map((item1, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item1?.id}</td>
                                        <td>
                                            <CompanyName companyId={item1?.companyId} />
                                        </td>
                                        <td>
                                            <RoomName roomId={item1?.roomId} />
                                        </td>
                                        <td>
                                            <button className="post-edit-item-btn" style={{ width: '100px' }} onClick={() => popUpActive('edit', item1)}>
                                                Cập nhật
                                            </button>
                                            <button className="post-edit-item-btn" style={{ width: '100px', marginLeft: '10px' }} onClick={() => popUpActive('detail', item1)}>
                                                Chi tiết
                                            </button>
                                            <button className="post-delete-btn " style={{ width: '70px', marginLeft: '10px' }} onClick={() => popUpActive('delete', item1)}>
                                                Hủy
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

export default Rental1;