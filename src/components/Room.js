import React, { useEffect, useState, useContext } from "react";
import '../css/order.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllRoomsByFloorID, updateRoom, getAllRooms,createRoom } from "../redux/actions/rooms";
import { getAllCompanys } from "../redux/actions/company";
import { getAllFloors } from "../redux/actions/floor";

import { createRental } from "../redux/actions/rental";
import { Icon } from '@iconify/react';
import { NotifiContext } from "./notify/notify";


const Room = () => {
    const roomFromReducer = useSelector(state => state.room.data)
    const roomsFromReducer = useSelector(state => state.room.data1)

    const floorsFromReducer = useSelector(state => state.floors.data)
    const companysFromReducer = useSelector(state => state.company.data1)
    const [isReload, setIsReload] = useState(false)

    const [floorId, setFloorId] = useState(0);
    const location = useLocation()
    const dispatch = useDispatch();

    const { errorCode, setErrorCode } = useContext(NotifiContext);

    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {

        const id = location.pathname.split('/')[2];
        console.log(id)
        setFloorId(Number(id))
        dispatch(getAllFloors())
        dispatch(getAllCompanys())
        dispatch(getAllRoomsByFloorID(Number(id)))
        dispatch(getAllRooms())
        if (localStorage.getItem("role") === "ROLE_ADMIN") {
            setIsAdmin(true)
        }
        return () => {
            console.log(location.pathname);
        }
    }, [location.pathname, isReload])

    useEffect(() => {
        setSortedData(roomFromReducer);
    }, [roomFromReducer])

    const [selectedStatus, setSelectedStatus] = useState(0);
    const [sortedData, setSortedData] = useState(roomFromReducer);
    const [NumVal, setNumVal] = useState(0);

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
        else if (mode === 'add') {
            document.querySelector('.dialog__title').textContent = "thêm phòng mới";
            // setItem(item)
            setFormData(initialFormData);
            setFormData({ ...formData, floorId: 1, roomStatus: 1 })
            setIsUpdate(true)  
            setCheckAdd(true)  
            }
    }
    const [checkAdd, setCheckAdd] = useState(false)

    const cancelClick = () => {
        setFormData(initialFormData);
        setIsShow(false);
        setIsUpdate(false);
        setIsDelete(false)
        setIsRental(false)
        setIsDetail(false)
        setCheckAdd(false)
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
        reStatus: 1,
        rePrice: 1
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
        if (name === 'roomPrice' && newValue <= 0) {
            setErrorCode("ERROR_MONEY_001")
            newValue = 0;
        }

        const room = roomsFromReducer.find(room => room.roomName === newValue && room.floorId === item.floorId && item.id !== room.id);
        if (name === 'roomName' && room) {
            setErrorCode("ERROR_ROOM_001")
            newValue = value;
        }

        setFormData({ ...formData, [name]: newValue });
    };

    const handleChangeRental = (e) => {

        const { name, value } = e.target;
        let newValue
        if (name === 'rePrice') {
            newValue = value === '' ? '' : parseFloat(value) || 0;
        } else {
            newValue = name === 'companyId' || name === 'roomId' ? parseInt(value) : value;
        }
        // nếu nhập số âm thì giá trị của ô input thay đổi thành 0
        if (newValue <= 0) {
            setNumVal();
            console.log("check number", NumVal);

            setErrorCode("ERROR_MONEY_001")
        }
        else {
            setNumVal(newValue);
        }

        setFormDataRental({ ...formDataRental, [name]: newValue });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Thực hiện các xử lý dữ liệu ở đây, ví dụ: gửi dữ liệu lên server
        setFormData(initialFormData);
        if (!isUpdate && !isDelete && !isRental && !checkAdd ) {
            console.log(formData)
            // await dispatch(createEquipment(formData))
        } else if (isUpdate) {
            // const room = roomsFromReducer.find(room => room.roomName === formData.roomName && room.floorId === formData.floorId && formData.id !== room.id);
            // if (room) {
            //     console.log("phòng có bị trùngggg", room);
            //     setErrorCode("ERROR_ROOM_001")
            //     setIsReload(!isReload)
            //     cancelClick();
            //     return;
            // }
            // if (formData.roomPrice <= 0) {
            //     setErrorCode("ERROR_MONEY_001")
            //     document.getElementById("roomPrice").focus();
            //     return;
            // }
            // await dispatch(updateRoom(formData, idItem))


            const room = roomsFromReducer.find(room => room.roomName === formData.roomName && room.floorId === formData.floorId && formData.id !== room.id);
            if (room) {
                console.log("phòng có bị trùngggg", room);
                setErrorCode("ERROR_ROOM_001")
                setIsReload(!isReload)
                cancelClick();
                return;
            }
            if (formData.roomPrice <= 0) {
                setErrorCode("ERROR_MONEY_001")
                document.getElementById("roomPrice").focus();
                return;
            }
            if(formData.roomName === '' || formData.roomPrice === ''  || formData.roomStatus === '' || formData.floorId === '') {
                setErrorCode("ERROR_ROOM_002")
                return;
            }
            if(checkAdd) {

                const checkRoom = roomsFromReducer.find(room => room.roomName === formData.roomName && room.floorId === (formData.floorId? formData.floorId : 1));
                if(checkRoom) {
                    setErrorCode("ERROR_ROOM_001")
                    return;
                }
                
                setErrorCode("LOG_ROOM_003")
                if (!formData.floorId){
               let dataTmp = {...formData, floorId: companysFromReducer[0].id}
               if (!formData.roomStatus){
                dataTmp = {...dataTmp, roomStatus: 0}
                }
                await dispatch(createRoom(dataTmp))
                }
                else await dispatch(createRoom(formData))
            } else {
                setErrorCode("LOG_ROOM_002")
                console.log("check update", formData);
                await dispatch(updateRoom(formData, idItem))
            }
        }


         else if (isRental) {

            console.log("rentall", formDataRental);
            //reDateBegin:"2023-10-24"
            //reDateEnd:"2023-10-25"
            //formDataRental có 2 trường dữ liệu sau. kiểm tra nếu ngày bắt đầu thuê lớn hơn ngày hết hạn thuê thì thông báo lỗi
            if (formDataRental.reDateBegin > formDataRental.reDateEnd) {
                setErrorCode("ERROR_DATE_001")
                return;
            }

            if (NumVal <= 0) {
                setErrorCode("ERROR_MONEY_001")
                document.getElementById("rePrice").focus();
                return;
            }
            // ngày kết thức thuê phải cách ngày bắt đầu thuê 6 tháng
            let dateBegin = new Date(formDataRental.reDateBegin);
            let dateEnd = new Date(formDataRental.reDateEnd);
            let month = dateEnd.getMonth() - dateBegin.getMonth() + (12 * (dateEnd.getFullYear() - dateBegin.getFullYear()));
            if (month < 6) {
                console.log("lỗi 6 tháng");
                setErrorCode("ERROR_DATE_002")
                return;
            }
            setErrorCode("LOG_ROOM_001")
            await dispatch(createRental(formDataRental))

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
                    <div className="form-post__title dialog__title" style={{ display: isAdmin ? 'block' : 'none' }}>
                        Thêm Phòng
                    </div>
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
                            <div style={{ marginTop: '20px', width: '100%' }}>
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
                                        {priceVND(formData.roomPrice)}
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
                    <div style={{ flex: '1.5' }}>Danh sách các phòng thuộc tầng {floorId}</div>
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
                    <div style={{ width: '150px', height: '30px', fontSize: '15px' }} >
                        <button onClick={() => popUpActive('add')} style={{ backgroundColor: 'teal', color: 'white', borderRadius: '10px' }}>
                            Thêm mới
                        </button>
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
                                            {priceVND(item.roomPrice)}
                                        </td>
                                        <td style={item.roomStatus === 0 ? { color: 'teal' } : item.roomStatus === 1 ? { color: 'orange' } : { color: 'red' }}>
                                            {item.roomStatus === 0 ? 'Đang trống' : item.roomStatus === 1 ? 'Đang sử dụng' : 'Đang bảo trì'}
                                        </td>
                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div id="div_hover" >
                                                <button onClick={() => popUpActive('detail', item)} className="post-edit-item-btn" id="btn_hover" style={{ border: '2px solid pink' }}>

                                                    <Icon icon="basil:info-rect-outline" id="icon_hover" width="24" />
                                                    <span id="spann" >chi tiết</span>
                                                </button>
                                            </div>
                                            {
                                                item.roomStatus != 1 ? (
                                                    <div id="div_hover" >
                                                        <button onClick={() => popUpActive('edit', item)} className="post-edit-item-btn" id="btn_hover" style={{ border: '2px solid orange' }}>

                                                            <Icon icon="jam:write-f" id="icon_hover" width="24" />
                                                            <span id="spann" >cập nhật</span>
                                                        </button>
                                                    </div>) : null
                                            }

                                            {
                                                item.roomStatus === 0 ? (
                                                    <div id="div_hover" >
                                                        <button onClick={() => popUpActive('rental', item)} className="post-edit-item-btn" id="btn_hover" style={{ border: '2px solid teal' }}>

                                                            <Icon icon="tdesign:money" id="icon_hover" width="24" />
                                                            <span id="spann" >Thuê</span>
                                                        </button>
                                                    </div>
                                                ) : null
                                            }



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