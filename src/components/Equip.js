import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { createEquipment, deleteEquipment, getAllEquipsByFloorID, updateEquipment } from "../redux/actions/equips";
import { getAllFloors } from "../redux/actions/floor";

const Room = () => {
    const equipFromReducer = useSelector(state => state.equip.data)
    const floorsFromReducer = useSelector(state => state.floors.data)
    const [floorId, setFloorId] = useState(0);
    const location = useLocation()
    const dispatch = useDispatch();
    const [isReload, setIsReload] = useState(false)
    useEffect(() => {
        setIsReload(!isReload)
    }, [])
    useEffect(async() => {

        const id = location.pathname.split('/')[2];
        console.log(id)
        setFloorId(Number(id))
        await dispatch(getAllEquipsByFloorID(Number(id)))
        await dispatch(getAllFloors())
        console.log("eee");
        // return () => {
        //     console.log(location.pathname);
        // }
    }, [isReload])

    useEffect(() => {
        setSortedData(equipFromReducer);
    }, [equipFromReducer])

    const [selectedStatus, setSelectedStatus] = useState(0);
    const [sortedData, setSortedData] = useState(equipFromReducer);

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
            setSortedData(equipFromReducer)
            return;
        }
        const searchTerm = e.trim().toLowerCase();

        const tmpRooms = equipFromReducer.filter(emp => emp.equipmentName.toLowerCase().includes(searchTerm));
        setSortedData(tmpRooms);
    }


    const [isShow, setIsShow] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [item, setItem] = useState({})
    const [idItem, setIdItem] = useState({})
    const [isDelete, setIsDelete] = useState(false)

    useEffect(() => {
        if (isUpdate || isDelete) {
            console.log(item)
            setFormData(item)
            setIdItem(item.id)
        }


    }, [isUpdate,isDelete])


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
        }
        else {
            document.querySelector('.dialog__title').textContent = "Thêm trang thiết bị";
        }
    }
    const cancelClick = () => {
        setFormData(initialFormData);
        setIsShow(false);
        setIsUpdate(false);
        setIsDelete(false)
        setItem({})
        document.querySelector('.form-post').classList.remove('active');
    }

    const initialFormData = {
        equipmentName: '',
        equipmentStatus: 1,
        equipmentDesc: '',
        floorId,
    };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        // Cập nhật formData.floorId khi giá trị của floorId thay đổi
        setFormData({ ...formData, floorId: floorId });
    }, [floorId]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'equipmentStatus' ? parseInt(value) : value;
        setFormData({ ...formData, [name]: newValue });
    };
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Thực hiện các xử lý dữ liệu ở đây, ví dụ: gửi dữ liệu lên server
        console.log(formData);
        setFormData(initialFormData);
        if (!isUpdate && !isDelete ) {
            await dispatch(createEquipment(formData))
        } else if(isUpdate){
            await dispatch(updateEquipment(formData, idItem))
            console.log("updattt");
        }else{
            console.log('first')
            await dispatch(deleteEquipment(idItem))
        }
        // Reset form sau khi gửi thành công (tuỳ ý)
        // window.location.reload();
        setIsReload(!isReload)
        cancelClick();
    };



    return (
        <div style={{ minHeight: "100vh" }} className="admin-post__container">
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay" style={{ height: '1000vh' }}></div>
                <div className="form-post" style={{height:isDelete ? '200px' : ''}}>
                    <div className="form-post__title dialog__title">
                        Thêm trang thiết bị
                    </div>
                    <div style={{ display: isDelete ? 'block' : 'none' }}>
                        <div style={{display:'flex',justifyContent:'center',marginTop:'25px'}}>
                            <button type="button" onClick={(e)=>handleSubmit(e)} style={{ borderRadius: '10px', backgroundColor: 'teal', color: 'white' }}>Xác nhận</button>
                            <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange' }}>
                                Hủy
                            </button>
                        </div>
                    </div>
                    <div className="form-post__content" style={{ height: '80%', display: isDelete ? 'none' : 'block' }}>
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
                                            if (floor.id !== floorId) return null;
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


            <div className="admin-post__wrapper" >
                <div style={{ marginTop: '50px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: '1' }}>Trang thiết bị tầng {floorId}</div>
                    <div style={{ flex: '1.5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <form className="search-bar" style={{ height: '30px', fontSize: '15px', borderRadius: '10px' }}>
                            <input style={{ borderRadius: '5px' }}
                                placeholder='Tìm kiếm phòng' type="search" name="search" pattern=".*\S.*"
                                required onChange={(e) => searchRoom(e.target.value)} />
                        </form>
                        <select style={{ width: '150px', height: '30px', fontSize: '15px' }} onChange={(e) => onFilterChange(e)}>
                            <option value={0}>Ngừng hoạt động</option>
                            <option value={1}>Đang hoạt động</option>
                            <option value={2}>Đang bảo trì</option>
                        </select>
                        <div style={{ width: '150px', height: '30px', fontSize: '15px' }} >
                            <button onClick={() => popUpActive()} style={{ backgroundColor: 'teal', color: 'white', borderRadius: '10px' }}>
                                Thêm mới
                            </button>
                        </div>
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
                                        <td style={item.equipmentStatus === 0 ? { color: 'red' } : item.equipmentStatus === 1 ? { color: 'teal' } : { color: 'orange' }}>
                                            {item.equipmentStatus === 0 ? 'Ngừng hoạt động' : item.equipmentStatus === 1 ? 'Đang hoạt động' : 'Đang bảo trì'}
                                        </td>
                                        <td>
                                            <button className="post-edit-item-btn" style={{ width: '150px' }} onClick={() => popUpActive('edit', item)}>
                                                <i className='bx bxs-pencil' style={{ marginRight: '10px' }}></i>
                                                Cập nhật
                                            </button>
                                            <button className="post-delete-btn " style={{ width: '70px', marginLeft: '10px' }} onClick={() => popUpActive('delete', item)}>
                                                Xóa
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