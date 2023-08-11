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
import { getAllCompanys } from "../redux/actions/company";
import { createService, getAllServices, updateService } from "../redux/actions/service";
import { getAllRentals, getAllRentalsByStatus } from "../redux/actions/rental";
import { getAllRooms } from "../redux/actions/rooms";
import { createServiceContract, getAllServiceContract } from "../redux/actions/serviceContract";
const Service1 = () => {
  const companysRentalStatus = useSelector(state => state.rental.dataStatus)
  const servicesFromReducer = useSelector(state => state.service.data1)
  const roomsFromReducer = useSelector(state => state.room.data1)
  const companysFromReducer = useSelector(state => state.company.data1)
  const serContractsFromReducer = useSelector(state => state.serviceContract.data1)


  const location = useLocation()
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllRooms())
    dispatch(getAllCompanys())
    dispatch(getAllFloors())
    dispatch(getAllServices())
    dispatch(getAllRentalsByStatus(1))
    dispatch(getAllServiceContract())

    return () => {
      console.log(location.pathname);
    }
  }, [location.pathname])

  useEffect(() => {
    setSortedData(servicesFromReducer)
  }, [servicesFromReducer])

  const [sortedData, setSortedData] = useState(servicesFromReducer);



  const searchRoom = (e) => {
    if (e.trim().length === 0) {
      setSortedData(servicesFromReducer)
      return;
    }
    const searchTerm = e.trim().toLowerCase();
    const tmpRooms = servicesFromReducer.filter(emp => emp.serviceName.toLowerCase().includes(searchTerm));
    setSortedData(tmpRooms);
  }

  const [isShow, setIsShow] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false)
  const [item, setItem] = useState({})
  const [idItem, setIdItem] = useState({})
  const [isDelete, setIsDelete] = useState(false)
  const [isRental, setIsRental] = useState(false)

  useEffect(() => {
    if (isUpdate || isDelete || isRental) {
      setFormData(item)
      setIdItem(item.id)
    }


  }, [isUpdate, isDelete, isRental])

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
    } else if (mode === 'create') {
      document.querySelector('.dialog__title').textContent = "Thêm dịch vụ";
    } else if (mode === 'rental') {
      document.querySelector('.dialog__title').textContent = "Hợp đồng dịch vụ";
      setItem(item)
      setIsRental(true)
      setFormDataRental({ ...formDataRental, serviceId: item.id });

    }
  }
  const initialFormData = {
    serviceName: '',
    servicePrice: 0,
    serviceDesc: '',
  };
  const initialrentalData = {
    serviceId: 1,
    companyId: 1,
    scDateBegin: new Date().toISOString().split('T')[0], // Định dạng YYYY-MM-DD
    scDateEnd: new Date().toISOString().split('T')[0], // Định dạng YYYY-MM-DD
    scStatus: 1
  }
  const cancelClick = () => {
    setFormData(initialFormData);
    setIsShow(false);
    setIsUpdate(false);
    setIsDelete(false)
    setIsRental(false)
    setItem({})
    document.querySelector('.form-post').classList.remove('active');
  }

  const [formData, setFormData] = useState(initialFormData);
  const [formDataRental, setFormDataRental] = useState(initialrentalData);
  const handleChangeRental = (e) => {
    const { name, value } = e.target;
    console.log(value)
    const newValue = name === 'companyId' || name === 'serviceId' || name === 'scStatus' ? parseInt(value) : value;

    setFormDataRental({ ...formDataRental, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện các xử lý dữ liệu ở đây, ví dụ: gửi dữ liệu lên server
    setFormData(initialFormData);
    if (!isUpdate && !isDelete && !isRental) {
      dispatch(createService(formData))
    } else if (isUpdate) {
      dispatch(updateService(formData, idItem))
    } else if (isRental) {
      dispatch(createServiceContract(formDataRental))

    }
    // Reset form sau khi gửi thành công (tuỳ ý)
    window.location.reload();
    cancelClick();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue
    if (name === 'servicePrice') {
      // Validate if the input is a valid number
      newValue = value === '' ? '' : parseFloat(value) || 0;
    } else {
      newValue = value; // For other fields, use the entered value as is
    }
    setFormData({ ...formData, [name]: newValue });
  };

  function filterDuplicates(arr) {
    const uniqueCompanies = {};

    const filteredArray = arr.filter((obj) => {
      if (!uniqueCompanies[obj.companyId]) {
        uniqueCompanies[obj.companyId] = true;
        return true;
      }
      return false;
    });

    const data = serContractsFromReducer.filter(comp => comp.serviceId === item.id)
    if (data.length === filteredArray.length){
      return []
    }
    console.log(data)
    let data1 = []
    if(data.length>0){
       data1 = filteredArray.filter(comp => {
        return data.some(contract => contract.companyId !== comp.companyId);
      });
    }
 
    
    console.log(data1)
    if (data1.length>0)
      return data1
    
    return filteredArray
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
          <div style={{ display: isDelete ? 'none' : isRental ? 'none' : 'block' }}>
            <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '50px', marginRight: '50px' }}>
              <div style={{ marginTop: '20px', width: '100%' }}>
                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <span style={{ flex: '1' }}>
                    Tên dịch vụ:
                  </span>
                  <input
                    style={{ marginLeft: '10px', borderRadius: '10px', flex: '3.5' }}
                    type="text"
                    id='serviceName'
                    name="serviceName"
                    value={formData.serviceName}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div style={{ marginTop: '20px', width: '100%' }}>
                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  Giá tiền (tháng):
                  <span style={{ flex: '2.5', fontWeight: '500' }}>

                    <input
                      style={{ marginLeft: '10px', borderRadius: '10px', flex: '2.5' }}
                      type="number"
                      id='servicePrice'
                      name="servicePrice"
                      value={formData.servicePrice}
                      onChange={handleChange}
                      required
                    />
                    triệu VND
                  </span>
                </label>
              </div>
              <div style={{ marginTop: '20px', width: '100%' }}>
                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <span style={{ flex: '1' }}>
                    Mô tả:
                  </span>
                  <input
                    style={{ marginLeft: '10px', borderRadius: '10px', flex: '3.5' }}
                    type="text"
                    id='serviceDesc'
                    name="serviceDesc"
                    value={formData.serviceDesc}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div style={{ marginTop: '100px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                <button type="submit" style={{ borderRadius: '10px', backgroundColor: 'teal', color: 'white' }}>Xác nhận</button>
                <button type="button" onClick={cancelClick} style={{ marginLeft: '10px', borderRadius: '10px', backgroundColor: 'orange' }}>
                  Hủy
                </button>
              </div>
            </form>

          </div>
          <div className="form-post__content" style={{ height: '80%', display: isRental ? 'block' : 'none' }}>
            <form onSubmit={handleSubmit} style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '50px', marginRight: '50px' }}>
              <div style={{ marginTop: '20px', width: '100%' }}>
                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  Tên công ty:
                  <select name="companyId" onClick={handleChangeRental} style={{ marginLeft: '10px', borderRadius: '10px' }}>
                    {filterDuplicates(companysRentalStatus).map((company) => {
                      const otherCompany = companysFromReducer.find(item => item.id === company.companyId);
                      const companyName = otherCompany ? otherCompany.cusName : "Tên công ty không tồn tại";
                      return (
                        <option key={company.id} value={company.companyId} >
                          {companyName}
                        </option>
                      )
                    })}
                  </select>
                </label>
              </div>
              <div style={{ marginTop: '20px', width: '100%' }}>
                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <span style={{ flex: '1' }}>
                    Dịch vụ:
                  </span>
                  <span style={{ flex: '1', fontWeight: '500' }}>
                    {formData.serviceName} 
                  </span>
                </label>
              </div>
              <div style={{ marginTop: '20px', width: '100%' }}>
                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <span style={{ flex: '1' }}>
                    Tiền thuê (tháng):
                  </span>
                  <span style={{ flex: '1', fontWeight: '500' }}>
                    {formData.servicePrice * 1000000} VND
                  </span>
                </label>
              </div>
              <div style={{ marginTop: '20px', width: '100%' }}>
                <label style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <span style={{ marginRight: '10px' }}>
                    Ngày bắt đầu thuê:
                  </span>
                  <DatePicker
                    selected={new Date(formDataRental.scDateBegin)}
                    onChange={(date) => setFormDataRental({ ...formDataRental, scDateBegin: date.toISOString().split('T')[0] })}
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
                    selected={new Date(formDataRental.scDateEnd)}
                    onChange={(date) => setFormDataRental({ ...formDataRental, scDateEnd: date.toISOString().split('T')[0] })}
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
        </div>
      </div>

      <div className="admin-post__wrapper">
        <div style={{ marginTop: '50px', fontSize: '30px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ flex: '1.5' }}>Danh sách dịch vụ</div>
          <div style={{ flex: '1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <form className="search-bar" style={{ height: '30px', fontSize: '15px', borderRadius: '10px' }}>
              <input style={{ borderRadius: '5px', width: '250px' }}
                placeholder='Tìm kiếm dịch vụ' type="search" name="search" pattern=".*\S.*"
                required onChange={(e) => searchRoom(e.target.value)} />
            </form>
            <div style={{ width: '150px', height: '30px', fontSize: '15px' }} >
              <button onClick={() => popUpActive('create', '')} style={{ backgroundColor: 'teal', color: 'white', borderRadius: '10px' }}>
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
                <th style={{ width: '200px' }}>Tên dịch vụ</th>
                <th style={{ width: '120px' }}>Giá (tháng)</th>
                <th style={{ width: '250px' }}>Mô tả</th>
                <th style={{ width: '250px' }}>Thao tác</th>
              </tr>
              {
                sortedData?.map((item1, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item1?.serviceName}</td>
                    <td>{item1?.servicePrice * 1000000} VND</td>
                    <td>{item1?.serviceDesc} </td>
                    <td>
                      <button className="post-edit-item-btn" style={{ width: '100px' }} onClick={() => popUpActive('edit', item1)}>
                        Cập nhật
                      </button>
                      <button className="post-edit-item-btn" style={{ width: '100px', marginLeft: '10px' }} onClick={() => popUpActive('rental', item1)}>
                        Thuê
                      </button>
                      <button className="post-delete-btn " style={{ width: '70px', marginLeft: '10px' }} onClick={() => popUpActive('delete', item1)}>
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

export default Service1;