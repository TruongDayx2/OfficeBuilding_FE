import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { cancelRental, getAllRentals } from "../redux/actions/rental";
import { getAllCompanys } from "../redux/actions/company";
import { getAllRooms } from "../redux/actions/rooms";
import { Icon } from '@iconify/react';

const Rental1 = () => {
    const rentalsFromReducer = useSelector(state => state.rental.data1)
    const companysFromReducer = useSelector(state => state.company.data1)
    const roomsFromReducer = useSelector(state => state.room.data1)

    const location = useLocation()
    const dispatch = useDispatch();

    const [isShow, setIsShow] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [item, setItem] = useState({})
    const [idItem, setIdItem] = useState({})
    const [isDelete, setIsDelete] = useState(false)
    const [isDetail, setIsDetail] = useState(false)
    const [isReload, setIsReload] = useState(false)


    useEffect(() => {
        dispatch(getAllRentals())
        dispatch(getAllCompanys())
        dispatch(getAllRooms())
        return () => {
            console.log(location.pathname);
        }
    }, [location.pathname, isDelete,isReload])

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

        const updatedResultArray = rentalsFromReducer.filter(item => tmpRooms.some(company => company.id === item.companyId));
        setSortedData(updatedResultArray);
    }




    useEffect(() => {
        if (isUpdate || isDelete || isDetail) {
            setFormData(item)
            setIdItem(item.id)
            console.log("item", item);
            console.log("idItem", item.id);
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
            document.querySelector('.dialog__title').textContent = "Bạn có chắc chắn hoàn tất?";
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Thực hiện các xử lý dữ liệu ở đây, ví dụ: gửi dữ liệu lên server
        console.log(formData);
        setFormData(initialFormData);
        if (isDelete) {
            const currentDate = new Date()
            const year = currentDate.getFullYear();
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const day = currentDate.getDate().toString().padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            console.log("item rental",item);
            await dispatch(cancelRental(idItem, formattedDate))

        }
        // Reset form sau khi gửi thành công (tuỳ ý)
        // window.location.reload();
        setIsReload(!isReload)
        cancelClick();
    };


    const CompanyName = ({ companyId }) => {
        const company = companysFromReducer.find(company => company.id === companyId);
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
                <div>{priceVND(room.roomPrice)}</div>
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
                                <span style={{ flex: '1', fontWeight: '500', display: 'flex' }}>
                                    {formData.id}<CompanyName companyId={formData.companyId} />{formData.companyId}{formData.roomId}
                                </span>
                            </label>
                        </div>
                        <div style={{ marginTop: '20px', width: '100%' }}>
                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <span style={{ flex: '1' }}>
                                    Tiền thuê (tháng):
                                </span>
                                <span style={{ flex: '1', fontWeight: '500' }}>
                                    {/* <RentMonth roomId={formData.roomId} /> */}
                                    {priceVND(formData.rePrice)}
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
                        <div style={{ marginTop: '20px', width: '100%' }}>
                            <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <span style={{ flex: '1' }}>
                                    Trạng thái:
                                </span>
                                <span style={{ flex: '1', fontWeight: '500' }}>
                                    {item.reStatus === 0 ? 'Hết hạn' : 'Còn hạn'}
                                </span>
                            </label>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '40px' }}>
                            <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange' }}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="admin-post__wrapper">
                <div style={{ marginTop: '50px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: '3' }}>Danh sách hợp đồng thuê phòng</div>
                    <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <form className="search-bar" style={{ height: '30px', fontSize: '15px', borderRadius: '10px' }}>
                            <input style={{ borderRadius: '5px', width: '250px' }}
                                placeholder='Tìm kiếm công ty' type="search" name="search" pattern=".*\S.*"
                                required onChange={(e) => searchRoom(e.target.value)} />
                        </form>

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
                                <th style={{ width: '105px' }}>Tình trạng</th>
                                <th style={{ width: '200px' }}>Thao tác</th>

                            </tr>
                            {
                                sortedData?.map((item1, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <span style={{ display: 'flex' }}>
                                                {item1?.id}<CompanyName companyId={item1?.companyId} />{item1?.companyId}{item1?.roomId}
                                            </span>
                                        </td>
                                        <td>
                                            <CompanyName companyId={item1?.companyId} />
                                        </td>
                                        <td>
                                            <RoomName roomId={item1?.roomId} />
                                        </td>
                                        <td style={item1?.reStatus === 0 ? { color: 'orange' } : { color: 'teal' }}>
                                            {item1?.reStatus === 0 ? 'Hết hạn' : 'Còn hạn'}
                                        </td>

                                        <td style={{ display: 'flex', justifyContent: 'center' }}>
                                            <div id="div_hover" >
                                                <button onClick={() => popUpActive('detail', item1)} className="post-edit-item-btn" id="btn_hover" style={{ border: '2px solid pink' }}>

                                                    <Icon icon="basil:info-rect-outline" id="icon_hover" width="24" />
                                                    <span id="spann" >chi tiết</span>
                                                </button>
                                            </div>

                                            {
                                                item1.reStatus === 1? (

                                                    <div id="div_hover" >
                                                        <button onClick={() => popUpActive('delete', item1)} className="post-edit-item-btn" id="btn_hover" style={{ border: '2px solid red' }}>

                                                            <Icon icon="typcn:tick" id="icon_hover" width="24" />
                                                            <span id="spann" >Hoàn tất</span>
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

export default Rental1;