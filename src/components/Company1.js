import React, { useContext, useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFloors } from "../redux/actions/floor";
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { createCompany, deleteCompany, getAllCompanys, updateCompany } from "../redux/actions/company";
import { getAllRentals } from "../redux/actions/rental";
import { Icon } from '@iconify/react';
import { NotifiContext } from "./notify/notify";

const Company1 = () => {
    const companysFromReducer = useSelector(state => state.company.data1)
    const rentalsFromReducer = useSelector(state => state.rental.data1)
    const { setErrorCode } = useContext(NotifiContext);
    const location = useLocation()
    const dispatch = useDispatch();
    const [isReload, setIsReload] = useState(false)

    useEffect(() => {
        dispatch(getAllCompanys())
        dispatch(getAllRentals())
        dispatch(getAllFloors())

        return () => {
            console.log(location.pathname);
        }
    }, [location.pathname, isReload])
    useEffect(() => {
        setSortedData(companysFromReducer)
    }, [companysFromReducer, isReload])

    const [selectedStatus, setSelectedStatus] = useState(0);
    const [sortedData, setSortedData] = useState(companysFromReducer);

    useEffect(() => {
        const dataCopy = [...sortedData];
        dataCopy.sort(sortByStatus);
        setSortedData(dataCopy);
    }, [selectedStatus, isReload]);

    const sortByStatus = (a, b) => {
        if ((a.equipmentStatus) === +selectedStatus) {
            return -1;
        }
        if (b.equipmentStatus === +selectedStatus) {
            return 1;
        }
        return 0;
    };

    // const onFilterChange = (e) => {
    //     setSelectedStatus(e.target.value);
    // }

    const searchRoom = (e) => {
        if (e.trim().length === 0) {
            setSortedData(companysFromReducer)
            return;
        }
        const searchTerm = e.trim().toLowerCase();
        const tmpRooms = companysFromReducer.filter(emp => emp.cusName.toLowerCase().includes(searchTerm));
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


    }, [isUpdate, isDelete])

    function checkDelete(id) {
        const data = rentalsFromReducer.filter(comp => comp.companyId === id)
        if (data.length === 0)
            return false
        return true
    }
    const [isCheckDelete, setIsCheckDelete] = useState(false)
    const [isRental, setIsRental] = useState(false)

    const popUpActive = (mode, item) => {
        setIsShow(true);
        document.querySelector('.form-post').classList.add('active');
        if (mode === "edit") {
            console.log("iteam", item);
            setIsUpdate(true)
            setItem(item)
            document.querySelector('.dialog__title').textContent = "Cập nhật công ty";
        } else if (mode === 'delete') {
            setIsDelete(true)
            setItem(item)
            if (checkDelete(item.id)) {
                setIsCheckDelete(true)
                document.querySelector('.dialog__title').textContent = "Công ty đang thuê không thể xóa";
            } else {
                setIsCheckDelete(false)
                document.querySelector('.dialog__title').textContent = "Bạn có chắc chắn xóa?";
            }
        }
        else {
            document.querySelector('.dialog__title').textContent = "Thêm công ty";
        }
    }
    const initialFormData = {
        cusName: '',
        cusEmail: '',
        cusPhone: '',
        cusTaxCode: '',
        cusStatus: 0
    };
    const cancelClick = () => {
        setFormData(initialFormData);
        setIsShow(false);
        setIsUpdate(false);
        setIsDelete(false)
        setIsRental(false)
        setIsCheckDelete(false)
        setItem({})
        document.querySelector('.form-post').classList.remove('active');
    }

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Thực hiện các xử lý dữ liệu ở đây, ví dụ: gửi dữ liệu lên server
        if (!isUpdate && !isDelete) {
            if (formData.cusName === '' || formData.cusEmail === '' || formData.cusPhone === '' || formData.cusTaxCode === '') {
                setErrorCode("ERROR_COMPANY_002")
                return
            }
            if (companysFromReducer.find(comp => comp.cusName === formData.cusName)) {
                setErrorCode("ERROR_COMPANY_003")
                document.getElementById('cusName').focus()
                return
            }
            if (companysFromReducer.find(comp => comp.cusEmail === formData.cusEmail)) {
                setErrorCode("ERROR_EMAIL_001")
                document.getElementById('cusEmail').focus()
                return
            }
            if (companysFromReducer.find(comp => comp.cusPhone === formData.cusPhone)) {
                setErrorCode("ERROR_PHONE_001")
                document.getElementById('cusPhone').focus()
                return
            }
            if (companysFromReducer.find(comp => comp.cusTaxCode === formData.cusTaxCode)) {
                setErrorCode("ERROR_TAX_001")
                document.getElementById('cusTaxCode').focus()
                return
            }
            await dispatch(createCompany(formData))
            setErrorCode("LOG_COMPANY_001")

        } else if (isUpdate) {

            if (formData.cusName === '' || formData.cusEmail === '' || formData.cusPhone === '' || formData.cusTaxCode === '') {

                setErrorCode("ERROR_COMPANY_002")
                return
            }
            if (companysFromReducer.find(comp => comp.cusName === formData.cusName && comp.id !== formData.id)) {
                setErrorCode("ERROR_COMPANY_003")
                document.getElementById('cusName').focus()
                return
            }
            if (companysFromReducer.find(comp => comp.cusEmail === formData.cusEmail && comp.id !== formData.id)) {
                setErrorCode("ERROR_EMAIL_001")
                document.getElementById('cusEmail').focus()
                return
            }
            if (companysFromReducer.find(comp => comp.cusPhone === item.cusPhone && comp.id !== item.id)) {
                setErrorCode("ERROR_PHONE_001")
                document.getElementById('cusPhone').focus()
                return
            }
            if (companysFromReducer.find(comp => comp.cusTaxCode === formData.cusTaxCode && comp.id !== formData.id)) {

                setErrorCode("ERROR_TAX_001")
                document.getElementById('cusTaxCode').focus()
                return
            }


            await dispatch(updateCompany(formData, idItem))

            setErrorCode("LOG_COMPANY_002")

        } else {
            const data = { ...item, cusStatus: 1 }
            await dispatch(updateCompany(data, item.id))
            setErrorCode("LOG_COMPANY_003")
        }
        // Reset form sau khi gửi thành công (tuỳ ý)
        // window.location.reload();
        setIsReload(!isReload)
        cancelClick();
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValue = name === 'equipmentStatus' || name === 'floorId' ? parseInt(value) : value;
        setFormData({ ...formData, [name]: newValue });
    };
    return (
        <div style={{ minHeight: "100vh" }} className="admin-post__container">
            <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
                <div className="modal_overlay" style={{ height: '1000vh' }}></div>
                <div className="form-post" style={{ height: isDelete ? '200px' : '' }}>
                    <div className="form-post__title dialog__title">
                        Thêm công ty
                    </div>
                    <div style={{ display: isDelete ? 'block' : 'none' }}>
                        <div style={{ display: !isCheckDelete ? 'block flex' : 'none', justifyContent: 'center', marginTop: '25px' }}>
                            <button type="button" onClick={(e) => handleSubmit(e)} style={{ borderRadius: '10px', backgroundColor: 'teal', color: 'white' }}>Xác nhận</button>
                            <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange' }}>
                                Hủy
                            </button>
                        </div>
                        <div style={{ display: isCheckDelete ? 'block flex' : 'none', justifyContent: 'center', marginTop: '25px' }}>
                            <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange', marginTop: '40px' }}>
                                Đóng
                            </button>
                        </div>
                    </div>
                    <div className="form-post__content" style={{ height: '80%', display: isDelete ? 'none' : 'block' }}>
                        <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '50px', marginRight: '50px' }}>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Tên công ty:
                                    </span>
                                    <input
                                        style={{ marginLeft: '10px', borderRadius: '10px', flex: '3.5' }}
                                        type="text"
                                        id='cusName'
                                        name="cusName"
                                        value={formData.cusName}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Email công ty:
                                    </span>
                                    <input
                                        style={{ marginLeft: '10px', borderRadius: '10px', flex: '3.5' }}
                                        type="text"
                                        id='cusEmail'
                                        name="cusEmail"
                                        value={formData.cusEmail}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Điện thoại:
                                    </span>
                                    <input
                                        style={{ marginLeft: '10px', borderRadius: '10px', flex: '3.5' }}
                                        type="number"
                                        id='cusPhone'
                                        name="cusPhone"
                                        value={formData.cusPhone}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                            </div>
                            <div style={{ marginTop: '20px', width: '100%' }}>
                                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <span style={{ flex: '1' }}>
                                        Mã số thuế:
                                    </span>
                                    <input
                                        style={{ marginLeft: '10px', borderRadius: '10px', flex: '3.5' }}
                                        type="text"
                                        id='cusTaxCode'
                                        name="cusTaxCode"
                                        value={formData.cusTaxCode}
                                        onChange={handleChange}
                                        required
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
                </div>
            </div>

            <div className="admin-post__wrapper">
                <div style={{ marginTop: '50px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: '1.5' }}>Danh sách công ty</div>
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
                                <th style={{ width: '200px' }}>Tên</th>
                                <th style={{ width: '240px' }}>Email</th>
                                <th style={{ width: '180px' }}>Điện thoại</th>
                                <th style={{ width: '160px' }}>Mã số thuế</th>
                                <th style={{ width: '250px' }}>Thao tác</th>
                            </tr>
                            {
                                sortedData?.map((item, index) => {
                                    if (item.cusStatus === 0) {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item?.cusName}</td>
                                                <td>{item?.cusEmail} </td>
                                                <td>{item?.cusPhone} </td>
                                                <td>{item?.cusTaxCode} </td>
                                                <td style={{ display: "flex", justifyContent: "center" }}>
                                                    <div id="div_hover" >
                                                        <button onClick={() => popUpActive('edit', item)} className="post-edit-item-btn" id="btn_hover" style={{ border: '2px solid pink' }}>

                                                            <Icon icon="jam:write-f" id="icon_hover" width="24" />
                                                            <span id="spann" >Cập nhật </span>
                                                        </button>
                                                    </div>
                                                    <div id="div_hover" >
                                                        <button onClick={() => popUpActive('delete', item)} className="post-edit-item-btn" id="btn_hover" style={{ border: '2px solid red' }}>

                                                            <Icon icon="material-symbols:delete-outline" id="icon_hover" width="24" />
                                                            <span id="spann" >Xóa </span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }
                                }
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Company1;