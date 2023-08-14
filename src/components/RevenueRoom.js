import React, { useEffect, useState } from "react";
import '../css/order.css';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { getAllFloors } from "../redux/actions/floor";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../css/company.css'
import '../css/form.css'
import '../css/dialog.css'
import { createCompany, deleteCompany, getAllCompanys, updateCompany } from "../redux/actions/company";
import { getAllRentals, getAllRentalsByMonth } from "../redux/actions/rental";
import { getAllRooms } from "../redux/actions/rooms";
const RevenueRoom = () => {
  const rentalsFromReducer = useSelector(state => state.rental.data1)
  const companysFromReducer = useSelector(state => state.company.data1)
  const roomsFromReducer = useSelector(state => state.room.data1)
  const rentalMonthReducer = useSelector(state => state.rental.dataMonth)

  const location = useLocation()
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllCompanys())
    dispatch(getAllRentals())
    dispatch(getAllRooms())
    dispatch(getAllRentalsByMonth())

    return () => {
      console.log(location.pathname);
    }
  }, [location.pathname])
  useEffect(() => {
    setSortedData(rentalMonthReducer)
  }, [rentalMonthReducer])

  const [selectedStatus, setSelectedStatus] = useState(0);
  const [sortedData, setSortedData] = useState(rentalMonthReducer);
  const [isMonth, setIsMonth] = useState(false);

  const onFilterChange = (e) => {
    setSelectedStatus(e.target.value);
  }

  useEffect(() => {
    // const dataCopy = [...sortedData];
    // dataCopy.sort(sortByStatus);
    // setSortedData(dataCopy);
    if (selectedStatus === '0') {
      setIsMonth(false)
    } else if (selectedStatus === '1') {
      setIsMonth(true)
    }
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

  const searchRoom = (e) => {
    if (e.trim().length === 0) {
      setSortedData(rentalMonthReducer)
      return;
    }
    const searchTerm = e.trim().toLowerCase();
    const tmpRooms = rentalMonthReducer.filter(emp => emp.cusName.toLowerCase().includes(searchTerm));
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

  const popUpActive = (mode, item) => {
    setIsShow(true);
    document.querySelector('.form-post').classList.add('active');
    if (mode === "edit") {
      setIsUpdate(true)
      setItem(item)
      document.querySelector('.dialog__title').textContent = "Cập nhật công ty";
    } else if (mode === 'delete') {
      setIsDelete(true)
      setItem(item)
      document.querySelector('.dialog__title').textContent = "Bạn có chắc chắn xóa?";
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
  };

  const cancelClick = () => {
    setFormData(initialFormData);
    setIsShow(false);
    setIsUpdate(false);
    setIsDelete(false)
    setItem({})
    document.querySelector('.form-post').classList.remove('active');
  }
  const initialFormDataDate = {
    reYear: new Date('2023-01-01'),
    reMonth: '12',
  };
  const [formData, setFormData] = useState(initialFormData);
  const [formDataDate, setFormDataDate] = useState(initialFormDataDate);

  console.log(formDataDate)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện các xử lý dữ liệu ở đây, ví dụ: gửi dữ liệu lên server
    setFormData(initialFormData);
    if (!isUpdate && !isDelete) {
      dispatch(createCompany(formData))
    } else if (isUpdate) {
      dispatch(updateCompany(formData, idItem))
    } else {
      dispatch(deleteCompany(idItem))
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
    const company = rentalMonthReducer.find(company => company.id === companyId);
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
  return (
    <div style={{ minHeight: "100vh" }} className="admin-post__container">
      <div style={{ display: isShow ? 'block' : 'none' }} className="modal">
        <div className="modal_overlay" style={{ height: '1000vh' }}></div>
        <div className="form-post" style={{ height: isDelete ? '200px' : '' }}>
          <div className="form-post__title dialog__title">
            Thêm công ty
          </div>
          <div style={{ display: isDelete ? 'block' : 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
              <button type="button" onClick={(e) => handleSubmit(e)} style={{ borderRadius: '10px', backgroundColor: 'teal', color: 'white' }}>Xác nhận</button>
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
                    type="text"
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
            <select style={{ width: '120px', height: '30px', fontSize: '15px' }} onChange={(e) => onFilterChange(e)}>
              <option defaultChecked value={0}>Theo tháng</option>
              <option value={1}>Tùy chỉnh</option>
            </select>
          </div>
        </div>
        <div style={{ display: !isMonth ? 'block' : 'none', marginBottom: '20px' }}>
          <span style={{ marginRight: '10px' }}>Tháng</span>
          <DatePicker
            selected={new Date(formDataDate.reYear)}
            onChange={(date) => setFormDataDate({ ...formDataDate, reYear: date })}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            style={{ borderRadius: '10px', padding: '5px' }}
          />

        </div>
        <div style={{ display: isMonth ? 'block' : 'none' }}>
          <button>chỉnh</button>
        </div>
        <div className="admin-post__body">
          <table id="admin-post__table">
            <tbody>
              <tr>
                <th>STT</th>
                <th style={{ width: '200px' }}>Tên công ty</th>
                <th style={{ width: '180px' }}>Mã số thuế</th>
                <th style={{ width: '180px' }}>Tiền</th>
                <th style={{ width: '250px' }}>Thao tác</th>

              </tr>
              {
                sortedData?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.cusName}</td>
                    <td>{item?.cusTaxCode}</td>
                    <td>50000000 VND </td>
                    <td>
                      <button className="post-edit-item-btn" style={{ width: '150px' }} onClick={() => popUpActive('edit', item)}>
                        Chi tiết
                      </button>
                      {/* <button className="post-delete-btn " style={{ width: '70px', marginLeft: '10px' }} onClick={() => popUpActive('delete', item)}>
                        Xóa
                      </button> */}
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

export default RevenueRoom;