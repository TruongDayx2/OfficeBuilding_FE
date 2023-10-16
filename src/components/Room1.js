import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllRooms, updateRoom } from "../redux/actions/rooms";
import { getAllCompanys } from "../redux/actions/company";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createRental } from "../redux/actions/rental";
import { getAllFloors } from "../redux/actions/floor";
import { Icon } from '@iconify/react';

const Room1 = () => {
    const roomsFromReducer = useSelector(state => state.room.data1)
    const companysFromReducer = useSelector(state => state.company.data1)
    const floorsFromReducer = useSelector(state => state.floors.data)
    const [isReload, setIsReload] = useState(false)

    const location = useLocation()
    const dispatch = useDispatch();
    const dataLogin = useSelector(state => state.login.data);
    console.log("dataa",dataLogin);

    useEffect(() => {
        dispatch(getAllRooms())
        dispatch(getAllCompanys())
        dispatch(getAllFloors())

        return () => {
        }
    }, [location.pathname,isReload])

    useEffect(() => {
        setSortedData(roomsFromReducer)
    }, [roomsFromReducer])

    const [selectedStatus, setSelectedStatus] = useState(0);
    const [sortedData, setSortedData] = useState(roomsFromReducer);

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
            setSortedData(roomsFromReducer)
            return;
        }
        const searchTerm = e.trim().toLowerCase();

        const tmpRooms = roomsFromReducer.filter(emp => emp.roomName.toLowerCase().includes(searchTerm));
        setSortedData(tmpRooms);
    }
    const [isShow, setIsShow] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [item, setItem] = useState({})
    const [idItem, setIdItem] = useState({})
    const [isDelete, setIsDelete] = useState(false)
    const [isRental, setIsRental] = useState(false)
    const [isDetail, setIsDetail] = useState(false)

    const popUpActive = (mode, item) => {
        setIsShow(true);
        document.querySelector('.form-post').classList.add('active');
        if (mode === "edit") {
            setIsUpdate(true)
            setItem(item)
            document.querySelector('.dialog__title').textContent = "Cập nhật phòng";
        }
        else if (mode === 'delete') {
            setIsDelete(true)
            setItem(item)
            document.querySelector('.dialog__title').textContent = "Bạn có chắc chắn xóa?";
        }
        else if (mode === 'rental') {
            document.querySelector('.dialog__title').textContent = "Hợp đồng thuê phòng";
            setItem(item)
            setFormDataRental({ ...formDataRental, roomId: item.id });
            setIsRental(true)
        } else if (mode === 'detail') {
            document.querySelector('.dialog__title').textContent = "Chi tiết phòng";
            setItem(item)
            setIsDetail(true)
        }
    }

    const cancelClick = () => {
        setFormData(initialFormData);
        setIsShow(false);
        setIsUpdate(false);
        setIsDelete(false)
        setIsRental(false)
        setIsDetail(false)
        setItem({})
        document.querySelector('.form-post').classList.remove('active');
    }

    const initialFormData = {
        roomName: '',
        roomPrice: 1,
        roomDesc: '',
        roomStatus: 1,
        floorId: 1
    };
    const initialrentalData = {
        companyId: 1,
        roomId: 1,
        reDateBegin: new Date().toISOString().split('T')[0], // Định dạng YYYY-MM-DD
        reDateEnd: new Date().toISOString().split('T')[0], // Định dạng YYYY-MM-DD
        reStatus:1,
        rePrice:0
    }
    const [formData, setFormData] = useState(initialFormData);
    const [formDataRental, setFormDataRental] = useState(initialrentalData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue
        if (name === 'roomPrice') {
            // Validate if the input is a valid number
            newValue = value === '' ? '' : parseFloat(value) || 0;
        } else if (name === 'roomStatus' || name === 'floorId') {
            newValue = parseInt(value);
        } else {
            newValue = value;
        }
        setFormData({ ...formData, [name]: newValue });
    };
    const handleChangeRental = (e) => {
        const { name, value } = e.target;
        let newValue
        if (name === 'rePrice') {
            newValue = value === '' ? '' : parseFloat(value) || 0;
        }else{
            newValue = name === 'companyId' || name === 'roomId' ? parseInt(value) : value;
        }

        setFormDataRental({ ...formDataRental, [name]: newValue });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Thực hiện các xử lý dữ liệu ở đây, ví dụ: gửi dữ liệu lên server
        setFormData(initialFormData);
        if (!isUpdate && !isDelete && !isRental) {
            console.log(formData)
            // dispatch(createEquipment(formData))
        } else if (isUpdate) {
            dispatch(updateRoom(formData, idItem))
        } else if (isRental) {
            dispatch(createRental(formDataRental))
        }
        // Reset form sau khi gửi thành công (tuỳ ý)
        // window.location.reload();
        setIsReload(!isReload)
        cancelClick();
    };

    useEffect(() => {
        if (isRental || isUpdate || isDetail) {
            setFormData(item)
            setIdItem(item.id)
        }
    }, [isRental, isUpdate, isDetail])
    const FloorName = ({ floorId }) => {
        const floor = floorsFromReducer.find(floor => floor.id === floorId);
        if (floor) {
            return (
                <div>{floor.floorName}</div>
            );
        }
        else {
            return <div>Đang tải...</div>; // Bạn có thể hiển thị thông báo tải hoặc xử lý trường hợp này theo cách khác
        }
    }
    function priceVND(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
      }
    return (
        <div style={{ maxWidth: "1100px", minHeight: "100vh" }} className="admin-post__container">
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
                    <div className="form-post__content" style={{ height: '80%', display: isRental ? 'block' : 'none' }}>
                        <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '50px', marginRight: '50px' }}>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    Tên công ty:
                                    <select name="companyId" value={formDataRental.companyId} onChange={handleChangeRental} style={{ marginLeft: '10px', borderRadius: '10px' }}>
                                        {companysFromReducer.map((company) => {
                                            return (
                                                <option key={company.id} value={company.id} >
                                                    {company.cusName}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Tên phòng:
                                    </span>
                                    <span style={{ flex: '1', fontWeight: '500' }}>
                                        {formData.roomName}
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
                                        Tiền thuê (tháng):
                                    <span style={{ flex: '2.5' }}>
                                    <input
                                        style={{ marginLeft: '10px', borderRadius: '10px', flex: '2.5' }}
                                        type="number"
                                        id='rePrice'
                                        name='rePrice'
                                        value={formDataRental.rePrice}
                                        onChange={handleChangeRental}
                                        required
                                    />
                                    VND
                                    </span>
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ marginRight: '10px' }}>
                                        Ngày bắt đầu thuê:
                                    </span>
                                    <DatePicker
                                        selected={new Date(formDataRental.reDateBegin)}
                                        onChange={(date) => setFormDataRental({ ...formDataRental, reDateBegin: date.toISOString().split('T')[0] })}
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
                                        selected={new Date(formDataRental.reDateEnd)}
                                        onChange={(date) => setFormDataRental({ ...formDataRental, reDateEnd: date.toISOString().split('T')[0] })}
                                        dateFormat="yyyy-MM-dd"
                                        minDate={new Date()}
                                        style={{ borderRadius: '10px', padding: '5px' }}
                                    />
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
                    <div className="form-post__content" style={{ height: '80%', display: isUpdate ? 'block' : 'none' }}>
                        <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '50px', marginRight: '50px' }}>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    Tên phòng:
                                    <input
                                        style={{ borderRadius: '10px', marginLeft: '10px' }}
                                        type="text"
                                        id='roomName'
                                        name="roomName"
                                        value={formData.roomName}
                                        onChange={handleChange}
                                        required
                                    />

                                </label>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <label>
                                    Tầng :
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
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    Tiền thuê (tháng):
                                    <span style={{ flex: '2.5', fontWeight: '500' }}>
                                        <input
                                            style={{ marginLeft: '10px', marginRight: '10px', borderRadius: '10px', flex: '2.5' }}
                                            type="number"
                                            id='roomPrice'
                                            name="roomPrice"
                                            value={formData.roomPrice}
                                            onChange={handleChange}
                                            required
                                        />
                                         VND
                                    </span>


                                </label>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <label>
                                    Trạng thái:
                                    <select name="roomStatus" value={formData.roomStatus} onChange={handleChange} style={{ marginLeft: '10px', borderRadius: '10px' }}>
                                        <option value={0}>Đang trống</option>
                                        <option value={2}>Đang bảo trì</option>
                                    </select>
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    Mô tả:
                                    <input
                                        style={{ borderRadius: '10px', marginLeft: '10px', width: '400px' }}
                                        type="text"
                                        id='roomDesc'
                                        name="roomDesc"
                                        value={formData.roomDesc}
                                        onChange={handleChange}
                                    />

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
                    <div className="form-post__content" style={{ height: '80%', display: isDetail ? 'block' : 'none' }}>
                        <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '50px', marginRight: '50px' }}>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Tên phòng:
                                    </span>
                                    <span style={{ flex: '1', fontWeight: '500' }}>
                                        {formData.roomName}
                                    </span>
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%'  }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Vị trí:
                                    </span>
                                    <span style={{ flex: '1', fontWeight: '500' }}>
                                        <FloorName floorId={formData.floorId} />
                                    </span>

                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Tiền thuê (tháng):
                                    </span>
                                    <span style={{ flex: '1', fontWeight: '500' }}>
                                        {priceVND(formData.roomPrice) }
                                    </span>
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Trạng thái:
                                    </span>
                                    <span style={{ flex: '3', fontWeight: '500' }}>
                                        {formData.roomStatus === 1 ? 'Đang sử dụng' : formData.roomStatus === 0 ? 'Đang trống' : 'Đang bảo trì'}
                                    </span>
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Mô tả:
                                    </span>
                                    <span style={{ flex: '3', fontWeight: '500' }}>
                                        {formData.roomDesc}
                                    </span>
                                </label>
                            </div>

                            <div style={{ marginTop: '50px', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange' }}>
                                    Đóng
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <div className="admin-post__wrapper">
                <div style={{ marginTop: '100px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: '1.5' }}>Danh sách các phòng</div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <form className="search-bar" style={{ height: '30px', fontSize: '15px', borderRadius: '10px' }}>
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
                                <th style={{ width: '90px' }}>Tầng</th>
                                <th style={{ width: '120px' }}>Giá (VND)</th>
                                <th style={{ width: '150px' }}>Trạng thái</th>
                                <th style={{ width: '190px' }}>Thao tác</th>

                            </tr>
                            {
                                sortedData?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item?.roomName}</td>
                                        <td>
                                            <FloorName floorId={item?.floorId} />
                                        </td>
                                        <td>
                                            {priceVND(item.roomPrice )}
                                        </td>
                                        <td style={item.roomStatus === 0 ? { color: 'teal' } : item.roomStatus === 1 ? { color: 'orange' } : { color: 'red' }}>
                                            {item.roomStatus === 0 ? 'Đang trống' : item.roomStatus === 1 ? 'Đang sử dụng' : 'Đang bảo trì'}
                                        </td>
                                        <td style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                        <div id="div_hover" >
                                                <button onClick={() => popUpActive('detail', item)} className="post-edit-item-btn" id="btn_hover" style={{ border: '2px solid pink'}}>

                                                    <Icon icon="basil:info-rect-outline" id="icon_hover" width="24" />
                                                    <span id="spann" >chi tiết</span>
                                                </button>
                                            </div>
                                            <div id="div_hover" >
                                                <button onClick={() => popUpActive('edit', item)} className="post-edit-item-btn" id="btn_hover" style={{ border: '2px solid orange'}}>

                                                    <Icon icon="jam:write-f" id="icon_hover"  width="24" />
                                                    <span id="spann" >cập nhật</span>
                                                </button>
                                            </div>
                                            <div id="div_hover" >
                                                <button onClick={() => popUpActive('rental', item)} className="post-edit-item-btn" id="btn_hover" style={{ border: '2px solid teal'}}>

                                                    <Icon icon="tdesign:money" id="icon_hover"  width="24" />
                                                    <span id="spann" >Thuê</span>
                                                </button>
                                            </div>
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

export default Room1;